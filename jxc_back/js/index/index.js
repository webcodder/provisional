/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//index工具方法
var indexUtil = {
    listBox : null, //
    addMethod : null, //调用动态生成str方法

    //隐藏模态框所有内容
    hideAll: function(){
        util.hide();  //隐藏模态窗时公用
        $('.image_load').fadeOut();  //隐藏图片上传内容
        $('.proname').fadeOut();  //隐藏产品名称内容
    },

    //显示产品名称输入窗口
    showPronameModal: function(){
        util.show();  //显示模态窗时公用
        $('.proname').fadeIn();  //显示产品名称内容
    },

    //隐藏产品名称输入窗口
    hidePronameModal: function(){
        util.hide();  //隐藏模态窗时公用
        $('.proname').fadeOut();  //隐藏产品名称内容
    },

    //选项卡自适应高度
    tabAutoHeight: function(){
        function tabAutoHeight(){
            $('#mrifoTab li').each(function(){
                if($(this).hasClass('active')){
                    $(".mrifo_cot").css("height", $('.moftab_itm').eq($(this).index()).css("height"));
                    $(".mrifo_wrap").css("height", $('.moftab_itm').eq($(this).index()).css("height"));

                    return false;
                }
            });
        }

        setTimeout(function () { 
            tabAutoHeight();  //填充高度
        }, 30);
    },
}

//点击按钮
var btnOperation = function(){
    //点击模态框背景隐藏模态框所有内容
    $('.m-modal').click(function(){
        indexUtil.hideAll();
    });

    //点击添加产品按钮+
    $('.mrctdl_add').click(function(){
        //显示产品名称输入窗口
        indexUtil.showPronameModal();
        
        indexUtil.listBox = $(this).parent().find('.add_product_wrap');
        indexUtil.addMethod = $(this).attr("method");
    });

    //点击模态框保存按钮
    $('#pronameSave').click(function(){
        var productName = $('.proname').find('input[name="proname"]').val();
        if(productName == ''){
            util.tipInfo("产品名称不能为空！");
        }else{
            
            ajaxSaveProduct(productName); //ajax保存新增产品信息
        }
    });
}

//ajax保存新增产品信息
function ajaxSaveProduct(productName){
	//ajax请求返回成功
    //$.ajax()
    var productId = 1;

    indexUtil.hidePronameModal();
    
    //字符串转对象
    var str = "";
    if(indexUtil.addMethod=="editHouseList") {
    	str = editHouseList(productId,productName);
    }
    else if(indexUtil.addMethod=="editTheme") {
    	str = editTheme(productId,productName);
    }
    else if(indexUtil.addMethod=="editLandlords") {
    	str = editLandlords(productId,productName);
    }
    else if(indexUtil.addMethod=="editlocalProduct") {
    	str = editlocalProduct(productId,productName);
    }
    
    indexUtil.listBox.prepend(str);  //在列表前添加
    indexUtil.tabAutoHeight();  //填充高度
}

//nav置顶
var setnavscroll = function(){
    util.setnavscroll($('.navbar'), $('.m-bsdnav'), 'navfix');
}

//选项卡
var mrifoTab = function(){
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
            mirAutoHeight(mrifoTabSwiper.activeIndex, $('#mrifoTab li'), $(".moftab_itm"), $(".mrifo_cot .swiper-slide"), 
                $(".mrifo_cot"), $(".mrifo_wrap"));
        }
    })
    
    // 列表切换
    $('#mrifoTab li').on('click', function (e) {
        mirAutoHeight($(this).index(), $('#mrifoTab li'), $(".moftab_itm"), $(".mrifo_cot .swiper-slide"), 
            $(".mrifo_cot"), $(".mrifo_wrap"));
        mrifoTabSwiper.slideTo($(this).index(), 200, false);
    });
}

//编辑商户名称
var fixName = function(){
    util.fixInfo($('#editNickName'), $('.pnfo_nickname span'), $('#NickName'), 
        $('.pnfo_prtifo .edit'), $('#comfirmFixName'), $('#closeFixName'), 
        $('.pnfo_prtifo'), 'edit_name_active');
}

//编辑商户简介
var fixBrfino = function(){
    util.fixInfo($('#editBrfino'), $('.pnfo_brfino span'), $('#brfino'), 
        $('.pnfo_brfino .edit'), $('#comfirmBrfino'), $('#closeBrfino'), 
        $('.pnfo_brfino'), 'edit_brfino_active');
}

//编辑商户地址
var fixAddress = function(){
    //点击地址开始选择地址
    $('#addressDetail span').click(function(){
        getProvinceBuy();  //选择地址
        $('body').addClass('f-oh');
        $('.addressModal').fadeIn();
        $('.m-select_address').slideDown();
    });

    //点击遮罩隐藏地址选择
    $('.addressModal').click(function(){
        $('body').removeClass('f-oh');
        $(this).fadeOut();
        $('.m-select_address').slideUp();
    });

    util.fixInfo($('#editAddress'), $('#addressDetail span'), $('#address'), 
        $('.pnadr_wrap .edit'), $('#comfirmAddress'), $('#closeFixAddress'), 
        $('.adrdt input[type="text"]'), 'edit_address_active');
}

//商户类型
var merchantStyle = function(){
    util.selSingleClass($('.bus_style li'));
}

//商户标签
var merchantLabel = function(){
    util.selMultipleClass($('.bus_lab li'));
}

//提交商户信息
var submitBusInfo = function(){
    merchantLabel();  //商户标签
    merchantStyle();  //商户类型
}

// 提交图文详情 (富文本 wangEditor)
var submitEditor = function (){
    var E = window.wangEditor
    var editor = new E('#editorToolbar', '#editorContent')
    editor.customConfig.uploadImgShowBase64 = true  // 使用 base64 保存图片  

    editor.create();

    $('#editorTextSave').click(function(){
        var content = editor.txt.html();  // 读取 html

        if(content==""){  
            alert('请把内容填写完整！');  
            return false;  
        }  
          
         $.ajax({  
            type : "post",  
            url : "/upload",  
            data : {
                "content" : content  
            },  
            success : function(res) {  
                alert('保存成功!');
                editor.txt.clear();  //清空编辑器内容
            },  
            error : function(data) {  
                alert('保存失败！');  
            }  
        }); 
    });   
}

//房源列表
var editHouseList = function(productId,productName){
    var str = `
        <div class="hult_list" product_id="${productId}">
            <div class="l-box3 hulist_cot f-cb">
                <div class="hict_img f-fl">
                    <img class="room_portrait_img" src="/jxc/static/wechat/admin/images/default.png" alt="room" />
                    <div class="img_mask">
                        <h3 class="f-ptr1 f-fs1">点击上传</h3>
                    </div>
                </div>
                <div class="hict_txt f-fl">
                    <ul>
                        <li>
                            <dl>
                                <dd class="title f-toe">${productName}</dd>
                                <dd class="price">¥-</dd>
                            </dl>
                        </li>
                        <li class="lab">
                            <dl>
                                <dd><!--标签1--></dd>
                                <dd><!--标签2--></dd>
                                <dd><!--标签3--></dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd><!--可以马上入住--></dd>
                                <dd><!--还剩10间--></dd>
                            </dl>
                        </li>
                        <li class="edit_btn">
                            <dl>
                                <dd>
                                    <button class="btn btn1" onclick="location.href='houseList.html?product_id=${productId}'">编辑</button>
                                </dd>
                                <dd>
                                    <button class="btn btn1 delete_cot" product_id="${productId}">删除</button>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    return str;
}

//主题活动
var editTheme = function(productId,productName){
   var str = `
        <div class="Theme_list product_list l-bdru l-box1" product_id="${productId}">
            <div class="product_img">
                <img class="theme_portrait_img" src="/jxc/static/wechat/admin/images/default.png" alt="product" />
                <div class="img_mask">
                    <h3 class="f-ptr1 f-fs1">点击上传</h3>
                </div>
                <!-- <input class="theme_portrait_file f-csp" type="file" /> -->
            </div>
            <div class="l-box3 product_txt">
                <h3 class="title">${productName}</h3>
                <p>
                    云和晴天雨后民宿座落在800多年的古村落，村子四周被满山遍野的翠竹，bhdskcnjdskcnsjkcnsjk宿座落在800多年的古村落，宿座落在800多年的古村落
                </p>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1" onclick="location.href='theme.html?product_id=${productId}'">编辑</button>
                            </dd>
                            <dd>
                                <button class="btn btn1 delete_cot" product_id="${productId}">删除</button>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
    `;

    return str;
}

//地主众筹
var editLandlords = function(productId,productName){
   var str = `
        <div class="landlords_list product_list l-bdru l-box1">
            <div class="product_img">
                <img class="land_portrait_img" src="/jxc/static/wechat/admin/images/default.png" alt="product" />
                <div class="img_mask active">
                    <h3 class="f-ptr1 f-fs1">点击修改</h3>
                </div>
            </div>
            <div class="l-box3 product_txt">
                <h3 class="title">${productName}</h3>
                <p>
                    云和晴天雨后民宿座落在800多年的古村落，村子四周被满山遍野的翠竹，bhdskcnjdskcnsjkcnsjk宿座落在800多年的古村落，宿座落在800多年的古村落
                </p>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1" onclick="location.href='landlords.html?product_id=${productId}'">编辑</button>
                            </dd>
                            <dd>
                                <button class="btn btn1 delete_cot">删除</button>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
    `;

    return str;
}

//土特产品
var editlocalProduct = function(productId,productName){
    var str = `
        <div class="localpodt_list product_list l-bdru">
            <div class="product_img">
                <img class="localpodt_portrait_img" src="/jxc/static/wechat/admin/images/default.png" alt="product" />
                <div class="img_mask">
                    <h3 class="f-ptr f-fs1">点击上传</h3>
                </div>
            </div>
            <div class="product_txt localpodt_txt">
                <h3 class="title">${productName}</h3>
                <ul class="label">
                    <li>**</li>
                    <li>**</li>
                </ul>
                <ul class="priinfo">
                    <li class="price">¥*</li>
                    <li class="old_price">¥*</li>
                    <li class="num">剩余*件</li>
                </ul>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1" onclick="location.href='localProduct.html?product_id=${productId}'">编辑</button>
                            </dd>
                            <dd>
                                <button class="btn btn1 delete_cot">删除</button>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
        </div>
    `;

    return str;
}

//窗口大小改变时加载
$(window).on('resize', function(){
    indexUtil.tabAutoHeight();  //填充高度
});

//滚动条滚动的时候加载
$(window).scroll(function(){
    setnavscroll();  //nav置顶
});

$(function(){
    btnOperation();  //点击按钮

    fixName();  //编辑商户名称
    fixBrfino();  //编辑商户简介
    fixAddress();  //编辑商户地址

    mrifoTab();  //选项卡

    submitBusInfo();  //提交商户信息
    submitEditor();  // 提交图文详情 (富文本 wangEditor)
});

//加载完数据之后加载
/*$(window).load(function(){
    indexUtil.tabAutoHeight();  //填充高度
});*/