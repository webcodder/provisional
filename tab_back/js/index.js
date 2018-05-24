/**
 * 现在有一个需求是，用户点击了后退按钮，需要回到上一次点击的tab栏。
 *
 * 这个需求可以使用history对象进行进行处理。
 *
 * 首先就是history.pushState方法和history.replaceState以及window的popstate对象。
 * 每次history的回退或前进，都会触发popstate事件，所以我们就使用popstate事件做文章。
 *
 * 1、首先，点击tab栏的时候，将点击的tab栏的信息使用pushState方法在history对象中
 * 写入一条新纪录，比如我点击第一个tab栏的时候，就将它的index值写入url的hash中。
 *
 * 2、window上绑定popstate事件，当我点击了后退按钮，触发popstate事件，此时我取出url中的hash值，它
 * 记录着上次点击tab栏的index信息。根据这个index信息处理tab栏的显示与隐藏
 *
 * 大概意思是这样的，但是tab的index信息也不一定要放在url的hash中，也可以放在pushState的第一个参数——state对象中进行处理。
 */


// 添加标签页hash，首次进来时添加hash为p=0.
if (!window.location.hash) {
    history.replaceState(null, null, '#p=0');
}


// 给tab栏绑定点击事件，点击事件处理两件事：显示需要显示的内容，如果tab的index和url中的index信息不同，那么push进入一条新的历史记录。
$('.tablist li').click(function(event) {
    var page_idx = + (window.location.hash && window.location.hash.substr(-1));
    var idx = $(this).index();
    if (page_idx !== idx) {
        history.pushState(null, null, '#p='+idx);
    }
    $('.tablist ul').each(function(ele, idx2) {
        // 处理tab栏样式
        $(ele).find('.tablist li').eq(idx).addClass('active').siblings('.tablist li').removeClass('active');
    });
    // 显示tab对应的内容        
    $('.tabcontent section').eq(idx).show().siblings('.tabcontent section').hide();
    // $('.page').scrollTop(0);
});


// 绑定popstate事件，触发事件后根据url中的tab的index信息进行处理
$(window).on('popstate', function(event) {
    var idx = + (window.location.hash && window.location.hash.substr(-1));
    $('.tablist ul').eq(0).find('li').eq(idx).trigger('click');
});