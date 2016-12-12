/*
 *Author:liaohs
 *Date:2015.12.31
 *Name:boomgame
 */



// if ((navigator.userAgent.indexOf('MSIE') >= 0) 
//     && (navigator.userAgent.indexOf('Opera') < 0)){
//     alert('目前不支持IE浏览器')
// }
// try{
// 	if(JSON.parse(localStorage.myLoginInfo).growthServiceOpen){
// 		$("li[code='growth']").show()
// 	}
// }catch(e){}



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




 if(navigator.userAgent.indexOf("MSIE") > -1){
    // alert()
    $(".isIe").hide()
 }








var htmlpath = window.location.href;
//console.log(htmlpath)
var htmlname = htmlpath.substring(htmlpath.lastIndexOf('/') + 1, htmlpath.length);
var html = htmlname.split(".html")[0];
var htmlref=htmlname.split(".html")[1];
var html1 = html.split("-")[0];
var htmlobj = {
    "load": {
        title: "登录",
        ico: ""
    },
    "login": {
        title: "登录",
        ico: ""
    },
    "class-notice": {
        title: "公告",
        ico: "fa fa-bullhorn"
    },
    "class-service": {
        title: "布姆服务",
        ico: "fa fa-tachometer"
    },
    "one-to-one": {
        title: "一对一教学",
        ico: "fa fa-tachometer"
    },
    "teacher": {
        title: "老师详情",
        ico: "icon-user"
    },
    "sign-up": {
        title: "预约",
        ico: "fa fa-tachometer"
    },
    "ssj": {
        title: "生死局",
        ico: "fa fa-tachometer"
    },
    "comment": {
        title: "教学评价",
        ico: "fa fa-tachometer"
    },
    "study-record": {
        title: "学习记录",
        ico: "fa  fa-list-alt"
    },
    "small-game": {
        title: "训练小游戏",
        ico: "icon-game-controller"
    },
    "small-game1": {
        title: "训练小游戏",
        ico: "icon-game-controller"
    },
    "class-list": {
        title: "课程目录",
        ico: "fa fa-book"
    },
    "class-mates": {
        title: "我的班级",
        ico: "fa fa-users"
    },
    "class-rank": {
        title: "风云榜",
        ico: "fa fa-users"
    },
    "class-myhomepage": {
        title: "",
        ico: "fa fa-user"
    },
    "class-download": {
        title: "资料下载",
        ico: "fa fa-download"
    },
    "active": {
        title: "学院活动",
        ico: "fa fa-flag-o"
    },
    "active-module": {
        title: "学院活动",
        ico: "fa fa-flag-o"
    },
    "about": {
        title: "关于boom",
        ico: "fa fa-exclamation-circle"
    },
    "fload": {
        title: "首次登录",
        ico: "fa fa-exclamation-circle"
    },
    "boomTv": {
        title: "boomTv",
        ico: "fa fa-exclamation-circle"
    },
    "growth": {
        title: "学员提升计划",
        ico: "fa fa-signal"
    },

};

var data_basePath = "data";
var lib_data_Path = data_basePath + "/lib/" + html + "/";
var public_data_Path = data_basePath + "/public/";

var localPath={}
    localPath.rankimg="./images/public/rank/"; //段位图片
    localPath.championimg="./images/public/champion/";//英雄图片
    localPath.defaultimg="./images/public/default/"; //默认图片
    localPath.teacherimg="./images/teachers/"; //老师图片





/*portPart*/
if(htmlpath.match("http://127.0.0.1:8888/schoolFront/")){
    var publicport = "http://127.0.0.1:8888/school/";
}else if(htmlpath.match("http://school.iboom.tv/school/")){
    var publicport = "http://school.iboom.tv/school/"
}else if(htmlpath.match("http://test.iboom.tv/school/")){
    var publicport = "http://test.iboom.tv/school/"
}


var dataport={};   
    dataport.login=publicport+"auth/login.do"; //publicport+"auth/login.do?qq="+t+"&password="+p 登录
    dataport.logout=publicport+"auth/logout.do"; //退出
    dataport.updatePwd=publicport+"boomStudentControl/updatePwd.do" //修改密码
    dataport.floginsummoner=publicport+"boomStudentControl/getTierQueueInfo.do" //首次登录召唤师验证
    dataport.floginsubmit=publicport+"boomStudentControl/updateStudentInfo.do" //首次登录提交
    dataport.secoundSubmit=publicport+"boomStudentControl/updateStudentExtendInfo.do" //第二次提交


    dataport.pwd=publicport+"boomStudentControl/updatePwd.do"  //boomStudentControl/updatePwd.do?newPassword=dddddd&oldPassword=1111111111111111 //修改密码
    dataport.headimg="http://static.iboom.tv/static/img/" //头像图片 上传图片地址
    dataport.imgUrl=dataport.headimg;
    dataport.activityimg="http://static.iboom.tv/static/activity/" //活动图片

    dataport.userStatue=publicport+"auth/userStatue.do"; //登录状态
    dataport.classnotice=publicport+"boomBulletinControl/list.do"; //class-notice
    dataport.classlist=publicport+"boomWeek/getClassCourse.do"; //class-list  ?classId=1
    dataport.allclass=publicport+"boomWeek/getFirstSemesterAllClass.do"; //所有班级
    dataport.classmates=publicport+"boomClass/getMyBoomClass.do" //class-mates
    dataport.classmatesA=publicport+"classmate/getClassmateGrowthRecord.do?studentId=" //class-mates-ability
    //class-myhomepage
    dataport.mybaseInfo=publicport+"my/getMyHomePageData.do"//基础信息
    dataport.hisbaseInfo=publicport+"classmate/getUserHomePageData.do?studentId=" //classmate/getUserHomePageData.do?studentId=1
    dataport.mygrowInfo=publicport+"my/getMyGrowthRecord.do" //成长
    dataport.hisgrowInfo=publicport+"classmate/getClassmateGrowthRecord.do?studentId="
    dataport.mygameInfo=publicport+"my/acqMyAchievement.do" //游戏统计
    dataport.hisgameInfo=publicport+"classmate/acqClassmateAchievement.do?studentId="
    dataport.mylolInfo=publicport+"my/getMyLolInfo.do" //英雄数据
    dataport.hislolInfo=publicport+"classmate/getClassmateLolInfo.do?studentId="
    dataport.mypraiseInfo=publicport+"my/praise.do?studentId=" //点赞

    dataport.classdownload=publicport+"boomFileControl/list.do"; //class-download
    dataport.classdownloadF=publicport+"boomFileControl/download.do?type=file&fileName="; //class-download-file
    dataport.classactivity =publicport+"boomActivity/myClassActivities.do";  //active

    //class-rank
    dataport.rank_class=publicport+"tierQueueAnnunciation/getMyClassMates.do" //班级段位榜
    dataport.rank_school=publicport+"tierQueueAnnunciation/getSchoolClassMates.do" //全校段位榜
    dataport.grow_week=publicport+"weekGrowthAnnunciation/getWeekGrowthAnnunciation.do" //周成长榜
    dataport.grow_month=publicport+"monthGrowthAnnunciation/getMonthGrowthAnnunciation.do" //月成长榜
    dataport.grow_quarter=publicport+"quarterGrowthAnnunciation/getQuarterGrowthAnnunciation.do" //季成长榜
    dataport.count_week=publicport+"weekSCountAnnunciation/getWeekSCountAnnunciation.do" //周场次榜
    dataport.count_month=publicport+"monthSCountAnnunciation/getMonthSCountAnnunciation.do" //月场次榜
    dataport.champion=publicport+"dataInterface/champion/getChampionRankAll.do" //英雄榜

    dataport.loginTime= "http://logging.iboom.tv/nowTime"

    /*one to one
    ========================================================*/
    dataport.calendarNow=publicport+"boot/oneToOne/applyCalendar" //申请日历 当前
    dataport.calendarOther=publicport+"boot/oneToOne/applyCalendarByDate" //申请日历 其他
    dataport.applyOnetoOne=publicport+"boot/oneToOne/apply" //一对一教学预约申请
    dataport.onetooneAllteachers=publicport+"boot/oneToOne/teachWellEvaluateArchive" // 所有老师
    dataport.teachersComments=publicport+"boot/oneToOne/teachEvaluateSpecific" ////对老师的所有评论
    dataport.serviceIsOpen=publicport+"boot/oneToOne/serviceIsOpen " //  预约功能是否开放
    dataport.applyStatue=publicport+"boot/oneToOne/applyStatue"  //预约状态
    dataport.evaluateByStudent=publicport+"boot/oneToOne/evaluateByStudent" //学生发表评论
    dataport.applyPraise=publicport+"boot/oneToOne/applyPraise" //评论点赞 studentNum,applyId
    dataport.teacherCalendar=publicport+"boot/oneToOne/teacherCalendar.do"  // 一对一教学老师列表

    dataport.getAllteachers=publicport+"teacher/getAllTeacherInfo.do" // 获取所有老师
    
    /*one to one
    ========================================================*/

    /*学习记录
    ========================================================*/
    dataport.getStudyRecord=publicport+"boot/studyRecord/getStudyRecord" //获取一对一教学记录 studentNum
    dataport.getVideoWatchRecord=publicport+"boot/studyRecord/getVideoWatchRecord" // 获取历史视频观看记录  studentNum
    dataport.addVideoRecord=publicport+"boot/studyRecord/addVideoRecord" // 添加观看记录 studentNum studyName
    dataport.ssjApplyList=publicport+"boot/ssj/applyList"   // 生死局历史列表
    /*学习记录
    ========================================================*/

    dataport.teacherSpecific=publicport+"boot/oneToOne/teachEvaluateSpecificByTeacherId?teacherId=" // 老师的评论 teacherId {page,size}

    dataport.getRankList=publicport+"boot/rank/getRankList" //获取游戏排名
    dataport.getRankPosition=publicport+"boot/rank/getRankPosition?studentNum=" // 获取我的排名

    dataport.updateHead=publicport+"boomStudentControl/updateHead.do" //上传头像

   /*成长计划
    ========================================================*/
    dataport.growthPlan=publicport+"growthPlan/detail.do"
    dataport.growthEvaluates=publicport+"growthPlan/detail/confirm.do" //成长计划
    dataport.getChampionVideo=publicport+"boomWeek/getChampionVideo.do?championId=" // 视频列表
    dataport.growthPlanInfo=publicport+"growthPlan/info.do"  // 成长信息


    /*生死局
    ========================================================*/
    dataport.ssjIsOpen=publicport+"boot/sjj/serviceIsOpen"   // 服务是否开启
    dataport.ssjTeacherWell=publicport+"boot/sjj/teachWellEvaluateArchive"   // 老师好评度
    dataport.ssjTeachersEvaluate=publicport+"boot/sjj/teachEvaluateSpecific?"   // 总体评论列表 page=?&size=?
    dataport.ssjTeacherEvaluate=publicport+"boot/sjj/teachEvaluateSpecificByTeacherId?"   //老师页面的评论列表 teacherId=?&page=?&size=? 
    dataport.ssjApply=publicport+"boot/sjj/apply?areaName="   // 提交申请
    dataport.ssjApplyStatue=publicport+"boot/sjj/applyStatue"   // 获取当前学员状态
    dataport.ssjEvaluateByStudent=publicport+"boot/sjj/evaluateByStudent?"   // id=?&evaluate=?&score=?&photo[0]=?&photo[1]=?
    dataport.ssjApplyCount=publicport+"boot/sjj/applyCount"   //  一共完成了几次生死局
    
    dataport.ssjApplyPraise=publicport+"boot/sjj/applyPraise"   //点赞
    dataport.ssjApplyCancel=publicport+"boot/sjj/cancel?id="    // 取消生死局预 id=申请的ID

    dataport.ssjUpload=publicport+"admin/upload" //上传图片



var publicFunc={};
    publicFunc.noresponse=function(){
       // window.location.href = "404.html"
        window.location.href = "login.html"
    } //no-response
    publicFunc.nologined=function(){
        window.location.href = "login.html"

    } //no-logined
    publicFunc.time=10000; //请求时间



var watchFunc={};

    watchFunc.logined=(function(){

        if (html != "login") {
            $.ajax({
                url: dataport.userStatue+"?_="+(new Date()).getTime(),
                type: "get",
                timeout: publicFunc.time,
                contentType: 'application/json;charset=UTF-8',
                datatype:"json",
                success: function(data) {

                    if(data.logined){ //在登录状态
                        var pv={
                            url:htmlpath.split("?")[0],
                            studentNum:data.auth.studentNum,
                            classId:data.auth.classId,
                            project: 'school'

                        }
                        actionObj={
                            studentNum:data.auth.studentNum,
                            classId:data.auth.classId,
                            project: 'school'   
                        }
                        try{BOOMLogging.PV(pv)  }catch(e){}
                        
                        
                        if (data.growthServiceOpen) {
                            $("li[code='growth']").css("display", "block")
                            
                            $("#growthLi").show()
                        }else{
                            $("li[code='growth']").css("display", "none")
                            $("#growthLi").hide()
                        }

                        
                        
                        //console.log("在登录状态")
                        headpart(data.auth)
                        cmtm(data.auth) 
                        var myhomepageHref="class-myhomepage.html?my="+data.auth.studentId;
                        $("li[code='class-myhomepage']>a").attr("href",myhomepageHref)

                        $("li[code='class-rank']>a").attr("href","class-rank.html?"+data.auth.studentId+"&"+data.auth.nowIndex)

                            //返回主页
                        $(".tomyhome").attr({"href":myhomepageHref})



                         //设置myhomepage参数
                         if(data.fload){

                         }else{
                            if(window.location.pathname=="/school/fload.html"){

                            }else{
                                window.location.href="fload.html"
                            }
                         }
                    }else{ //未在登录状态

                        publicFunc.nologined()
                    }
                },
                error: function(request) {
                    console.log(request);  
                    publicFunc.noresponse()
                }
            }, "json");
        }else{
             $.ajax({
                url: dataport.userStatue,
                type: "get",
                timeout: publicFunc.time,
                contentType: 'application/json;charset=UTF-8',
                datatype:"json",
                success: function(data) {
                        if(data.logined){
                            
                            var nowhref=window.location.href.substring(0,htmlpath.lastIndexOf('/') + 1);
                            var topage=nowhref+"class-notice.html"
                            window.location.href=topage
                        }
                    }
                });
        }
    })();//to allhtml:not loginhtml

    watchFunc.fload=function(){
        $.ajax({
            url: dataport.userStatue,
            type: "get",
            timeout: publicFunc.time,
            contentType: 'application/json;charset=UTF-8',
            datatype:"json",
            success: function(data) {

                
                if(!data.fload){ //首次登录
                    window.location.href = "fload.html"

                }else{ //
                    window.location.href="class-notice.html"
                }
            },
            error: function(request) {
                // console.log(request);  
            }
        }, "json");
    };//to loginhtml

    watchFunc.iflogin=function(data,nextFunc){

        if(data.logined== undefined){
            nextFunc(data) //nextFunc
        }else{
            if (html != "login") {
                publicFunc.nologined()
            }
        }
    };//to Other
    watchFunc.iflogined = function(){

        $.ajax({
            url: dataport.userStatue,
            type: "get",
            timeout: publicFunc.time,
            contentType: 'application/json;charset=UTF-8',
            datatype:"json",
            success: function(data) {

                if(data.logined){ //在登录状态

                    // console.log(data)
                }else{ //未在登录状态
                    publicFunc.nologined()
                }
            },
            error: function(request) {
                // console.log(request);  
                publicFunc.noresponse()
            }
        }, "json");    
    };//验证是否在登录状态


    function headpart(data) {
        var headico = function() {
            if (data.headImage == null || data.headImage == "") {
                return localPath.defaultimg+"defaultIco.png"
            } else {
                return dataport.headimg + data.headImage
            }
        }()
        $(".myheadico").attr("src", headico)
        $(".myname").html(data.summoner)
        $(".myarea").html(data.areaName)
        $(".tologin").click(function() {

                setTimeout(function(){
                    $.ajax({
                        url: dataport.logout,
                        type: "post",
                        timeout: publicFunc.time,
                        // contentType: 'application/json;charset=UTF-8',
                        datatype:"json",
                        success: function(data) {
                            if (!data.error && data.errorCode == null) {
                                if (html != "login") {
                                    // alert(data.msg)


                                    publicFunc.nologined()
                                }
                            } else {
                                
                            }
                        },
                        error: function(request) {
                            // console.log(request);
                            publicFunc.noresponse()
                        }
                    }, "json");
                },500)
                

        }) //退出
    }

    function cmtm(data) {
        if (html == "class-mates") {
            var id = data.studentId
            $("#linkme").attr({
                "href": "#to" + id,
            }).html(data.nowIndex)
        }
    } 
    // class-mates-me

$(function() {
    $("li[code='" + html1 + "']").addClass("active")
    $("li[code='" + html + "']").addClass("active")
    $("#pagetitle>span").html(htmlobj[html].title)
    $("#pagetitle>i").addClass(htmlobj[html].ico)
    if(html=="class-myhomepage"){
        if (htmlref.lastIndexOf("his")>-1) {
            $("li[code='class-myhomepage']").removeClass("active")
        } //hishomepage
    }

    $("nav a").click(function(e) {
        var href = $(this).attr("href");
        actionObj.actionName=$(this).attr("txt");
        try{BOOMLogging.Action(actionObj)}catch(e){}
        

        if(href.match(/http|https/i)){
            window.open(href)
        }
        else{
            if(href.lastIndexOf(".html") > -1) window.location.href = href
        } 
    })
    $("nav li").click(function(e) {

        $("nav li[code='feedback'] a").css({
            color:"#fff"
        })
    })
    $("nav li[code='feedback'] a").css({
        color:"#fff"
    })
})  //navclass


var pwdObj = {};
pwdObj.oldpwd = ""
pwdObj.n1pwd = ""
pwdObj.n2pwd = ""

$(function() {
    var oldpwd = $("#oldpwd");
    var n1pwd = $("#n1pwd");
    var n2pwd = $("#n2pwd");
    var errorpwd = $("#errorpwd");
    var cancelpwd = $("#cancelpwd");
    var comfirmpwd = $("#comfirmpwd");
    var eyepwd = $("#eyepwd");
    var pwdObj={};
    var pwdArr=[];

    [oldpwd, n1pwd, n2pwd].forEach(function(v, i) { //修改密码
        v.on("keyup", function(e) {
            errorpwd.html("");
            var val = watchpwd(v)
            pwdObj[v.attr("id")] = val
            pwdArr = [
                pwdObj.oldpwd,
                pwdObj.n1pwd,
                pwdObj.n2pwd
            ]
            if (pwdArr[0].length > 0 && pwdArr[1].length > 5 && pwdArr[2].length > 5) {
                comfirmpwd.removeClass("disabled btn-danger")
                    .addClass("btn-success")
                    .on("click", function() {
                        // console.log("on")

                        var oval=oldpwd.val();
                        var n1val=n1pwd.val();
                        var n2val=n2pwd.val();

                        if (n1val != n2val) {
                            errorpwd.html("新密码不一致")
                        } else  {
                            //var url = dataport.updatePwd + "?newPassword=" + n1val + "&oldPassword=" + oval;
                            var url = dataport.updatePwd;
                            ajaxFunc(url,n1val,oval)
                        }
                    })
                    .attr("title", "")

            } else {
                comfirmpwd.addClass("disabled btn-danger")
                    .removeClass("btn-success")
                    .off("click")
                    .attr("title", "新密码长度少于6位")
            }

        })
    })

    function ajaxFunc(url,n,o) {
        $.ajax({
            url: url,
           
            timeout: publicFunc.time,
            type:"POST",
            //提交的数据
            data:{newPwd:n,oldPwd:o},

            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            //在请求之前调用的函数
            beforeSend:function(){

            },
            // contentType: 'application/json;charset=UTF-8',
            //成功返回之后调用的函数             
            success: function(data) {
                if (data.error) {
                    errorpwd.html(data.msg)
                } else {
                    errorpwd.html("修改密码成功！")
                    setTimeout(function() {
                        publicFunc.nologined()
                    }, 500)
                }
            },
            complete: function(XMLHttpRequest, textStatus){
               //console.log(XMLHttpRequest.responseText);
               //console.log(textStatus);
                //HideLoading();
            },
            error: function(request) {
                // console.log(request);
            }
        }, "json");
    }
    // ajaxFunc(url)
    eyepwd.click(function() {
        [oldpwd, n1pwd, n2pwd].forEach(function(v, i) {
            if (v.attr("type") == "password") {
                v.attr("type", "text")
                eyepwd.attr("class", "fa fa-eye-slash")
            } else {
                v.attr("type", "password")
                eyepwd.attr("class", "fa fa-eye")
            }
        })
    })
    // eyepwd.click
    function watchpwd(parameter) {
        var val=parameter.val().replace(/\s/gi, "")
        parameter.val(val)
        return val
    }
})
// jquery
// modifypwd

// angular  
var mainApp = angular.module("mainApp", ['ngAnimate']); //定义mainApp

mainApp.directive('onFinishRenderFilters', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
}); // 判断angular是否渲染完毕 data-ng-repeat  加上on-finish-render-filters


var topObj={
    h:0,
    h1:0,
    h2:0,
    dh:0,
    speed:0,
    time1:0,
    time2:0,
    dt:0,
    topTopshow:false,
    wh:window.innerHeight
}


mainApp.controller('gotop', ['$scope', function($scope) {      
        $scope.topObj=topObj
        $scope.touchStart = function() {
            topObj.h=topObj.h1=$("body").scrollTop()
            topObj.speed=0
            topObj.time1=new Date().getTime()
            topObj.direction=""
            
            topObj.wh=window.innerHeight
            
           
        }
        $scope.touchEnd = function() {
            topObj.h2=$("body").scrollTop()
            topObj.time2=new Date().getTime()
            topObj.dt=(topObj.time2-topObj.time1)/1000+"s"
            topObj.dh=topObj.h2-topObj.h1
            topObj.speed=Math.abs(Math.ceil(topObj.dh*1000/(topObj.time2-topObj.time1)))
            if(topObj.dh>50||topObj.h2<topObj.wh*0.5){
                topObj.direction="向下"
                topObj.topTopshow=false
            }if(topObj.dh<-50&&topObj.h2>topObj.wh*0.5){
                topObj.direction="向上"
                topObj.topTopshow=true


            }

            
        }


        $scope.touchMove = function() {

            topObj.h2=$("body").scrollTop()
            topObj.dh=topObj.h2-topObj.h1
           
            if(topObj.dh>50||topObj.h2<topObj.wh*0.5){
                topObj.direction="向下"
                topObj.topTopshow=false
                
            }
            if(topObj.dh<-50&&topObj.h2>topObj.wh*0.5){
                topObj.direction="向上"
                topObj.topTopshow=true

            }
        }

        $scope.gotop=function($timeout ){
            topObj.topTopshow=false 
            var time1=Math.ceil(topObj.h2/10);
            $("body").animate({
                scrollTop:0
            },time1,function(){
                // console.log('2016/2/23 13:49' ,Date.parse( '2016/2/23 13:49'))
                // console.log('2016-2-23 13:49',Date.parse( '2016-2-23 13:49'))
            })
        }


    }]).directive('myTouchstart', [function() {
        return function(scope, element, attr) {
            element.on('touchstart', function(event) {
                scope.$apply(function() { 
                    scope.$eval(attr.myTouchstart); 
                });
            });
        };
    }]).directive('myTouchmove', [function() {
        return function(scope, element, attr) {
            element.on('touchmove', function(event) {
                scope.$apply(function() { 
                    scope.$eval(attr.myTouchmove); 
                });
            });
        };
    }]).directive('myTouchend', [function() {
        return function(scope, element, attr) {
            element.on('touchend', function(event) {
                scope.$apply(function() { 
                    scope.$eval(attr.myTouchend); 
                });
            });
        };
    }]);

 // areadata 
var areaArr = [{"version":0,"id":1,"name":"艾欧尼亚","code":"电信一","net":"电信"},{"version":0,"id":3,"name":"祖安","code":"电信二","net":"电信"},{"version":0,"id":4,"name":"诺克萨斯","code":"电信三","net":"电信"},{"version":0,"id":5,"name":"班德尔城","code":"电信四","net":"电信"},{"version":0,"id":7,"name":"皮尔特沃夫","code":"电信五","net":"电信"},{"version":0,"id":8,"name":"战争学院","code":"电信六","net":"电信"},{"version":0,"id":10,"name":"巨神峰","code":"电信七","net":"电信"},{"version":0,"id":11,"name":"雷瑟守备","code":"电信八","net":"电信"},{"version":0,"id":13,"name":"裁决之地","code":"电信九","net":"电信"},{"version":0,"id":14,"name":"黑色玫瑰","code":"电信十","net":"电信"},{"version":0,"id":15,"name":"暗影岛","code":"电信十一","net":"电信"},{"version":0,"id":17,"name":"钢铁烈阳","code":"电信十二","net":"电信"},{"version":0,"id":18,"name":"水晶之痕","code":"电信十三","net":"电信"},{"version":0,"id":19,"name":"均衡教派","code":"电信十四","net":"电信"},{"version":0,"id":22,"name":"影流","code":"电信十五","net":"电信"},{"version":0,"id":23,"name":"守望之海","code":"电信十六","net":"电信"},{"version":0,"id":24,"name":"征服之海","code":"电信十七","net":"电信"},{"version":0,"id":25,"name":"卡拉曼达","code":"电信十八","net":"电信"},{"version":0,"id":27,"name":"皮城警备","code":"电信十九","net":"电信"},{"version":0,"id":2,"name":"比尔吉沃特","code":"网通一","net":"网通"},{"version":0,"id":6,"name":"德玛西亚","code":"网通二","net":"网通"},{"version":0,"id":9,"name":"弗雷尔卓德","code":"网通三","net":"网通"},{"version":0,"id":12,"name":"无畏先锋","code":"网通四","net":"网通"},{"version":0,"id":16,"name":"恕瑞玛","code":"网通五","net":"网通"},{"version":0,"id":20,"name":"扭曲丛林","code":"网通六","net":"网通"},{"version":0,"id":26,"name":"巨龙之巢","code":"网通七","net":"网通"},{"version":0,"id":21,"name":"教育网专区","code":"教育网","net":"教育"}];
var areaObj = {"1":{"version":0,"id":1,"name":"艾欧尼亚","code":"电信一","net":"电信"},"2":{"version":0,"id":2,"name":"比尔吉沃特","code":"网通一","net":"网通"},"3":{"version":0,"id":3,"name":"祖安","code":"电信二","net":"电信"},"4":{"version":0,"id":4,"name":"诺克萨斯","code":"电信三","net":"电信"},"5":{"version":0,"id":5,"name":"班德尔城","code":"电信四","net":"电信"},"6":{"version":0,"id":6,"name":"德玛西亚","code":"网通二","net":"网通"},"7":{"version":0,"id":7,"name":"皮尔特沃夫","code":"电信五","net":"电信"},"8":{"version":0,"id":8,"name":"战争学院","code":"电信六","net":"电信"},"9":{"version":0,"id":9,"name":"弗雷尔卓德","code":"网通三","net":"网通"},"10":{"version":0,"id":10,"name":"巨神峰","code":"电信七","net":"电信"},"11":{"version":0,"id":11,"name":"雷瑟守备","code":"电信八","net":"电信"},"12":{"version":0,"id":12,"name":"无畏先锋","code":"网通四","net":"网通"},"13":{"version":0,"id":13,"name":"裁决之地","code":"电信九","net":"电信"},"14":{"version":0,"id":14,"name":"黑色玫瑰","code":"电信十","net":"电信"},"15":{"version":0,"id":15,"name":"暗影岛","code":"电信十一","net":"电信"},"16":{"version":0,"id":16,"name":"恕瑞玛","code":"网通五","net":"网通"},"17":{"version":0,"id":17,"name":"钢铁烈阳","code":"电信十二","net":"电信"},"18":{"version":0,"id":18,"name":"水晶之痕","code":"电信十三","net":"电信"},"19":{"version":0,"id":19,"name":"均衡教派","code":"电信十四","net":"电信"},"20":{"version":0,"id":20,"name":"扭曲丛林","code":"网通六","net":"网通"},"21":{"version":0,"id":21,"name":"教育网专区","code":"教育网","net":"教育"},"22":{"version":0,"id":22,"name":"影流","code":"电信十五","net":"电信"},"23":{"version":0,"id":23,"name":"守望之海","code":"电信十六","net":"电信"},"24":{"version":0,"id":24,"name":"征服之海","code":"电信十七","net":"电信"},"25":{"version":0,"id":25,"name":"卡拉曼达","code":"电信十八","net":"电信"},"26":{"version":0,"id":26,"name":"巨龙之巢","code":"网通七","net":"网通"},"27":{"version":0,"id":27,"name":"皮城警备","code":"电信十九","net":"电信"}};
var areaId = [{"id_1":{"version":0,"id":1,"name":"艾欧尼亚","code":"电信一","net":"电信"}},{"id_3":{"version":0,"id":3,"name":"祖安","code":"电信二","net":"电信"}},{"id_4":{"version":0,"id":4,"name":"诺克萨斯","code":"电信三","net":"电信"}},{"id_5":{"version":0,"id":5,"name":"班德尔城","code":"电信四","net":"电信"}},{"id_7":{"version":0,"id":7,"name":"皮尔特沃夫","code":"电信五","net":"电信"}},{"id_8":{"version":0,"id":8,"name":"战争学院","code":"电信六","net":"电信"}},{"id_10":{"version":0,"id":10,"name":"巨神峰","code":"电信七","net":"电信"}},{"id_11":{"version":0,"id":11,"name":"雷瑟守备","code":"电信八","net":"电信"}},{"id_13":{"version":0,"id":13,"name":"裁决之地","code":"电信九","net":"电信"}},{"id_14":{"version":0,"id":14,"name":"黑色玫瑰","code":"电信十","net":"电信"}},{"id_15":{"version":0,"id":15,"name":"暗影岛","code":"电信十一","net":"电信"}},{"id_17":{"version":0,"id":17,"name":"钢铁烈阳","code":"电信十二","net":"电信"}},{"id_18":{"version":0,"id":18,"name":"水晶之痕","code":"电信十三","net":"电信"}},{"id_19":{"version":0,"id":19,"name":"均衡教派","code":"电信十四","net":"电信"}},{"id_22":{"version":0,"id":22,"name":"影流","code":"电信十五","net":"电信"}},{"id_23":{"version":0,"id":23,"name":"守望之海","code":"电信十六","net":"电信"}},{"id_24":{"version":0,"id":24,"name":"征服之海","code":"电信十七","net":"电信"}},{"id_25":{"version":0,"id":25,"name":"卡拉曼达","code":"电信十八","net":"电信"}},{"id_27":{"version":0,"id":27,"name":"皮城警备","code":"电信十九","net":"电信"}},{"id_2":{"version":0,"id":2,"name":"比尔吉沃特","code":"网通一","net":"网通"}},{"id_6":{"version":0,"id":6,"name":"德玛西亚","code":"网通二","net":"网通"}},{"id_9":{"version":0,"id":9,"name":"弗雷尔卓德","code":"网通三","net":"网通"}},{"id_12":{"version":0,"id":12,"name":"无畏先锋","code":"网通四","net":"网通"}},{"id_16":{"version":0,"id":16,"name":"恕瑞玛","code":"网通五","net":"网通"}},{"id_20":{"version":0,"id":20,"name":"扭曲丛林","code":"网通六","net":"网通"}},{"id_26":{"version":0,"id":26,"name":"巨龙之巢","code":"网通七","net":"网通"}},{"id_21":{"version":0,"id":21,"name":"教育网专区","code":"教育网","net":"教育"}}];


// lolhero
// {id:"136",ename:"AurelionSol",title:"铸星龙王",cname:"奥瑞利安索尔",pic:"AurelionSol_Square_0.png"}}
// 202:{id:"202",ename:"Jhin",title:"戏命师",cname:"烬",pic:"Jhin_Square_0.png"}
// lolArr=[{"img":"Annie.png","name":"黑暗之女","title":"安妮","tags":["Mage"],"id":"1","code":"Annie"},
//     {"img":"AurelionSol.png","name":"奥瑞利安索尔","title":"铸星龙王","tags":["Mage"],"id":"136","code":"AurelionSol"},
//     {"img":"Jhin.png","name":"烬","title":"戏命师","tags":["Mage"],"id":"202","code":"Jhin"},
//     {"img":"Olaf.png","name":"狂战士","title":"奥拉夫","tags":["Fighter","Tank"],"id":"2","code":"Olaf"},{"img":"Galio.png","name":"哨兵之殇","title":"加里奥","tags":["Tank","Mage"],"id":"3","code":"Galio"},{"img":"TwistedFate.png","name":"卡牌大师","title":"崔斯特","tags":["Mage"],"id":"4","code":"TwistedFate"},{"img":"XinZhao.png","name":"德邦总管","title":"赵信","tags":["Fighter","Assassin"],"id":"5","code":"XinZhao"},{"img":"Urgot.png","name":"首领之傲","title":"厄加特","tags":["Marksman","Fighter"],"id":"6","code":"Urgot"},{"img":"Leblanc.png","name":"诡术妖姬","title":"乐芙兰","tags":["Assassin","Mage"],"id":"7","code":"Leblanc"},{"img":"Vladimir.png","name":"猩红收割者","title":"弗拉基米尔","tags":["Mage","Tank"],"id":"8","code":"Vladimir"},{"img":"FiddleSticks.png","name":"末日使者","title":"费德提克","tags":["Mage","Support"],"id":"9","code":"FiddleSticks"},{"img":"Kayle.png","name":"审判天使","title":"凯尔","tags":["Fighter","Support"],"id":"10","code":"Kayle"},{"img":"MasterYi.png","name":"无极剑圣","title":"易","tags":["Assassin","Fighter"],"id":"11","code":"MasterYi"},{"img":"Alistar.png","name":"牛头酋长","title":"阿利斯塔","tags":["Tank","Support"],"id":"12","code":"Alistar"},{"img":"Ryze.png","name":"流浪法师","title":"瑞兹","tags":["Mage","Fighter"],"id":"13","code":"Ryze"},{"img":"Sion.png","name":"亡灵战神","title":"赛恩","tags":["Tank","Fighter"],"id":"14","code":"Sion"},{"img":"Sivir.png","name":"战争女神","title":"希维尔","tags":["Marksman"],"id":"15","code":"Sivir"},{"img":"Soraka.png","name":"众星之子","title":"索拉卡","tags":["Support","Mage"],"id":"16","code":"Soraka"},{"img":"Teemo.png","name":"迅捷斥候","title":"提莫","tags":["Marksman","Assassin"],"id":"17","code":"Teemo"},{"img":"Tristana.png","name":"麦林炮手","title":"崔丝塔娜","tags":["Marksman","Assassin"],"id":"18","code":"Tristana"},{"img":"Warwick.png","name":"嗜血猎手","title":"沃里克","tags":["Fighter","Tank"],"id":"19","code":"Warwick"},{"img":"Nunu.png","name":"雪人骑士","title":"努努","tags":["Support","Fighter"],"id":"20","code":"Nunu"},{"img":"MissFortune.png","name":"赏金猎人","title":"厄运小姐","tags":["Marksman"],"id":"21","code":"MissFortune"},{"img":"Ashe.png","name":"寒冰射手","title":"艾希","tags":["Marksman","Support"],"id":"22","code":"Ashe"},{"img":"Tryndamere.png","name":"蛮族之王","title":"泰达米尔","tags":["Fighter","Assassin"],"id":"23","code":"Tryndamere"},{"img":"Jax.png","name":"武器大师","title":"贾克斯","tags":["Fighter","Assassin"],"id":"24","code":"Jax"},{"img":"Morgana.png","name":"堕落天使","title":"莫甘娜","tags":["Mage","Support"],"id":"25","code":"Morgana"},{"img":"Zilean.png","name":"时光守护者","title":"基兰","tags":["Support","Mage"],"id":"26","code":"Zilean"},{"img":"Singed.png","name":"炼金术士","title":"辛吉德","tags":["Tank","Fighter"],"id":"27","code":"Singed"},{"img":"Evelynn.png","name":"寡妇制造者","title":"伊芙琳","tags":["Assassin","Mage"],"id":"28","code":"Evelynn"},{"img":"Twitch.png","name":"瘟疫之源","title":"图奇","tags":["Marksman","Assassin"],"id":"29","code":"Twitch"},{"img":"Karthus.png","name":"死亡颂唱者","title":"卡尔萨斯","tags":["Mage"],"id":"30","code":"Karthus"},{"img":"Chogath.png","name":"虚空恐惧","title":"科加斯","tags":["Tank","Mage"],"id":"31","code":"Chogath"},{"img":"Amumu.png","name":"殇之木乃伊","title":"阿木木","tags":["Tank","Mage"],"id":"32","code":"Amumu"},{"img":"Rammus.png","name":"披甲龙龟","title":"拉莫斯","tags":["Tank","Fighter"],"id":"33","code":"Rammus"},{"img":"Anivia.png","name":"冰晶凤凰","title":"艾尼维亚","tags":["Mage","Support"],"id":"34","code":"Anivia"},{"img":"Shaco.png","name":"恶魔小丑","title":"萨科","tags":["Assassin"],"id":"35","code":"Shaco"},{"img":"DrMundo.png","name":"祖安狂人","title":"蒙多医生","tags":["Fighter","Tank"],"id":"36","code":"DrMundo"},{"img":"Sona.png","name":"琴瑟仙女","title":"娑娜","tags":["Support","Mage"],"id":"37","code":"Sona"},{"img":"Kassadin.png","name":"虚空行者","title":"卡萨丁","tags":["Assassin","Mage"],"id":"38","code":"Kassadin"},{"img":"Irelia.png","name":"刀锋意志","title":"艾瑞莉娅","tags":["Fighter","Assassin"],"id":"39","code":"Irelia"},{"img":"Janna.png","name":"风暴之怒","title":"迦娜","tags":["Support","Mage"],"id":"40","code":"Janna"},{"img":"Gangplank.png","name":"海洋之灾","title":"普朗克","tags":["Fighter"],"id":"41","code":"Gangplank"},{"img":"Corki.png","name":"英勇投弹手","title":"库奇","tags":["Marksman"],"id":"42","code":"Corki"},{"img":"Karma.png","name":"天启者","title":"卡尔玛","tags":["Mage","Support"],"id":"43","code":"Karma"},{"img":"Taric.png","name":"宝石骑士","title":"塔里克","tags":["Support","Fighter"],"id":"44","code":"Taric"},{"img":"Veigar.png","name":"邪恶小法师","title":"维迦","tags":["Mage"],"id":"45","code":"Veigar"},{"img":"Trundle.png","name":"巨魔之王","title":"特朗德尔","tags":["Fighter","Tank"],"id":"48","code":"Trundle"},{"img":"Swain.png","name":"策士统领","title":"斯维因","tags":["Mage","Fighter"],"id":"50","code":"Swain"},{"img":"Caitlyn.png","name":"皮城女警","title":"凯特琳","tags":["Marksman"],"id":"51","code":"Caitlyn"},{"img":"Blitzcrank.png","name":"蒸汽机器人","title":"布里茨","tags":["Tank","Fighter"],"id":"53","code":"Blitzcrank"},{"img":"Malphite.png","name":"熔岩巨兽","title":"墨菲特","tags":["Tank","Fighter"],"id":"54","code":"Malphite"},{"img":"Katarina.png","name":"不祥之刃","title":"卡特琳娜","tags":["Assassin","Mage"],"id":"55","code":"Katarina"},{"img":"Nocturne.png","name":"永恒梦魇","title":"魔腾","tags":["Assassin","Fighter"],"id":"56","code":"Nocturne"},{"img":"Maokai.png","name":"扭曲树精","title":"茂凯","tags":["Tank","Mage"],"id":"57","code":"Maokai"},{"img":"Renekton.png","name":"荒漠屠夫","title":"雷克顿","tags":["Fighter","Tank"],"id":"58","code":"Renekton"},{"img":"JarvanIV.png","name":"德玛西亚皇子","title":"嘉文四世","tags":["Tank","Fighter"],"id":"59","code":"JarvanIV"},{"img":"Elise.png","name":"蜘蛛女皇","title":"伊莉丝","tags":["Mage","Fighter"],"id":"60","code":"Elise"},{"img":"Orianna.png","name":"发条魔灵","title":"奥莉安娜","tags":["Mage","Support"],"id":"61","code":"Orianna"},{"img":"MonkeyKing.png","name":"齐天大圣","title":"孙悟空","tags":["Fighter","Tank"],"id":"62","code":"MonkeyKing"},{"img":"Brand.png","name":"复仇焰魂","title":"布兰德","tags":["Mage"],"id":"63","code":"Brand"},{"img":"LeeSin.png","name":"盲僧","title":"李青","tags":["Fighter","Assassin"],"id":"64","code":"LeeSin"},{"img":"Vayne.png","name":"暗夜猎手","title":"薇恩","tags":["Marksman","Assassin"],"id":"67","code":"Vayne"},{"img":"Rumble.png","name":"机械公敌","title":"兰博","tags":["Fighter","Mage"],"id":"68","code":"Rumble"},{"img":"Cassiopeia.png","name":"魔蛇之拥","title":"卡西奥佩娅","tags":["Mage"],"id":"69","code":"Cassiopeia"},{"img":"Skarner.png","name":"水晶先锋","title":"斯卡纳","tags":["Fighter","Tank"],"id":"72","code":"Skarner"},{"img":"Heimerdinger.png","name":"大发明家","title":"黑默丁格","tags":["Mage","Support"],"id":"74","code":"Heimerdinger"},{"img":"Nasus.png","name":"沙漠死神","title":"内瑟斯","tags":["Fighter","Tank"],"id":"75","code":"Nasus"},{"img":"Nidalee.png","name":"狂野女猎手","title":"奈德丽","tags":["Assassin","Fighter"],"id":"76","code":"Nidalee"},{"img":"Udyr.png","name":"兽灵行者","title":"乌迪尔","tags":["Fighter","Tank"],"id":"77","code":"Udyr"},{"img":"Poppy.png","name":"圣锤之毅","title":"波比","tags":["Tank","Fighter"],"id":"78","code":"Poppy"},{"img":"Gragas.png","name":"酒桶","title":"古拉加斯","tags":["Fighter","Mage"],"id":"79","code":"Gragas"},{"img":"Pantheon.png","name":"战争之王","title":"潘森","tags":["Fighter","Assassin"],"id":"80","code":"Pantheon"},{"img":"Ezreal.png","name":"探险家","title":"伊泽瑞尔","tags":["Marksman","Mage"],"id":"81","code":"Ezreal"},{"img":"Mordekaiser.png","name":"铁铠冥魂","title":"莫德凯撒","tags":["Fighter","Mage"],"id":"82","code":"Mordekaiser"},{"img":"Yorick.png","name":"掘墓者","title":"约里克","tags":["Fighter","Mage"],"id":"83","code":"Yorick"},{"img":"Akali.png","name":"暗影之拳","title":"阿卡丽","tags":["Assassin"],"id":"84","code":"Akali"},{"img":"Kennen.png","name":"狂暴之心","title":"凯南","tags":["Mage","Marksman"],"id":"85","code":"Kennen"},{"img":"Garen.png","name":"德玛西亚之力","title":"盖伦","tags":["Fighter","Tank"],"id":"86","code":"Garen"},{"img":"Leona.png","name":"曙光女神","title":"蕾欧娜","tags":["Tank","Support"],"id":"89","code":"Leona"},{"img":"Malzahar.png","name":"虚空先知","title":"玛尔扎哈","tags":["Mage","Assassin"],"id":"90","code":"Malzahar"},{"img":"Talon.png","name":"刀锋之影","title":"泰隆","tags":["Assassin","Fighter"],"id":"91","code":"Talon"},{"img":"Riven.png","name":"放逐之刃","title":"锐雯","tags":["Fighter","Assassin"],"id":"92","code":"Riven"},{"img":"KogMaw.png","name":"深渊巨口","title":"克格莫","tags":["Marksman","Mage"],"id":"96","code":"KogMaw"},{"img":"Shen.png","name":"暮光之眼","title":"慎","tags":["Tank","Fighter"],"id":"98","code":"Shen"},{"img":"Lux.png","name":"光辉女郎","title":"拉克丝","tags":["Mage","Support"],"id":"99","code":"Lux"},{"img":"Xerath.png","name":"远古巫灵","title":"泽拉斯","tags":["Mage","Assassin"],"id":"101","code":"Xerath"},{"img":"Shyvana.png","name":"龙血武姬","title":"希瓦娜","tags":["Fighter","Tank"],"id":"102","code":"Shyvana"},{"img":"Ahri.png","name":"九尾妖狐","title":"阿狸","tags":["Mage","Assassin"],"id":"103","code":"Ahri"},{"img":"Graves.png","name":"法外狂徒","title":"格雷福斯","tags":["Marksman"],"id":"104","code":"Graves"},{"img":"Fizz.png","name":"潮汐海灵","title":"菲兹","tags":["Assassin","Fighter"],"id":"105","code":"Fizz"},{"img":"Volibear.png","name":"雷霆咆哮","title":"沃利贝尔","tags":["Fighter","Tank"],"id":"106","code":"Volibear"},{"img":"Rengar.png","name":"傲之追猎者","title":"雷恩加尔","tags":["Assassin","Fighter"],"id":"107","code":"Rengar"},{"img":"Varus.png","name":"惩戒之箭","title":"韦鲁斯","tags":["Marksman","Mage"],"id":"110","code":"Varus"},{"img":"Nautilus.png","name":"深海泰坦","title":"诺提勒斯","tags":["Tank","Fighter"],"id":"111","code":"Nautilus"},{"img":"Viktor.png","name":"机械先驱","title":"维克托","tags":["Mage"],"id":"112","code":"Viktor"},{"img":"Sejuani.png","name":"凛冬之怒","title":"瑟庄妮","tags":["Tank","Fighter"],"id":"113","code":"Sejuani"},{"img":"Fiora.png","name":"无双剑姬","title":"菲奥娜","tags":["Fighter","Assassin"],"id":"114","code":"Fiora"},{"img":"Ziggs.png","name":"爆破鬼才","title":"吉格斯","tags":["Mage"],"id":"115","code":"Ziggs"},{"img":"Lulu.png","name":"仙灵女巫","title":"璐璐","tags":["Support","Mage"],"id":"117","code":"Lulu"},{"img":"Draven.png","name":"荣耀行刑官","title":"德莱文","tags":["Marksman"],"id":"119","code":"Draven"},{"img":"Hecarim.png","name":"战争之影","title":"赫卡里姆","tags":["Fighter","Tank"],"id":"120","code":"Hecarim"},{"img":"Khazix.png","name":"虚空掠夺者","title":"卡兹克","tags":["Assassin","Fighter"],"id":"121","code":"Khazix"},{"img":"Darius.png","name":"诺克萨斯之手","title":"德莱厄斯","tags":["Fighter","Tank"],"id":"122","code":"Darius"},{"img":"Jayce.png","name":"未来守护者","title":"杰斯","tags":["Fighter","Marksman"],"id":"126","code":"Jayce"},{"img":"Lissandra.png","name":"冰霜女巫","title":"丽桑卓","tags":["Mage"],"id":"127","code":"Lissandra"},{"img":"Diana.png","name":"皎月女神","title":"黛安娜","tags":["Fighter","Mage"],"id":"131","code":"Diana"},{"img":"Quinn.png","name":"德玛西亚之翼","title":"奎因","tags":["Marksman","Fighter"],"id":"133","code":"Quinn"},{"img":"Syndra.png","name":"暗黑元首","title":"辛德拉","tags":["Mage","Support"],"id":"134","code":"Syndra"},{"img":"Zyra.png","name":"荆棘之兴","title":"婕拉","tags":["Mage","Support"],"id":"143","code":"Zyra"},{"img":"Gnar.png","name":"迷失之牙","title":"纳尔","tags":["Fighter","Tank"],"id":"150","code":"Gnar"},{"img":"Zac.png","name":"生化魔人","title":"扎克","tags":["Tank","Fighter"],"id":"154","code":"Zac"},{"img":"Yasuo.png","name":"疾风剑豪","title":"亚索","tags":["Fighter","Assassin"],"id":"157","code":"Yasuo"},{"img":"Velkoz.png","name":"虚空之眼","title":"维克兹","tags":["Mage"],"id":"161","code":"Velkoz"},{"img":"Braum.png","name":"弗雷尔卓德之心","title":"布隆","tags":["Support","Tank"],"id":"201","code":"Braum"},{"img":"Kindred.png","name":"永猎双子","title":"千珏","tags":["Marksman"],"id":"203","code":"Kindred"},{"img":"Jinx.png","name":"暴走萝莉","title":"金克丝","tags":["Marksman"],"id":"222","code":"Jinx"},{"img":"TahmKench.png","name":"河流之王","title":"塔姆","tags":["Support","Tank"],"id":"223","code":"TahmKench"},{"img":"Lucian.png","name":"圣枪游侠","title":"卢锡安","tags":["Marksman"],"id":"236","code":"Lucian"},{"img":"Zed.png","name":"影流之主","title":"劫","tags":["Assassin","Fighter"],"id":"238","code":"Zed"},{"img":"Ekko.png","name":"时间刺客","title":"艾克","tags":["Assassin","Fighter"],"id":"245","code":"Ekko"},{"img":"Vi.png","name":"皮城执法官","title":"蔚","tags":["Fighter","Assassin"],"id":"254","code":"Vi"},{"img":"Aatrox.png","name":"暗裔剑魔","title":"亚托克斯","tags":["Fighter","Tank"],"id":"266","code":"Aatrox"},{"img":"Nami.png","name":"唤潮鲛姬","title":"娜美","tags":["Support","Mage"],"id":"267","code":"Nami"},{"img":"Azir.png","name":"沙漠皇帝","title":"阿兹尔","tags":["Mage","Marksman"],"id":"268","code":"Azir"},{"img":"Thresh.png","name":"魂锁典狱长","title":"锤石","tags":["Support","Fighter"],"id":"412","code":"Thresh"},{"img":"Illaoi.png","name":"海兽祭司","title":"俄洛伊","tags":["Fighter","Tank"],"id":"420","code":"Illaoi"},{"img":"RekSai.png","name":"虚空遁地兽","title":"雷克塞","tags":["Fighter"],"id":"421","code":"RekSai"},{"img":"Kalista.png","name":"复仇之矛","title":"卡莉丝塔","tags":["Marksman"],"id":"429","code":"Kalista"},{"img":"Bard.png","name":"星界游神","title":"巴德","tags":["Support","Mage"],"id":"432","code":"Bard"}];

// lolObj={"1":{"img":"Annie.png","name":"黑暗之女","title":"安妮","tags":["Mage"],"id":"1","code":"Annie"},"2":{"img":"Olaf.png","name":"狂战士","title":"奥拉夫","tags":["Fighter","Tank"],"id":"2","code":"Olaf"},"3":{"img":"Galio.png","name":"哨兵之殇","title":"加里奥","tags":["Tank","Mage"],"id":"3","code":"Galio"},"4":{"img":"TwistedFate.png","name":"卡牌大师","title":"崔斯特","tags":["Mage"],"id":"4","code":"TwistedFate"},"5":{"img":"XinZhao.png","name":"德邦总管","title":"赵信","tags":["Fighter","Assassin"],"id":"5","code":"XinZhao"},"6":{"img":"Urgot.png","name":"首领之傲","title":"厄加特","tags":["Marksman","Fighter"],"id":"6","code":"Urgot"},"7":{"img":"Leblanc.png","name":"诡术妖姬","title":"乐芙兰","tags":["Assassin","Mage"],"id":"7","code":"Leblanc"},"8":{"img":"Vladimir.png","name":"猩红收割者","title":"弗拉基米尔","tags":["Mage","Tank"],"id":"8","code":"Vladimir"},"9":{"img":"FiddleSticks.png","name":"末日使者","title":"费德提克","tags":["Mage","Support"],"id":"9","code":"FiddleSticks"},"10":{"img":"Kayle.png","name":"审判天使","title":"凯尔","tags":["Fighter","Support"],"id":"10","code":"Kayle"},"11":{"img":"MasterYi.png","name":"无极剑圣","title":"易","tags":["Assassin","Fighter"],"id":"11","code":"MasterYi"},"12":{"img":"Alistar.png","name":"牛头酋长","title":"阿利斯塔","tags":["Tank","Support"],"id":"12","code":"Alistar"},"13":{"img":"Ryze.png","name":"流浪法师","title":"瑞兹","tags":["Mage","Fighter"],"id":"13","code":"Ryze"},"14":{"img":"Sion.png","name":"亡灵战神","title":"赛恩","tags":["Tank","Fighter"],"id":"14","code":"Sion"},"15":{"img":"Sivir.png","name":"战争女神","title":"希维尔","tags":["Marksman"],"id":"15","code":"Sivir"},"16":{"img":"Soraka.png","name":"众星之子","title":"索拉卡","tags":["Support","Mage"],"id":"16","code":"Soraka"},"17":{"img":"Teemo.png","name":"迅捷斥候","title":"提莫","tags":["Marksman","Assassin"],"id":"17","code":"Teemo"},"18":{"img":"Tristana.png","name":"麦林炮手","title":"崔丝塔娜","tags":["Marksman","Assassin"],"id":"18","code":"Tristana"},"19":{"img":"Warwick.png","name":"嗜血猎手","title":"沃里克","tags":["Fighter","Tank"],"id":"19","code":"Warwick"},"20":{"img":"Nunu.png","name":"雪人骑士","title":"努努","tags":["Support","Fighter"],"id":"20","code":"Nunu"},"21":{"img":"MissFortune.png","name":"赏金猎人","title":"厄运小姐","tags":["Marksman"],"id":"21","code":"MissFortune"},"22":{"img":"Ashe.png","name":"寒冰射手","title":"艾希","tags":["Marksman","Support"],"id":"22","code":"Ashe"},"23":{"img":"Tryndamere.png","name":"蛮族之王","title":"泰达米尔","tags":["Fighter","Assassin"],"id":"23","code":"Tryndamere"},"24":{"img":"Jax.png","name":"武器大师","title":"贾克斯","tags":["Fighter","Assassin"],"id":"24","code":"Jax"},"25":{"img":"Morgana.png","name":"堕落天使","title":"莫甘娜","tags":["Mage","Support"],"id":"25","code":"Morgana"},"26":{"img":"Zilean.png","name":"时光守护者","title":"基兰","tags":["Support","Mage"],"id":"26","code":"Zilean"},"27":{"img":"Singed.png","name":"炼金术士","title":"辛吉德","tags":["Tank","Fighter"],"id":"27","code":"Singed"},"28":{"img":"Evelynn.png","name":"寡妇制造者","title":"伊芙琳","tags":["Assassin","Mage"],"id":"28","code":"Evelynn"},"29":{"img":"Twitch.png","name":"瘟疫之源","title":"图奇","tags":["Marksman","Assassin"],"id":"29","code":"Twitch"},"30":{"img":"Karthus.png","name":"死亡颂唱者","title":"卡尔萨斯","tags":["Mage"],"id":"30","code":"Karthus"},"31":{"img":"Chogath.png","name":"虚空恐惧","title":"科加斯","tags":["Tank","Mage"],"id":"31","code":"Chogath"},"32":{"img":"Amumu.png","name":"殇之木乃伊","title":"阿木木","tags":["Tank","Mage"],"id":"32","code":"Amumu"},"33":{"img":"Rammus.png","name":"披甲龙龟","title":"拉莫斯","tags":["Tank","Fighter"],"id":"33","code":"Rammus"},"34":{"img":"Anivia.png","name":"冰晶凤凰","title":"艾尼维亚","tags":["Mage","Support"],"id":"34","code":"Anivia"},"35":{"img":"Shaco.png","name":"恶魔小丑","title":"萨科","tags":["Assassin"],"id":"35","code":"Shaco"},"36":{"img":"DrMundo.png","name":"祖安狂人","title":"蒙多医生","tags":["Fighter","Tank"],"id":"36","code":"DrMundo"},"37":{"img":"Sona.png","name":"琴瑟仙女","title":"娑娜","tags":["Support","Mage"],"id":"37","code":"Sona"},"38":{"img":"Kassadin.png","name":"虚空行者","title":"卡萨丁","tags":["Assassin","Mage"],"id":"38","code":"Kassadin"},"39":{"img":"Irelia.png","name":"刀锋意志","title":"艾瑞莉娅","tags":["Fighter","Assassin"],"id":"39","code":"Irelia"},"40":{"img":"Janna.png","name":"风暴之怒","title":"迦娜","tags":["Support","Mage"],"id":"40","code":"Janna"},"41":{"img":"Gangplank.png","name":"海洋之灾","title":"普朗克","tags":["Fighter"],"id":"41","code":"Gangplank"},"42":{"img":"Corki.png","name":"英勇投弹手","title":"库奇","tags":["Marksman"],"id":"42","code":"Corki"},"43":{"img":"Karma.png","name":"天启者","title":"卡尔玛","tags":["Mage","Support"],"id":"43","code":"Karma"},"44":{"img":"Taric.png","name":"宝石骑士","title":"塔里克","tags":["Support","Fighter"],"id":"44","code":"Taric"},"45":{"img":"Veigar.png","name":"邪恶小法师","title":"维迦","tags":["Mage"],"id":"45","code":"Veigar"},"48":{"img":"Trundle.png","name":"巨魔之王","title":"特朗德尔","tags":["Fighter","Tank"],"id":"48","code":"Trundle"},"50":{"img":"Swain.png","name":"策士统领","title":"斯维因","tags":["Mage","Fighter"],"id":"50","code":"Swain"},"51":{"img":"Caitlyn.png","name":"皮城女警","title":"凯特琳","tags":["Marksman"],"id":"51","code":"Caitlyn"},"53":{"img":"Blitzcrank.png","name":"蒸汽机器人","title":"布里茨","tags":["Tank","Fighter"],"id":"53","code":"Blitzcrank"},"54":{"img":"Malphite.png","name":"熔岩巨兽","title":"墨菲特","tags":["Tank","Fighter"],"id":"54","code":"Malphite"},"55":{"img":"Katarina.png","name":"不祥之刃","title":"卡特琳娜","tags":["Assassin","Mage"],"id":"55","code":"Katarina"},"56":{"img":"Nocturne.png","name":"永恒梦魇","title":"魔腾","tags":["Assassin","Fighter"],"id":"56","code":"Nocturne"},"57":{"img":"Maokai.png","name":"扭曲树精","title":"茂凯","tags":["Tank","Mage"],"id":"57","code":"Maokai"},"58":{"img":"Renekton.png","name":"荒漠屠夫","title":"雷克顿","tags":["Fighter","Tank"],"id":"58","code":"Renekton"},"59":{"img":"JarvanIV.png","name":"德玛西亚皇子","title":"嘉文四世","tags":["Tank","Fighter"],"id":"59","code":"JarvanIV"},"60":{"img":"Elise.png","name":"蜘蛛女皇","title":"伊莉丝","tags":["Mage","Fighter"],"id":"60","code":"Elise"},"61":{"img":"Orianna.png","name":"发条魔灵","title":"奥莉安娜","tags":["Mage","Support"],"id":"61","code":"Orianna"},"62":{"img":"MonkeyKing.png","name":"齐天大圣","title":"孙悟空","tags":["Fighter","Tank"],"id":"62","code":"MonkeyKing"},"63":{"img":"Brand.png","name":"复仇焰魂","title":"布兰德","tags":["Mage"],"id":"63","code":"Brand"},"64":{"img":"LeeSin.png","name":"盲僧","title":"李青","tags":["Fighter","Assassin"],"id":"64","code":"LeeSin"},"67":{"img":"Vayne.png","name":"暗夜猎手","title":"薇恩","tags":["Marksman","Assassin"],"id":"67","code":"Vayne"},"68":{"img":"Rumble.png","name":"机械公敌","title":"兰博","tags":["Fighter","Mage"],"id":"68","code":"Rumble"},"69":{"img":"Cassiopeia.png","name":"魔蛇之拥","title":"卡西奥佩娅","tags":["Mage"],"id":"69","code":"Cassiopeia"},"72":{"img":"Skarner.png","name":"水晶先锋","title":"斯卡纳","tags":["Fighter","Tank"],"id":"72","code":"Skarner"},"74":{"img":"Heimerdinger.png","name":"大发明家","title":"黑默丁格","tags":["Mage","Support"],"id":"74","code":"Heimerdinger"},"75":{"img":"Nasus.png","name":"沙漠死神","title":"内瑟斯","tags":["Fighter","Tank"],"id":"75","code":"Nasus"},"76":{"img":"Nidalee.png","name":"狂野女猎手","title":"奈德丽","tags":["Assassin","Fighter"],"id":"76","code":"Nidalee"},"77":{"img":"Udyr.png","name":"兽灵行者","title":"乌迪尔","tags":["Fighter","Tank"],"id":"77","code":"Udyr"},"78":{"img":"Poppy.png","name":"圣锤之毅","title":"波比","tags":["Tank","Fighter"],"id":"78","code":"Poppy"},"79":{"img":"Gragas.png","name":"酒桶","title":"古拉加斯","tags":["Fighter","Mage"],"id":"79","code":"Gragas"},"80":{"img":"Pantheon.png","name":"战争之王","title":"潘森","tags":["Fighter","Assassin"],"id":"80","code":"Pantheon"},"81":{"img":"Ezreal.png","name":"探险家","title":"伊泽瑞尔","tags":["Marksman","Mage"],"id":"81","code":"Ezreal"},"82":{"img":"Mordekaiser.png","name":"铁铠冥魂","title":"莫德凯撒","tags":["Fighter","Mage"],"id":"82","code":"Mordekaiser"},"83":{"img":"Yorick.png","name":"掘墓者","title":"约里克","tags":["Fighter","Mage"],"id":"83","code":"Yorick"},"84":{"img":"Akali.png","name":"暗影之拳","title":"阿卡丽","tags":["Assassin"],"id":"84","code":"Akali"},"85":{"img":"Kennen.png","name":"狂暴之心","title":"凯南","tags":["Mage","Marksman"],"id":"85","code":"Kennen"},"86":{"img":"Garen.png","name":"德玛西亚之力","title":"盖伦","tags":["Fighter","Tank"],"id":"86","code":"Garen"},"89":{"img":"Leona.png","name":"曙光女神","title":"蕾欧娜","tags":["Tank","Support"],"id":"89","code":"Leona"},"90":{"img":"Malzahar.png","name":"虚空先知","title":"玛尔扎哈","tags":["Mage","Assassin"],"id":"90","code":"Malzahar"},"91":{"img":"Talon.png","name":"刀锋之影","title":"泰隆","tags":["Assassin","Fighter"],"id":"91","code":"Talon"},"92":{"img":"Riven.png","name":"放逐之刃","title":"锐雯","tags":["Fighter","Assassin"],"id":"92","code":"Riven"},"96":{"img":"KogMaw.png","name":"深渊巨口","title":"克格莫","tags":["Marksman","Mage"],"id":"96","code":"KogMaw"},"98":{"img":"Shen.png","name":"暮光之眼","title":"慎","tags":["Tank","Fighter"],"id":"98","code":"Shen"},"99":{"img":"Lux.png","name":"光辉女郎","title":"拉克丝","tags":["Mage","Support"],"id":"99","code":"Lux"},"101":{"img":"Xerath.png","name":"远古巫灵","title":"泽拉斯","tags":["Mage","Assassin"],"id":"101","code":"Xerath"},"102":{"img":"Shyvana.png","name":"龙血武姬","title":"希瓦娜","tags":["Fighter","Tank"],"id":"102","code":"Shyvana"},"103":{"img":"Ahri.png","name":"九尾妖狐","title":"阿狸","tags":["Mage","Assassin"],"id":"103","code":"Ahri"},"104":{"img":"Graves.png","name":"法外狂徒","title":"格雷福斯","tags":["Marksman"],"id":"104","code":"Graves"},"105":{"img":"Fizz.png","name":"潮汐海灵","title":"菲兹","tags":["Assassin","Fighter"],"id":"105","code":"Fizz"},"106":{"img":"Volibear.png","name":"雷霆咆哮","title":"沃利贝尔","tags":["Fighter","Tank"],"id":"106","code":"Volibear"},"107":{"img":"Rengar.png","name":"傲之追猎者","title":"雷恩加尔","tags":["Assassin","Fighter"],"id":"107","code":"Rengar"},"110":{"img":"Varus.png","name":"惩戒之箭","title":"韦鲁斯","tags":["Marksman","Mage"],"id":"110","code":"Varus"},"111":{"img":"Nautilus.png","name":"深海泰坦","title":"诺提勒斯","tags":["Tank","Fighter"],"id":"111","code":"Nautilus"},"112":{"img":"Viktor.png","name":"机械先驱","title":"维克托","tags":["Mage"],"id":"112","code":"Viktor"},"113":{"img":"Sejuani.png","name":"凛冬之怒","title":"瑟庄妮","tags":["Tank","Fighter"],"id":"113","code":"Sejuani"},"114":{"img":"Fiora.png","name":"无双剑姬","title":"菲奥娜","tags":["Fighter","Assassin"],"id":"114","code":"Fiora"},"115":{"img":"Ziggs.png","name":"爆破鬼才","title":"吉格斯","tags":["Mage"],"id":"115","code":"Ziggs"},"117":{"img":"Lulu.png","name":"仙灵女巫","title":"璐璐","tags":["Support","Mage"],"id":"117","code":"Lulu"},"119":{"img":"Draven.png","name":"荣耀行刑官","title":"德莱文","tags":["Marksman"],"id":"119","code":"Draven"},"120":{"img":"Hecarim.png","name":"战争之影","title":"赫卡里姆","tags":["Fighter","Tank"],"id":"120","code":"Hecarim"},"121":{"img":"Khazix.png","name":"虚空掠夺者","title":"卡兹克","tags":["Assassin","Fighter"],"id":"121","code":"Khazix"},"122":{"img":"Darius.png","name":"诺克萨斯之手","title":"德莱厄斯","tags":["Fighter","Tank"],"id":"122","code":"Darius"},"126":{"img":"Jayce.png","name":"未来守护者","title":"杰斯","tags":["Fighter","Marksman"],"id":"126","code":"Jayce"},"127":{"img":"Lissandra.png","name":"冰霜女巫","title":"丽桑卓","tags":["Mage"],"id":"127","code":"Lissandra"},"131":{"img":"Diana.png","name":"皎月女神","title":"黛安娜","tags":["Fighter","Mage"],"id":"131","code":"Diana"},"133":{"img":"Quinn.png","name":"德玛西亚之翼","title":"奎因","tags":["Marksman","Fighter"],"id":"133","code":"Quinn"},"134":{"img":"Syndra.png","name":"暗黑元首","title":"辛德拉","tags":["Mage","Support"],"id":"134","code":"Syndra"},"143":{"img":"Zyra.png","name":"荆棘之兴","title":"婕拉","tags":["Mage","Support"],"id":"143","code":"Zyra"},"150":{"img":"Gnar.png","name":"迷失之牙","title":"纳尔","tags":["Fighter","Tank"],"id":"150","code":"Gnar"},"154":{"img":"Zac.png","name":"生化魔人","title":"扎克","tags":["Tank","Fighter"],"id":"154","code":"Zac"},"157":{"img":"Yasuo.png","name":"疾风剑豪","title":"亚索","tags":["Fighter","Assassin"],"id":"157","code":"Yasuo"},"161":{"img":"Velkoz.png","name":"虚空之眼","title":"维克兹","tags":["Mage"],"id":"161","code":"Velkoz"},"201":{"img":"Braum.png","name":"弗雷尔卓德之心","title":"布隆","tags":["Support","Tank"],"id":"201","code":"Braum"},"203":{"img":"Kindred.png","name":"永猎双子","title":"千珏","tags":["Marksman"],"id":"203","code":"Kindred"},"222":{"img":"Jinx.png","name":"暴走萝莉","title":"金克丝","tags":["Marksman"],"id":"222","code":"Jinx"},"223":{"img":"TahmKench.png","name":"河流之王","title":"塔姆","tags":["Support","Tank"],"id":"223","code":"TahmKench"},"236":{"img":"Lucian.png","name":"圣枪游侠","title":"卢锡安","tags":["Marksman"],"id":"236","code":"Lucian"},"238":{"img":"Zed.png","name":"影流之主","title":"劫","tags":["Assassin","Fighter"],"id":"238","code":"Zed"},"245":{"img":"Ekko.png","name":"时间刺客","title":"艾克","tags":["Assassin","Fighter"],"id":"245","code":"Ekko"},"254":{"img":"Vi.png","name":"皮城执法官","title":"蔚","tags":["Fighter","Assassin"],"id":"254","code":"Vi"},"266":{"img":"Aatrox.png","name":"暗裔剑魔","title":"亚托克斯","tags":["Fighter","Tank"],"id":"266","code":"Aatrox"},"267":{"img":"Nami.png","name":"唤潮鲛姬","title":"娜美","tags":["Support","Mage"],"id":"267","code":"Nami"},"268":{"img":"Azir.png","name":"沙漠皇帝","title":"阿兹尔","tags":["Mage","Marksman"],"id":"268","code":"Azir"},"412":{"img":"Thresh.png","name":"魂锁典狱长","title":"锤石","tags":["Support","Fighter"],"id":"412","code":"Thresh"},"420":{"img":"Illaoi.png","name":"海兽祭司","title":"俄洛伊","tags":["Fighter","Tank"],"id":"420","code":"Illaoi"},"421":{"img":"RekSai.png","name":"虚空遁地兽","title":"雷克塞","tags":["Fighter"],"id":"421","code":"RekSai"},"429":{"img":"Kalista.png","name":"复仇之矛","title":"卡莉丝塔","tags":["Marksman"],"id":"429","code":"Kalista"},"432":{"img":"Bard.png","name":"星界游神","title":"巴德","tags":["Support","Mage"],"id":"432","code":"Bard"},
// "136":{"img":"AurelionSol.png","name":"奥瑞利安索尔","title":"铸星龙王","tags":["Mage"],"id":"136","code":"AurelionSol"},
// "202":{"img":"Jhin.png","name":"烬","title":"戏命师","tags":["Mage"],"id":"202","code":"Jhin"},
// };


lolArr=[
  {
    "img": "Annie.png",
    "name": "黑暗之女",
    "title": "安妮",
    "tags": [
      "Mage"
    ],
    "id": "1",
    "code": "Annie",
    "imgSquare": "Annie_Square_0.jpg",
    "imgSplash": "Annie_Splash_Tile_0.jpg"
  },
  {
    "img": "AurelionSol.png",
    "name": "奥瑞利安索尔",
    "title": "铸星龙王",
    "tags": [
      "Mage"
    ],
    "id": "136",
    "code": "AurelionSol",
    "imgSquare": "AurelionSol_Square_0.jpg",
    "imgSplash": "AurelionSol_Splash_Tile_0.jpg"
  },
  {
    "img": "Jhin.png",
    "name": "烬",
    "title": "戏命师",
    "tags": [
      "Mage"
    ],
    "id": "202",
    "code": "Jhin",
    "imgSquare": "Jhin_Square_0.jpg",
    "imgSplash": "Jhin_Splash_Tile_0.jpg"
  },
  {
    "img": "Olaf.png",
    "name": "狂战士",
    "title": "奥拉夫",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "2",
    "code": "Olaf",
    "imgSquare": "Olaf_Square_0.jpg",
    "imgSplash": "Olaf_Splash_Tile_0.jpg"
  },
  {
    "img": "Galio.png",
    "name": "哨兵之殇",
    "title": "加里奥",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "3",
    "code": "Galio",
    "imgSquare": "Galio_Square_0.jpg",
    "imgSplash": "Galio_Splash_Tile_0.jpg"
  },
  {
    "img": "TwistedFate.png",
    "name": "卡牌大师",
    "title": "崔斯特",
    "tags": [
      "Mage"
    ],
    "id": "4",
    "code": "TwistedFate",
    "imgSquare": "TwistedFate_Square_0.jpg",
    "imgSplash": "TwistedFate_Splash_Tile_0.jpg"
  },
  {
    "img": "XinZhao.png",
    "name": "德邦总管",
    "title": "赵信",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "5",
    "code": "XinZhao",
    "imgSquare": "XinZhao_Square_0.jpg",
    "imgSplash": "XinZhao_Splash_Tile_0.jpg"
  },
  {
    "img": "Urgot.png",
    "name": "首领之傲",
    "title": "厄加特",
    "tags": [
      "Marksman",
      "Fighter"
    ],
    "id": "6",
    "code": "Urgot",
    "imgSquare": "Urgot_Square_0.jpg",
    "imgSplash": "Urgot_Splash_Tile_0.jpg"
  },
  {
    "img": "Leblanc.png",
    "name": "诡术妖姬",
    "title": "乐芙兰",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "7",
    "code": "Leblanc",
    "imgSquare": "Leblanc_Square_0.jpg",
    "imgSplash": "Leblanc_Splash_Tile_0.jpg"
  },
  {
    "img": "Vladimir.png",
    "name": "猩红收割者",
    "title": "弗拉基米尔",
    "tags": [
      "Mage",
      "Tank"
    ],
    "id": "8",
    "code": "Vladimir",
    "imgSquare": "Vladimir_Square_0.jpg",
    "imgSplash": "Vladimir_Splash_Tile_0.jpg"
  },
  {
    "img": "FiddleSticks.png",
    "name": "末日使者",
    "title": "费德提克",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "9",
    "code": "FiddleSticks",
    "imgSquare": "FiddleSticks_Square_0.jpg",
    "imgSplash": "FiddleSticks_Splash_Tile_0.jpg"
  },
  {
    "img": "Kayle.png",
    "name": "审判天使",
    "title": "凯尔",
    "tags": [
      "Fighter",
      "Support"
    ],
    "id": "10",
    "code": "Kayle",
    "imgSquare": "Kayle_Square_0.jpg",
    "imgSplash": "Kayle_Splash_Tile_0.jpg"
  },
  {
    "img": "MasterYi.png",
    "name": "无极剑圣",
    "title": "易",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "11",
    "code": "MasterYi",
    "imgSquare": "MasterYi_Square_0.jpg",
    "imgSplash": "MasterYi_Splash_Tile_0.jpg"
  },
  {
    "img": "Alistar.png",
    "name": "牛头酋长",
    "title": "阿利斯塔",
    "tags": [
      "Tank",
      "Support"
    ],
    "id": "12",
    "code": "Alistar",
    "imgSquare": "Alistar_Square_0.jpg",
    "imgSplash": "Alistar_Splash_Tile_0.jpg"
  },
  {
    "img": "Ryze.png",
    "name": "流浪法师",
    "title": "瑞兹",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "id": "13",
    "code": "Ryze",
    "imgSquare": "Ryze_Square_0.jpg",
    "imgSplash": "Ryze_Splash_Tile_0.jpg"
  },
  {
    "img": "Sion.png",
    "name": "亡灵战神",
    "title": "赛恩",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "14",
    "code": "Sion",
    "imgSquare": "Sion_Square_0.jpg",
    "imgSplash": "Sion_Splash_Tile_0.jpg"
  },
  {
    "img": "Sivir.png",
    "name": "战争女神",
    "title": "希维尔",
    "tags": [
      "Marksman"
    ],
    "id": "15",
    "code": "Sivir",
    "imgSquare": "Sivir_Square_0.jpg",
    "imgSplash": "Sivir_Splash_Tile_0.jpg"
  },
  {
    "img": "Soraka.png",
    "name": "众星之子",
    "title": "索拉卡",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "16",
    "code": "Soraka",
    "imgSquare": "Soraka_Square_0.jpg",
    "imgSplash": "Soraka_Splash_Tile_0.jpg"
  },
  {
    "img": "Teemo.png",
    "name": "迅捷斥候",
    "title": "提莫",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "17",
    "code": "Teemo",
    "imgSquare": "Teemo_Square_0.jpg",
    "imgSplash": "Teemo_Splash_Tile_0.jpg"
  },
  {
    "img": "Tristana.png",
    "name": "麦林炮手",
    "title": "崔丝塔娜",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "18",
    "code": "Tristana",
    "imgSquare": "Tristana_Square_0.jpg",
    "imgSplash": "Tristana_Splash_Tile_0.jpg"
  },
  {
    "img": "Warwick.png",
    "name": "嗜血猎手",
    "title": "沃里克",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "19",
    "code": "Warwick",
    "imgSquare": "Warwick_Square_0.jpg",
    "imgSplash": "Warwick_Splash_Tile_0.jpg"
  },
  {
    "img": "Nunu.png",
    "name": "雪人骑士",
    "title": "努努",
    "tags": [
      "Support",
      "Fighter"
    ],
    "id": "20",
    "code": "Nunu",
    "imgSquare": "Nunu_Square_0.jpg",
    "imgSplash": "Nunu_Splash_Tile_0.jpg"
  },
  {
    "img": "MissFortune.png",
    "name": "赏金猎人",
    "title": "厄运小姐",
    "tags": [
      "Marksman"
    ],
    "id": "21",
    "code": "MissFortune",
    "imgSquare": "MissFortune_Square_0.jpg",
    "imgSplash": "MissFortune_Splash_Tile_0.jpg"
  },
  {
    "img": "Ashe.png",
    "name": "寒冰射手",
    "title": "艾希",
    "tags": [
      "Marksman",
      "Support"
    ],
    "id": "22",
    "code": "Ashe",
    "imgSquare": "Ashe_Square_0.jpg",
    "imgSplash": "Ashe_Splash_Tile_0.jpg"
  },
  {
    "img": "Tryndamere.png",
    "name": "蛮族之王",
    "title": "泰达米尔",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "23",
    "code": "Tryndamere",
    "imgSquare": "Tryndamere_Square_0.jpg",
    "imgSplash": "Tryndamere_Splash_Tile_0.jpg"
  },
  {
    "img": "Jax.png",
    "name": "武器大师",
    "title": "贾克斯",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "24",
    "code": "Jax",
    "imgSquare": "Jax_Square_0.jpg",
    "imgSplash": "Jax_Splash_Tile_0.jpg"
  },
  {
    "img": "Morgana.png",
    "name": "堕落天使",
    "title": "莫甘娜",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "25",
    "code": "Morgana",
    "imgSquare": "Morgana_Square_0.jpg",
    "imgSplash": "Morgana_Splash_Tile_0.jpg"
  },
  {
    "img": "Zilean.png",
    "name": "时光守护者",
    "title": "基兰",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "26",
    "code": "Zilean",
    "imgSquare": "Zilean_Square_0.jpg",
    "imgSplash": "Zilean_Splash_Tile_0.jpg"
  },
  {
    "img": "Singed.png",
    "name": "炼金术士",
    "title": "辛吉德",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "27",
    "code": "Singed",
    "imgSquare": "Singed_Square_0.jpg",
    "imgSplash": "Singed_Splash_Tile_0.jpg"
  },
  {
    "img": "Evelynn.png",
    "name": "寡妇制造者",
    "title": "伊芙琳",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "28",
    "code": "Evelynn",
    "imgSquare": "Evelynn_Square_0.jpg",
    "imgSplash": "Evelynn_Splash_Tile_0.jpg"
  },
  {
    "img": "Twitch.png",
    "name": "瘟疫之源",
    "title": "图奇",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "29",
    "code": "Twitch",
    "imgSquare": "Twitch_Square_0.jpg",
    "imgSplash": "Twitch_Splash_Tile_0.jpg"
  },
  {
    "img": "Karthus.png",
    "name": "死亡颂唱者",
    "title": "卡尔萨斯",
    "tags": [
      "Mage"
    ],
    "id": "30",
    "code": "Karthus",
    "imgSquare": "Karthus_Square_0.jpg",
    "imgSplash": "Karthus_Splash_Tile_0.jpg"
  },
  {
    "img": "Chogath.png",
    "name": "虚空恐惧",
    "title": "科加斯",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "31",
    "code": "Chogath",
    "imgSquare": "Chogath_Square_0.jpg",
    "imgSplash": "Chogath_Splash_Tile_0.jpg"
  },
  {
    "img": "Amumu.png",
    "name": "殇之木乃伊",
    "title": "阿木木",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "32",
    "code": "Amumu",
    "imgSquare": "Amumu_Square_0.jpg",
    "imgSplash": "Amumu_Splash_Tile_0.jpg"
  },
  {
    "img": "Rammus.png",
    "name": "披甲龙龟",
    "title": "拉莫斯",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "33",
    "code": "Rammus",
    "imgSquare": "Rammus_Square_0.jpg",
    "imgSplash": "Rammus_Splash_Tile_0.jpg"
  },
  {
    "img": "Anivia.png",
    "name": "冰晶凤凰",
    "title": "艾尼维亚",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "34",
    "code": "Anivia",
    "imgSquare": "Anivia_Square_0.jpg",
    "imgSplash": "Anivia_Splash_Tile_0.jpg"
  },
  {
    "img": "Shaco.png",
    "name": "恶魔小丑",
    "title": "萨科",
    "tags": [
      "Assassin"
    ],
    "id": "35",
    "code": "Shaco",
    "imgSquare": "Shaco_Square_0.jpg",
    "imgSplash": "Shaco_Splash_Tile_0.jpg"
  },
  {
    "img": "DrMundo.png",
    "name": "祖安狂人",
    "title": "蒙多医生",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "36",
    "code": "DrMundo",
    "imgSquare": "DrMundo_Square_0.jpg",
    "imgSplash": "DrMundo_Splash_Tile_0.jpg"
  },
  {
    "img": "Sona.png",
    "name": "琴瑟仙女",
    "title": "娑娜",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "37",
    "code": "Sona",
    "imgSquare": "Sona_Square_0.jpg",
    "imgSplash": "Sona_Splash_Tile_0.jpg"
  },
  {
    "img": "Kassadin.png",
    "name": "虚空行者",
    "title": "卡萨丁",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "38",
    "code": "Kassadin",
    "imgSquare": "Kassadin_Square_0.jpg",
    "imgSplash": "Kassadin_Splash_Tile_0.jpg"
  },
  {
    "img": "Irelia.png",
    "name": "刀锋意志",
    "title": "艾瑞莉娅",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "39",
    "code": "Irelia",
    "imgSquare": "Irelia_Square_0.jpg",
    "imgSplash": "Irelia_Splash_Tile_0.jpg"
  },
  {
    "img": "Janna.png",
    "name": "风暴之怒",
    "title": "迦娜",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "40",
    "code": "Janna",
    "imgSquare": "Janna_Square_0.jpg",
    "imgSplash": "Janna_Splash_Tile_0.jpg"
  },
  {
    "img": "Gangplank.png",
    "name": "海洋之灾",
    "title": "普朗克",
    "tags": [
      "Fighter"
    ],
    "id": "41",
    "code": "Gangplank",
    "imgSquare": "Gangplank_Square_0.jpg",
    "imgSplash": "Gangplank_Splash_Tile_0.jpg"
  },
  {
    "img": "Corki.png",
    "name": "英勇投弹手",
    "title": "库奇",
    "tags": [
      "Marksman"
    ],
    "id": "42",
    "code": "Corki",
    "imgSquare": "Corki_Square_0.jpg",
    "imgSplash": "Corki_Splash_Tile_0.jpg"
  },
  {
    "img": "Karma.png",
    "name": "天启者",
    "title": "卡尔玛",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "43",
    "code": "Karma",
    "imgSquare": "Karma_Square_0.jpg",
    "imgSplash": "Karma_Splash_Tile_0.jpg"
  },
  {
    "img": "Taric.png",
    "name": "宝石骑士",
    "title": "塔里克",
    "tags": [
      "Support",
      "Fighter"
    ],
    "id": "44",
    "code": "Taric",
    "imgSquare": "Taric_Square_0.jpg",
    "imgSplash": "Taric_Splash_Tile_0.jpg"
  },
  {
    "img": "Veigar.png",
    "name": "邪恶小法师",
    "title": "维迦",
    "tags": [
      "Mage"
    ],
    "id": "45",
    "code": "Veigar",
    "imgSquare": "Veigar_Square_0.jpg",
    "imgSplash": "Veigar_Splash_Tile_0.jpg"
  },
  {
    "img": "Trundle.png",
    "name": "巨魔之王",
    "title": "特朗德尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "48",
    "code": "Trundle",
    "imgSquare": "Trundle_Square_0.jpg",
    "imgSplash": "Trundle_Splash_Tile_0.jpg"
  },
  {
    "img": "Swain.png",
    "name": "策士统领",
    "title": "斯维因",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "id": "50",
    "code": "Swain",
    "imgSquare": "Swain_Square_0.jpg",
    "imgSplash": "Swain_Splash_Tile_0.jpg"
  },
  {
    "img": "Caitlyn.png",
    "name": "皮城女警",
    "title": "凯特琳",
    "tags": [
      "Marksman"
    ],
    "id": "51",
    "code": "Caitlyn",
    "imgSquare": "Caitlyn_Square_0.jpg",
    "imgSplash": "Caitlyn_Splash_Tile_0.jpg"
  },
  {
    "img": "Blitzcrank.png",
    "name": "蒸汽机器人",
    "title": "布里茨",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "53",
    "code": "Blitzcrank",
    "imgSquare": "Blitzcrank_Square_0.jpg",
    "imgSplash": "Blitzcrank_Splash_Tile_0.jpg"
  },
  {
    "img": "Malphite.png",
    "name": "熔岩巨兽",
    "title": "墨菲特",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "54",
    "code": "Malphite",
    "imgSquare": "Malphite_Square_0.jpg",
    "imgSplash": "Malphite_Splash_Tile_0.jpg"
  },
  {
    "img": "Katarina.png",
    "name": "不祥之刃",
    "title": "卡特琳娜",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "55",
    "code": "Katarina",
    "imgSquare": "Katarina_Square_0.jpg",
    "imgSplash": "Katarina_Splash_Tile_0.jpg"
  },
  {
    "img": "Nocturne.png",
    "name": "永恒梦魇",
    "title": "魔腾",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "56",
    "code": "Nocturne",
    "imgSquare": "Nocturne_Square_0.jpg",
    "imgSplash": "Nocturne_Splash_Tile_0.jpg"
  },
  {
    "img": "Maokai.png",
    "name": "扭曲树精",
    "title": "茂凯",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "57",
    "code": "Maokai",
    "imgSquare": "Maokai_Square_0.jpg",
    "imgSplash": "Maokai_Splash_Tile_0.jpg"
  },
  {
    "img": "Renekton.png",
    "name": "荒漠屠夫",
    "title": "雷克顿",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "58",
    "code": "Renekton",
    "imgSquare": "Renekton_Square_0.jpg",
    "imgSplash": "Renekton_Splash_Tile_0.jpg"
  },
  {
    "img": "JarvanIV.png",
    "name": "德玛西亚皇子",
    "title": "嘉文四世",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "59",
    "code": "JarvanIV",
    "imgSquare": "JarvanIV_Square_0.jpg",
    "imgSplash": "JarvanIV_Splash_Tile_0.jpg"
  },
  {
    "img": "Elise.png",
    "name": "蜘蛛女皇",
    "title": "伊莉丝",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "id": "60",
    "code": "Elise",
    "imgSquare": "Elise_Square_0.jpg",
    "imgSplash": "Elise_Splash_Tile_0.jpg"
  },
  {
    "img": "Orianna.png",
    "name": "发条魔灵",
    "title": "奥莉安娜",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "61",
    "code": "Orianna",
    "imgSquare": "Orianna_Square_0.jpg",
    "imgSplash": "Orianna_Splash_Tile_0.jpg"
  },
  {
    "img": "MonkeyKing.png",
    "name": "齐天大圣",
    "title": "孙悟空",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "62",
    "code": "MonkeyKing",
    "imgSquare": "MonkeyKing_Square_0.jpg",
    "imgSplash": "MonkeyKing_Splash_Tile_0.jpg"
  },
  {
    "img": "Brand.png",
    "name": "复仇焰魂",
    "title": "布兰德",
    "tags": [
      "Mage"
    ],
    "id": "63",
    "code": "Brand",
    "imgSquare": "Brand_Square_0.jpg",
    "imgSplash": "Brand_Splash_Tile_0.jpg"
  },
  {
    "img": "LeeSin.png",
    "name": "盲僧",
    "title": "李青",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "64",
    "code": "LeeSin",
    "imgSquare": "LeeSin_Square_0.jpg",
    "imgSplash": "LeeSin_Splash_Tile_0.jpg"
  },
  {
    "img": "Vayne.png",
    "name": "暗夜猎手",
    "title": "薇恩",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "67",
    "code": "Vayne",
    "imgSquare": "Vayne_Square_0.jpg",
    "imgSplash": "Vayne_Splash_Tile_0.jpg"
  },
  {
    "img": "Rumble.png",
    "name": "机械公敌",
    "title": "兰博",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "68",
    "code": "Rumble",
    "imgSquare": "Rumble_Square_0.jpg",
    "imgSplash": "Rumble_Splash_Tile_0.jpg"
  },
  {
    "img": "Cassiopeia.png",
    "name": "魔蛇之拥",
    "title": "卡西奥佩娅",
    "tags": [
      "Mage"
    ],
    "id": "69",
    "code": "Cassiopeia",
    "imgSquare": "Cassiopeia_Square_0.jpg",
    "imgSplash": "Cassiopeia_Splash_Tile_0.jpg"
  },
  {
    "img": "Skarner.png",
    "name": "水晶先锋",
    "title": "斯卡纳",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "72",
    "code": "Skarner",
    "imgSquare": "Skarner_Square_0.jpg",
    "imgSplash": "Skarner_Splash_Tile_0.jpg"
  },
  {
    "img": "Heimerdinger.png",
    "name": "大发明家",
    "title": "黑默丁格",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "74",
    "code": "Heimerdinger",
    "imgSquare": "Heimerdinger_Square_0.jpg",
    "imgSplash": "Heimerdinger_Splash_Tile_0.jpg"
  },
  {
    "img": "Nasus.png",
    "name": "沙漠死神",
    "title": "内瑟斯",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "75",
    "code": "Nasus",
    "imgSquare": "Nasus_Square_0.jpg",
    "imgSplash": "Nasus_Splash_Tile_0.jpg"
  },
  {
    "img": "Nidalee.png",
    "name": "狂野女猎手",
    "title": "奈德丽",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "76",
    "code": "Nidalee",
    "imgSquare": "Nidalee_Square_0.jpg",
    "imgSplash": "Nidalee_Splash_Tile_0.jpg"
  },
  {
    "img": "Udyr.png",
    "name": "兽灵行者",
    "title": "乌迪尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "77",
    "code": "Udyr",
    "imgSquare": "Udyr_Square_0.jpg",
    "imgSplash": "Udyr_Splash_Tile_0.jpg"
  },
  {
    "img": "Poppy.png",
    "name": "圣锤之毅",
    "title": "波比",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "78",
    "code": "Poppy",
    "imgSquare": "Poppy_Square_0.jpg",
    "imgSplash": "Poppy_Splash_Tile_0.jpg"
  },
  {
    "img": "Gragas.png",
    "name": "酒桶",
    "title": "古拉加斯",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "79",
    "code": "Gragas",
    "imgSquare": "Gragas_Square_0.jpg",
    "imgSplash": "Gragas_Splash_Tile_0.jpg"
  },
  {
    "img": "Pantheon.png",
    "name": "战争之王",
    "title": "潘森",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "80",
    "code": "Pantheon",
    "imgSquare": "Pantheon_Square_0.jpg",
    "imgSplash": "Pantheon_Splash_Tile_0.jpg"
  },
  {
    "img": "Ezreal.png",
    "name": "探险家",
    "title": "伊泽瑞尔",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "id": "81",
    "code": "Ezreal",
    "imgSquare": "Ezreal_Square_0.jpg",
    "imgSplash": "Ezreal_Splash_Tile_0.jpg"
  },
  {
    "img": "Mordekaiser.png",
    "name": "铁铠冥魂",
    "title": "莫德凯撒",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "82",
    "code": "Mordekaiser",
    "imgSquare": "Mordekaiser_Square_0.jpg",
    "imgSplash": "Mordekaiser_Splash_Tile_0.jpg"
  },
  {
    "img": "Yorick.png",
    "name": "掘墓者",
    "title": "约里克",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "83",
    "code": "Yorick",
    "imgSquare": "Yorick_Square_0.jpg",
    "imgSplash": "Yorick_Splash_Tile_0.jpg"
  },
  {
    "img": "Akali.png",
    "name": "暗影之拳",
    "title": "阿卡丽",
    "tags": [
      "Assassin"
    ],
    "id": "84",
    "code": "Akali",
    "imgSquare": "Akali_Square_0.jpg",
    "imgSplash": "Akali_Splash_Tile_0.jpg"
  },
  {
    "img": "Kennen.png",
    "name": "狂暴之心",
    "title": "凯南",
    "tags": [
      "Mage",
      "Marksman"
    ],
    "id": "85",
    "code": "Kennen",
    "imgSquare": "Kennen_Square_0.jpg",
    "imgSplash": "Kennen_Splash_Tile_0.jpg"
  },
  {
    "img": "Garen.png",
    "name": "德玛西亚之力",
    "title": "盖伦",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "86",
    "code": "Garen",
    "imgSquare": "Garen_Square_0.jpg",
    "imgSplash": "Garen_Splash_Tile_0.jpg"
  },
  {
    "img": "Leona.png",
    "name": "曙光女神",
    "title": "蕾欧娜",
    "tags": [
      "Tank",
      "Support"
    ],
    "id": "89",
    "code": "Leona",
    "imgSquare": "Leona_Square_0.jpg",
    "imgSplash": "Leona_Splash_Tile_0.jpg"
  },
  {
    "img": "Malzahar.png",
    "name": "虚空先知",
    "title": "玛尔扎哈",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "id": "90",
    "code": "Malzahar",
    "imgSquare": "Malzahar_Square_0.jpg",
    "imgSplash": "Malzahar_Splash_Tile_0.jpg"
  },
  {
    "img": "Talon.png",
    "name": "刀锋之影",
    "title": "泰隆",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "91",
    "code": "Talon",
    "imgSquare": "Talon_Square_0.jpg",
    "imgSplash": "Talon_Splash_Tile_0.jpg"
  },
  {
    "img": "Riven.png",
    "name": "放逐之刃",
    "title": "锐雯",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "92",
    "code": "Riven",
    "imgSquare": "Riven_Square_0.jpg",
    "imgSplash": "Riven_Splash_Tile_0.jpg"
  },
  {
    "img": "KogMaw.png",
    "name": "深渊巨口",
    "title": "克格莫",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "id": "96",
    "code": "KogMaw",
    "imgSquare": "KogMaw_Square_0.jpg",
    "imgSplash": "KogMaw_Splash_Tile_0.jpg"
  },
  {
    "img": "Shen.png",
    "name": "暮光之眼",
    "title": "慎",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "98",
    "code": "Shen",
    "imgSquare": "Shen_Square_0.jpg",
    "imgSplash": "Shen_Splash_Tile_0.jpg"
  },
  {
    "img": "Lux.png",
    "name": "光辉女郎",
    "title": "拉克丝",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "99",
    "code": "Lux",
    "imgSquare": "Lux_Square_0.jpg",
    "imgSplash": "Lux_Splash_Tile_0.jpg"
  },
  {
    "img": "Xerath.png",
    "name": "远古巫灵",
    "title": "泽拉斯",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "id": "101",
    "code": "Xerath",
    "imgSquare": "Xerath_Square_0.jpg",
    "imgSplash": "Xerath_Splash_Tile_0.jpg"
  },
  {
    "img": "Shyvana.png",
    "name": "龙血武姬",
    "title": "希瓦娜",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "102",
    "code": "Shyvana",
    "imgSquare": "Shyvana_Square_0.jpg",
    "imgSplash": "Shyvana_Splash_Tile_0.jpg"
  },
  {
    "img": "Ahri.png",
    "name": "九尾妖狐",
    "title": "阿狸",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "id": "103",
    "code": "Ahri",
    "imgSquare": "Ahri_Square_0.jpg",
    "imgSplash": "Ahri_Splash_Tile_0.jpg"
  },
  {
    "img": "Graves.png",
    "name": "法外狂徒",
    "title": "格雷福斯",
    "tags": [
      "Marksman"
    ],
    "id": "104",
    "code": "Graves",
    "imgSquare": "Graves_Square_0.jpg",
    "imgSplash": "Graves_Splash_Tile_0.jpg"
  },
  {
    "img": "Fizz.png",
    "name": "潮汐海灵",
    "title": "菲兹",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "105",
    "code": "Fizz",
    "imgSquare": "Fizz_Square_0.jpg",
    "imgSplash": "Fizz_Splash_Tile_0.jpg"
  },
  {
    "img": "Volibear.png",
    "name": "雷霆咆哮",
    "title": "沃利贝尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "106",
    "code": "Volibear",
    "imgSquare": "Volibear_Square_0.jpg",
    "imgSplash": "Volibear_Splash_Tile_0.jpg"
  },
  {
    "img": "Rengar.png",
    "name": "傲之追猎者",
    "title": "雷恩加尔",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "107",
    "code": "Rengar",
    "imgSquare": "Rengar_Square_0.jpg",
    "imgSplash": "Rengar_Splash_Tile_0.jpg"
  },
  {
    "img": "Varus.png",
    "name": "惩戒之箭",
    "title": "韦鲁斯",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "id": "110",
    "code": "Varus",
    "imgSquare": "Varus_Square_0.jpg",
    "imgSplash": "Varus_Splash_Tile_0.jpg"
  },
  {
    "img": "Nautilus.png",
    "name": "深海泰坦",
    "title": "诺提勒斯",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "111",
    "code": "Nautilus",
    "imgSquare": "Nautilus_Square_0.jpg",
    "imgSplash": "Nautilus_Splash_Tile_0.jpg"
  },
  {
    "img": "Viktor.png",
    "name": "机械先驱",
    "title": "维克托",
    "tags": [
      "Mage"
    ],
    "id": "112",
    "code": "Viktor",
    "imgSquare": "Viktor_Square_0.jpg",
    "imgSplash": "Viktor_Splash_Tile_0.jpg"
  },
  {
    "img": "Sejuani.png",
    "name": "凛冬之怒",
    "title": "瑟庄妮",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "113",
    "code": "Sejuani",
    "imgSquare": "Sejuani_Square_0.jpg",
    "imgSplash": "Sejuani_Splash_Tile_0.jpg"
  },
  {
    "img": "Fiora.png",
    "name": "无双剑姬",
    "title": "菲奥娜",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "114",
    "code": "Fiora",
    "imgSquare": "Fiora_Square_0.jpg",
    "imgSplash": "Fiora_Splash_Tile_0.jpg"
  },
  {
    "img": "Ziggs.png",
    "name": "爆破鬼才",
    "title": "吉格斯",
    "tags": [
      "Mage"
    ],
    "id": "115",
    "code": "Ziggs",
    "imgSquare": "Ziggs_Square_0.jpg",
    "imgSplash": "Ziggs_Splash_Tile_0.jpg"
  },
  {
    "img": "Lulu.png",
    "name": "仙灵女巫",
    "title": "璐璐",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "117",
    "code": "Lulu",
    "imgSquare": "Lulu_Square_0.jpg",
    "imgSplash": "Lulu_Splash_Tile_0.jpg"
  },
  {
    "img": "Draven.png",
    "name": "荣耀行刑官",
    "title": "德莱文",
    "tags": [
      "Marksman"
    ],
    "id": "119",
    "code": "Draven",
    "imgSquare": "Draven_Square_0.jpg",
    "imgSplash": "Draven_Splash_Tile_0.jpg"
  },
  {
    "img": "Hecarim.png",
    "name": "战争之影",
    "title": "赫卡里姆",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "120",
    "code": "Hecarim",
    "imgSquare": "Hecarim_Square_0.jpg",
    "imgSplash": "Hecarim_Splash_Tile_0.jpg"
  },
  {
    "img": "Khazix.png",
    "name": "虚空掠夺者",
    "title": "卡兹克",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "121",
    "code": "Khazix",
    "imgSquare": "Khazix_Square_0.jpg",
    "imgSplash": "Khazix_Splash_Tile_0.jpg"
  },
  {
    "img": "Darius.png",
    "name": "诺克萨斯之手",
    "title": "德莱厄斯",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "122",
    "code": "Darius",
    "imgSquare": "Darius_Square_0.jpg",
    "imgSplash": "Darius_Splash_Tile_0.jpg"
  },
  {
    "img": "Jayce.png",
    "name": "未来守护者",
    "title": "杰斯",
    "tags": [
      "Fighter",
      "Marksman"
    ],
    "id": "126",
    "code": "Jayce",
    "imgSquare": "Jayce_Square_0.jpg",
    "imgSplash": "Jayce_Splash_Tile_0.jpg"
  },
  {
    "img": "Lissandra.png",
    "name": "冰霜女巫",
    "title": "丽桑卓",
    "tags": [
      "Mage"
    ],
    "id": "127",
    "code": "Lissandra",
    "imgSquare": "Lissandra_Square_0.jpg",
    "imgSplash": "Lissandra_Splash_Tile_0.jpg"
  },
  {
    "img": "Diana.png",
    "name": "皎月女神",
    "title": "黛安娜",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "131",
    "code": "Diana",
    "imgSquare": "Diana_Square_0.jpg",
    "imgSplash": "Diana_Splash_Tile_0.jpg"
  },
  {
    "img": "Quinn.png",
    "name": "德玛西亚之翼",
    "title": "奎因",
    "tags": [
      "Marksman",
      "Fighter"
    ],
    "id": "133",
    "code": "Quinn",
    "imgSquare": "Quinn_Square_0.jpg",
    "imgSplash": "Quinn_Splash_Tile_0.jpg"
  },
  {
    "img": "Syndra.png",
    "name": "暗黑元首",
    "title": "辛德拉",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "134",
    "code": "Syndra",
    "imgSquare": "Syndra_Square_0.jpg",
    "imgSplash": "Syndra_Splash_Tile_0.jpg"
  },
  {
    "img": "Zyra.png",
    "name": "荆棘之兴",
    "title": "婕拉",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "143",
    "code": "Zyra",
    "imgSquare": "Zyra_Square_0.jpg",
    "imgSplash": "Zyra_Splash_Tile_0.jpg"
  },
  {
    "img": "Gnar.png",
    "name": "迷失之牙",
    "title": "纳尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "150",
    "code": "Gnar",
    "imgSquare": "Gnar_Square_0.jpg",
    "imgSplash": "Gnar_Splash_Tile_0.jpg"
  },
  {
    "img": "Zac.png",
    "name": "生化魔人",
    "title": "扎克",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "154",
    "code": "Zac",
    "imgSquare": "Zac_Square_0.jpg",
    "imgSplash": "Zac_Splash_Tile_0.jpg"
  },
  {
    "img": "Yasuo.png",
    "name": "疾风剑豪",
    "title": "亚索",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "157",
    "code": "Yasuo",
    "imgSquare": "Yasuo_Square_0.jpg",
    "imgSplash": "Yasuo_Splash_Tile_0.jpg"
  },
  {
    "img": "Velkoz.png",
    "name": "虚空之眼",
    "title": "维克兹",
    "tags": [
      "Mage"
    ],
    "id": "161",
    "code": "Velkoz",
    "imgSquare": "Velkoz_Square_0.jpg",
    "imgSplash": "Velkoz_Splash_Tile_0.jpg"
  },
  {
    "img": "Braum.png",
    "name": "弗雷尔卓德之心",
    "title": "布隆",
    "tags": [
      "Support",
      "Tank"
    ],
    "id": "201",
    "code": "Braum",
    "imgSquare": "Braum_Square_0.jpg",
    "imgSplash": "Braum_Splash_Tile_0.jpg"
  },
  {
    "img": "Kindred.png",
    "name": "永猎双子",
    "title": "千珏",
    "tags": [
      "Marksman"
    ],
    "id": "203",
    "code": "Kindred",
    "imgSquare": "Kindred_Square_0.jpg",
    "imgSplash": "Kindred_Splash_Tile_0.jpg"
  },
  {
    "img": "Jinx.png",
    "name": "暴走萝莉",
    "title": "金克丝",
    "tags": [
      "Marksman"
    ],
    "id": "222",
    "code": "Jinx",
    "imgSquare": "Jinx_Square_0.jpg",
    "imgSplash": "Jinx_Splash_Tile_0.jpg"
  },
  {
    "img": "TahmKench.png",
    "name": "河流之王",
    "title": "塔姆",
    "tags": [
      "Support",
      "Tank"
    ],
    "id": "223",
    "code": "TahmKench",
    "imgSquare": "TahmKench_Square_0.jpg",
    "imgSplash": "TahmKench_Splash_Tile_0.jpg"
  },
  {
    "img": "Lucian.png",
    "name": "圣枪游侠",
    "title": "卢锡安",
    "tags": [
      "Marksman"
    ],
    "id": "236",
    "code": "Lucian",
    "imgSquare": "Lucian_Square_0.jpg",
    "imgSplash": "Lucian_Splash_Tile_0.jpg"
  },
  {
    "img": "Zed.png",
    "name": "影流之主",
    "title": "劫",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "238",
    "code": "Zed",
    "imgSquare": "Zed_Square_0.jpg",
    "imgSplash": "Zed_Splash_Tile_0.jpg"
  },
  {
    "img": "Ekko.png",
    "name": "时间刺客",
    "title": "艾克",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "245",
    "code": "Ekko",
    "imgSquare": "Ekko_Square_0.jpg",
    "imgSplash": "Ekko_Splash_Tile_0.jpg"
  },
  {
    "img": "Vi.png",
    "name": "皮城执法官",
    "title": "蔚",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "254",
    "code": "Vi",
    "imgSquare": "Vi_Square_0.jpg",
    "imgSplash": "Vi_Splash_Tile_0.jpg"
  },
  {
    "img": "Aatrox.png",
    "name": "暗裔剑魔",
    "title": "亚托克斯",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "266",
    "code": "Aatrox",
    "imgSquare": "Aatrox_Square_0.jpg",
    "imgSplash": "Aatrox_Splash_Tile_0.jpg"
  },
  {
    "img": "Nami.png",
    "name": "唤潮鲛姬",
    "title": "娜美",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "267",
    "code": "Nami",
    "imgSquare": "Nami_Square_0.jpg",
    "imgSplash": "Nami_Splash_Tile_0.jpg"
  },
  {
    "img": "Azir.png",
    "name": "沙漠皇帝",
    "title": "阿兹尔",
    "tags": [
      "Mage",
      "Marksman"
    ],
    "id": "268",
    "code": "Azir",
    "imgSquare": "Azir_Square_0.jpg",
    "imgSplash": "Azir_Splash_Tile_0.jpg"
  },
  {
    "img": "Thresh.png",
    "name": "魂锁典狱长",
    "title": "锤石",
    "tags": [
      "Support",
      "Fighter"
    ],
    "id": "412",
    "code": "Thresh",
    "imgSquare": "Thresh_Square_0.jpg",
    "imgSplash": "Thresh_Splash_Tile_0.jpg"
  },
  {
    "img": "Illaoi.png",
    "name": "海兽祭司",
    "title": "俄洛伊",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "420",
    "code": "Illaoi",
    "imgSquare": "Illaoi_Square_0.jpg",
    "imgSplash": "Illaoi_Splash_Tile_0.jpg"
  },
  {
    "img": "RekSai.png",
    "name": "虚空遁地兽",
    "title": "雷克塞",
    "tags": [
      "Fighter"
    ],
    "id": "421",
    "code": "RekSai",
    "imgSquare": "RekSai_Square_0.jpg",
    "imgSplash": "RekSai_Splash_Tile_0.jpg"
  },
  {
    "img": "Kalista.png",
    "name": "复仇之矛",
    "title": "卡莉丝塔",
    "tags": [
      "Marksman"
    ],
    "id": "429",
    "code": "Kalista",
    "imgSquare": "Kalista_Square_0.jpg",
    "imgSplash": "Kalista_Splash_Tile_0.jpg"
  },
  {
    "img": "Bard.png",
    "name": "星界游神",
    "title": "巴德",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "432",
    "code": "Bard",
    "imgSquare": "Bard_Square_0.jpg",
    "imgSplash": "Bard_Splash_Tile_0.jpg"
  }
];
lolObj={
  "1": {
    "img": "Annie.png",
    "name": "黑暗之女",
    "title": "安妮",
    "tags": [
      "Mage"
    ],
    "id": "1",
    "code": "Annie",
    "imgSquare": "Annie_Square_0.jpg",
    "imgSplash": "Annie_Splash_Tile_0.jpg"
  },
  "2": {
    "img": "Olaf.png",
    "name": "狂战士",
    "title": "奥拉夫",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "2",
    "code": "Olaf",
    "imgSquare": "Olaf_Square_0.jpg",
    "imgSplash": "Olaf_Splash_Tile_0.jpg"
  },
  "3": {
    "img": "Galio.png",
    "name": "哨兵之殇",
    "title": "加里奥",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "3",
    "code": "Galio",
    "imgSquare": "Galio_Square_0.jpg",
    "imgSplash": "Galio_Splash_Tile_0.jpg"
  },
  "4": {
    "img": "TwistedFate.png",
    "name": "卡牌大师",
    "title": "崔斯特",
    "tags": [
      "Mage"
    ],
    "id": "4",
    "code": "TwistedFate",
    "imgSquare": "TwistedFate_Square_0.jpg",
    "imgSplash": "TwistedFate_Splash_Tile_0.jpg"
  },
  "5": {
    "img": "XinZhao.png",
    "name": "德邦总管",
    "title": "赵信",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "5",
    "code": "XinZhao",
    "imgSquare": "XinZhao_Square_0.jpg",
    "imgSplash": "XinZhao_Splash_Tile_0.jpg"
  },
  "6": {
    "img": "Urgot.png",
    "name": "首领之傲",
    "title": "厄加特",
    "tags": [
      "Marksman",
      "Fighter"
    ],
    "id": "6",
    "code": "Urgot",
    "imgSquare": "Urgot_Square_0.jpg",
    "imgSplash": "Urgot_Splash_Tile_0.jpg"
  },
  "7": {
    "img": "Leblanc.png",
    "name": "诡术妖姬",
    "title": "乐芙兰",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "7",
    "code": "Leblanc",
    "imgSquare": "Leblanc_Square_0.jpg",
    "imgSplash": "LeBlanc_Splash_Tile_0.jpg"
  },
  "8": {
    "img": "Vladimir.png",
    "name": "猩红收割者",
    "title": "弗拉基米尔",
    "tags": [
      "Mage",
      "Tank"
    ],
    "id": "8",
    "code": "Vladimir",
    "imgSquare": "Vladimir_Square_0.jpg",
    "imgSplash": "Vladimir_Splash_Tile_0.jpg"
  },
  "9": {
    "img": "FiddleSticks.png",
    "name": "末日使者",
    "title": "费德提克",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "9",
    "code": "FiddleSticks",
    "imgSquare": "FiddleSticks_Square_0.jpg",
    "imgSplash": "FiddleSticks_Splash_Tile_0.jpg"
  },
  "10": {
    "img": "Kayle.png",
    "name": "审判天使",
    "title": "凯尔",
    "tags": [
      "Fighter",
      "Support"
    ],
    "id": "10",
    "code": "Kayle",
    "imgSquare": "Kayle_Square_0.jpg",
    "imgSplash": "Kayle_Splash_Tile_0.jpg"
  },
  "11": {
    "img": "MasterYi.png",
    "name": "无极剑圣",
    "title": "易",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "11",
    "code": "MasterYi",
    "imgSquare": "MasterYi_Square_0.jpg",
    "imgSplash": "MasterYi_Splash_Tile_0.jpg"
  },
  "12": {
    "img": "Alistar.png",
    "name": "牛头酋长",
    "title": "阿利斯塔",
    "tags": [
      "Tank",
      "Support"
    ],
    "id": "12",
    "code": "Alistar",
    "imgSquare": "Alistar_Square_0.jpg",
    "imgSplash": "Alistar_Splash_Tile_0.jpg"
  },
  "13": {
    "img": "Ryze.png",
    "name": "流浪法师",
    "title": "瑞兹",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "id": "13",
    "code": "Ryze",
    "imgSquare": "Ryze_Square_0.jpg",
    "imgSplash": "Ryze_Splash_Tile_0.jpg"
  },
  "14": {
    "img": "Sion.png",
    "name": "亡灵战神",
    "title": "赛恩",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "14",
    "code": "Sion",
    "imgSquare": "Sion_Square_0.jpg",
    "imgSplash": "Sion_Splash_Tile_0.jpg"
  },
  "15": {
    "img": "Sivir.png",
    "name": "战争女神",
    "title": "希维尔",
    "tags": [
      "Marksman"
    ],
    "id": "15",
    "code": "Sivir",
    "imgSquare": "Sivir_Square_0.jpg",
    "imgSplash": "Sivir_Splash_Tile_0.jpg"
  },
  "16": {
    "img": "Soraka.png",
    "name": "众星之子",
    "title": "索拉卡",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "16",
    "code": "Soraka",
    "imgSquare": "Soraka_Square_0.jpg",
    "imgSplash": "Soraka_Splash_Tile_0.jpg"
  },
  "17": {
    "img": "Teemo.png",
    "name": "迅捷斥候",
    "title": "提莫",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "17",
    "code": "Teemo",
    "imgSquare": "Teemo_Square_0.jpg",
    "imgSplash": "Teemo_Splash_Tile_0.jpg"
  },
  "18": {
    "img": "Tristana.png",
    "name": "麦林炮手",
    "title": "崔丝塔娜",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "18",
    "code": "Tristana",
    "imgSquare": "Tristana_Square_0.jpg",
    "imgSplash": "Tristana_Splash_Tile_0.jpg"
  },
  "19": {
    "img": "Warwick.png",
    "name": "嗜血猎手",
    "title": "沃里克",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "19",
    "code": "Warwick",
    "imgSquare": "Warwick_Square_0.jpg",
    "imgSplash": "Warwick_Splash_Tile_0.jpg"
  },
  "20": {
    "img": "Nunu.png",
    "name": "雪人骑士",
    "title": "努努",
    "tags": [
      "Support",
      "Fighter"
    ],
    "id": "20",
    "code": "Nunu",
    "imgSquare": "Nunu_Square_0.jpg",
    "imgSplash": "Nunu_Splash_Tile_0.jpg"
  },
  "21": {
    "img": "MissFortune.png",
    "name": "赏金猎人",
    "title": "厄运小姐",
    "tags": [
      "Marksman"
    ],
    "id": "21",
    "code": "MissFortune",
    "imgSquare": "MissFortune_Square_0.jpg",
    "imgSplash": "MissFortune_Splash_Tile_0.jpg"
  },
  "22": {
    "img": "Ashe.png",
    "name": "寒冰射手",
    "title": "艾希",
    "tags": [
      "Marksman",
      "Support"
    ],
    "id": "22",
    "code": "Ashe",
    "imgSquare": "Ashe_Square_0.jpg",
    "imgSplash": "Ashe_Splash_Tile_0.jpg"
  },
  "23": {
    "img": "Tryndamere.png",
    "name": "蛮族之王",
    "title": "泰达米尔",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "23",
    "code": "Tryndamere",
    "imgSquare": "Tryndamere_Square_0.jpg",
    "imgSplash": "Tryndamere_Splash_Tile_0.jpg"
  },
  "24": {
    "img": "Jax.png",
    "name": "武器大师",
    "title": "贾克斯",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "24",
    "code": "Jax",
    "imgSquare": "Jax_Square_0.jpg",
    "imgSplash": "Jax_Splash_Tile_0.jpg"
  },
  "25": {
    "img": "Morgana.png",
    "name": "堕落天使",
    "title": "莫甘娜",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "25",
    "code": "Morgana",
    "imgSquare": "Morgana_Square_0.jpg",
    "imgSplash": "Morgana_Splash_Tile_0.jpg"
  },
  "26": {
    "img": "Zilean.png",
    "name": "时光守护者",
    "title": "基兰",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "26",
    "code": "Zilean",
    "imgSquare": "Zilean_Square_0.jpg",
    "imgSplash": "Zilean_Splash_Tile_0.jpg"
  },
  "27": {
    "img": "Singed.png",
    "name": "炼金术士",
    "title": "辛吉德",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "27",
    "code": "Singed",
    "imgSquare": "Singed_Square_0.jpg",
    "imgSplash": "Singed_Splash_Tile_0.jpg"
  },
  "28": {
    "img": "Evelynn.png",
    "name": "寡妇制造者",
    "title": "伊芙琳",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "28",
    "code": "Evelynn",
    "imgSquare": "Evelynn_Square_0.jpg",
    "imgSplash": "Evelynn_Splash_Tile_0.jpg"
  },
  "29": {
    "img": "Twitch.png",
    "name": "瘟疫之源",
    "title": "图奇",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "29",
    "code": "Twitch",
    "imgSquare": "Twitch_Square_0.jpg",
    "imgSplash": "Twitch_Splash_Tile_0.jpg"
  },
  "30": {
    "img": "Karthus.png",
    "name": "死亡颂唱者",
    "title": "卡尔萨斯",
    "tags": [
      "Mage"
    ],
    "id": "30",
    "code": "Karthus",
    "imgSquare": "Karthus_Square_0.jpg",
    "imgSplash": "Karthus_Splash_Tile_0.jpg"
  },
  "31": {
    "img": "Chogath.png",
    "name": "虚空恐惧",
    "title": "科加斯",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "31",
    "code": "Chogath",
    "imgSquare": "Chogath_Square_0.jpg",
    "imgSplash": "Chogath_Splash_Tile_0.jpg"
  },
  "32": {
    "img": "Amumu.png",
    "name": "殇之木乃伊",
    "title": "阿木木",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "32",
    "code": "Amumu",
    "imgSquare": "Amumu_Square_0.jpg",
    "imgSplash": "Amumu_Splash_Tile_0.jpg"
  },
  "33": {
    "img": "Rammus.png",
    "name": "披甲龙龟",
    "title": "拉莫斯",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "33",
    "code": "Rammus",
    "imgSquare": "Rammus_Square_0.jpg",
    "imgSplash": "Rammus_Splash_Tile_0.jpg"
  },
  "34": {
    "img": "Anivia.png",
    "name": "冰晶凤凰",
    "title": "艾尼维亚",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "34",
    "code": "Anivia",
    "imgSquare": "Anivia_Square_0.jpg",
    "imgSplash": "Anivia_Splash_Tile_0.jpg"
  },
  "35": {
    "img": "Shaco.png",
    "name": "恶魔小丑",
    "title": "萨科",
    "tags": [
      "Assassin"
    ],
    "id": "35",
    "code": "Shaco",
    "imgSquare": "Shaco_Square_0.jpg",
    "imgSplash": "Shaco_Splash_Tile_0.jpg"
  },
  "36": {
    "img": "DrMundo.png",
    "name": "祖安狂人",
    "title": "蒙多医生",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "36",
    "code": "DrMundo",
    "imgSquare": "DrMundo_Square_0.jpg",
    "imgSplash": "DrMundo_Splash_Tile_0.jpg"
  },
  "37": {
    "img": "Sona.png",
    "name": "琴瑟仙女",
    "title": "娑娜",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "37",
    "code": "Sona",
    "imgSquare": "Sona_Square_0.jpg",
    "imgSplash": "Sona_Splash_Tile_0.jpg"
  },
  "38": {
    "img": "Kassadin.png",
    "name": "虚空行者",
    "title": "卡萨丁",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "38",
    "code": "Kassadin",
    "imgSquare": "Kassadin_Square_0.jpg",
    "imgSplash": "Kassadin_Splash_Tile_0.jpg"
  },
  "39": {
    "img": "Irelia.png",
    "name": "刀锋意志",
    "title": "艾瑞莉娅",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "39",
    "code": "Irelia",
    "imgSquare": "Irelia_Square_0.jpg",
    "imgSplash": "Irelia_Splash_Tile_0.jpg"
  },
  "40": {
    "img": "Janna.png",
    "name": "风暴之怒",
    "title": "迦娜",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "40",
    "code": "Janna",
    "imgSquare": "Janna_Square_0.jpg",
    "imgSplash": "Janna_Splash_Tile_0.jpg"
  },
  "41": {
    "img": "Gangplank.png",
    "name": "海洋之灾",
    "title": "普朗克",
    "tags": [
      "Fighter"
    ],
    "id": "41",
    "code": "Gangplank",
    "imgSquare": "Gangplank_Square_0.jpg",
    "imgSplash": "Gangplank_Splash_Tile_0.jpg"
  },
  "42": {
    "img": "Corki.png",
    "name": "英勇投弹手",
    "title": "库奇",
    "tags": [
      "Marksman"
    ],
    "id": "42",
    "code": "Corki",
    "imgSquare": "Corki_Square_0.jpg",
    "imgSplash": "Corki_Splash_Tile_0.jpg"
  },
  "43": {
    "img": "Karma.png",
    "name": "天启者",
    "title": "卡尔玛",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "43",
    "code": "Karma",
    "imgSquare": "Karma_Square_0.jpg",
    "imgSplash": "Karma_Splash_Tile_0.jpg"
  },
  "44": {
    "img": "Taric.png",
    "name": "宝石骑士",
    "title": "塔里克",
    "tags": [
      "Support",
      "Fighter"
    ],
    "id": "44",
    "code": "Taric",
    "imgSquare": "Taric_Square_0.jpg",
    "imgSplash": "Taric_Splash_Tile_0.jpg"
  },
  "45": {
    "img": "Veigar.png",
    "name": "邪恶小法师",
    "title": "维迦",
    "tags": [
      "Mage"
    ],
    "id": "45",
    "code": "Veigar",
    "imgSquare": "Veigar_Square_0.jpg",
    "imgSplash": "Veigar_Splash_Tile_0.jpg"
  },
  "48": {
    "img": "Trundle.png",
    "name": "巨魔之王",
    "title": "特朗德尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "48",
    "code": "Trundle",
    "imgSquare": "Trundle_Square_0.jpg",
    "imgSplash": "Trundle_Splash_Tile_0.jpg"
  },
  "50": {
    "img": "Swain.png",
    "name": "策士统领",
    "title": "斯维因",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "id": "50",
    "code": "Swain",
    "imgSquare": "Swain_Square_0.jpg",
    "imgSplash": "Swain_Splash_Tile_0.jpg"
  },
  "51": {
    "img": "Caitlyn.png",
    "name": "皮城女警",
    "title": "凯特琳",
    "tags": [
      "Marksman"
    ],
    "id": "51",
    "code": "Caitlyn",
    "imgSquare": "Caitlyn_Square_0.jpg",
    "imgSplash": "Caitlyn_Splash_Tile_0.jpg"
  },
  "53": {
    "img": "Blitzcrank.png",
    "name": "蒸汽机器人",
    "title": "布里茨",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "53",
    "code": "Blitzcrank",
    "imgSquare": "Blitzcrank_Square_0.jpg",
    "imgSplash": "Blitzcrank_Splash_Tile_0.jpg"
  },
  "54": {
    "img": "Malphite.png",
    "name": "熔岩巨兽",
    "title": "墨菲特",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "54",
    "code": "Malphite",
    "imgSquare": "Malphite_Square_0.jpg",
    "imgSplash": "Malphite_Splash_Tile_0.jpg"
  },
  "55": {
    "img": "Katarina.png",
    "name": "不祥之刃",
    "title": "卡特琳娜",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "id": "55",
    "code": "Katarina",
    "imgSquare": "Katarina_Square_0.jpg",
    "imgSplash": "Katarina_Splash_Tile_0.jpg"
  },
  "56": {
    "img": "Nocturne.png",
    "name": "永恒梦魇",
    "title": "魔腾",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "56",
    "code": "Nocturne",
    "imgSquare": "Nocturne_Square_0.jpg",
    "imgSplash": "Nocturne_Splash_Tile_0.jpg"
  },
  "57": {
    "img": "Maokai.png",
    "name": "扭曲树精",
    "title": "茂凯",
    "tags": [
      "Tank",
      "Mage"
    ],
    "id": "57",
    "code": "Maokai",
    "imgSquare": "Maokai_Square_0.jpg",
    "imgSplash": "Maokai_Splash_Tile_0.jpg"
  },
  "58": {
    "img": "Renekton.png",
    "name": "荒漠屠夫",
    "title": "雷克顿",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "58",
    "code": "Renekton",
    "imgSquare": "Renekton_Square_0.jpg",
    "imgSplash": "Renekton_Splash_Tile_0.jpg"
  },
  "59": {
    "img": "JarvanIV.png",
    "name": "德玛西亚皇子",
    "title": "嘉文四世",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "59",
    "code": "JarvanIV",
    "imgSquare": "JarvanIV_Square_0.jpg",
    "imgSplash": "JarvanIV_Splash_Tile_0.jpg"
  },
  "60": {
    "img": "Elise.png",
    "name": "蜘蛛女皇",
    "title": "伊莉丝",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "id": "60",
    "code": "Elise",
    "imgSquare": "Elise_Square_0.jpg",
    "imgSplash": "Elise_Splash_Tile_0.jpg"
  },
  "61": {
    "img": "Orianna.png",
    "name": "发条魔灵",
    "title": "奥莉安娜",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "61",
    "code": "Orianna",
    "imgSquare": "Orianna_Square_0.jpg",
    "imgSplash": "Orianna_Splash_Tile_0.jpg"
  },
  "62": {
    "img": "MonkeyKing.png",
    "name": "齐天大圣",
    "title": "孙悟空",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "62",
    "code": "MonkeyKing",
    "imgSquare": "MonkeyKing_Square_0.jpg",
    "imgSplash": "MonkeyKing_Splash_Tile_0.jpg"
  },
  "63": {
    "img": "Brand.png",
    "name": "复仇焰魂",
    "title": "布兰德",
    "tags": [
      "Mage"
    ],
    "id": "63",
    "code": "Brand",
    "imgSquare": "Brand_Square_0.jpg",
    "imgSplash": "Brand_Splash_Tile_0.jpg"
  },
  "64": {
    "img": "LeeSin.png",
    "name": "盲僧",
    "title": "李青",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "64",
    "code": "LeeSin",
    "imgSquare": "LeeSin_Square_0.jpg",
    "imgSplash": "LeeSin_Splash_Tile_0.jpg"
  },
  "67": {
    "img": "Vayne.png",
    "name": "暗夜猎手",
    "title": "薇恩",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "id": "67",
    "code": "Vayne",
    "imgSquare": "Vayne_Square_0.jpg",
    "imgSplash": "Vayne_Splash_Tile_0.jpg"
  },
  "68": {
    "img": "Rumble.png",
    "name": "机械公敌",
    "title": "兰博",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "68",
    "code": "Rumble",
    "imgSquare": "Rumble_Square_0.jpg",
    "imgSplash": "Rumble_Splash_Tile_0.jpg"
  },
  "69": {
    "img": "Cassiopeia.png",
    "name": "魔蛇之拥",
    "title": "卡西奥佩娅",
    "tags": [
      "Mage"
    ],
    "id": "69",
    "code": "Cassiopeia",
    "imgSquare": "Cassiopeia_Square_0.jpg",
    "imgSplash": "Cassiopeia_Splash_Tile_0.jpg"
  },
  "72": {
    "img": "Skarner.png",
    "name": "水晶先锋",
    "title": "斯卡纳",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "72",
    "code": "Skarner",
    "imgSquare": "Skarner_Square_0.jpg",
    "imgSplash": "Skarner_Splash_Tile_0.jpg"
  },
  "74": {
    "img": "Heimerdinger.png",
    "name": "大发明家",
    "title": "黑默丁格",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "74",
    "code": "Heimerdinger",
    "imgSquare": "Heimerdinger_Square_0.jpg",
    "imgSplash": "Heimerdinger_Splash_Tile_0.jpg"
  },
  "75": {
    "img": "Nasus.png",
    "name": "沙漠死神",
    "title": "内瑟斯",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "75",
    "code": "Nasus",
    "imgSquare": "Nasus_Square_0.jpg",
    "imgSplash": "Nasus_Splash_Tile_0.jpg"
  },
  "76": {
    "img": "Nidalee.png",
    "name": "狂野女猎手",
    "title": "奈德丽",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "76",
    "code": "Nidalee",
    "imgSquare": "Nidalee_Square_0.jpg",
    "imgSplash": "Nidalee_Splash_Tile_0.jpg"
  },
  "77": {
    "img": "Udyr.png",
    "name": "兽灵行者",
    "title": "乌迪尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "77",
    "code": "Udyr",
    "imgSquare": "Udyr_Square_0.jpg",
    "imgSplash": "Udyr_Splash_Tile_0.jpg"
  },
  "78": {
    "img": "Poppy.png",
    "name": "圣锤之毅",
    "title": "波比",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "78",
    "code": "Poppy",
    "imgSquare": "Poppy_Square_0.jpg",
    "imgSplash": "Poppy_Splash_Tile_0.jpg"
  },
  "79": {
    "img": "Gragas.png",
    "name": "酒桶",
    "title": "古拉加斯",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "79",
    "code": "Gragas",
    "imgSquare": "Gragas_Square_0.jpg",
    "imgSplash": "Gragas_Splash_Tile_0.jpg"
  },
  "80": {
    "img": "Pantheon.png",
    "name": "战争之王",
    "title": "潘森",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "80",
    "code": "Pantheon",
    "imgSquare": "Pantheon_Square_0.jpg",
    "imgSplash": "Pantheon_Splash_Tile_0.jpg"
  },
  "81": {
    "img": "Ezreal.png",
    "name": "探险家",
    "title": "伊泽瑞尔",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "id": "81",
    "code": "Ezreal",
    "imgSquare": "Ezreal_Square_0.jpg",
    "imgSplash": "Ezreal_Splash_Tile_0.jpg"
  },
  "82": {
    "img": "Mordekaiser.png",
    "name": "铁铠冥魂",
    "title": "莫德凯撒",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "82",
    "code": "Mordekaiser",
    "imgSquare": "Mordekaiser_Square_0.jpg",
    "imgSplash": "Mordekaiser_Splash_Tile_0.jpg"
  },
  "83": {
    "img": "Yorick.png",
    "name": "掘墓者",
    "title": "约里克",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "83",
    "code": "Yorick",
    "imgSquare": "Yorick_Square_0.jpg",
    "imgSplash": "Yorick_Splash_Tile_0.jpg"
  },
  "84": {
    "img": "Akali.png",
    "name": "暗影之拳",
    "title": "阿卡丽",
    "tags": [
      "Assassin"
    ],
    "id": "84",
    "code": "Akali",
    "imgSquare": "Akali_Square_0.jpg",
    "imgSplash": "Akali_Splash_Tile_0.jpg"
  },
  "85": {
    "img": "Kennen.png",
    "name": "狂暴之心",
    "title": "凯南",
    "tags": [
      "Mage",
      "Marksman"
    ],
    "id": "85",
    "code": "Kennen",
    "imgSquare": "Kennen_Square_0.jpg",
    "imgSplash": "Kennen_Splash_Tile_0.jpg"
  },
  "86": {
    "img": "Garen.png",
    "name": "德玛西亚之力",
    "title": "盖伦",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "86",
    "code": "Garen",
    "imgSquare": "Garen_Square_0.jpg",
    "imgSplash": "Garen_Splash_Tile_0.jpg"
  },
  "89": {
    "img": "Leona.png",
    "name": "曙光女神",
    "title": "蕾欧娜",
    "tags": [
      "Tank",
      "Support"
    ],
    "id": "89",
    "code": "Leona",
    "imgSquare": "Leona_Square_0.jpg",
    "imgSplash": "Leona_Splash_Tile_0.jpg"
  },
  "90": {
    "img": "Malzahar.png",
    "name": "虚空先知",
    "title": "玛尔扎哈",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "id": "90",
    "code": "Malzahar",
    "imgSquare": "Malzahar_Square_0.jpg",
    "imgSplash": "Malzahar_Splash_Tile_0.jpg"
  },
  "91": {
    "img": "Talon.png",
    "name": "刀锋之影",
    "title": "泰隆",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "91",
    "code": "Talon",
    "imgSquare": "Talon_Square_0.jpg",
    "imgSplash": "Talon_Splash_Tile_0.jpg"
  },
  "92": {
    "img": "Riven.png",
    "name": "放逐之刃",
    "title": "锐雯",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "92",
    "code": "Riven",
    "imgSquare": "Riven_Square_0.jpg",
    "imgSplash": "Riven_Splash_Tile_0.jpg"
  },
  "96": {
    "img": "KogMaw.png",
    "name": "深渊巨口",
    "title": "克格莫",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "id": "96",
    "code": "KogMaw",
    "imgSquare": "KogMaw_Square_0.jpg",
    "imgSplash": "KogMaw_Splash_Tile_0.jpg"
  },
  "98": {
    "img": "Shen.png",
    "name": "暮光之眼",
    "title": "慎",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "98",
    "code": "Shen",
    "imgSquare": "Shen_Square_0.jpg",
    "imgSplash": "Shen_Splash_Tile_0.jpg"
  },
  "99": {
    "img": "Lux.png",
    "name": "光辉女郎",
    "title": "拉克丝",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "99",
    "code": "Lux",
    "imgSquare": "Lux_Square_0.jpg",
    "imgSplash": "Lux_Splash_Tile_0.jpg"
  },
  "101": {
    "img": "Xerath.png",
    "name": "远古巫灵",
    "title": "泽拉斯",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "id": "101",
    "code": "Xerath",
    "imgSquare": "Xerath_Square_0.jpg",
    "imgSplash": "Xerath_Splash_Tile_0.jpg"
  },
  "102": {
    "img": "Shyvana.png",
    "name": "龙血武姬",
    "title": "希瓦娜",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "102",
    "code": "Shyvana",
    "imgSquare": "Shyvana_Square_0.jpg",
    "imgSplash": "Shyvana_Splash_Tile_0.jpg"
  },
  "103": {
    "img": "Ahri.png",
    "name": "九尾妖狐",
    "title": "阿狸",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "id": "103",
    "code": "Ahri",
    "imgSquare": "Ahri_Square_0.jpg",
    "imgSplash": "Ahri_Splash_Tile_0.jpg"
  },
  "104": {
    "img": "Graves.png",
    "name": "法外狂徒",
    "title": "格雷福斯",
    "tags": [
      "Marksman"
    ],
    "id": "104",
    "code": "Graves",
    "imgSquare": "Graves_Square_0.jpg",
    "imgSplash": "Graves_Splash_Tile_0.jpg"
  },
  "105": {
    "img": "Fizz.png",
    "name": "潮汐海灵",
    "title": "菲兹",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "105",
    "code": "Fizz",
    "imgSquare": "Fizz_Square_0.jpg",
    "imgSplash": "Fizz_Splash_Tile_0.jpg"
  },
  "106": {
    "img": "Volibear.png",
    "name": "雷霆咆哮",
    "title": "沃利贝尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "106",
    "code": "Volibear",
    "imgSquare": "Volibear_Square_0.jpg",
    "imgSplash": "Volibear_Splash_Tile_0.jpg"
  },
  "107": {
    "img": "Rengar.png",
    "name": "傲之追猎者",
    "title": "雷恩加尔",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "107",
    "code": "Rengar",
    "imgSquare": "Rengar_Square_0.jpg",
    "imgSplash": "Rengar_Splash_Tile_0.jpg"
  },
  "110": {
    "img": "Varus.png",
    "name": "惩戒之箭",
    "title": "韦鲁斯",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "id": "110",
    "code": "Varus",
    "imgSquare": "Varus_Square_0.jpg",
    "imgSplash": "Varus_Splash_Tile_0.jpg"
  },
  "111": {
    "img": "Nautilus.png",
    "name": "深海泰坦",
    "title": "诺提勒斯",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "111",
    "code": "Nautilus",
    "imgSquare": "Nautilus_Square_0.jpg",
    "imgSplash": "Nautilus_Splash_Tile_0.jpg"
  },
  "112": {
    "img": "Viktor.png",
    "name": "机械先驱",
    "title": "维克托",
    "tags": [
      "Mage"
    ],
    "id": "112",
    "code": "Viktor",
    "imgSquare": "Viktor_Square_0.jpg",
    "imgSplash": "Viktor_Splash_Tile_0.jpg"
  },
  "113": {
    "img": "Sejuani.png",
    "name": "凛冬之怒",
    "title": "瑟庄妮",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "113",
    "code": "Sejuani",
    "imgSquare": "Sejuani_Square_0.jpg",
    "imgSplash": "Sejuani_Splash_Tile_0.jpg"
  },
  "114": {
    "img": "Fiora.png",
    "name": "无双剑姬",
    "title": "菲奥娜",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "114",
    "code": "Fiora",
    "imgSquare": "Fiora_Square_0.jpg",
    "imgSplash": "Fiora_Splash_Tile_0.jpg"
  },
  "115": {
    "img": "Ziggs.png",
    "name": "爆破鬼才",
    "title": "吉格斯",
    "tags": [
      "Mage"
    ],
    "id": "115",
    "code": "Ziggs",
    "imgSquare": "Ziggs_Square_0.jpg",
    "imgSplash": "Ziggs_Splash_Tile_0.jpg"
  },
  "117": {
    "img": "Lulu.png",
    "name": "仙灵女巫",
    "title": "璐璐",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "117",
    "code": "Lulu",
    "imgSquare": "Lulu_Square_0.jpg",
    "imgSplash": "Lulu_Splash_Tile_0.jpg"
  },
  "119": {
    "img": "Draven.png",
    "name": "荣耀行刑官",
    "title": "德莱文",
    "tags": [
      "Marksman"
    ],
    "id": "119",
    "code": "Draven",
    "imgSquare": "Draven_Square_0.jpg",
    "imgSplash": "Draven_Splash_Tile_0.jpg"
  },
  "120": {
    "img": "Hecarim.png",
    "name": "战争之影",
    "title": "赫卡里姆",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "120",
    "code": "Hecarim",
    "imgSquare": "Hecarim_Square_0.jpg",
    "imgSplash": "Hecarim_Splash_Tile_0.jpg"
  },
  "121": {
    "img": "Khazix.png",
    "name": "虚空掠夺者",
    "title": "卡兹克",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "121",
    "code": "Khazix",
    "imgSquare": "Khazix_Square_0.jpg",
    "imgSplash": "Khazix_Splash_Tile_0.jpg"
  },
  "122": {
    "img": "Darius.png",
    "name": "诺克萨斯之手",
    "title": "德莱厄斯",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "122",
    "code": "Darius",
    "imgSquare": "Darius_Square_0.jpg",
    "imgSplash": "Darius_Splash_Tile_0.jpg"
  },
  "126": {
    "img": "Jayce.png",
    "name": "未来守护者",
    "title": "杰斯",
    "tags": [
      "Fighter",
      "Marksman"
    ],
    "id": "126",
    "code": "Jayce",
    "imgSquare": "Jayce_Square_0.jpg",
    "imgSplash": "Jayce_Splash_Tile_0.jpg"
  },
  "127": {
    "img": "Lissandra.png",
    "name": "冰霜女巫",
    "title": "丽桑卓",
    "tags": [
      "Mage"
    ],
    "id": "127",
    "code": "Lissandra",
    "imgSquare": "Lissandra_Square_0.jpg",
    "imgSplash": "Lissandra_Splash_Tile_0.jpg"
  },
  "131": {
    "img": "Diana.png",
    "name": "皎月女神",
    "title": "黛安娜",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "id": "131",
    "code": "Diana",
    "imgSquare": "Diana_Square_0.jpg",
    "imgSplash": "Diana_Splash_Tile_0.jpg"
  },
  "133": {
    "img": "Quinn.png",
    "name": "德玛西亚之翼",
    "title": "奎因",
    "tags": [
      "Marksman",
      "Fighter"
    ],
    "id": "133",
    "code": "Quinn",
    "imgSquare": "Quinn_Square_0.jpg",
    "imgSplash": "Quinn_Splash_Tile_0.jpg"
  },
  "134": {
    "img": "Syndra.png",
    "name": "暗黑元首",
    "title": "辛德拉",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "134",
    "code": "Syndra",
    "imgSquare": "Syndra_Square_0.jpg",
    "imgSplash": "Syndra_Splash_Tile_0.jpg"
  },
  "136": {
    "img": "AurelionSol.png",
    "name": "奥瑞利安索尔",
    "title": "铸星龙王",
    "tags": [
      "Mage"
    ],
    "id": "136",
    "code": "AurelionSol",
    "imgSquare": "AurelionSol_Square_0.jpg",
    "imgSplash": "AurelionSol_Splash_Tile_0.jpg"
  },
  "143": {
    "img": "Zyra.png",
    "name": "荆棘之兴",
    "title": "婕拉",
    "tags": [
      "Mage",
      "Support"
    ],
    "id": "143",
    "code": "Zyra",
    "imgSquare": "Zyra_Square_0.jpg",
    "imgSplash": "Zyra_Splash_Tile_0.jpg"
  },
  "150": {
    "img": "Gnar.png",
    "name": "迷失之牙",
    "title": "纳尔",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "150",
    "code": "Gnar",
    "imgSquare": "Gnar_Square_0.jpg",
    "imgSplash": "Gnar_Splash_Tile_0.jpg"
  },
  "154": {
    "img": "Zac.png",
    "name": "生化魔人",
    "title": "扎克",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "id": "154",
    "code": "Zac",
    "imgSquare": "Zac_Square_0.jpg",
    "imgSplash": "Zac_Splash_Tile_0.jpg"
  },
  "157": {
    "img": "Yasuo.png",
    "name": "疾风剑豪",
    "title": "亚索",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "157",
    "code": "Yasuo",
    "imgSquare": "Yasuo_Square_0.jpg",
    "imgSplash": "Yasuo_Splash_Tile_0.jpg"
  },
  "161": {
    "img": "Velkoz.png",
    "name": "虚空之眼",
    "title": "维克兹",
    "tags": [
      "Mage"
    ],
    "id": "161",
    "code": "Velkoz",
    "imgSquare": "Velkoz_Square_0.jpg",
    "imgSplash": "Velkoz_Splash_Tile_0.jpg"
  },
  "201": {
    "img": "Braum.png",
    "name": "弗雷尔卓德之心",
    "title": "布隆",
    "tags": [
      "Support",
      "Tank"
    ],
    "id": "201",
    "code": "Braum",
    "imgSquare": "Braum_Square_0.jpg",
    "imgSplash": "Braum_Splash_Tile_0.jpg"
  },
  "202": {
    "img": "Jhin.png",
    "name": "烬",
    "title": "戏命师",
    "tags": [
      "Mage"
    ],
    "id": "202",
    "code": "Jhin",
    "imgSquare": "Jhin_Square_0.jpg",
    "imgSplash": "Jhin_Splash_Tile_0.jpg"
  },
  "203": {
    "img": "Kindred.png",
    "name": "永猎双子",
    "title": "千珏",
    "tags": [
      "Marksman"
    ],
    "id": "203",
    "code": "Kindred",
    "imgSquare": "Kindred_Square_0.jpg",
    "imgSplash": "Kindred_Splash_Tile_0.jpg"
  },
  "222": {
    "img": "Jinx.png",
    "name": "暴走萝莉",
    "title": "金克丝",
    "tags": [
      "Marksman"
    ],
    "id": "222",
    "code": "Jinx",
    "imgSquare": "Jinx_Square_0.jpg",
    "imgSplash": "Jinx_Splash_Tile_0.jpg"
  },
  "223": {
    "img": "TahmKench.png",
    "name": "河流之王",
    "title": "塔姆",
    "tags": [
      "Support",
      "Tank"
    ],
    "id": "223",
    "code": "TahmKench",
    "imgSquare": "TahmKench_Square_0.jpg",
    "imgSplash": "TahmKench_Splash_Tile_0.jpg"
  },
  "236": {
    "img": "Lucian.png",
    "name": "圣枪游侠",
    "title": "卢锡安",
    "tags": [
      "Marksman"
    ],
    "id": "236",
    "code": "Lucian",
    "imgSquare": "Lucian_Square_0.jpg",
    "imgSplash": "Lucian_Splash_Tile_0.jpg"
  },
  "238": {
    "img": "Zed.png",
    "name": "影流之主",
    "title": "劫",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "238",
    "code": "Zed",
    "imgSquare": "Zed_Square_0.jpg",
    "imgSplash": "Zed_Splash_Tile_0.jpg"
  },
  "245": {
    "img": "Ekko.png",
    "name": "时间刺客",
    "title": "艾克",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "id": "245",
    "code": "Ekko",
    "imgSquare": "Ekko_Square_0.jpg",
    "imgSplash": "Ekko_Splash_Tile_0.jpg"
  },
  "254": {
    "img": "Vi.png",
    "name": "皮城执法官",
    "title": "蔚",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "id": "254",
    "code": "Vi",
    "imgSquare": "Vi_Square_0.jpg",
    "imgSplash": "Vi_Splash_Tile_0.jpg"
  },
  "266": {
    "img": "Aatrox.png",
    "name": "暗裔剑魔",
    "title": "亚托克斯",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "266",
    "code": "Aatrox",
    "imgSquare": "Aatrox_Square_0.jpg",
    "imgSplash": "Aatrox_Splash_Tile_0.jpg"
  },
  "267": {
    "img": "Nami.png",
    "name": "唤潮鲛姬",
    "title": "娜美",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "267",
    "code": "Nami",
    "imgSquare": "Nami_Square_0.jpg",
    "imgSplash": "Nami_Splash_Tile_0.jpg"
  },
  "268": {
    "img": "Azir.png",
    "name": "沙漠皇帝",
    "title": "阿兹尔",
    "tags": [
      "Mage",
      "Marksman"
    ],
    "id": "268",
    "code": "Azir",
    "imgSquare": "Azir_Square_0.jpg",
    "imgSplash": "Azir_Splash_Tile_0.jpg"
  },
  "412": {
    "img": "Thresh.png",
    "name": "魂锁典狱长",
    "title": "锤石",
    "tags": [
      "Support",
      "Fighter"
    ],
    "id": "412",
    "code": "Thresh",
    "imgSquare": "Thresh_Square_0.jpg",
    "imgSplash": "Thresh_Splash_Tile_0.jpg"
  },
  "420": {
    "img": "Illaoi.png",
    "name": "海兽祭司",
    "title": "俄洛伊",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "id": "420",
    "code": "Illaoi",
    "imgSquare": "Illaoi_Square_0.jpg",
    "imgSplash": "Illaoi_Splash_Tile_0.jpg"
  },
  "421": {
    "img": "RekSai.png",
    "name": "虚空遁地兽",
    "title": "雷克塞",
    "tags": [
      "Fighter"
    ],
    "id": "421",
    "code": "RekSai",
    "imgSquare": "RekSai_Square_0.jpg",
    "imgSplash": "RekSai_Splash_Tile_0.jpg"
  },
  "429": {
    "img": "Kalista.png",
    "name": "复仇之矛",
    "title": "卡莉丝塔",
    "tags": [
      "Marksman"
    ],
    "id": "429",
    "code": "Kalista",
    "imgSquare": "Kalista_Square_0.jpg",
    "imgSplash": "Kalista_Splash_Tile_0.jpg"
  },
  "432": {
    "img": "Bard.png",
    "name": "星界游神",
    "title": "巴德",
    "tags": [
      "Support",
      "Mage"
    ],
    "id": "432",
    "code": "Bard",
    "imgSquare": "Bard_Square_0.jpg",
    "imgSplash": "Bard_Splash_Tile_0.jpg"
  }
};

// rank
var rank={
    rankMap:{50:"青铜Ⅰ",51:"青铜Ⅱ",52:"青铜Ⅲ",53:"青铜Ⅳ",54:"青铜Ⅴ",40:"白银Ⅰ",41:"白银Ⅱ",42:"白银Ⅲ",43:"白银Ⅳ",44:"白银Ⅴ",30:"黄金Ⅰ",31:"黄金Ⅱ",32:"黄金Ⅲ",33:"黄金Ⅳ",34:"黄金Ⅴ",20:"铂金Ⅰ",21:"铂金Ⅱ",22:"铂金Ⅲ",23:"铂金Ⅳ",24:"铂金Ⅴ",10:"钻石Ⅰ",11:"钻石Ⅱ",12:"钻石Ⅲ",13:"钻石Ⅳ",14:"钻石Ⅴ","00":"最强王者",60:"超凡大师",255255:"无段位"},
    rankFunc:function(tier,queue){
        return rank.rankMap[String(tier)+String(queue)]
    }
}

//ages
var ages=["18岁以下","18岁至23岁","24岁至30岁","30岁以上",]

//lolrole
var lolrole={
    adc:"ADC",
    aux:"辅助",
    up:"上单",
    mid:"中单",
    jungle:"打野"

}
var lolrolezh={
    "ADC" :"adc" ,
    "辅助":"aux",
    "上单":"up",
    "中单":"mid",
    "打野":"jungle"

}
var lolroleArr=[
    {code:"adc" ,name:"ADC" },
    {code:"aux" ,name:"辅助" },
    {code:"up" ,name:"上单" },
    {code:"mid" ,name:"中单" },
    {code:"jungle" ,name:"打野" },
]

//sex
var sexObj={
    "男":1,
    "女":0,
}

function stopFunc(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
}


function PCorMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
        //console.log("Mobile")
}
    else {
       //console.log("PC")
    }
}//判断PC还是Mobile
PCorMobile();

var pphone=new RegExp("phone|pod|iPhone|iPod|Android|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone",'gi')
    //ios|Mobile 减去

var pipad= new RegExp("pad|iPad",'i')
var userAgent=navigator.userAgent;

var pm={}
    pm.phone=pphone.test(userAgent)
    pm.ipad=pipad.test(userAgent)
    pm.pc=!pm.phone&&!pm.ipad

if(!pm.pc){
    $(".gotopPart").removeClass("hidden") 
}else{
    $(".gotopPart").addClass("hidden") 
}


if(html!="login"){
   
    var loginTime=localStorage.getItem("loginTime");
    if(loginTime==null){
      $.ajax({
          async: false,
          url: dataport.loginTime,
          type: "GET",
          dataType: 'jsonp',
          jsonp: 'jsoncallback',
          contentType: 'application/jsonp;charset=UTF-8',

          
          timeout: 5000,
          success: function(data) {
            
            localStorage.setItem("loginTime", eval(data));
            // postLoginAndLogout()
          },
          error: function() {}
      });  
    }else{
        // postLoginAndLogout()
    }


}

function postLoginAndLogout(){
    setInterval(function(){
        var newactionObj=actionObj
        var loginTime=localStorage.getItem("loginTime");
            newactionObj.loginTime=loginTime
            // console.log(newactionObj)
            BOOMLogging.LoginAndLogout(newactionObj) 
    },5*1000)     
}



mainApp.factory("ajax", function ($http) {
    var ajax = {
        get: function (url, success, error) {
            $http.get(url,{contentType: 'application/json;charset=UTF-8',datatype:"json"}).success(success).error(error)
        },
        post: function (url, data,success, error) {
            $http.get(url,data,{datatype:"json"}).success(success).error(error)
        },
        create: function (url, data, success, error) {
            $http.post(url, data, {contentType: 'application/json;charset=UTF-8',timeout: 5000}).success(success).error(error)
        },
        update: function (url, data, success, error) {
            $http.put(url, data,{contentType: 'application/json;charset=UTF-8'}).success(success).error(error)
        },
        delete: function (url, success, error) {
            $http.delete(url,{contentType: 'application/json;charset=UTF-8'}).success(success).error(error)
        },
        jsonp:function (url, success, error) {
            $http.jsonp(url).success(success).error(error)
        },
        uploadImg:function(url,data,success,error){

            $.ajax({
                url: url,
                type: "post",
                processData: false,
                contentType: false,
                data: data,
                beforeSend: function(request) {
                    request.setRequestHeader("Accept", "application/json");
                },
                success: success,
                error: error
            });
        }
    };
    return ajax;
})


var errorObj={
    error:function(e){
        // console.log(e)
    }
}





function Timehandle1(data){
  var time=new Date(data),
      YYYY=time.getFullYear(),
      MM=time.getMonth()+1,
      DD=time.getDate();
  var str=YYYY+"年"+MM+"月"+DD+"日"
  return str
}

function Timehandle2(data){
  var time=new Date(data),
      hh=time.getHours(),
      mm=time.getMinutes();
      if(mm<10){
        mm="0"+mm
      }

  var str=hh+":"+mm
  return str
}


var teachers = {
    "8": {
        name: "阿宣老师",
        qq: "3503455034",
        img: "zaomiao.jpg",
        dan:"大师",
        role:"中、野 ",
        heros:["Zed.png","Graves.png", "Khazix.png"],
        teacherId:8,
        well:100,
        intro:"赛季打到大师，擅长中野。要学习劫，男枪，螳螂的可以找我！  "
    },
    "9": {
        name: "苏格老师",
        qq: "3504345630",
        img: "zaomiao.jpg",
        dan:"大师",
        role:"AP、ADC、辅助",
        heros:["Ahri.png","Leblanc.png", "Vayne.png"],
        teacherId:9,
        well:100,
        intro:"擅长英雄妖姬，狐狸，维克托，VN女警,EZ想学习的都可以找我哦！"
    },
    "10": {
        name: "冈老师",
        qq: "3503097413",
        img: "zaomiao.jpg",
        dan:"上赛季：王者500点",
        role:"上、AD ",
        heros:["Irelia.png","Fiora.png", "Swain.png"],
        teacherId:10,
        well:100,
        intro:"上赛季王者500点，主玩上单，S1老玩家，经验丰富，教学细心。"
    },
    "7": {
        name: "蓝阳老师",
        qq: "3415558509",
        img: "lanyang.jpg",
        dan:"王者",
        role:"  野区制霸，上路通关",
        heros:["LeeSin.png","Tryndamere.png", "Shyvana.png"],
        teacherId:7,
        well:100,
        intro:"本命盲僧，一脚断屌  "
    }, "14": {
        name: "小小酥老师",
        qq: "2182502303",
        img: "chongyang.jpg",
        dan:"王者",
        role:"下路无敌，中路CARRY。上单划水。打野躺赢。",
        heros:["Ezreal.png","Riven.png", "Zed.png","Vayne.png"],
        teacherId:2,
        well:100,
        intro:"本命VN，就是为了1V5。就是要秀的飞起来，如果你想秀，那你就找对人了。最后我们不为别的，我们为了上分而战斗！！！！"
    },

    "2": {
        name: "肥羊老师",
        qq: "469153783",
        img: "chongyang.jpg",
        dan:"王者",
        role:"下路无敌，中路CARRY。上单划水。打野躺赢。",
        heros:["Ezreal.png","Riven.png", "Zed.png","Vayne.png"],
        teacherId:2,
        well:100,
        intro:"本命VN，就是为了1V5。就是要秀的飞起来，如果你想秀，那你就找对人了。最后我们不为别的，我们为了上分而战斗！！！！"
    },
    "4": {
        name: "早苗老师",
        qq: "291656130",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:4,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }, 
    "3": {
        name: "韩小帅",
        qq: "291656130",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:3,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }

  
,"11": {
        name: "银时老师",
        qq: "3436708261",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:11,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }
,"13": {
        name: "陆羽老师",
        qq: "3296765537",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:13,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }

,"5": {
        name: "追影老师",
        qq: "2638987608",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    } ,"15": {
        name:"独笑老师",
	qq:"599412931",
	img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }

 ,"16": {
        name:"阿财老师",
        qq:"2668929519",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }
 ,"291656142": {
        name:"小轩老师",
        qq:"2668929519",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    } ,"291656143": {
        name:"林木老师",
        qq:"2668929519",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    } ,"291656144": {
        name:"小蛇老师",
        qq:"2668929519",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    },"291656145": {
        name:"好哥老师",
        qq:"3383920665",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }
,"291656146": {
        name:"阿信老师",
        qq:"3468262376",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }  
,"291656147": {
        name:"TT老师",
        qq:"2490909763",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    },"291656148": {
        name:"祭酒老师",
        qq:"3297861768",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    },"291656149": {
        name:"江城老师",
        qq:"3116074059",
        qq:"3116074059",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }
,"291656150": {
        name:"大叔老师",
        qq:"3374568023",
        qq:"3116074059",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    },"291656151": {
        name:"子路老师",
        qq:"3481039201",
        qq:"3116074059",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }
,"291656152": {
        name:"驴子老师",
        qq:"3503987232",
        qq:"3116074059",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }
,"291656153": {
        name:"罗汉老师",
        qq:"3447653126",
        qq:"3116074059",
        img: "zaomiao.jpg",
        dan:"钻一",
        role:"上单",
        heros:["Fiora.png","Lucian.png", "Vayne.png"],
        teacherId:5,
        well:100,
        intro:"有爱心.爱动漫.尊老爱幼.打到过国服第三刀妹 很擅长刺客 抠脚瞎子 儿童劫~!  "
    }


};

var teachersOrder=[8,9,2,5,11,14,15]

var teacherContact={291656153:{"qq":"3447653126","name":"xxxx"},291656152:{"qq":"3503987232","name":"xxxx"},291656151:{"qq":"3481039201","name":"xxxx"},291656147:{"qq":"2490909763","name":"xxxx"},291656148:{"qq":"3297861768","name":"xxxx"},291656149:{"qq":"3116074059","name":"xxxx"},291656150:{"qq":"3374568023","name":"xxxx"},291656146:{"qq":"3468262376","name":"xxxx"},291656142:{"qq":"1341902671",name:"xxxxx"},291656143:{"qq":"507205250",name:"xxxxx"},291656144:{"qq":"3093497872",name:"xxxxx"},16:{"qq":"2668929519",name:"xxxxx"},15:{"name":"xxx",qq:"599412931"},14:{"name":"小小酥","qq":"2182502303"},10:{"name":"阿冈老师 ",qq:"469153783 "},1:{"name":"阿坤老师 ",qq:"894330094 "},2:{"name":" 肥羊老师",qq:"469153783 "},3:{"name":"小帅老师",qq:"752503667"},4:{"name":" 早苗老师",qq:"291656130"},7:{"name":"蓝阳老师","qq":"3415558509"},11:{"name":"银时老师","qq":"3436708261"} ,13:{"name":"陆羽","qq":"3296765537"} ,5:{"name":"追影老师","qq":"2638987608"} };
    mainApp.config( [
    '$compileProvider',
    function( $compileProvider )
    {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|tencent):/);
        
    }])

function stopFunc(e){
    e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
}

var eventUint={
    add:function(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,fn);
        }else{
            ele["on"+type]=fn;
        }
    },
    remove:function(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn,false);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,fn);
        }else{
            ele["on"+type]= null ;
        }
    },
}


/* ===============================
  function*/


$(function(){
    $("#ieBtn").on("click",function(){
        $("#ieNav>.iepart-nav").toggle()
    })
})
