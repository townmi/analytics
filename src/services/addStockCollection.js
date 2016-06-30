/*!
 * @author harrytang@vipabc.com 
 * @date 16/6/29.
 */
var log = require("./log.js");
var StockCollection = require("../models/stockCollection.js");

module.exports = function(sql){

    return StockCollection.sync({logging: false}).then(function () {

        return StockCollection.upsert(sql);

    }).then(
        function (data) {
            return data;
        },
        function (err) {
            log.error(err+"<!log>");
            return null;
        }
    );
};