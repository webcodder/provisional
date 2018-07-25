/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//houseList工具方法
var productUtil = {
	
}

//编辑产品名称
var editPudtitName = function(){
    util.fixInfo($('#editTitle'), $('.product_title h3'), $('#productTitleName'), 
        $('.pudtit_wrap .edit'), $('#comfirmTitleName'), $('#closeTitleName'), 
        $('.product_title'), 'edit_pudtit_active');
}

//编辑特别提示
var edtiHotTip = function(){
	util.fixInfo($('#editHotTip'), $('.hot_tip_dtl p'), $('#hotTip'), 
        $('.m-hot_tip .edit'), $('#comfirmHotTip'), $('#closeHotTip'), 
        $('.m-hot_tip'), 'htipt_edit');
}

//load
$(function(){
	editPudtitName();  //编辑产品名称
	edtiHotTip();  //编辑特别提示
});