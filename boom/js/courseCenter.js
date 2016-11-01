//图片滑动
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 1.6,
    paginationClickable: true,
    spaceBetween: 10,
    freeMode: true
});

$(function(){
	//curcent_cont高度自适应
	var curcenhedHeight = $(".curcent_header").height();
	var curctpHeight = $(".curcent_cont_top").height();
	console.log(curctpHeight);
	$(".curcent_cont").css("height",$(window).height()-curcenhedHeight-12);
	$(".curcent_cont_list").css("height",$(window).height()-curcenhedHeight-12-curctpHeight-1);
});

