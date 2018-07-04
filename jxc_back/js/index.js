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
            var objUrl = util.getObjectURL(this.files[0]);
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

                //console.log($(".mrifo_cot").height());

                return false;
            }
        });
    },

    /**
     * [editMerchant 添加]
     * @param {[type]} list     [节点]
     * @param {[type]} form     [表单]
     * @param {[type]} str      [列表内容]
     * @param {[type]} add_btn  [添加按钮]
     * @param {[type]} list_box [列表外容器]
     * @param {[type]} save_btn [保存按钮]
     * @param {[type]} portrait_file [input=file]
     * @param {[type]} portrait_img [img]
     * @param {[type]} txt_wrap [文本编辑容器]
     * @param {[type]} txt_str [文本编辑内容]
     */
    editMerchant: function(list, form, str, add_btn, list_box, 
        save_btn, portrait_file,  portrait_img, txt_wrap , txt_str){
        //显示模态框
        var showedit = function(){
            $('.m-modal').fadeIn();
            form.fadeIn();
            $('body').css('position', 'fixed'); 
        }

        //隐藏模态框
        var hideedit = function(){
            $('.m-modal').fadeOut();
            form.fadeOut();
            $('body').css('position', 'initial');
        }

        //遍历
        list.each(function(i, e){
            //上传图片
            util.upLoad($(this).find(portrait_file), $(this).find(portrait_img));

            //编辑文本
            $(this).delegate('.edit_txt','click',function(){  //事件代理
                util.tabAutoHeight();  //填充高度

                var txt_box = $(e).find(txt_wrap);  //获取当前文本节点
                var old_txt_str = $(e).find(txt_wrap).html();

                //点击编辑之后添加class并将文本内容替换成文本框
                txt_box.addClass('edit_hict_txt');  //添加class
                txt_box.html(txt_str);  //添加文本框

                //确定
                $('.comfirm').click(function(){
                    //console.log($(e));
                    util.tabAutoHeight();  //填充高度
                });

                //撤回
                $('.close').click(function(){
                    txt_box.html(old_txt_str);
                    txt_box.removeClass('edit_hict_txt');
                    util.tabAutoHeight();  //填充高度
                });
            });

            //删除当前节点
            $(this).delegate('.delete_cot','click',function(){
                $(e).remove();
                util.tabAutoHeight();  //填充高度
            });
        });

        //点击添加按钮
        add_btn.click(function(){  
            list_box.prepend(str);  //在列表前添加
            util.tabAutoHeight();  //填充高度
        });

        //点击保存按钮
        save_btn.click(function(){
            hideedit();
        });

        //编辑详情
        $('body').on('click', '.edit_form',  function(){
            showedit();
        });
    }
};

//上传头像
var headPortraitLoad = function(){
    util.upLoad($('#headPortraitFile'), $('#headPortraitImg'));
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

//浏览器滚动条位置
var setnavscroll = function(){
    $(window).scroll(function(){
        var window_top = $(window).scrollTop();
        var div_top = $('.navbar').offset().top;

        if (window_top > div_top) {
            $('.m-bsdnav').addClass('navfix');
            $('.navbar').height($('.m-bsdnav').height());
        } else {
            $('.m-bsdnav').removeClass('navfix');
            $('.navbar').height(0);
        }
    });
}

//商户标签样式
var merchantLabel = function(){
    $('.bus_lab li').click(function(){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
        }else{
            $(this).addClass('active');
        }
    });
}

//商户信息
var submitBusInfo = function(){
    merchantLabel();  //商户标签样式
}

//房源列表
var editHouseList = function(){
    var str = `
        <div class="hult_list">
            <div class="l-box3 hulist_cot f-cb">
                <div class="hict_img f-fl">
                    <img class="room_portrait_img" src="images/room.jpg" alt="room" />
                    <input class="room_portrait_file f-csp" type="file" />
                </div>
                <div class="hict_txt f-fl">
                    <ul>
                        <li>
                            <dl>
                                <dd class="title f-toe">平湖秋月房111</dd>
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
                                    <button class="btn btn1 edit_txt">编辑</button>
                                </dd>
                                <dd>
                                    <button class="btn btn1 edit_form">详情</button>
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

    var txtstr = `
        <ul>
            <li>
                <dl>
                    <dd class="title f-toe">
                        <input name="title" type="text" value="" placeholder="标题" />
                    </dd>
                    <dd class="price">
                        <input name="price" type="text" value="" placeholder="价格" />
                    </dd>
                </dl>
            </li>
            <li class="lab">
                <dl>
                    <dd>
                        <input name="lab1" type="text" value="" placeholder="标签1" />
                    </dd>
                    <dd>
                        <input name="lab2" type="text" value="" placeholder="标签2" />
                    </dd>
                    <dd>
                        <input name="lab3" type="text" value="" placeholder="标签3" />
                    </dd>
                </dl>
            </li>
            <li class="info">
                <dl>
                    <dd>
                        <input name="lab1" type="text" value="" placeholder="标签1" />
                    </dd>
                    <dd>
                        <input name="lab1" type="text" value="" placeholder="标签1" />
                    </dd>
                </dl>
            </li>
            <li class="edit_btn">
                <dl>
                    <dd class="edittxt_btn">
                        <ul>
                            <li class="l-icsiz comfirm">
                                <img src="images/icon/comfirm.png" />
                            </li>
                            <li class="l-icsiz close">
                                <img src="images/icon/close.png" />
                            </li>
                        </ul>
                    </dd>
                    <dd>
                        <button class="btn btn1 edit_form">详情</button>
                    </dd>
                    <dd>
                        <button class="btn btn1 delete_cot">删除</button>
                    </dd>
                </dl>
            </li>
        </ul>
    `;

    util.editMerchant($('.hult_list'), $('#productFrom'), str, $('#addHouseList'), $('.hult_wrap'), 
        $('#productSave'), '.room_portrait_file', '.room_portrait_img', '.hict_txt', txtstr);
}

//主题活动
var editTheme = function(){
   var str = `
        <div class="Theme_list product_list l-bdru l-box1">
            <div class="product_img">
                <img class="theme_portrait_img" src="images/product.jpg" alt="product" />
                <input class="theme_portrait_file f-csp" type="file" />
            </div>
            <div class="l-box3 product_txt">
                <h3 class="title">****</h3>
                <p>
                    *****
                </p>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1 edit_txt">编辑</button>
                            </dd>
                            <dd>
                                <button class="btn btn1 edit_form">详情</button>
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

    var txtstr = `
        <h3 class="title"><input name="title" type="text" placeholder="标题"></h3>
        <p>
            <textarea name="" id="" cols="46" rows="6" placeholder="内容"></textarea>
        </p>
        <ul>
            <li class="edit_btn">
                <dl>
                    <dd class="edittxt_btn">
                        <ul>
                            <li class="l-icsiz comfirm">
                                <img src="images/icon/comfirm.png" />
                            </li>
                            <li class="l-icsiz close">
                                <img src="images/icon/close.png" />
                            </li>
                        </ul>
                    </dd>
                    <dd>
                        <button class="btn btn1 edit_form">详情</button>
                    </dd>
                    <dd>
                        <button class="btn btn1 delete_cot">删除</button>
                    </dd>
                </dl>
            </li>
        </ul>
    `;

    util.editMerchant($('.Theme_list'), $('#productFrom'), str, $('#addTheme'), $('.Theme_wrap'), 
        $('#productSave'), '.theme_portrait_file', '.theme_portrait_img', '.product_txt', txtstr);
}

//地主众筹
var editLandlords = function(){
   var str = `
        <div class="landlords_list product_list l-bdru l-box1">
            <div class="product_img">
                <img class="land_portrait_img" src="images/product.jpg" alt="product" />
                <input class="land_portrait_file f-csp" type="file" />
            </div>
            <div class="l-box3 product_txt">
                <h3 class="title">******</h3>
                <p>
                    *****
                </p>
                <ul>
                    <li class="edit_btn">
                        <dl>
                            <dd>
                                <button class="btn btn1 edit_txt">编辑</button>
                            </dd>
                            <dd>
                                <button class="btn btn1 edit_form">详情</button>
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

    var txtstr = `
        <h3 class="title"><input name="title" type="text" placeholder="标题"></h3>
        <p>
            <textarea name="" id="" cols="46" rows="6" placeholder="内容"></textarea>
        </p>
        <ul>
            <li class="edit_btn">
                <dl>
                    <dd class="edittxt_btn">
                        <ul>
                            <li class="l-icsiz comfirm">
                                <img src="images/icon/comfirm.png" />
                            </li>
                            <li class="l-icsiz close">
                                <img src="images/icon/close.png" />
                            </li>
                        </ul>
                    </dd>
                    <dd>
                        <button class="btn btn1 edit_form">详情</button>
                    </dd>
                    <dd>
                        <button class="btn btn1 delete_cot">删除</button>
                    </dd>
                </dl>
            </li>
        </ul>
    `;

    util.editMerchant($('.landlords_list'), $('#productFrom'), str, $('#addLandlords'), $('.landlords_wrap'), 
        $('#productSave'), '.land_portrait_file', '.land_portrait_img', '.product_txt', txtstr);
}

//土特产品
var editlocalProduct = function(){
    var str = `
        <div class="localpodt_list product_list l-bdru">
            <div class="product_img">
                <img class="localpodt_portrait_img" src="images/product.jpg" alt="product" />
                <input class="localpodt_portrait_file f-csp" type="file" />
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
                                <button class="btn btn1 edit_txt">编辑</button>
                            </dd>
                            <dd>
                                <button class="btn btn1 edit_form">详情</button>
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

    var txtstr = `
        <h3 class="title">
            <input name="title" type="text" placeholder="标题" />
        </h3>
        <ul class="label">
            <li>
                <input name="lab1" type="text" placeholder="标签1" />
            </li>
            <li>
                <input name="lab1" type="text" placeholder="标签2" />
            </li>
        </ul>
        <ul class="priinfo">
            <li class="price">
                <input name="newprice" type="text" placeholder="优惠价格" />
            </li>
            <li class="old_price">
                <input name="oldprice" type="text" placeholder="原价" />
            </li>
            <li class="num">
                <input name="num" type="text" placeholder="数量" />
            </li>
        </ul>
        <ul>
            <li class="edit_btn">
                <dl>
                    <dd class="edittxt_btn">
                        <ul>
                            <li class="l-icsiz comfirm">
                                <img src="images/icon/comfirm.png" />
                            </li>
                            <li class="l-icsiz close">
                                <img src="images/icon/close.png" />
                            </li>
                        </ul>
                    </dd>
                    <dd>
                        <button class="btn btn1 edit_form">详情</button>
                    </dd>
                    <dd>
                        <button class="btn btn1 delete_cot">删除</button>
                    </dd>
                </dl>
            </li>
        </ul>
    `;

    util.editMerchant($('.localpodt_list'), $('#productFrom'), str, $('#addLocalProduct'), $('.localpodt_wrap'), 
        $('#productSave'), '.localpodt_portrait_file', '.localpodt_portrait_img', '.product_txt', txtstr);
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

var edt = function(){
    var E = window.wangEditor;
    var formEditor = new E('#formEditorToolbar', '#formEditorContent');
    formEditor.customConfig.uploadImgShowBase64 = true;  // 使用 base64 保存图片  

    formEditor.create();
}

$(function(){
    headPortraitLoad();  //上传头像
    fixName();  //编辑昵称
    fixBrfino();  //编辑简介
    fixAddress();  //编辑地址
    mrifoTab();  //选项卡
    setnavscroll();  //nav置顶

    submitBusInfo();  //商户信息
    
    editHouseList();  //房源列表
    editTheme();  //主题活动
    editLandlords();  //地主众筹
    editlocalProduct();  //土特产品

    submitEditor();  // 提交图文详情 (富文本 wangEditor)

    edt();
});