window.onload = function(){

}

$(function(){
//选项卡
	$(".livage_nav li").click(function(){
		$(this).addClass("livage_nav_on").siblings().removeClass("livage_nav_on");
		$('.livage_box div').hide();
		id=$(this).attr('id');
		$("."+id+"_box").show();
	});

//livage_box高度自适应
	var livdoHeight = $(".livage_video").height();
	var linavHeight = $(".livage_nav").height();
	var libotHeight = $(".livage_bottom").height();
	$(".livage_box").css("height",$(window).height()-livdoHeight-linavHeight-libotHeight);
	/*console.log($(".livage_box").height());*/
});