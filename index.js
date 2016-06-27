const koa =  require("koa");
const request = require("request");
request("http://www.sse.com.cn/js/common/ssesuggestdataAll.js", function (error, response, body) {
	if (!error && response.statusCode == 200) {

		var stockNum = null;

		try	{
			+function () {
				eval(body);
				stockNum = get_alldata();
			} ();
		} catch (error) {

		}

		console.log(stockNum);
	}
});