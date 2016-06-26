const koa =  require("koa");
const request = require("request");
request("http://www.sse.com.cn/js/common/ssesuggestdataAll.js", function (error, response, body) {
	if (!error && response.statusCode == 200) {
		console.log(body) // Show the HTML for the Google homepage.
	}
});