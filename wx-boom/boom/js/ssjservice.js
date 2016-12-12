$(function () {

    var thisApi = {
        statue: {
            dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
            product: "/wx/school/v1.0/statue"
        },
        teacher: {
            dev: "mock/teacher.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj /lol/allTeacher",
            product: "/wx/school/v1.0/ssj /lol/allTeacher"
        },
        canApplyStudent: {
            dev: "mock/canApplyStudent.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/sj/lol/canApply",
            product: "/wx/school/v1.0/ssj/lol/canApply"
        },

        teacherSlots: {
            dev: "mock/teacherSlots.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/teacherSlots",
            product: "/wx/school/v1.0/teacherSlots"
        },

        getUser: {
            dev: "mock/getUserInfo.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/getUserInfo",
            product: "/wx/school/v1.0/getUserInfo"
        }
    };
    bMock.setFace(thisApi);

    bMock.setEnv("product");


    //学员userId查询
    var studentId;
    var studentNum;

    function getStudent() {
        $.ajax
        ({
            async: false,
            url: bMock.getFace("statue"),
            success: function (data) {
                studentId = data.data.userInfo.userId;
                studentNum = data.data.student.studentNum;
                console.log(studentNum);
            }
        });
    }

    getStudent();


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
        return month + "-" + date + " " + weekDay[week]
    }


    //下一天时间转换 变成11-30 周三
    function getNextDay(d) {
        d = new Date(d);
        d = +d + 1000 * 60 * 60 * 24;
        d = new Date(d);
        var week = d.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        return (d.getMonth() + 1) + "-" + d.getDate() + " " + weekDay[week];
    }

    function getNextDDay(d, s) {
        d = d + (1000 * 60 * 60 * 24) * s;
        return d;
    }

    //转换成2016-11-30-21格式
    function getNextYearDay(d, s) {
        d = new Date(d);
        d = +d + (1000 * 60 * 60 * 24) * s;
        d = new Date(d);
        return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + "-" + d.getHours();
    }


    //获取登录状态
    var revtStudentData = {};
    var revtTeacherData = {};
    revtTeacherData.teacherID = window.location.search.substring(1);

    function getStatus() {
        $.get(bMock.getFace("statue"), function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
                revtStudentData.revtStudentNum = data.data.studentNum;
            }
        });
    }

    //判断学生信息（电话，QQ，邮箱）
    var qq;
    var phone;

    function getUserInfo() {
        $.get(bMock.getFace("getUser") + '?' + 'userId=' + studentId, function (data, status) {
            if (data.data) {
                if (data.data.phone || data.data.qq || data.data.yy) {
                    console.log("可以预约老师！");
                    console.log(data);
                    qq = data.data.qq;
                    phone = data.data.phone;

                } else {
                    window.open("revtProcessConn.html");
                    console.log("没有学生联系方式，跳转到联系页面");
                }
            } else {
                //window.open("revtProcessConn.html");
                console.log("没有学生联系方式，跳转到联系页面");

            }
        });
    };

    getUserInfo();


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

//传入老师ID，找到老师数据
    console.log(getTeacher(window.location.search.substring(1)));

    //得到老师数据，渲染到页面
    $(".protmc_teh_cnt dt li:first-child span:last-child").text(getTeacher(window.location.search.substring(1)).name);
    $(".frange > li:last-child").text(getTeacher(window.location.search.substring(1)).teachRange);

    //获取老师空闲时间
    function getTeacherSlots() {
        $.get(bMock.getFace("teacherSlots") + '?' + 'teacherId=' + revtTeacherData.teacherID + '&slotDay=' + getNextYearDay(new Date().getTime(), 0), function (data, status) {
            console.log(data.data.slotStatue);
            switch (data.data.slotStatue[0]) {
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                    break;
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                    break;
            }
            ;
            switch (data.data.slotStatue[1]) {
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                    break;
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                    break;
            }
            ;
            switch (data.data.slotStatue[2]) {
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                    break;
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                    break;
            }
            ;
            switch (data.data.slotStatue[3]) {
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                    break;
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                    break;
            }
            ;
            switch (data.data.slotStatue[4]) {
                case true :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                    break;
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                    break;
            }
            ;
            switch (data.data.slotStatue[5]) {
                case true  :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                    break;
                case false :
                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                    break;
            }
            ;

            console.log(getNextYearDay(data.data.date, 0));


            //点击时间选中（变蓝色）
            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function () {
                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                if ($(this).hasClass("protmc_time_active")) {
                    $(this).addClass("protmc_time_on")
                } else {
                    $(this).unbind("click")
                }
            })

        });
    }

//获取学生时间
    function getApplyStudent() {
        $.get(bMock.getFace("canApplyStudent") + '?' + 'studentNum' + studentNum + '&date=' + getNextYearDay(new Date().getTime(), 0), function (data, status) {
            if (data.data != true) {
                $(".protmc_time_cont2").css("display", "block");
                $(".protmc_time_cont").hide()
            } else {
                $(".protmc_time_cont2").css("display", "none");
                $(".protmc_time_cont").show()
            }
            ;
        });


//预约时间模块(上一天，下一天）
        ;
        (function getLastLowerDay() {
            var u = 0;
            (function () {
                $(".protmc_time_nav1 ul li:nth-child(2) span ").text(formatDate(new Date(new Date().getTime())));
                var ttin = new Date().getTime();
                $(".protmc_time_nav1 ul li:nth-child(3) span ").click(function () {
                    if (u <= 2) {
                        $(".protmc_time_nav1 ul li:nth-child(2) span ").text(getNextDay(getNextDDay(ttin, u)));
                        $(".protmc_time_nav1 ul li:nth-child(1) span ").css("color", "#4a9bff");
                        $(".protmc_time_cont ul li").removeClass("protmc_time_on");
                        canApplyStudentURL = bMock.getFace("canApplyStudent").split("?")[0] + "?" + "studentNum=" + studentNum + "&" + "date=" + getNextYearDay(new Date().getTime(), u + 1);

                        //console.log(bMock.getFace("canApplyStudent1").split("?")[0]+"?"+"studentNum="+revtStudentData.revtStudentNum+"&"+"date="+revtStudentData.revtData);
                        console.log(canApplyStudentURL);
                        //判断学生
                        $.get(canApplyStudentURL, function (data, status) {
                            if (data.data != true) {
                                $(".protmc_time_cont2").css("display", "block");
                                $(".protmc_time_cont").hide()
                            } else {
                                $(".protmc_time_cont2").css("display", "none");
                                $(".protmc_time_cont").show()
                            }
                            ;
                        });
                        //判断老师
                        canApplyteacherURL = bMock.getFace("teacherSlots").split("?")[0] + "?" + "teacherId=" + revtTeacherData.teacherID + "&" + "slotDay=" + getNextYearDay(new Date().getTime(), u + 1);

                        console.log(canApplyteacherURL);
                        $.get(canApplyteacherURL, function (data, status) {
                            console.log(data.data.slotStatue);
                            switch (data.data.slotStatue[0]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[1]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[2]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[3]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[4]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[5]) {
                                case true  :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            }
                            ;

                            console.log(getNextYearDay(data.data.date, 0));

                            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function () {
                                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                                if ($(this).hasClass("protmc_time_active")) {
                                    $(this).addClass("protmc_time_on")
                                } else {
                                    $(this).unbind("click")
                                }
                                ;
                            });

                        });

                        u++;
                    } else {
                        $(".protmc_time_nav1 ul li:nth-child(3) span ").css("color", "#d9d9d9");
                    }
                });
                $(".protmc_time_nav1 ul li:nth-child(1) span").click(function () {
                    $(".protmc_time_nav1 ul li:nth-child(3) span ").css("color", "#4a9bff");
                    y = --u - 1;
                    if (ttin <= getNextDDay(ttin, u)) {
                        $(".protmc_time_nav1 ul li:nth-child(2) span ").text(getNextDay(getNextDDay(ttin, y)));

                        $(".protmc_time_cont ul li").removeClass("protmc_time_on");
                        canApplyStudentURL = bMock.getFace("canApplyStudent").split("?")[0] + "?" + "studentNum=" + studentNum + "&" + "date=" + getNextYearDay(new Date().getTime(), y);


                        //判断学生
                        $.get(canApplyStudentURL, function (data, status) {
                            if (data.data != true) {
                                $(".protmc_time_cont2").css("display", "block");
                                $(".protmc_time_cont").hide()
                            } else {
                                $(".protmc_time_cont2").css("display", "none");
                                $(".protmc_time_cont").show()
                            }
                        });
                        //判断老师
                        canApplyteacherURL = bMock.getFace("teacherSlots").split("?")[0] + "?" + "teacherId=" + revtTeacherData.teacherID + "&" + "slotDay=" + getNextYearDay(new Date().getTime(), u + 1);

                        $.get(canApplyteacherURL, function (data, status) {
                            console.log(data.data.slotStatue);
                            switch (data.data.slotStatue[0]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[1]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[2]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[3]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[4]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[5]) {
                                case true  :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            }
                            ;

                            console.log(getNextYearDay(data.data.date, 0));
                            //$(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(ii)").removeClass("protmc_time_active");

                            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function () {
                                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                                if ($(this).hasClass("protmc_time_active")) {
                                    $(this).addClass("protmc_time_on")
                                } else {
                                    $(this).unbind("click")
                                }
                            })

                        });
                    }
                    ;
                    if (y === -1) {
                        //判断学生
                        $.get(bMock.getFace("canApplyStudent") + '?' + 'studentNum=' + studentNum + '&date=' + getNextYearDay(new Date().getTime(), 0), function (data) {
                            if (data.data != true) {
                                $(".protmc_time_cont2").css("display", "block");
                                $(".protmc_time_cont").hide()
                            } else {
                                $(".protmc_time_cont2").css("display", "none");
                                $(".protmc_time_cont").show()
                            }
                        });

                        //判断老师
                        $.get(bMock.getFace("teacherSlots") + '?' + 'teacherId=' + revtTeacherData.teacherID + '&slotDay=' + getNextYearDay(new Date().getTime(), 0), function (data, status) {
                            console.log(data.data.slotStatue);
                            switch (data.data.slotStatue[0]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[1]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[2]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[3]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(1)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[4]) {
                                case true :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(2)").addClass("protmc_time_active");
                                    break;
                            }
                            ;
                            switch (data.data.slotStatue[5]) {
                                case true  :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").removeClass("protmc_time_active");
                                    break;
                                case false :
                                    $(".protmc_time_cont > ul > li:nth-child(2) > dl > dd > ol > li:nth-child(3)").addClass("protmc_time_active");
                                    break;
                            }
                            ;

                            console.log(getNextYearDay(data.data.date, 0));
                            //$(".protmc_time_cont > ul > li:nth-child(1) > dl > dd > ol > li:nth-child(ii)").removeClass("protmc_time_active");

                            $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_active").click(function () {
                                $(".protmc_time_cont > ul > li > dl > dd > ol > li").removeClass("protmc_time_on");
                                if ($(this).hasClass("protmc_time_active")) {
                                    $(this).addClass("protmc_time_on")
                                } else {
                                    $(this).unbind("click")
                                }
                            })

                        });

                        $(".protmc_time_nav1 ul li:nth-child(1) span ").css("color", "#d9d9d9");

                        //$(".protmc_time_nav1 ul li:nth-child(1) span ").unbind("click")
                    }
                });

            })();
        })();
    };

    $(".revpros_btn button").click(function () {

        var yeayy;
        if ($(".protmc_time_nav1 ul li:nth-child(2) span").text().split(" ")[0].split("-") != 12) {
            yeayy = 2016

        } else {
            yeayy = 2017
        }

        function GetJsonData() {
            var json = {
                "studentNum": studentNum,
                "qq": qq,
                "phone": phone,
                "teacherId": window.location.search.substring(1),
                "timeIndex": Number($(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_on").attr("id")),
                "hopeTeachTime": yeayy + '-' + $(".protmc_time_nav1 ul li:nth-child(2) span").text().split(" ")[0] + ' ' + ' ' + $(".protmc_time_cont > ul > li > dl > dd > ol > li.protmc_time_on").text().split("-")[0] + ":00",
                "mark": $(".protmc_txt_cont textarea").val(),
                "howTeach": $(".protmc_time_nav  select").val(),
                "teacherName": selectTeacher ? selectTeacher.name : "未匹配老师！"
        };
        return json;
    }

    sessionStorage.setItem("ssjSubmit", JSON.stringify(GetJsonData()));

    window.location.href = "ssjProcessSucc.html";
});


getApplyStudent();
getStatus();
getTeacherSlots();


})
;