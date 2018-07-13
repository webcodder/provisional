/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//houseList工具方法
var houseListUtil = {
	
}

//banner图片上传
var bannerPortraitLoad = function(){
	util.upLoad($('.banner_file'), $('.banner_img'));
}

//配套设施
var supporFacit = function(){
	$('#supporFacit dd').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
	});
}

//load
$(function(){
	// bannerPortraitLoad();  //banner图片上传
	supporFacit();  //配套设施
});