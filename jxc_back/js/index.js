/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//工具方法
var util = {
    /**
     * 文本编辑
     * [fixInfo 文本编辑]
     * @param  {[type]} edit_btn     [编辑图标]
     * @param  {[type]} info_txt     [文本内容标签]
     * @param  {[type]} info_input   [输入框]
     * @param  {[type]} edit_box     [确定关闭按钮的容器]
     * @param  {[type]} comfirm_btn  [确定按钮]
     * @param  {[type]} close_btn    [关闭按钮]
     * @param  {[type]} effect_class [编辑改变样式]
     * @param  {[type]} active_class [active添加在这个样式上]
     * @return {[type]}              [0]
     */
    fixInfo: function(edit_btn, info_txt, info_input, edit_box, comfirm_btn, close_btn, effect_class, active_class){
        //编辑
        edit_btn.click(function(){
            var oldName = info_txt.text();  //获取text文本

            info_txt.hide();  //隐藏txt文本
            info_input.show().val(oldName);  //显示input文本框，并将text文本中的内容添加进去

            edit_btn.hide();  //隐藏编辑按钮
            edit_box.show();  //显示确定关闭按钮

            effect_class.addClass(active_class);  //给当前编辑区域布局添加样式

            info_input.focus();
        });

        //确定修改
        comfirm_btn.click(function(){
            var newName = info_input.val();  //获取input文本框中的内容

            info_input.hide();  //隐藏inpu文本框
            edit_box.hide();  //隐藏确定关闭按钮

            edit_btn.show();  //显示编辑按钮
            info_txt.show().text(newName);  //显示text文本,并将input文本框中的内容添加进去

            effect_class.removeClass(active_class);  //回复原来的状态需要将编辑区域的样式去除
        });

        //关闭
        close_btn.click(function(){
            info_input.hide();  //隐藏inpu文本框
            edit_box.hide();  //隐藏确定关闭按钮

            edit_btn.show();  //显示编辑按钮
            info_txt.show();  //显示text文本

            effect_class.removeClass(active_class);  //回复原来的状态需要将编辑区域的样式去除
        });
    },

    /**
     * 图片上传
     * [getObjectURL 图片上传]
     * @param  {[type]} file [input=file]
     * @return {[type]}      [url]
     */
    getObjectURL: function(file){
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    },
};

//图片上传
var upLoad = function(){
    $("#file0").change(function() {
        var objUrl = util.getObjectURL(this.files[0]);
        if (objUrl) {
            $("#img0").attr("src", objUrl);
        }
    });   
}

//编辑昵称
var fixName = function(){
    util.fixInfo($('#editNickName'), $('.pnfo_nickname span'), $('#NickName'), $('.pnfo_prtifo .edit'), $('#comfirmFixName'), $('#closeFixName'),$('.pnfo_prtifo'), 'edit_name_active');
}

//编辑简介
var fixBrfino = function(){
    util.fixInfo($('#editBrfino'), $('.pnfo_brfino span'), $('#brfino'), $('.pnfo_brfino .edit'), $('#comfirmBrfino'), $('#closeBrfino'),$('.pnfo_brfino'), 'edit_brfino_active');
}

//编辑地址
var fixAddress = function(){
    //点击地址开始选择地址
    $('#addressDetail span').click(function(){
        getProvinceBuy();  //选择地址
        $('.addressModal').fadeIn();
        $('.m-select_address').slideDown();
    });

    //点击遮罩隐藏地址选择
    $('.addressModal').click(function(){
        $(this).fadeOut();
        $('.m-select_address').slideUp();
    });

    util.fixInfo($('#editAddress'), $('#addressDetail span'), $('#address'), $('.pnadr_wrap .edit'), $('#comfirmAddress'), $('#closeFixAddress'), $('.adrdt input[type="text"]'), 'edit_address_active');
}

$(function(){
    upLoad();  //图片上传
    fixName();  //编辑昵称
    fixBrfino();  //编辑简介
    fixAddress();  //编辑地址
})