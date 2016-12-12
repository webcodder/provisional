/**
 * Created by Administrator on 2016/11/23.
 */
$(function () {

    var thisApi = {
        statue: {dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
            product: "/wx/school/v1.0/statue"
        },
        teacher: {
            dev: "mock/teacher.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj /lol/allTeacher",
            product: "/wx/school/v1.0/ssj /lol/allTeacher"
        },
        ssjevaluate: {
            dev: "mock/ssjevaluate.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/hasNeedEvaluate",
            product: "/wx/school/v1.0/ssj/lol/hasNeedEvaluate"
        },
        ssjappoint: {
            dev: "mock/ssjappoint.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/statue",
            product: "/wx/school/v1.0/ssj/lol/statue"
        },
        recommend: {
            dev: "mock/recommend.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/recommend",
            product: "/wx/school/v1.0/ssj/lol/recommend"
        },
        ssjdynamics: {
            dev: "mock/ssjdynamics.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/latestDynamics",
            product: "/wx/school/v1.0/ssj/lol/latestDynamics"
        }
    };
    bMock.setFace(thisApi);
    bMock.setEnv("product")


    //获取登录状态
    function getStatus() {
        $.get(bMock.getFace("statue"), function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    }

    //时间戳转换
    function formatDate(now) {
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var week = now.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var hour = now.getHours();
        var minute = now.getMinutes();
        return month + " 月 " + date + " 日 " + " ( " + weekDay[week] + " ) " + hour + ":" + minute;
    }


    //学员userId查询
    var studentId;
    var studentNum;

    function getStudent() {
        $.ajax
        ({
            async: false,
            url: bMock.getFace("statue"),
            success: function (data) {
                if (!data.data) {
                    window.location.href = "index.html";
                    return;
                }

                studentId = data.data.userInfo.userId;
                studentNum = data.data.student.studentNum;
                console.log(studentNum);
            }
        });
    }

    getStudent();



    //获取老师信息

    var selectTeacher;

    function getTeacher(value) {
        var thisTeacher;
        $.ajax({
            async: false,
            url: bMock.getFace("teacher"),
            success: function (data, status) {
                for (var i = 0; i < data.data.length; i++) {
                    //console.log(data.data[i].userId);
                    if (data.data[i].userId === Number(value)) {
                        thisTeacher = data.data[i];
                        selectTeacher = thisTeacher;
                    }
                }
            }
        });
        return thisTeacher;
    }

    //获取预约信息
    function getReserve(){
        $.get("wx/school/v1.0/statue", function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    }

    //获取评论信息
    function getEvaluate() {
        $.get(bMock.getFace("ssjevaluate"), function (data, status) {
            console.log(data.data);
            var thisEvaluateStatus = data.data;
            if(thisEvaluateStatus.length===0){
                console.log("data中没有数据");
                $(".evaluate").show();
            }else{
                console.log("data中有数据");
                $(".evaluate").hide();
            }
        });
    }

    //获取我的预约信息
    function getAppoint(){
        $.get(bMock.getFace("ssjappoint"), function (data, status) {
            switch (data.data.statue) {
                case "apply" :
                    console.log('无预约');
                    $(".evaluate img").attr("src","images/ssjEvaService1.gif");
                    $(".evaluate a")[0].href="ssjProcessConn.html";

                    $(".explains").hide();
                    $(".appoint1").hide();
                    $(".deta").hide();
                    break;
                case "wait" :
                    console.log('已经有申请，需要等待');

                    var sections="";
                    //$.each(data.data.lolServiceApplyDetailResponse,function(i,v){
                        var apTime = formatDate(new Date(data.data.lolServiceApplyDetailResponse.hopeTeachTime));
                        var apRange = data.data.lolServiceApplyDetailResponse.howTeach.howTeach
                        var apname = getTeacher(data.data.lolServiceApplyDetailResponse.teacherId).name;
                        var section1="";
                        section1+='<div class="deta">'+'<div class="detailed">'+'<div class="detailed-one">'+'<img src="images/ssjEvaluate1.gif" >'+'<span>生死局助阵</span>'+'</div>'+'<div class="resucap_dtl_right">'+'<div class="timer">'+'<p>时间:</p>'+'<p>预约课程:</p>'+'<p>预约导师:</p>'+'</div>'+'<div class="timer-two">'+'<p>'+apTime+'</p><p>'+apRange+'</p><p>'+apname+'</p>'+'</div>'+'</div>'+'</div>'

                        sections+=section1;

                    //})
                    $(".appoint1").append(sections);

                //function tim(){
                //    $.each(data.data.lolServiceApplyDetailResponse,function(i,v){
                //        return appointTime=data.data.lolServiceApplyDetailResponse[i].appointTime;
                //    })
                //    return appointTime
                //}
                //    tim();

                    var nowTime=new Date().getTime()
                    if(nowTime-data.data.lolServiceApplyDetailResponse.hopeTeachTime>=0){
                        console.log("更改（更多==》正在进行）,渲染数据");
                        $(".appointment>a").text("正在进行");

                    }else{
                        console.log("直接渲染数据");

                    //    点击更多显示
                    $(".appointment>a").click(function(){
                        if($(".appointment>a").text()!="正在进行"){
                            if($(".more-box").css("display")==="none" ){
                                $(".more-box").slideDown();
                                $(this).text("取消");
                            }else{
                                $(".more-box").slideUp();
                                $(this).text("更多");
                            }
                        }

                    });
                    //     点击显示模态框
                    $(".more1").click(function(){
//            $(".bomb").show();
                        $(".bomb").fadeIn(1000)
                    });
                    //    点击取消显示
                    $(".submit").click(function(){
                        $(".bomb").fadeOut(1000);
                        $(".more-box").hide(1000);
                        $(".appointment>a").text("更多");
                    })
                    }
                    break;
                case "end" :
                    console.log('进入cd期');



                    var sday=Math.floor(data.data.waitDays/24);
                    //console.log(sday);
                    var stime=data.data.waitDays-sday*24;
                    //console.log( stime);
                    console.log("还剩"+sday+"天"+stime+"时");
                    $(".detailed").text("进入cd期，"+"还剩"+sday+"天"+stime+"时"+"后可以进行下次一对一教学")
                    break;
                default:
                    console.log('一对一其他状态');
            };

        });
    }

    //获取优秀老师信息
    function getRecommend() {
        $.get(bMock.getFace("recommend"), function (data, status) {
            console.log(data.data);
            var sections="";
            $.each(data.data,function(i,v){

                var imgages="";
                //$.each(data.data[i].imgs,function(k,v){
                //    var images1="";
                //    images1+='<img class="in-img" src="'+data.data[i].imgs[k]+'" >';
                //    imgages+=images1;
                //});

               var pp= imgages;


                var section1="";
                section1+= '<div class="teac2 teac">'+'<div class="teacher-in">'+'<img src="images/teacher.png" >'+'<div class="teacherInt2 teacherInt">'+'<h3>'+data.data[i].name+'</h3>'+'<a href="javascript:;">明天预约</a>'+'</div>'+'<div class="introduce">'+'<div class="introduce-one">'+'<p>授课范围:</p>'+'<p>累计完成:</p>'+'<p>擅长英雄:</p>'+'</div>'+'<div class="introduce-two2 introduce-two">'+'<p class="imags">'+data.data[i].teachRange+'</p>'+'<p>'+data.data[i].teachRange+'</p>'+'<p >'+pp+'</p>'+'</div>'+'</div>'+'<div class="clear"></div>'+'<p class="introduce-p">'+'<a class="introduce-th" href="ssjservice.html?'+data.data[i].userId+'">预约老师</a>'+'</p>'+'</div>'+'</div>'

                sections+=section1;


            })
            $(".appointt").append(sections)


        });
    }

    //获取最新动态信息
    function getDynamics(){
        $.get(bMock.getFace("ssjdynamics"), function (data, status) {
            console.log(data.data);
            if(data.data.length<1) {
                $(".appoint3").append("<p>后台无最新动态数据</p>")
            }else{
                var longtime = (new Date(data.data[0].teachFinishTime).getMinutes()) + "分钟前";
                var teahsay = data.data[0].boomServiceTeacherEvaluateDto.teacherEvaluate;
                var stusay = data.data[0].evaluateDetailDto.studentEvaluate;


                var sections = "";
                $.each(data.data, function (i, v) {

                    var section1 = "";
                    section1 += '<div class="dynamices">' + '<div class="dynamic-fir">' + '<span>银时老师和8036学院完成一对一训练。</span>' + '<a class="firsta" href="javascript:;">' + longtime + '</a>' + '</div>' + '<div class="dynamic-two1 dynamic-two">' + '<img src="images/inn.png" >' + '<div>' + '<h3>银时老师</h3>' + '<span>' + teahsay + '</span>' + '</div>' + '</div>' + '<div class="dynamic-two2 dynamic-two">' + '<img src="images/inn.png" >' + '<div>' + '<h3>女王大人葵</h3>' + '<span>' + stusay + '</span>' + '</div>' + '</div>'

                    sections += section1;

                })
                $(".appoint3").append(sections);


            }

        });
    }





    getStatus();
    getEvaluate();
    getAppoint();
    getRecommend();
    getDynamics();

})