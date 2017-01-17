/*!
 * @author harrytang@vipabc.com 
 * @date 17/1/17.
 */
let log = require("./log.js");
let stockList = require("../models/stockList.js");

module.exports = function(sql){

    return stockList.sync({logging: false}).then(function () {
        return stockList.count(sql);
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        log.error(err+"<!log>");
        return null;
    });

};