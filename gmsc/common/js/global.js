// 加载页面公共部分
var loadHtml = function(){
	// header
	$('.g-hd').load('common/lib/header.html');

	// footer
	$('.g-ft').load('common/lib/footer.html');
}

//设为首页
var setAsHome = function(){
	$('body').on('click', '#setAsHome', function(){
		alert();
	});
}

//加入收藏
var collection = function(){
	$('body').on('click', '#collection', function(){
        var ctrl = (navigator.userAgent.toLowerCase()).indexOf('mac') != -1 ? 'Command/Cmd' : 'CTRL'; 
        if (document.all) { 
        	window.external.addFavorite('http://www.baidu.com', '百度');
        } else if (window.sidebar) { 
        	window.sidebar.addPanel('百度', 'http://www.baidu.com', ""); 
        } else {　　　　//添加收藏的快捷键 
        	alert('添加失败\n您可以尝试通过快捷键' + ctrl + ' + D 加入到收藏夹~');
        }
	});
}

//时间戳转换
function formatDate(now) {
	var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var week = now.getDay();
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    minute=="0"?minute="00":minute;
    return year + "年" + month + "月" + date + "日" + " ( " + weekDay[week] + " ) " + hour + ":" + minute + ":" + second;
}

// 定义获取和更新时间
function showTime() {
    var curTime = formatDate(new Date());
    var str = `
        <p>你好，欢迎访问贵美商城!<span>${curTime.toLocaleString()}</span></p>
    `;
    $("#clock").html(str);
    setTimeout("showTime()", 1000);
}

$(function(){
	loadHtml();	// 加载页面公共部分
	setAsHome();	//设为首页
	collection()	//加入收藏
	showTime();	// 定义获取和更新时间
});