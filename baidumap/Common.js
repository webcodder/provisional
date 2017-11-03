
function requestparm(paras) {
    var url = location.href;
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {}
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}

//获取请求的url?号后的所有参数串
function requestparms() {
    var url = location.href;
    var index = url.indexOf("?");
    var paraString = "";

    if (index > -1) paraString = url.substring(index, url.length);

    return paraString;
}

//验证的错误提示
function CheckShow(id, info) {
    if (info == "") {
        $(id).parent().parent().removeClass("has-error");
//        $(id).parent().parent().addClass("has-success");

//        var con = '<div class="help-block col-sm-reset inline">';
//        con += '<i class="icon-ok-sign"></i>填写正确！</div>';
//        $(con).appendTo($(id).parent());
    }
    else {
        $(id).parent().parent().addClass("has-error");
        var con = '<div class="help-block col-sm-reset inline">';
        con += '<i class="icon-remove-sign"></i>' + info + '</div>';
        $(con).appendTo($(id).parent());
    }
}

//清除错误提示
function RemoveCheckShow() {
    $(".has-error").removeClass("has-error");
    $(".has-success").removeClass("has-success");
    $(".help-block").remove();
}

//微信端用的模拟登陆
function SimulatedLogin() {
    //alert("SimulatedLogin");
    var code = requestparm('code');
    var agentID = requestparm('state');

    if (code != null && code != "" && agentID != null && agentID != "") {
        var ajaxUrl = "../../Service/User.ashx";
        $.ajax({
            async: false,
            type: "post",
            data: { Code: code, State: agentID, Operate: "login" },
            url: ajaxUrl,
            success: function (data, textStatus) {
                if (data == null || data != true) {
                    alert("获取用户数据失败。");
                }
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function (e) {
            }
        });
    }
}

function BrowserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        return "phone";
    } else {
        return "pc";
    }
}

// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function (fmt) { //author: meizz   
    var o = {
        "M+": this.getMonth() + 1,                 //月份   
        "d+": this.getDate(),                    //日   
        "h+": this.getHours(),                   //小时   
        "m+": this.getMinutes(),                 //分   
        "s+": this.getSeconds(),                 //秒   
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度   
        "S": this.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function GetDateTime(inttime, fmt) {
    return new Date(parseInt(inttime) * 1000).Format(fmt);
}
   
