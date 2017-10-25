//选项卡
var zstTab = function(){
	$('#zstBtn li').click(function(){
		$('#zstCot .zst_lst').eq($(this).index()).show().siblings().hide();
	});
}

$(function(){
	zstTab();	//选项卡
});