$(function(){
	$(".bind_input li").click(function(){
		$(this).addClass("bind_input_on").siblings().removeClass("bind_input_on");
		var binput_dd = $(this).find("dd:first");
		if
		($(binput_dd).hasClass("bid_name")){
			$("#bid_name").attr("src","images/a02.png");
			$("#bid_sele").attr("src","images/a03.png");
		}
		else if
		($(binput_dd).hasClass("bid_sele"))
		{
			$("#bid_name").attr("src","images/a01.png");
			$("#bid_sele").attr("src","images/a04.png");
		}
	});


	//表单验证
	var ok1=false;
    var ok2=false;
    var ok3=false;
    //验证用户名
    $('input[name="username"]').focus(function(){
    	
    });

    //验证密码
    $('input[name="password"]').focus(function(){
    	
    });

    function loginSubmit(){
    	$("#loginSubmit").click(function(){
	    	if(ok1 && ok2){
	            $('#bind_input').submit();
	        }else{
	            return false;
	        }
    	});
    }
    
	//键盘回车登录
	document.onkeydown = function(e){ 
		var ev = document.all ? window.event : e;
		if(ev.keyCode==13) {
		   /*$('#loginSubmit').submit();*/ //处理事件
		   loginSubmit();
		}
	}
});