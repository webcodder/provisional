/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//工具方法
var util = {
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

    /**
     * [upLoad description 图片上传]
     * @param  {[type]} file [input type=file id]
     * @param  {[type]} img  [img id]
     * @return {[type]}      [0]
     */
    upLoad: function(file, img){
        file.change(function() {
            var objUrl = this.getObjectURL(this.files[0]);
            if (objUrl) {
                img.attr("src", objUrl);
            }
        }); 
    },

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

            info_input.focus();  //给输入框聚焦，移动端自动弹出键盘
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

    //选项卡自适应高度
    tabAutoHeight: function(){
        $('#mrifoTab li').each(function(){
            if($(this).hasClass('active')){
                $(".mrifo_cot").css("height", $('.moftab_itm').eq($(this).index()).css("height"));
                $(".mrifo_wrap").css("height", $('.moftab_itm').eq($(this).index()).css("height"));
            }
        });
    },

    /**
     * 添加商户
     * [addMerchant 商户类型]
     * @param {[type]} merchant [description]
     */
    addMerchant: function(merchant){
        merchant.click(function(){
            var str = `
                <div class="mrctdl_list"></div>
            `;
            merchant.parent().find('.mrctdl_wrap').append(str);

            util.tabAutoHeight();
        });
    }
};

//上传头像
var headPortraitLoad = function(){
    util.upLoad($('#headPortraitFile'), $('#headPortraitImg'));
}

//编辑昵称
var fixName = function(){
    util.fixInfo($('#editNickName'), $('.pnfo_nickname span'), $('#NickName'), $('.pnfo_prtifo .edit'), $('#comfirmFixName'), $('#closeFixName'),$('.pnfo_prtifo'), 'edit_name_active');
    
    /*var thisFun = new util.fixInfo($('#editNickName'), $('.pnfo_nickname span'), $('#NickName'), $('.pnfo_prtifo .edit'), $('#comfirmFixName'), $('#closeFixName'),$('.pnfo_prtifo'), 'edit_name_active');
    util.fixInfo.prototype.newFun = function(){
        alert(1);
    };
    thisFun.newFun();*/
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

//选项卡
var mrifoTab = function(){
    util.tabAutoHeight();  //选项卡当前active高度填充为swiperg高度
    $(window).resize(function() {
        util.tabAutoHeight();
    });

    /**
     * swiper高度自适应
     * [mirAutoHeight swiper高度自适应]
     * @param  {[type]} i       [索引]
     * @param  {[type]} mribtn  [选项卡按钮]
     * @param  {[type]} tabitm  [内容主体部分]
     * @param  {[type]} slide   [内容主体外部盒子]
     * @param  {[type]} swipwap [swiper盒子]
     * @param  {[type]} swipcot [swiper主体部分]
     * @return {[type]}         [description]
     */
    function mirAutoHeight(i, mribtn, tabitm, slide, swipwap, swipcot){
        mribtn.removeClass('active').eq(i).addClass('active');

        var tabitm = tabitm.eq(i);

        swipwap.css("height", tabitm.height());  //swiper-wrapper高度
        swipcot.css("height", tabitm.height());  //swiper-container高度
    }

    // 滑动
    var mrifoTabSwiper = new Swiper('.mrifo_wrap', {
        onTransitionEnd: function (swiper) {
            mirAutoHeight(mrifoTabSwiper.activeIndex, $('#mrifoTab li'), $(".moftab_itm"), $(".mrifo_cot .swiper-slide"), $(".mrifo_cot"), $(".mrifo_wrap"));

        }
    })
    // 列表切换
    $('#mrifoTab li').on('click', function (e) {
        mirAutoHeight($(this).index(), $('#mrifoTab li'), $(".moftab_itm"), $(".mrifo_cot .swiper-slide"), $(".mrifo_cot"), $(".mrifo_wrap"));
        mrifoTabSwiper.slideTo($(this).index(), 200, false);
    });
}

//wangEditor
var textEditor = function(){
    /*var E = window.wangEditor
    var editor = new E('#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.create()*/
        var E = window.wangEditor
    var editor = new E('#editor')
    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
}

$(function(){
    headPortraitLoad();  //上传头像
    fixName();  //编辑昵称
    fixBrfino();  //编辑简介
    fixAddress();  //编辑地址
    mrifoTab();  //选项卡

    util.addMerchant($('#addHomestay'));  //添加特色民宿
    util.addMerchant($('#addCountryside'));  //添加美丽乡村
    util.addMerchant($('#addSpot'));  //添加景区乐园
    util.addMerchant($('#addFarm'));  //添加生态农场

    textEditor();  //wangEditor
})