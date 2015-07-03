/**
 * @author townmi
 * @date   2015-07-03
 * @description [data analytics]
 */

/**
 * [description]
 * @return {[type]} [description]
 */
(function () {

	var tmCookie = new Date().getTime();

	var EXPRIES = new Date( tmCookie + 3600000*24*356*100 );

    var cookies = document.cookie.split(";"), cookieSet = false;

    for(i in cookies){
        var checkArr = cookies[i].split("=");
        if(checkArr[0] == "tm" && checkArr[1].length == 13){
        	tmCookie = checkArr[1];
            cookieSet = true;
            break;
        }
    }

    if(!cookieSet){
        document.cookie = "tm="+tmCookie+";expires="+EXPRIES;
    }

	var baseSrc = "http://10.100.142.95:3000/";

	var version = "0.0.1";

	var ratio = window.screen.width+"x"+window.screen.height;

	var lo = window.location.href;

	var title = document.title;

	new Image().src = baseSrc+"tm.gif?"+"v="+version+"&r="+ratio+"&tm="+tmCookie+"&ul="+lo+"&tt="+title;

	document.onclick = function( e ){
		var x = e.pageX;
		var y = e.pageY;
		new Image().src = baseSrc+"tm2.gif?"+"tm="+tmCookie+"&co="+x+","+y;
	}

})();