$(function(){
	//轮播
	function boactnSwiper(){
		var swiper = new Swiper('.boacteer_header_ban .swiper-container', {
	        pagination: '.swiper-pagination',
	        nextButton: '.swiper-button-next',
	        prevButton: '.swiper-button-prev',
	        paginationClickable: true,
	        spaceBetween: 5,
	        centeredSlides: true,
	        autoplay: 2500,
	        autoplayDisableOnInteraction: false
	    });
	}
	
	//高度自适应
	function heightAuto(){
		var boatehedHeight = $(".boacteer_header").height();
		var boatectpHeight = $(".boacteer_cont_top").height();
		$(".boacteer_cont").css("height",$(window).height()-boatehedHeight-12);
		$(".boacteer_cont_list").css("height",$(window).height()-boatehedHeight-12-boatectpHeight-1);
	}

	//ajax vsrmd
	$.ajax({
		url:"http://192.168.1.124:9000/wx/school/v1.0/recommend?groupId=13",
		type:"post",
		dataType:"json",
		success:function(data,status){
			var datalength = data.length;
			var str = "";
			for (var i = 0; i < datalength; i++) {
				str += "<div class='swiper-slide'><a href='" + data["data"][i]["url"] + "'><div class='boacteer_header_ban_pic'><img src='http://static.iboom.tv/static/img/" + data["data"][i]["img"] + "'></div></a></div>";
			}
		  	//console.log(data["data"][0]["id"]);
		  	$("#vsrmd").append(str);
		  
		  	boactnSwiper();
		  	heightAuto();
		},
		error: function () {
		  console.log(false);
		}
	});

	//ajax boacteer_list
	$.ajax({
		url:"http://192.168.1.124:9000/wx/school/v1.0/recommend?groupId=12",
		type:"post",
		dataType:"json",
		success:function(data,status){
			var datalength = data.length;
			var str = "";
			for (var i = 0; i < datalength; i++) {
				str += "<li class='boacteer_list_li'><a href='" + data["data"][i]["url"] + "'><img src='http://static.iboom.tv/static/img/" + data["data"][i]["img"] + "'></a></li>";
			}
		  	//console.log(data["data"][i]["id"]);
		  	$("#boacteer_list").append(str);
		  
		  	boactnSwiper()
		},
		error: function () {
		  console.log(false);
		}
	});
});


