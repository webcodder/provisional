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
	$(".curdtil_box").css("height",$(window).height()-cdivdoHeight-cdinavHeight-cdibotHeight-1);

	//赞
	$('.course_info_bottom ul li:last').toggle(
		function(){
			$(this).find("span").addClass("couin_bood");
		},
		function(){
			$(this).find("span").removeClass("couin_bood");
		}
	);

	//天赋配置 Swiper
	var swiper = new Swiper('.curdtiox_gift_cont .swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });

	//符文搭配 Swiper
	var swiper = new Swiper('.curdtiox_rune_cont .swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true
        }
    });

    //评价
    $(".course_info_bottom ul li:first").click(function(){
        $(".evalcoue_box").fadeIn();
    });
    
    //提问
    $(".curdtil_bottom button").click(function(){
        $(".quenask_box").fadeIn();
    });
});