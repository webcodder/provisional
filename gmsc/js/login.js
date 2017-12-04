//登录验证
var checkLogin = function(){
	var usersReg = /^[A-Za-z0-9_]+$/g,	//a-z、0-9和下划线
		passwordReg = /^.{6,}$/g;	//至少6个字符

	function checkLogin(id, reg){
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

	//用户名
	checkLogin($('#users'), usersReg);

	//密码
	checkLogin($('#password'), passwordReg);
}

//提交登录信息
var login = function(){
	$('#loginBtn').click(function(){
		alert();
	});
}

$(function(){
	checkLogin();	//登录
	login();	//登录验证
});