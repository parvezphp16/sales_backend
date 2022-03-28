var db = require('../../config/database'); //reference of dbconnection.js

var shared = {
    getSalesData: (startDate, endDate, callback) => {
        let query = `Select DISTINCT(date) AS date FROM tbl_sales WHERE date BETWEEN '`+startDate+`' AND  '`+endDate+`' `;
        return db.query(query, callback);
    },

    getDailySalesData: (date, callback) => {
        let query = `Select hour(date) AS hour, SUM(amount) AS totAmount FROM tbl_sales WHERE date LIKE '%`+date+`%' group by hour(date)`;
        return db.query(query, callback);
    },

    getSalesDataByDate: (date, callback) => {
        let query = `Select SUM(amount) AS totAmount FROM tbl_sales WHERE date LIKE '%`+date+`%' `;
        return db.query(query, callback);
    },
};
module.exports = shared;