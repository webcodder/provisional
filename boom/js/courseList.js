$(function(){
	//curlit_list 高度自适应
	var culithdHeight = $(".curlit_header").height();
	console.log(culithdHeight);
	$(".curlit_list").css("height",$(window).height()-culithdHeight-5-1);

	//搜索框
	$(".search-icon").click(function(){
		$(".list_seasrch").show();
	});
	$(".close").click(function(){
		$(".list_seasrch").fadeOut();
	});
});