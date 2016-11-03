$(function(){
	//选项卡
	$(".curdtil_nav li").click(function(){
		$(this).addClass("curdtil_nav_on").siblings().removeClass("curdtil_nav_on");
		$('.curdtil_box_wrap').hide();
		id=$(this).attr('id');
		$("."+id+"_box").show();
	});

	//curdtil_box高度自适应
	var cdivdoHeight = $(".curdtil_video").height();
	var cdinavHeight = $(".curdtil_nav").height();
	var cdibotHeight = $(".curdtil_bottom").height();
	$(".curdtil_box").css("height",$(window).height()-cdivdoHeight-cdinavHeight-cdibotHeight);
});