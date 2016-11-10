$(function(){
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

	//选项卡
	$(function(){
		$(".scrlit_nav li").click(function(){
			//alert(1);
			$(this).addClass("scrlit_nav_on").siblings().removeClass("scrlit_nav_on");
			$('.scrlit_article section').hide();
			id=$(this).attr('id');
			$("."+id+"_box").show();
		});
	});

	//scrlit_article高度自适应 scrcleHeight
	var scrhedHeight = $(".scrlit_header").height();
	//console.log(scrhedHeight);
	$(".scrlit_article").css("height",$(window).height()-scrhedHeight-8);
	$(".scrlit_nav").css("height",$(window).height()-scrhedHeight-8);
	$(".list_seasrch_cont").css("height",$(window).height()-50);
});