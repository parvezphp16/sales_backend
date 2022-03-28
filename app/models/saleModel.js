var db = require('../../config/database'); //reference of dbconnection.js  

var SaleMaster = {  
    getSalesStats:(statsBy, callback) => {
        let where;
        if(statsBy == 'daily'){  
            where = `WHERE date LIKE '%`+currentDate+`%'`;
        } else if(statsBy == 'weekly'){ 
            where = `WHERE date BETWEEN '`+weekStartDate.format('YYYY-MM-DD')+`' AND  '`+weekEndDate.format('YYYY-MM-DD')+`'`;
        } else if(statsBy == 'monthly'){ 
            where = `WHERE date BETWEEN '`+monthStartDate.format('YYYY-MM-DD')+`' AND  '`+monthEndDate.format('YYYY-MM-DD')+`'`;
        }
        
        let query = `Select SUM(amount) AS totAmount FROM tbl_sales ${where} `;
        return db.query(query, callback);
    },

    /* For Sale's Data Insertion */
    recordSalesData: (body, callback) => {
        let query = `INSERT INTO tbl_sales(userName, amount, date) VALUES(?,?,?)`
        let data = [body.userName, body.amount, body.date];
        return db.query(query, data, callback);
    },
};  
module.exports = SaleMaster; 