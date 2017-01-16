let request = require("request");

let Promise = require("bluebird");


const stockList = require("./services/addStockList.js");

const stockCollection = require("./services/addStockCollection.js");

request("http://www.sse.com.cn/js/common/ssesuggestdataAll.js", requestStockCollection);


function requestStockCollection(error, response, body) {

    let getStock = function () {

    };

    if (!error && response.statusCode == 200) {

        let stockNum = null;

        try {
            +function () {
                eval(body);
                stockNum = get_alldata();
            }();
        } catch (error) {

        }
        if (stockNum) {
            for (const i in stockNum) {

                // stockList({
                //     "STOCKID": stockNum[i].val,
                //     "STOCKNAME": stockNum[i].val3,
                //     "STOCKCHINANAME": stockNum[i].val2
                // })
            }
            // console.log(stockNum);
        }

    }
}

let list = [];

for (let i = 600004; i < 603000; i++) {

    let p = new Promise(function (resolve) {
        list.push(request("http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=sh" + i + ",day,2008-01-01,2008-12-31,320,qfq&r=0.6249188441964779&stockid=" + i, function (err, res) {
            resolve({
                id: i,
                body: res.body
            })
        }));
    });

    list.push(p);

}

Promise.all(list).then(function (listOrigin) {
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

        stockHistroyData.forEach(function (ele, index) {
            let map = {
                STOCKID: id,
                DATE: ele[0],
                OPENATCASH: (ele[1] * 1).toFixed(2),
                MIDCLOSEATCASH: (ele[2] * 1).toFixed(2),
                MIDOPENATCASH: (ele[3] * 1).toFixed(2),
                CLOSEATCASH: (ele[4] * 1).toFixed(2),
                TRADECOUNT: (ele[5] * 1).toFixed(2)
            };
            stockCollection(map)
        });

        console.log(stockHistroyData)
    })

});


//http://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=kline_dayqfq&param=sh600372,day,2008-01-01,2008-12-31,320,qfq&r=0.6249188441964779