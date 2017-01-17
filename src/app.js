let request = require("request");
let Promise = require("bluebird");
let schedule = require('node-schedule');

const stockList = require("./services/addStockList.js");
const countStockList = require("./services/countStockList.js");
const stockCollection = require("./services/addStockCollection.js");
const countStockCollection = require("./services/countStockCollection.js");

let first = new Promise(function (resolve) {
    request("http://www.sse.com.cn/js/common/ssesuggestdataAll.js", function (err, res, body) {
        resolve({
            body: body
        });
    });
});

let stockListPromise = Promise.all([first]).then(function (data) {
    let stockNum = null,
        insertList = [];

    try {
        +function () {
            eval(data[0].body);
            stockNum = get_alldata();
        }();
    } catch (error) {

    }

    stockNum && stockNum.length && stockNum.forEach(function (ele, index) {
        let map = {
            "STOCKID": ele.val,
            "STOCKNAME": ele.val3,
            "STOCKCHINANAME": ele.val2
        };
        insertList.push(new Promise(function (resolve) {
            countStockList({where: {STOCKID: ele.val, STOCKNAME: ele.val3}}).then(function (data) {
                if (data == 0) {
                    stockList(map).then(function () {
                        resolve(ele);
                    });
                } else {
                    resolve(ele);
                }
            });
        }));
    });

    return Promise.all(insertList);

});

stockListPromise.then(function (data) {

    let list = [],
        indexPost = 0;

    data.forEach(function (ele, index) {
        for (let i = 2004; i < 2018; i++) {
            let now = Math.random() * Date.now();
            list.push("http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=sh" + ele.val + ",day," + i + "-01-01," + i + "-12-31,320,qfq&r=" + now);
        }
    });

    let job = schedule.scheduleJob('5 * * * * *', function () {

        let listCache = [],
            i = 0;
        do {
            indexPost++;
            i++;
            let p = new Promise(function (resolve) {
                request(list[indexPost], function (err, res) {
                    let body = null;
                    if (res && res.body) {
                        body = res.body;
                    }
                    resolve({
                        id: i,
                        body: body
                    });
                });
            });

            listCache.push(p);
        }
        while (i < 10);

        Promise.all(listCache).then(function (listOrigin) {
            let list = [];

            listOrigin.forEach(function (ele, index) {
                if (index % 2 != 0) {
                    list.push(ele)
                }
            });

            list.forEach(function (ele, index) {

                const value = ele.body,
                    id = ele.id;

                let stockHistroyData = null;

                try {
                    +function () {
                        eval(value);
                        stockHistroyData = kline_dayqfq.data["sh" + id].qfqday;
                    }();
                } catch (error) {

                }

                stockHistroyData && stockHistroyData.length && stockHistroyData.forEach(function (ele, index) {
                    let map = {
                        STOCKID: id,
                        DATE: ele[0],
                        OPENATCASH: (ele[1] * 1).toFixed(2),
                        MIDCLOSEATCASH: (ele[2] * 1).toFixed(2),
                        MIDOPENATCASH: (ele[3] * 1).toFixed(2),
                        CLOSEATCASH: (ele[4] * 1).toFixed(2),
                        TRADECOUNT: (ele[5] * 1).toFixed(2)
                    };
                    countStockCollection({where: {STOCKID: id, DATE: ele[0]}}).then(function (data) {
                        if (data == 0) {
                            stockCollection(map)
                        }
                    });
                });
            });

        });

    });

});


//http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=sh600372,day,2008-01-01,2008-12-31,320,qfq&r=0.6249188441964779