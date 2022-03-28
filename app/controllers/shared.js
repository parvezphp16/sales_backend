const sharedModel = require('../models/shared');

/* Get All The Data From Given Params */
exports.getSalesData = (startDate, endDate) => {
    return new Promise((resolve, reject) => {
        sharedModel.getSalesData(startDate, endDate, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    }); 
}

/* Get Hours By a Date */
exports.getDailySalesData = (date) => {
    return new Promise((resolve, reject) => {
        sharedModel.getDailySalesData(date, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    }); 
}

/* Get Data By a Date */
exports.getSalesDataByDate = (date) => {
    return new Promise((resolve, reject) => {
        sharedModel.getSalesDataByDate(date, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    }); 
}