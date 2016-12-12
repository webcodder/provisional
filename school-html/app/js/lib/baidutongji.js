/*
 *Author:liaohs
 *Date:2015.1.18
 *Name:boomgame
 */
 $(document).ready(function(){
	var _hmt = _hmt || [];
    var hm = document.createElement("script");
    hm.src = "//hm.baidu.com/hm.js?4c8da4728bb731b4d4aba9bb7cb4f062";
    var s = document.getElementById("scriptbox");
    s.appendChild(hm);

    //console.log(html)
    if(html=="login"){
    	  _hmt.push(['_setCustomVar', 1, 'visitor', '访问首页', 1]);
    	  return 
    }
    if(html!="login"||html!="flogin"){
        $.ajax({
            url: dataport.userStatue,
            type: "get",
            timeout: publicFunc.time,
            success: function(data) {
            	_hmt.push(["_setCustomVar", 3, "userQQ", data.auth.qq, 1]);
            },
            error: function(request) {
                console.log(request);  

            }
        }, "json");

        $(".nav1").on("click", function () {
            var txt = $(this).attr("txt")
            _hmt.push(["_trackEvent", "headMenu", "click", txt]);
            //console.log(txt)
        });         
         
         $(".nav2").on("click", function () {
	        var txt = $(this).attr("txt")
	        _hmt.push(["_trackEvent", "menu", "click", txt]);

	    });

    }

 })