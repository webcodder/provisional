//公共工具方法
util = {
    /**
     * [setnavscroll 浏览器滚动条位置]
     * @param  {[type]} navbar [nav上填充高度]
     * @param  {[type]} nav    [nav内容]
     * @param  {[type]} navfix [nav上添加的class]
     * @return {[type]}        0
     */
    setnavscroll: (navbar, nav, navfix) => {
        var window_top = $(window).scrollTop();
        var div_top = navbar.offset().top;

        if (window_top > div_top) {
            nav.addClass(navfix);
            navbar.height(nav.height());
        } else {
            nav.removeClass(navfix);
            navbar.height(0);
        }
    },

    /**
     * modal
     */
    //showLoding
    showLoding: () => {
        $('.m-modal').show();
        $('.loading').show();
    },
    //hideLoding
    hideLoding: () => {
        $('.m-modal').hide();
        $('.loading').hide();
    },
};

//页面工具方法
const tip = () =>{
	//nav
    $('.list_menu li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //自动触发点击事件
    $('#tab2').trigger("click");
};

//nav置顶
const setnavscroll = () => {
    util.setnavscroll($('.navbar'), $('.list_menu'), 'list_menu_fix');
};

//ajax
const handleData = {
    // url: "http://api8084.ximuok.com/admin",
    url: "http://10.10.10.238:8090/admin/",

    login: () => {
        $.ajax({
            type: "POST",
            url: handleData.url + "user/login",
            data:{
                username: "admin",
                password: "21232f297a57a5a743894a0e4a801fc3"
            },
            datatype: "JSON",
            success: res => {
                console.log(res);
            },
            error: res => {
                console.log(res);
            }
        })
    },

    tab: () => {
        //点击t1
        $('#tab1').click(() => {
            handleData.login();  //登录

            util.showLoding();  //加载loading

            $.ajax({
                type:"POST",
                url: handleData.url + "item/findList",
                dataType:"json",
                success: (res) => {
                    util.hideLoding();

                    console.log(res);

                    // let str = "";
                    // let data = res.data;
                    //
                    // for (let i=0; i<data.length; i++){
                    //     console.log(data[i]);
                    //     str += `
                    //         <a href="${data[i].url}">
                    //             <div class="wrap">
                    //                 <div class="icon_wrap f-pr">
                    //                     <div class="icon">
                    //                         <img src="${data[i].img}" alt="test">
                    //                     </div>
                    //                 </div>
                    //                 <div class="text_wrap f-pr">
                    //                     <div class="text">
                    //                         <ul>
                    //                             <li>
                    //                                 <span class="t1">${data[i].title}</span>
                    //                             </li>
                    //                             <li>
                    //                                 <span class="t2">${data[i].info}</span>
                    //                             </li>
                    //                             <li>
                    //                                 <span class="t2">申请人数<b>${data[i].people}</b>人</span>
                    //                             </li>
                    //                         </ul>
                    //                     </div>
                    //                     <div class="arrow">
                    //                         <img src="images/icon_rightarrow_gray.png" alt="arrow">
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </a>
                    //     `;
                    // }
                    //
                    // $('.container').html(str);
                },
                err: res => {
                    console.log(res);
                }
            });
        });

        //点击t2
        $('#tab2').click(() => {
            util.showLoding();  //加载loading

            $.ajax({
                url: "json/test.json",
                type:"get",
                dataType:"json",
                success: (res) => {
                    util.hideLoding();

                    let str = "";
                    let data = res.data;

                    for (let i=0; i<data.length; i++){
                        str += `
                            <a href="${data[i].url}">
                                <div class="wrap">
                                    <div class="icon_wrap f-pr">
                                        <div class="icon">
                                            <img src="${data[i].img}" alt="test">
                                        </div>
                                    </div>
                                    <div class="text_wrap f-pr">
                                        <div class="text">
                                            <ul>
                                                <li>
                                                    <span class="t1">${data[i].title}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">${data[i].info}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">申请人数<b>${data[i].people}</b>人</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="arrow">
                                            <img src="images/icon_rightarrow_gray.png" alt="arrow">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                    }

                    $('.container').html(str);
                },
                err: res => {
                    console.log(res);
                }
            });
        });

        //点击t3
        $('#tab3').click(() => {
            util.showLoding();  //加载loading

            $.ajax({
                url: "json/test.json",
                type:"get",
                dataType:"json",
                success: (res) => {
                    util.hideLoding();

                    let str = "";
                    let data = res.data;

                    for (let i=0; i<data.length; i++){
                        str += `
                            <a href="${data[i].url}">
                                <div class="wrap">
                                    <div class="icon_wrap f-pr">
                                        <div class="icon">
                                            <img src="${data[i].img}" alt="test">
                                        </div>
                                    </div>
                                    <div class="text_wrap f-pr">
                                        <div class="text">
                                            <ul>
                                                <li>
                                                    <span class="t1">${data[i].title}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">${data[i].info}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">申请人数<b>${data[i].people}</b>人</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="arrow">
                                            <img src="images/icon_rightarrow_gray.png" alt="arrow">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                    }

                    $('.container').html(str);
                },
                err: res => {
                    console.log(res);
                }
            });
        });
    }
}

//滚动条滚动的时候加载
$(window).scroll(function(){
    setnavscroll();  //nav置顶
});

//选项卡数据加载
const tab = ()=> {
    // alert();
}

$(function(){
    setnavscroll();  //浏览器滚动条位置
    handleData.tab()  //选项卡数据加载
    tip();  //页面工具方法
});