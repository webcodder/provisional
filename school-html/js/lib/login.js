



if ((navigator.userAgent.indexOf('QQBrowser') >= 0) 
    && (navigator.userAgent.indexOf('Chrome') < 0)){
    alert('目前不支持此浏览模式')
}
function myBrowser(){
     var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
     var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
     var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
     var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
     var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
     var isChrome = userAgent.indexOf("Chrome") > -1; //判断是否Safari浏览器
     if (isIE) {
         var IE9=false;
         var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
         reIE.test(userAgent);
         var fIEVersion = parseFloat(RegExp["$1"]);
         // alert(fIEVersion)
         IE9 = fIEVersion >= 9.0;
         if (!IE9) {

             return "IE9";
         }

     }//isIE end

     if (isFF) {
         return "FF";
     }
     if (isChrome) {
         return "Chrome";
     }
     if (isSafari) {
         return "Safari";
     }
     if (isOpera) {
         return "Opera";
     }
 }//myBrowser() end

 if (myBrowser() == "IE9") {
 }


try{
    BOOMLogging.PV({url: window.location.href,  project: 'school'})
}catch(e){

}

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
        // console.log(url)
    }
}

function login(url,t,p) {
    $.ajax({
        url: url,
       
        timeout: 5000,
        type:"POST",
        // contentType: 'application/json;charset=UTF-8',
        data:{qq:t,password:p},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text"
        //在请求之前调用的函数
        beforeSend:function(){

        },
        //成功返回之后调用的函数             
        success: function(data) {
            if(data.error){
                
                $(".verror").html(data.msg)
                setTimeout(function(){
                    $(".verror").html('')
                },2000)
            }

//            if(!data.attachment.headImage){
//            data.attachment.headimg=localPath.defaultimg+"defaultIco.png"
//            }else{
//                data.attachment.headimg=dataport.headimg+data.attachment.headImage
//           }
            localStorage.setItem("myLoginInfo",JSON.stringify(data.attachment))  
           loginFunc(data)
           var loginStudent={
                project: 'school',
                studentNum:data.attachment.studentNum,
                classId:data.attachment.classId,
           }
           try{
                BOOMLogging.UV(loginStudent)
           }catch(e){

           }

           
        },
            complete: function(XMLHttpRequest, textStatus){
            },
        error: function(request) {
            alert("登录失败")
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


        setTimeout(function(){
            watchFunc.fload()
        },500)
    }

}

$('#login-button').click(function(event) {
    formcheck()
});

/* ---------------- 随机数处理 ---------------------  */

qqCheck=function(arr){
    return new qqCheck.fn.init(arr);
}
qqCheck.fn=qqCheck.prototype={
    constructor:qqCheck,

    random:function(arr){
        var len=arr.length;
        var i=this.pow(arr)
        return Math.floor(Math.random()*Math.pow(10,i))
    },
    newArr:function(arr){
        var len=arr.length;
        var i=this.pow(arr);
        var j=Math.ceil(Math.pow(10,i)/len)
        var str=""
        var s=arr+","
        for(;j>0;j--){
            str+=s
        }
        var nArr=str.replace(/,+$/,'').split(",")
        return nArr
    },
    pow:function(arr){
        var len=arr.length;
        var i=0;
        while(Math.ceil(len/Math.pow(10,i))>1){
            i++
        }
        return i
    }

}

qqCheck.fn.nVal=function(arr){
    return qqCheck.fn.newArr(arr)[qqCheck.fn.random(arr)]
}
qqCheck.fn.init=function(arr){
    this.nVal=qqCheck.fn.nVal(arr)
}

var qqArr=[365499355,3466645416,1954887266,2186606270,2773776325 ]

var newqq=qqCheck(qqArr).nVal


if($(window).width()<800){

    $(".toqq").attr({
        // href:"tencent://message/?uin="+newqq+"&amp;Site=&amp;Menu=yes",
        href:"http://wpa.qq.com/msgrd?v=3&uin="+newqq+"&site=qq&menu=yes",
        target:"_blank"
    })
}else{
    $(".toqq").attr({
        href:"tencent://message/?uin="+newqq+"&amp;Site=&amp;Menu=yes",

    })
}



/* ---------------- 随机数处理 ---------------------  */
