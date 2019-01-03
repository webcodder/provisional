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
};

//页面工具方法
const tip = () =>{
	//nav
    $('.list_menu li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });
};

//nav置顶
const setnavscroll = () => {
    util.setnavscroll($('.navbar'), $('.list_menu'), 'list_menu_fix');
};

//滚动条滚动的时候加载
$(window).scroll(function(){
    setnavscroll();  //nav置顶
});

$(function(){
	tip();  //页面工具方法
    setnavscroll();  //浏览器滚动条位置
});