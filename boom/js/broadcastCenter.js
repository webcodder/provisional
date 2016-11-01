$(function(){
	//boacteer_cont 高度自适应
	var boatehedHeight = $(".boacteer_header").height();
	var boatectpHeight = $(".boacteer_cont_top").height();
	$(".boacteer_cont").css("height",$(window).height()-boatehedHeight-12);
	$(".boacteer_cont_list").css("height",$(window).height()-boatehedHeight-12-boatectpHeight-1);
});