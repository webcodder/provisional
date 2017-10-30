//切换图片
var changePicture = function(){
	$('#changePicture li').click(function(){
		$(this).addClass('on').siblings().removeClass('on');
		var imgURL = $(this).find('img').attr("src");
		var imgName = imgURL.substring(imgURL.indexOf("/") + 1,
            imgURL.indexOf("."));
		$(".cpc_big").find('a').attr("href", "images/" + imgName + "_big.jpg");
		$(".cpc_big").find('img').attr("src", "images/" + imgName + "_big.jpg");
	});
}

//放大镜
var prdMagnifier = function(){
    var x=10;
    var y=20;
    $('#prdMagnifier a').mouseover(function(e){
        this.myTitle = this.title;
        this.title = '';
        var imgTitle = this.myTitle ? '<br/>' + this.myTitle : '';
        var tooltip = "<div id='tooltip'><img src='"+ this.href +"' />" + imgTitle + "<\/div>";
        $('body').append(tooltip);
        $('#tooltip').css({
            'top': (e.pageY+y) + 'px',
            'left':  (e.pageX+x)  + 'px'
        }).show('fast');
    }).mouseout(function(){
        this.title = this.myTitle;
        $('#tooltip').remove();
    }).mousemove(function(e){
        $('#tooltip').css({
            'top': (e.pageY+y) + 'px',
            'left':  (e.pageX+x)  + 'px'
        });
    });
}

$(function(){
	prdMagnifier();	//放大镜
	changePicture();	//切换图片
});