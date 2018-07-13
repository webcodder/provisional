/**
 * @fileoverview A page of edit
 * author zmx2321@163.com
 * data 2018/6/8
 */

//index工具方法
var indexUtil = {
    /**
     * [editMerchant 添加]
     * @param {[type]} add_btn  [添加按钮]
     * @param {[type]} str [list添加内容]
     * @param {[type]} list_box [列表外容器]
     * @param {[type]} list     [节点]
     */
    editMerchant: function(add_btn, str, list_box, list){

        //显示模态框
        var showModal = {
            show: function(){
                $('.m-modal').fadeIn();  //显示遮罩层
                $('body').addClass('f-oh');  //overflow
            },

            showPronameModal: function(){
                this.show();
                $('.proname').fadeIn();  //显示产品名称内容
            },

            showImageLoad: function(){
                this.show();
                $('.image_load').fadeIn();  //显示图片上传内容
            }
        }

        //隐藏模态框
        var hideModal = {
            hide: function(){
                $('.m-modal').fadeOut();  //隐藏遮罩层
                $('body').removeClass('f-oh');  //overflow
            },

            hidePronameModal: function(){
                this.hide();
                $('.proname').fadeOut();  //隐藏产品名称内容
            },

            hideImageLoad: function(){
                this.hide();
                $('.image_load').fadeOut();  //隐藏图片上传内容
            }
        }

        //点击添加按钮
        add_btn.click(function(){
            showModal.showPronameModal();
        });

        //删除节点
        $('.delete_cot').click(function(){
            list.remove();
            indexUtil.tabAutoHeight();  //填充高度
        });

        //验证产品名称文本框
        function checkProname(){
            var proname = $('.proname').find('input[name="proname"]').val();
            if(proname == ''){
                util.tipInfo("产品名称不能为空！");
            }else{
                hideModal.hidePronameModal();
                list_box.prepend(str);  //在列表前添加
                indexUtil.tabAutoHeight();  //填充高度
                list.find('.title').text(proname);
            }
        }

        //点击模态框隐藏所有内容
        $('.m-modal').click(function(){
            hideModal.hidePronameModal();
            hideModal.hideImageLoad();
        });

        //上传图片
        $('.img_mask').click(function(){
            showModal.showImageLoad();
        });

        //点击模态框保存按钮
        $('#pronameSave').click(function(){
            checkProname();
        });

        //点击关闭按钮隐藏图片上传模态框
        $('.image_load .close').click(function(){
            hideModal.hideImageLoad();
        });
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

//图片上传
var imgUpload = function(){
    var id = $('#imgUploadCont');
    var url = "/upload";

    util.imgUpLoad(id, url);
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

//上传头像
var headPortraitLoad = function(){
    //util.SingleImgUpLoad($('#headPortraitFile'), $('#headPortraitImg'));
}

//编辑昵称
var fixName = function(){
    util.fixInfo($('#editNickName'), $('.pnfo_nickname span'), $('#NickName'), 
        $('.pnfo_prtifo .edit'), $('#comfirmFixName'), $('#closeFixName'), 
        $('.pnfo_prtifo'), 'edit_name_active');
}

//编辑简介
var fixBrfino = function(){
    util.fixInfo($('#editBrfino'), $('.pnfo_brfino span'), $('#brfino'), 
        $('.pnfo_brfino .edit'), $('#comfirmBrfino'), $('#closeBrfino'), 
        $('.pnfo_brfino'), 'edit_brfino_active');
}

//编辑地址
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

//商户标签
var merchantLabel = function(){
    $('.bus_lab li').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
}

//商户类型
var merchantStyle = function(){
    $('.bus_style li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
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
var editHouseList = function(){
    var str = `
        <div class="hult_list">
            <div class="l-box3 hulist_cot f-cb">
                <div class="hict_img f-fl">
                    <img class="room_portrait_img" src="images/default.png" alt="room" />
                    <div class="img_mask active">
                        <h3 class="f-ptr1 f-fs1">点击修改</h3>
                    </div>
                </div>
                <div class="hict_txt f-fl">
                    <ul>
                        <li>
                            <dl>
                                <dd class="title f-toe">平湖秋月房</dd>
                                <dd class="price">¥200</dd>
                            </dl>
                        </li>
                        <li class="lab">
                            <dl>
                                <dd>20m</dd>
                                <dd>大床</dd>
                                <dd>2-3层</dd>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd>可以马上入住</dd>
                                <dd>还剩10间</dd>
                            </dl>
                        </li>
                        <li class="edit_btn">
                            <dl>
                                <dd>
                                    <button class="btn btn1" onclick="location.href='houseList.html'">编辑</button>
                                </dd>
                                <dd>
                                    <button class="btn btn1 delete_cot">删除</button>
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    indexUtil.editMerchant($('#addHouseList'), str, $('.hult_wrap'), $('.hult_list'));
}

//主题活动
var editTheme = function(){
   var str = `
        <div class="Theme_list product_list l-bdru l-box1">
            <div class="product_img">
                <img class="theme_portrait_img" src="images/default.png" alt="product" />
                <div class="img_mask">
                    <h3 class="f-ptr1 f-fs1">点击上传</h3>
                </div>
                <!-- <input class="theme_portrait_file f-csp" type="file" /> -->
            </div>
            <div class="l-box3 product_txt">
                <h3 class="title">晴天雨后——玩主题</h3>
                <p>
                    云和晴天雨后民宿座落在800多年的古村落，村子四周被满山遍野的翠竹，bhdskcnjdskcnsjkcnsjk宿座落在800多年的古村落，宿座落在800多年的古村落
                </p>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1" onclick="location.href='theme.html'">编辑</button>
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

    indexUtil.editMerchant($('#addTheme'), str, $('.Theme_wrap'), $('.Theme_list'));
}

//地主众筹
var editLandlords = function(){
   var str = `
        <div class="landlords_list product_list l-bdru l-box1">
            <div class="product_img">
                <img class="land_portrait_img" src="images/default.png" alt="product" />
                <div class="img_mask active">
                    <h3 class="f-ptr1 f-fs1">点击修改</h3>
                </div>
            </div>
            <div class="l-box3 product_txt">
                <h3 class="title">晴天雨后——做地主</h3>
                <p>
                    云和晴天雨后民宿座落在800多年的古村落，村子四周被满山遍野的翠竹，bhdskcnjdskcnsjkcnsjk宿座落在800多年的古村落，宿座落在800多年的古村落
                </p>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1" onclick="location.href='landlords.html'">编辑</button>
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

    indexUtil.editMerchant($('#addLandlords'), str, $('.landlords_wrap'), $('.landlords_list'));
}

//土特产品
var editlocalProduct = function(){
    var str = `
        <div class="localpodt_list product_list l-bdru">
            <div class="product_img">
                <img class="localpodt_portrait_img" src="images/default.png" alt="product" />
                <div class="img_mask">
                    <h3 class="f-ptr f-fs1">点击上传</h3>
                </div>
            </div>
            <div class="product_txt localpodt_txt">
                <h3 class="title">****</h3>
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
                                <button class="btn btn1" onclick="location.href='localProduct.html'">编辑</button>
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

    indexUtil.editMerchant($('#addLocalProduct'), str, $('.localpodt_wrap'), $('.localpodt_list'));
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
    headPortraitLoad();  //上传头像
    imgUpload();  //图片上传
    fixName();  //编辑昵称
    fixBrfino();  //编辑简介
    fixAddress();  //编辑地址

    mrifoTab();  //选项卡

    submitBusInfo();  //提交商户信息
    submitEditor();  // 提交图文详情 (富文本 wangEditor)
    
    editHouseList();  //房源列表
    editTheme();  //主题活动
    editLandlords();  //地主众筹
    editlocalProduct();  //土特产品
});