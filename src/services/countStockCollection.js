/*!
 * @author harrytang@vipabc.com 
 * @date 17/1/17.
 */
let log = require("./log.js");
let StockCollection = require("../models/stockCollection.js");

module.exports = function(sql){

    return StockCollection.sync().then(function () {
        return StockCollection.count(sql);
    }).then(function (data) {
        return data;
    }).catch(function (err) {
        log.error(err+"<!log>");
        return null;
    });
};