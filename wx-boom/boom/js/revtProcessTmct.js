$(function(){

    var thisApi = {
        statue: {dev: "mock/statue.json", test: "http://192.168.1.150:9000/wx/school/v1.0/statue", product: "/wx/school/v1.0/statue"},
        teacher: {dev: "mock/teacher.json", test: "http://192.168.1.150:9000/wx/school/v1.0/teacher/", product: "/wx/school/v1.0/teacher/"},
        canApplyStudent: {dev: "mock/canApplyStudent.json", test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/canApply?studentNum=666&date=2016-11-22-14", product: "/wx/school/v1.0/canApplyStudent/"},
        canApplyStudent1: {dev: "mock/canApplyStudent1.json", test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/canApply?studentNum=666&date=2016-11-22-14", product: "/wx/school/v1.0/canApplyStudent/"},
        teacherSlots: {dev: "mock/teacherSlots.json", test: "http://192.168.1.150:9000/wx/school/v1.0/teacherSlots?teacherId=1&slotDay=2016-11-24-10", product: "/wx/school/v1.0/canApplyStudent/"},
        teacherSlots1: {dev: "mock/teacherSlots1.json", test: "http://192.168.1.150:9000/wx/school/v1.0/teacherSlots?teacherId=1&slotDay=2016-11-24-10", product: "/wx/school/v1.0/canApplyStudent/"},
        ceshi: {dev: "mock/ceshi.json", test: "http://192.168.1.150:9000/wx/school/v1.0/teacherSlots?teacherId=1&slotDay=2016-11-24-10", product: "/wx/school/v1.0/canApplyStudent/"}

    };
    bMock.setFace(thisApi);

    bMock.setEnv("dev");
//验证老师ID
//    function getTeacher() {
//        $.get(bMock.getFace("teacher"), function (data, status) {
//            console.log(data.data.teacherId===3);
//        });
//    }
    //getTeacher();

    //时间戳转换
    function formatDate(now) {
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var week = now.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return month + "-" + date+" " +weekDay[week]
    }


    //下一天时间转换
    function getNextDay(d){
        d = new Date(d);
        d = +d + 1000*60*60*24;
        d = new Date(d);
        var week = d.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return (d.getMonth()+1)+"-"+d.getDate()+" "+weekDay[week];
    }
    function getNextDDay(d,s){
        d = d + (1000*60*60*24)*s;
        return d;
    }
    function getNextYearDay(d,s){
        d = new Date(d);
        d = +d + (1000*60*60*24)*s;
        d = new Date(d);
        return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+"-"+d.getHours();
    }


    //获取登录状态
    var revtStudentData={};
    var revtTeacherData={};
    revtTeacherData.teacherID=window.location.search.substring(1);
    function getStatus() {
        $.get(bMock.getFace("statue"), function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
                revtStudentData.revtStudentNum= data.data.studentNum;
            }
        });
    }


//获取老师信息
    function getTeacher(value) {
        var thisTeacher;
        $.ajax({
            async: false,
            url: bMock.getFace("teacher"),
            success: function (data, status) {
                if(data.data.teacherId==value){
                    thisTeacher = data.data;
                }
            }
        });
        return thisTeacher;
    }
//传入老师ID，找到老师数据
//    console.log(getTeacher(window.location.search.substring(1)));

    //得到老师数据，渲染到页面
    $(".protmc_teh_cnt dt li:first-child span:last-child").text(getTeacher(window.location.search.substring(1)).teacherName);
    $(".frange > li:last-child").text(getTeacher(window.location.search.substring(1)).desireWay);

    //获取老师空闲时间
    function getTeacherSlots() {
        $.get(bMock.getFace("teacherSlots"), function (data, status) {
            console.log(data.data.slotStatue);
            switch (data.data.slotStatue[0]) {
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                    break;
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                    break;
            };
            switch (data.data.slotStatue[1]) {
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                    break;
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                    break;
            };
            switch (data.data.slotStatue[2]) {
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                    break;
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                    break;
            };
            switch (data.data.slotStatue[3]) {
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                    break;
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                    break;
            };
            switch (data.data.slotStatue[4]) {
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                    break;
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                    break;
            };
            switch (data.data.slotStatue[5]) {
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                    break;
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                    break;
            };

                    console.log(getNextYearDay(data.data.date,0));
                    //$(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(ii)").removeClass("protmc_time_active");

            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function(){
                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                if($(this).hasClass("protmc_time_active")){
                    $(this).addClass("protmc_time_on")
                }else{
                    $(this).unbind("click")
                }
            })

        });
    }

//获取学生时间
    function getApplyStudent() {
        $.get(bMock.getFace("canApplyStudent"), function (data, status) {
            if(data.data!=true){
                $(".protmc_time_cont2").css("display","block");
                $(".protmc_time_cont").hide()
            }else{
                $(".protmc_time_cont2").css("display","none");
                $(".protmc_time_cont").show()
            };
        });



//预约时间模块(上一天，下一天）
        (function getLastLowerDay(){
            var u=0;
            (function(){
                $(".protmc_time_nav ul li:nth-child(2) span ").text(formatDate(new Date(new Date().getTime())));
                var ttin=new Date().getTime();
                $(".protmc_time_nav ul li:nth-child(3) span ").click(function(){
                    $(".protmc_time_nav ul li:nth-child(2) span ").text(getNextDay(getNextDDay(ttin,u)));
                    $(".protmc_time_nav ul li:nth-child(1) span ").css("color", "#4a9bff");
                    //console.log(getNextYearDay(ttin,u));
                    revtStudentData.revtData=getNextYearDay(ttin,u);
                    revtTeacherData.revtData=getNextYearDay(ttin,u);
                    canApplyStudentURL=bMock.getFace("canApplyStudent1").split("?")[0]+"?"+"studentNum="+revtStudentData.revtStudentNum+"&"+"date="+revtStudentData.revtData;
                    //console.log(bMock.getFace("canApplyStudent1").split("?")[0]+"?"+"studentNum="+revtStudentData.revtStudentNum+"&"+"date="+revtStudentData.revtData);

                    //判断学生
                    $.get(bMock.getFace("canApplyStudent1"),function(data,status){
                        if(data.data!=true){
                            $(".protmc_time_cont2").css("display","block");
                            $(".protmc_time_cont").hide()
                        }else{
                            $(".protmc_time_cont2").css("display","none");
                            $(".protmc_time_cont").show()
                        };
                    });
                    //判断老师
                    canApplyteacherURL=bMock.getFace("teacherSlots1").split("?")[0]+"?"+"teacherId="+revtTeacherData.teacherID+"&"+"date="+revtTeacherData.revtData;

                    $.get(bMock.getFace("teacherSlots1"), function (data, status) {
                        console.log(data.data.slotStatue);
                        switch (data.data.slotStatue[0]) {
                            case false :
                                $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                break;
                            case true :
                                $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                break;
                        };
                        switch (data.data.slotStatue[1]) {
                            case false :
                                $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                break;
                            case true :
                                $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                break;
                        };
                        switch (data.data.slotStatue[2]) {
                            case false :
                                $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                break;
                            case true :
                                $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                break;
                        };
                        switch (data.data.slotStatue[3]) {
                            case false :
                                $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                break;
                            case true :
                                $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                break;
                        };
                        switch (data.data.slotStatue[4]) {
                            case false :
                                $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                break;
                            case true :
                                $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                break;
                        };
                        switch (data.data.slotStatue[5]) {
                            case false :
                                $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                break;
                            case true :
                                $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                break;
                        };

                        console.log(getNextYearDay(data.data.date,0));

                        $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function(){
                            $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                            if($(this).hasClass("protmc_time_active")){
                                $(this).addClass("protmc_time_on")
                            }else{
                                $(this).unbind("click")
                            };
                        });

                    });

                    u++;

                });
                $(".protmc_time_nav ul li:nth-child(1) span ").click(function(){
                    y=--u-1;
                    if(ttin<= getNextDDay(ttin,u)){
                        $(".protmc_time_nav ul li:nth-child(2) span ").text(getNextDay(getNextDDay(ttin,y)));
                        revtStudentData.revtData=getNextYearDay(ttin,y);
                        revtTeacherData.revtData=getNextYearDay(ttin,y);

                        canApplyStudentURL=bMock.getFace("canApplyStudent1").split("?")[0]+"?"+"studentNum="+revtStudentData.revtStudentNum+"&"+"date="+revtStudentData.revtData;
                        //console.log(bMock.getFace("canApplyStudent1").split("?")[0]+"?"+"studentNum="+revtStudentData.revtStudentNum+"&"+"date="+revtStudentData.revtData);

                        //判断学生
                        $.get(bMock.getFace("canApplyStudent1"),function(data,status){
                            if(data.data!=true){
                                $(".protmc_time_cont2").css("display","block");
                                $(".protmc_time_cont").hide()
                            }else{
                                $(".protmc_time_cont2").css("display","none");
                                $(".protmc_time_cont").show()
                            }
                        });
                        //判断老师
                        canApplyteacherURL=bMock.getFace("teacherSlots1").split("?")[0]+"?"+"teacherId="+revtTeacherData.teacherID+"&"+"date="+revtTeacherData.revtData;

                        $.get(bMock.getFace("teacherSlots1"), function (data, status) {
                            console.log(data.data.slotStatue);
                            switch (data.data.slotStatue[0]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[1]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[2]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[3]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[4]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[5]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            };

                            console.log(getNextYearDay(data.data.date,0));
                            //$(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(ii)").removeClass("protmc_time_active");

                            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function(){
                                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                                if($(this).hasClass("protmc_time_active")){
                                    $(this).addClass("protmc_time_on")
                                }else{
                                    $(this).unbind("click")
                                }
                            })

                        });
                    };
                    if(y===-1){
                        //判断学生
                        $.get(bMock.getFace("canApplyStudent"),function(data){
                            if(data.data!=true){
                                $(".protmc_time_cont2").css("display","block");
                                $(".protmc_time_cont").hide()
                            }else{
                                $(".protmc_time_cont2").css("display","none");
                                $(".protmc_time_cont").show()
                            }
                        });

                        //判断老师
                        $.get(bMock.getFace("teacherSlots"), function (data, status) {
                            console.log(data.data.slotStatue);
                            switch (data.data.slotStatue[0]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[1]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[2]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[3]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[4]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            };
                            switch (data.data.slotStatue[5]) {
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            };

                            console.log(getNextYearDay(data.data.date,0));
                            //$(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(ii)").removeClass("protmc_time_active");

                            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function(){
                                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                                if($(this).hasClass("protmc_time_active")){
                                    $(this).addClass("protmc_time_on")
                                }else{
                                    $(this).unbind("click")
                                }
                            })

                        });

                        $(".protmc_time_nav ul li:nth-child(1) span ").css("color", "#d9d9d9");

                        $(".protmc_time_nav ul li:nth-child(1) span ").unbind("click")
                    }
                });

            })();
        })();
    };

    $(".revpros_btn button").click(function(){

        ceshidata={
            teacherId:window.location.search.substring(1),
            appointDay:$(".protmc_time_nav ul li:nth-child(2) span").text().split(" ")[0],
            appointTime:$(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_on").text().split("-")[0],
            LearnPosition:$(".protmc_time_sele > ul > li:nth-child(1) > dl dd select").val(),
            HeroFocus:$(".protmc_time_sele > ul > li:nth-child(2) > dl dd select").val(),
            teachModel:$(".protmc_time_sele > ul > li:nth-child(3) > dl dd select").val(),
            AppointmentNotes:$(".protmc_txt_cont textarea").val()
        };

        console.log(ceshidata);


        $.ajax({
            async: true,
            url: bMock.getFace("ceshi"),
            type:"POST",
            data:{
               data: ceshidata
            },
            success: function (data, status) {
                console.log(data)
            },
            complete: function(XMLHttpRequest, textStatus){
                console.log(XMLHttpRequest.responseText);
                console.log(textStatus);
            },
            error: function () {
                console.log("提交失败");
            }
        });
    });



    getApplyStudent();
    getStatus();
    getTeacherSlots();


});