const koa = require("koa");

const request = require("request");


const stockCollection = require("./services/addStockCollection.js");


request("http://www.sse.com.cn/js/common/ssesuggestdataAll.js", requestStockCollection);

async function requestStockCollection (error, response, body) {

    let getStock = function () {

    };

    if (!error && response.statusCode == 200) {

        var stockNum = null;

        try {
            +function () {
                eval(body);
                stockNum = get_alldata();
            }();
        } catch (error) {

        }
        if (stockNum) {
            for (var i in stockNum) {

                stockCollection({
                    "STOCKID": stockNum[i].val,
                    "STOCKNAME": stockNum[i].val3,
                    "STOCKCHINANAME": stockNum[i].val2
                })
            }
        }

    }
}