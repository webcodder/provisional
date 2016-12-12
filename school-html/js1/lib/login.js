

BOOMLogging.PV({url: window.location.href,  project: 'school'})
try{
    BOOMLogging.UV({ project: 'school'})
}catch(e){

}


function formcheck(){
    var t = $('input[type="text"]');
    var p = $('input[type="password"]');
    var s = $('input[type="submit"]');
    var e = $(".verror");

    var tval=t.val();
    var pval=p.val();
    subr(tval,pval,e)

}
function subr(t,p,error){
    if(t==""||p==""){
        error.html("请输入账号或密码") 
    }else{
        error.html("") 
        var url=dataport.login;
        login(url,t,p)
        console.log(url)
    }
}

function login(url,t,p) {
    $.ajax({
        url: url,
       
        timeout: 5000,
        type:"POST",


        //提交的数据
        data:{qq:t,password:p},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend:function(){

        },
        //成功返回之后调用的函数             
        success: function(data) {
            sessionStorage.setItem("myLoginInfo",JSON.stringify(data.attachment))  
           loginFunc(data)
           var loginStudent={
                project: 'school',
                studentNum:data.attachment.studentNum,
                classId:data.attachment.classId,
           }

           BOOMLogging.UV(loginStudent)
        },
            complete: function(XMLHttpRequest, textStatus){
               //console.log(XMLHttpRequest.responseText);
               //console.log(textStatus);
                //HideLoading();
            },
        error: function(request) {
            console.log(request);
        }
    }, "json");
}
function loginFunc(data){
    var error=data.error;
    var msg  =data.msg;
    if(error){
        $(".verror").html(msg) 
    }else{
        $('form').fadeOut(500);
        $(".welcome").fadeIn(1000);
        $('.wrapper').addClass('form-success');
          // $.get(dataport.loginTime, function(time){
          //   console.log(time)
          // });

    // $.getScript(dataport.loginTime+"?jsoncallback=12",
    //       function(json){
    // console.log(json)
    //         });

        setTimeout(function(){
            watchFunc.fload()
        },500)
    }

}

$('#login-button').click(function(event) {
    formcheck()
});