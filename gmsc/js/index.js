//悬浮窗
var lastScrollP = 0,
	str = `
		<div class="ad ad1" id='ad1'>
			<img src="images/list1.jpg" alt="list1">
			<b class="f-csp">
				<img src="images/close.gif" alt="close">
			</b>
		</div>

		<div  class="ad ad2" id='ad2'>
			<img src="images/list2.jpg" alt="list2">
			<b class="f-csp">
				<img src="images/close.gif" alt="close">
			</b>
		</div>
	`;
function heartBeat_platform() {
    var diffY;
    if (document.documentElement && document.documentElement.scrollTop){
    	 diffY = document.documentElement.scrollTop;
    } else if (document.body) {
        diffY = document.body.scrollTop;
    }
    var clinetHeight = document.documentElement.clientHeight;
    diffY = clinetHeight - 485 + diffY;
    percent = .1 * (diffY - lastScrollP);
    if (percent > 0) {
    	percent = Math.ceil(percent);
    } else {
    	percent = Math.floor(percent);
    }
    if ($('#ad1')) {
    	$('#ad1').css("top", parseInt($('#ad1').css('top')) + percent + 'px');
    }

    if ($('#ad2')) { 
    	$('#ad2').css("top", parseInt($('#ad2').css('top')) + percent + 'px');
    }
    lastScrollP = lastScrollP + percent;
}
$('#suspendedWindow').html(str);
window.setInterval("heartBeat_platform()", 1);
var suspendedWindow = function(){
	//关闭ad1
	$('.ad1 .f-csp').click(function(){
		$('.ad1').hide();
	});

	//关闭ad2
	$('.ad2 .f-csp').click(function(){
		$('.ad2').hide();
	});

	//弹出视频
	$('.ad2').find('img:first').click(function(){
		$('#videoModal').fadeIn();
		$('.m-video video').trigger('play');
	});

	//关闭视频
	$('.m-video .f-csp').click(function(){
		$('#videoModal').fadeOut();
		$('.m-video video').trigger('pause');
	});
}

//轮播图
var t = n =0, count;
function showAuto() {
	n = n >= (count -1) ? 0 : ++n;
	$('#banner li').eq(n).trigger('click');
}
var banner = function(){
	count=$("#banner a").length;

	$(".imgs a:not(:first-child)").hide();

	$('#banner li').click(function() {
		var i = $(this).text() -1;
		n = i;
		if (i >= count) return;
		$('#banner a').filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
		$(this).toggleClass("on");
		$(this).siblings().removeAttr("class");
	});

	t = setInterval('showAuto()', 4000);
}

//商品分类
var goodsClassifiy = function(){
	function goodsClassifiy(classify){
		var classifyId = classify.id;

		$.ajax({
			url: 'json/goodsClassifiy.json',
			type: 'get',
			dataType:'json',
			success: function(data, status, XHR){
				var classify = data,
					str = '';

				for(var i=0; i<classify.length; i++){
					str += `<li><a href="${classify[i].url}">${classify[i].title}</a></li>`;
				}

				$('#' + classifyId + " ol").html(str);
			},
			error: function(XHR){
				console.log(XHR.status);
			}
		});
	}

	goodsClassifiy(householdAppliances);
	goodsClassifiy(books);
	goodsClassifiy(mobilePhoneDigital);
	goodsClassifiy(generalMerchandise);
}

//panicBuying(抢购)
var panicBuying = function(){
	$.ajax({
		url: 'json/panicBuying.json',
		type: 'get',
		dataType:'json',
		success: function(data, status, XHR){
			var panicBuying = data.data,
				str = '';

			for(var i=0; i<panicBuying.length; i++){
				str += `
					<li>
						<a href='${panicBuying[i].url}' title="${panicBuying[i].title}">
							<div class="pic f-oh">
								<img src="${panicBuying[i].img}" alt="${panicBuying[i].title}">
							</div>
							<div class="txt">
								<span>${panicBuying[i].title}</span>
							</div>
						</a>
					</li>
				`;
			}

			$('#panicBuying ul').html(str);
		},
		error: function(XHR){
			console.log(XHR.status);
		}
	});
}

//newArrivals(新品上架)
var newArrivals = function(){
	$.ajax({
		url: 'json/newArrivals.json',
		type: 'get',
		dataType: 'json',
		success: function(data, status, XHR){
			var newArrivals = data.data,
				str = '';

			for(var i=0; i<newArrivals.length; i++){
				str += `
					<li>
						<a href="${newArrivals[i].url}" title="${newArrivals[i].title}">
							<dl class="f-cb">
								<dt>
									<img src="${newArrivals[i].img}" alt="${newArrivals[i].title}">
								</dt>
								<dd>${newArrivals[i].title}</dd>
							</dl>
						</a>
						
					</li>
				`;
			}

			$('#newArrivals ul').html(str);
		},
		error: function(XHR){
			console.log(XHR.status);
		}
	});
}

var tab = function(){
	$('.tabtn li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tabcot').eq($(this).index()).show().siblings().hide();
	});
}


$(function(){
	suspendedWindow();	//悬浮窗
	banner();	//轮播图
	goodsClassifiy();	//商品分类
	panicBuying();	//panicBuying(抢购)
	newArrivals();	//newArrivals(新品上架)
	tab();	//选项卡
});	











