/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//houseList工具方法
var houseListUtil = {

}

//标签
var houseLab = function() {
	util.selMultipleClass($('#houseLab dd'));
}

//房间名称编辑
var houseTitle = function(){
	util.fixInfo($('#editHouseTitle'), $('.house_txt li.tit h3'), $('#houseTitle'), 
        $('.house_txt li.tit .edit'), $('#comfirmHouseTitle'), $('#closeHouseTitle'), 
        $(''), '');
}

//房间价格编辑
var housePrice = function(){
	util.fixInfo($('#editHousePrice'), $('.house_txt li.pri h3'), $('#housePrice'), 
        $('.house_txt li.pri .edit'), $('#comfirmHousePrice'), $('#closeHousePrice'), 
        $(''), '');
}

//订房须知
var houseInfo = function(){
	util.fixInfo($('#editHouseInfo'), $('.m-house_info p'), $('#houseInfo'), 
	        $('.houifo_ul .edit'), $('#comfirmHouseInfo'), $('#closeHouseInfo'), 
	        $('.m-house_info'), 'edit_house_info');
}

//配套设施
var supporFacit = function(){
	util.selMultipleClass($('#supporFacit dd'));
}

//load
$(function(){
	houseLab();  //标签
	houseTitle();  //房间名称编辑
	housePrice();  //房间价格编辑
	houseInfo()  //订房须知
	supporFacit();  //配套设施
});