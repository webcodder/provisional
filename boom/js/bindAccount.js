$(function(){
	$(".bind_input li").click(function(){
		$(this).addClass("bind_input_on").siblings().removeClass("bind_input_on");
		var binput_dd = $(this).find("dd:first");
		if
		($(binput_dd).hasClass("bid_name")){
			$("#bid_name").attr("src","images/a02.png");
			$("#bid_sele").attr("src","images/a03.png");
		}
		else if
		($(binput_dd).hasClass("bid_sele"))
		{
			$("#bid_name").attr("src","images/a01.png");
			$("#bid_sele").attr("src","images/a04.png");
		}
	});
});