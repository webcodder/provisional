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

$(function(){
	banner();	//轮播图
});