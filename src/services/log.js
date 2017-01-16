/*!
 * @author harrytang@vipabc.com 
 * @date 16/6/29.
 */
let log4js = require("log4js");

log4js.configure({
    appenders: [
        { type: 'console' },
        {
            "type": "dateFile",
            "filename": "logs/log.log",
            "pattern": "-yyyy-MM-dd",
            "alwaysIncludePattern": false,
            "category": "log"
        }
    ]
});

let log = log4js.getLogger('log');

module.exports = log;