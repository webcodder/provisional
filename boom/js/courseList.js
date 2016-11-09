$(function(){
	//curlit_list 高度自适应
	var culithdHeight = $(".curlit_header").height();
	$(".curlit_list").css("height",$(window).height()-culithdHeight-5-1);
	$(".list_seasrch_cont").css("height",$(window).height()-50);

	//搜索框
	$(".search-icon").click(function(){
		$(".list_seasrch").show();
	});
	$(".close").click(function(){
		$(".list_seasrch").fadeOut();
	});

	$(".search-input ~ b").click(function(){
		$(".search-input").attr("value","");
	});
});

