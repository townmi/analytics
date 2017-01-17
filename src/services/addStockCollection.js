/*!
 * @author harrytang@vipabc.com 
 * @date 16/6/29.
 */
let log = require("./log.js");
let StockCollection = require("../models/stockCollection.js");

module.exports = function(sql){

    return StockCollection.sync().then(function () {

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