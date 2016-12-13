$(function(){
    //mock
    var thisApi = {
        statue: {
            dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
            product: "/wx/school/v1.0/statue"
        },
        teacher: {
            dev: "mock/teacher.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/allTeacher",
            product: "/wx/school/v1.0/oto/lol/allTeacher"
        },
        revtProcessChta: {
            dev: "mock/revtProcessChta.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/allTeacher",
            product: "/wx/school/v1.0/oto/lol/allTeacher"
        },
        appointSuccess: {
            dev: "mock/appointSuccess.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/serviceStatue",
            product: "/wx/school/v1.0/serviceStatue"
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("product");
    //console.log(bMock.getFace("revtProcessChta"));

    //获取登录状态
    function getStatus() {
        $.get(bMock.getFace("statue"), function (data, status) {
            if (!data.data) {
                console.log("登录失败！");
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    }

    //学员applyId查询
    var applyId;
    var studentNum;
    function getStudent() {
        $.ajax
            ({
                async: false,
                url: bMock.getFace("statue"),
                success: function (data) {
                    applyId = data.data.student.studentId;
                    studentNum = data.data.student.studentNum;
                    //console.log(studentNum);
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
        minute=="0"?minute="00":minute;
        return month + "月" + date + "日" + " ( " + weekDay[week] + " ) " + hour + ":" + minute;
    }

    //时间戳转换1
    function formatDate1(now) {
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var week = now.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var hour = now.getHours();
        var minute = now.getMinutes();
        return month + "-" + date + " " +  hour + ":" + minute;
    }

    //获取当前系统时间
    var localtime;
    function getlocaltime(){
        localtime = formatDate1(new Date());
    }

    //预约时间查询
    var thisApontime;
    function getApontime() {
        $.ajax
            ({
                async: false,
                url: bMock.getFace("appointSuccess") + "?studentNum=" + studentNum ,
                success: function (data) {
                thisApontime = formatDate1(new Date(data.data.oto.lolServiceApplyDetailResponse.applyTime));
            }
        });
    }

    //判断CD状态
    function judgeCD(){
        //系统时间
        getlocaltime();
        console.log(localtime);
        //预约时间
        getApontime();
        console.log(thisApontime);
        var DateStrEnd = localtime;
        var  DateStrStart= thisApontime;

        var srtHours = GetDateDif(DateStrStart, DateStrEnd);
        console.log(srtHours);
        if(srtHours > 8760){
            $(".cancel_reservation_cont p").html("取消预约后会有15天cd时间。");
        }else if(srtHours < 3){
            $(".cancel_reservation_cont p").html("取消预约后会有7天cd时间。");
        }else{
            $(".cancel_reservation_cont p").css("display","none");
        }

        function GetDateDif(DateStrStart, DateStrEnd) {
            var DateStart = new Date(DateStrStart);
            var DateEnd = new Date(DateStrEnd);

            if (DateStart < DateEnd) {
            } else {
                DateStart = new Date("1999-" + DateStrStart);
                DateEnd = new Date("2000-" + DateStrEnd);
            }

            var ResultDate = DateEnd.getTime() - DateStart.getTime();
            var second = ResultDate / 1000;//秒
            var Minute = second / 60;//分
            var hours = Minute / 60;//时
            var day = hours / 24;//天

            return hours;
        }
    }

    //确认取消
    function confirmCel(){

        $(".bomb-box-btn .cancel").click(function(){  
            $.ajax({
                url: "/wx/school/v1.0/oto/lol/cancel?applyId=" + applyId,
                type: "POST",
                dataType: "json",
                data:{
                    teacherName: teacherName,
                    whatStudy: whatStudy,
                    applyTime: tt,
                },
                success: function(data){
                    console.log("true");
                    //确认取消
                    $(".cancel_reservation").fadeOut();
                    $(".resucap_dtl_right").html(' <p class="resdtght_new">已取消预约</p>');
                },
                error: function(){
                    console.log("false");
                    $(".cancel_reservation").fadeOut();
                    alert("取消失败");
                }
            });
        });
    }    

    //提交反馈
    function submitFeedback(){
        $(".bomb-box-btn .commit").click(function(){

            $.ajax({
                url: "/wx/school/v1.0/submitBranch?applyId="+applyId+"&"+"studentNum="+studentNum,
                type: "POST",
                dataType: "json",
                date: {
                    applyId: applyId,
                    studentNum: studentNum,
                },
                success: function(){
                    //console.log("true");
                    alert("提交成功");
                },
                error: function(){
                    //console.log("false");
                    alert("提交失败");
                }
            });
            $(".rencp_feedback").fadeOut();
        });
    }

    function tip(){
        //我的预约下拉框
        $(".resucap_nav a").toggle(
            function(){
                $(".rencp_dotel").slideDown();
            },
            function(){
                $(".rencp_dotel").slideUp();
            }
        );

        $(".rencp_dotel .noret_btn").click(function(){
            $(".rencp_feedback").fadeIn();
            $(".rencp_dotel").slideUp();
        });
        $(".bomb-box-btn .submit").click(function(){
            $(".rencp_feedback").fadeOut();
        });

        //暂不取消
        $(".rencp_dotel .cancel_btn").click(function(){
            $(".cancel_reservation").fadeIn();
            $(".rencp_dotel").slideUp();
        });
        $(".bomb-box-btn .submit").click(function(){
            $(".cancel_reservation").fadeOut();
        });
    }

    //获取我的预约成功返回的信息
    var teacherId;
    var teacherName;
    var whatStudy;
    function appointSuccess() {
        //获取teacherId
        //获取课程
        //获取预约时间
        $.ajax({
            url: bMock.getFace("appointSuccess") + "?studentNum=" + studentNum ,
            async: false,
            type:"get",
            dataType: "json",
            success: function(data, status){
                teacherId = data.data.oto.lolServiceApplyDetailResponse.teacherId;
                console.log(teacherId);
                // whatStudy = data.data.whatStudy;
                // tt = formatDate(new Date(data.data.applyTime));
                // studentNum = data.data.studentNum;
                // console.log(data.data.studentNum);
            }
        });

        //获取老师名字
        $.ajax
        ({
            async: false,
            url: bMock.getFace("revtProcessChta"),
            success: function (data) 
            {

                for(var i=0 ; i<data.data.length ; i++){
                    if(teacherId == data.data[i].userId){
                        teacherName = data.data[i].name;
                    }
                }
                console.log(teacherName);
            }
        });

        $.ajax({
            url: bMock.getFace("appointSuccess") + "?studentNum=" + studentNum ,
            type:"get",
            dataType: "json",
            success: function(data, status){
                var tt = formatDate(new Date(data.data.oto.lolServiceApplyDetailResponse.hopeTeachTime));
                var whatStudy = eval("("+data.data.oto.lolServiceApplyDetailResponse.whatStudy.whatStudy+")").position+' '+data.data.oto.lolServiceApplyDetailResponse.howTeach.howTeach+' '+eval("("+data.data.oto.lolServiceApplyDetailResponse.whatStudy.whatStudy+")").hero.substring(0,4);


                console.log(teacherName);
                console.log(data.data.oto.lolServiceApplyDetailResponse.applyTime);
                console.log(data.data.oto.lolServiceApplyDetailResponse.whatStudy.whatStudy);
                $(".resucap_dtl_right").append(`
                    <ul>
                        <li>
                            <dl>
                                <dd>时间：</dd>
                                <dd>${tt}</dd>
                                <div class="clear"></div>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd>预约课程：</dd>
                                <dd>${whatStudy}</dd>
                                <div class="clear"></div>
                            </dl>
                        </li>
                        <li>
                            <dl>
                                <dd>预约导师：</dd>
                                <dd>${teacherName}</dd>
                                <div class="clear"></div>
                            </dl>
                        </li>
                    </ul>
                `);
            },
            error: function(){
                $(".revpros_tbx span").text("预约失败");
            },
        });
    }  

    getStatus();
    getStudent();
    tip();
    appointSuccess();
    judgeCD();
    confirmCel();
    submitFeedback();
});