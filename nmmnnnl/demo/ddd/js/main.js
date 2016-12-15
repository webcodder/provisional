$(function(){
//全屏滑动插件
	$('#dowebok').fullpage({
		sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', '#f90'],
		anchors: ['page1', 'page2', 'page3', 'page4'],
		menu: '#menu',
		'navigation': true,
		afterLoad: function(anchorLink, index){
			if(index == 2){
				$('.section2').find('p').delay(500).animate({
					left: '0'
				}, 1500, 'easeOutExpo');
			}
			if(index == 3){
				$('.section3').find('p').delay(500).animate({
					bottom: '0'
				}, 1500, 'easeOutExpo');
			}
			if(index == 4){
				$('.section4').find('p').fadeIn(2000);
			}
		},
		onLeave: function(index, direction){
			if(index == '2'){
				$('.section2').find('p').delay(500).animate({
					left: '-120%'
				}, 1500, 'easeOutExpo');
			}
			if(index == '3'){
				$('.section3').find('p').delay(500).animate({
					bottom: '-120%'
				}, 1500, 'easeOutExpo');
			}
			if(index == '4'){
				$('.section4').find('p').fadeOut(2000);
			}
		}
	});

//判断设备
	$(document).ready(function(){
		if (navigator.userAgent.match(/IEMobile|BlackBerry|Android|iPod|iPhone|iPad/i)) {
		    window.location.href="mobile";      
		}
	});
	
//console
	console.log(
				"%c%s",
            	"color: red; font-size: 13px;",
            	"学习是一个充实愉悦的过程\n前端更贴近用户，这种体验非常美妙\n热爱FE.D，也热爱一切美好的事物\n行路有良友，便是捷径\n带上我吧，一起看到更大的世界"
            	);
});
