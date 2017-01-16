/*!
 * @author harrytang@vipabc.com 
 * @date 17/1/16.
 */
let log = require("./log.js");
let StockCollection = require("../models/stockList.js");

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