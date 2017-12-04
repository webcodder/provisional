// 加载页面公共部分
var loadHtml = function(){
    // header
    $('.g-hd').load('common/lib/header.html');

    // footer
    $('.g-ft').load('common/lib/footer.html');
}

$(function(){
    loadHtml();
});