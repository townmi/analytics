/*!
 * @author harrytang@vipabc.com 
 * @date 17/1/16.
 */
let log = require("./log.js");
let stockList = require("../models/stockList.js");

module.exports = function(sql){

    return stockList.sync({logging: false}).then(function () {

        return stockList.upsert(sql);

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