var express = require('express');
var router = express.Router();
var saleModel = require('../models/saleModel');
const moment = require('moment');
const sharedfn = require('./shared');

/* Current Date */
let now = moment();
let currentDate = JSON.stringify(now.format("YYYY-MM-DD"))
currentDate = currentDate.replace(/"/g, '');

/* Start and End Date of Current Week */
var weekStartDate = moment().startOf('week');
var weekEndDate = moment().endOf('week');

/* Start and End Date of Current Month */
var monthStartDate = moment().startOf('month');
var monthEndDate = moment().endOf('month');

router.get('/sales/', async (req, res) => {
    try {
        if (req.query.statsBy) {
            let where, getDates, startDate, endDate;
            if(req.query.statsBy == 'daily'){  
                where = currentDate;
                getDates = await sharedfn.getDailySalesData(where); 
            } else if(req.query.statsBy == 'weekly'){ 
                startDate = weekStartDate.format('YYYY-MM-DD');
                endDate = weekEndDate.format('YYYY-MM-DD');
                getDates = await sharedfn.getSalesData(startDate, endDate);
            } else if(req.query.statsBy == 'monthly'){ 
                startDate = monthStartDate.format('YYYY-MM-DD');
                endDate = monthEndDate.format('YYYY-MM-DD');
                getDates = await sharedfn.getSalesData(startDate, endDate);
            }
            
            let salesData = [];
            if(getDates.length>0){
                if(req.query.statsBy == 'daily'){ 
                    for(var gd=0; gd<getDates.length; gd++){
                        let salesDataResp = {};
                        salesDataResp.hour = getDates[gd].hour;
                        salesDataResp.totAmount = getDates[gd].totAmount;                    
                        salesData.push(salesDataResp);
                    }
                }else{
                    for(var gd=0; gd<getDates.length; gd++){
                        var date = JSON.stringify(getDates[gd].date);
                        const date_Arr = date.split("T"); 
                        date_Arr[0] = date_Arr[0].replace(/"/g, '');
                        
                        getSalesDataByDate = await sharedfn.getSalesDataByDate(date_Arr[0]);
                        
                        let salesDataResp = {};
                        salesDataResp.date = date_Arr[0];
                        salesDataResp.totAmount = getSalesDataByDate[0].totAmount;                    
                        salesData.push(salesDataResp);
                    }
                }
            }
            return res.status(200).send({status: true, message: 'Sale details.', data:salesData});
        } else {
            return res.status(400).send({status: false, message: 'Params mandatory'});
        }
    } catch (err) {
        console.log(`Error getting - ${JSON.stringify(err)}`);
        return res.status(400).send({status: false, message: 'Getting some issue', error: err});
    }
})

/* For Sale's Data Insertion */
router.post('/sales/', (req, res) => {
    try {
        saleModel.recordSalesData(req.body, (err, Res) => {
            if (err) {
                return res.status(400).send({status: false, message: 'Record not created.', error: err});
            }else{
                return res.status(200).send({status: true, message: 'Record created successfully.'});
            }
        })
    } catch (err) {
        console.log(`Error getting - ${JSON.stringify(err)}`);
        return res.status(400).send({status: false, message: 'Getting some issue', error: err});
    }
})
module.exports = router;