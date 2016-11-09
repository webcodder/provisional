  //图片滑动
  function curban_swiper(){
    var swiper = new Swiper('.curcent_hadban .swiper-container', {
      pagination: '.swiper-pagination',
      slidesPerView: 1.6,
      paginationClickable: true,
      spaceBetween: 10,
      freeMode: true
    });
  }

$(function(){
	//curcent_cont高度自适应
	var curcenhedHeight = $(".curcent_header").height();
	var curctpHeight = $(".curcent_cont_top").height();
	$(".curcent_cont").css("height",$(window).height()-curcenhedHeight-12);
	$(".curcent_cont_list").css("height",$(window).height()-curcenhedHeight-12-curctpHeight-1);

  //ajax curcent_hadban
  $.ajax({
    url:"http://192.168.1.124:9000/wx/school/v1.0/recommend?groupId=11",
    type:"post",
    dataType:"json",
    success:function(data,status){
      var datalength = data.length;
      var str = "";
      for (var i = 0; i < datalength; i++) {
        str += "<div class='swiper-slide'><a class='curcent_hadban_pic' href='" + data["data"][i]["url"] + "'><img src='http://static.iboom.tv/static/img/" + data["data"][i]["img"] + "'></a></div>";
      }
      //console.log(data["data"][0]["id"]);
      $("#hotCourse").append(str);
      
      curban_swiper();
    },
    error: function () {
      console.log(false);
    }
  });

  //ajax curcent_list
  $.ajax({
    url:"http://192.168.1.124:9000/wx/school/v1.0/recommend?groupId=14",
    type:"get",
    dataType:"json",
    success:function(data,status){
      var datalength = data.length;
      var str = "";
      for (var i = 0; i < datalength; i++) {
        str += "<li><a href='" + data["data"][i]["url"] + "'><img src='http://static.iboom.tv/static/img/" + data["data"][i]["img"] + "'></a></li>";
      }
      $("#curcent_list").append(str);
      //console.log(data["data"][0]["id"]);
    },
    error: function () {
      console.log(false);
    }
  });
});