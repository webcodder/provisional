//用户协议
loadtxt = function(){
	$('.rgt_r p').load('source/xy.txt');
}

//注册验证
var checkRegister = function(){
    var usersReg = /^[A-Za-z0-9_]+$/,  //a-z、0-9和下划线
        passwordReg = /^.{6,}$/,   //至少6个字符
        emailReg = /(^.+)@(.{3,})\.com$/,   //邮箱
        nameReg = /^[A-Za-z]+$/,    //必须为英文字母
        normalReg = /^.+/;  //不能为空

    function checkRegister(id, reg){
        //用户名
        id.blur(function(){
            if(!reg.test($(this).val())){
                $(this).css('borderColor', '#f00');
                $(this).parent().next().css('color', '#f00');
            } else {
                $(this).css('borderColor', '#000');
            }
        })
    }

    //姓名
    checkRegister($('#firstName'), nameReg);
    checkRegister($('#lastName'), nameReg);

    //用户名
    checkRegister($('#users'), usersReg);

    //密码
    checkRegister($('#password'), passwordReg);

    //再次输入密码
    checkRegister($('#password2'), normalReg);

    //邮箱
    checkRegister($('#eMail'), emailReg);
}

//重置
var reset = function(){
	$('#resetBtn').click(function(){
		$('input[type="text"]').val('');
        $('input[type="text"]').css('borderColor', '#ccc');
        $('input[type="text"]').parent().next().css('color', '#000');
	});
}

//提交注册信息
var register = function(){
	$('#submitBtn').click(function(){
		alert();
	});
}

//上传照片
var upload = function(){
	function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }

    $("#file0").change(function() {
        var objUrl = getObjectURL(this.files[0]);
        if (objUrl) {
            $("#img0").attr("src", objUrl);
        }
    });   
}



$(function(){
	loadtxt();	//用户协议
    checkRegister() //注册验证
	upload();	//上传照片
	reset();	//重置
	register();	//提交注册信息
});