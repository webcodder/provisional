$(function(){
    //mock
    var thisApi = {
        statue: {
            dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
            product: "/wx/school/v1.0/statue"
        },

        revtProcessChta: {
            dev: "mock/revtProcessChta.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/allTeacher",
            product: "/wx/school/v1.0/ssj/lol/allTeacher"
        },
        appointSuccess: {
            dev: "mock/appointSuccess.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/statue",
            product: "/wx/school/v1.0/oto/lol/statue"
        },

        mainRemark: {
            dev: "mock/mainRemark.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/evaluate",
            product: "/wx/school/v1.0/oto/lol/evaluate"
        },
        watch: {
            dev: "mock/watch.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/watchNeedEvaluate",
            product: "/wx/school/v1.0/ssj/lol/watchNeedEvaluate"
        },
        teacher: {
            dev: "mock/teacher.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/allTeacher",
            product: "/wx/school/v1.0/ssj/lol/allTeacher"
        },
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

    //时间戳转换
    function formatDate(now) {
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var week = now.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var hour = now.getHours();
        var minute = now.getMinutes();
        return month + "月" + date + "日" + " ( " + weekDay[week] + " ) " + "&nbsp;&nbsp;" + hour + ":" + minute;
    }




    //获取需要评论的内容
    var applyId;
    function getWatch() {
        $.get(bMock.getFace("watch"), function (data, status) {
            if (data.data.length===0) {
                console.log("获取失败！");
                //window.location.href = "teacherService.html";
            } else {
                console.log("获取成功！");
                applyId=data.data[0].id;
                var watchTime= formatDate(new Date(data.data[0].hopeTeachTime));
                //var watchStudy= data.data[0].whatStudy;
                var watchteach= getTeacher(data.data[0].teacherId).name;
                var watchs='<ul>'+'<li>'+'<dl>'+'<dd>时间：</dd>'+'<dd>'+watchTime+'</dd>'+'<div class="clear"></div>'+'</dl>'+'</li>'+'<li>'+'<dl>'+'<dd>预约课程：</dd>'+'<dd>生死局助阵</dd>'+'<div class="clear"></div>'+'</dl>'+'</li>'+'<li>'+'<dl>'+'<dd>预约导师：</dd>'+'<dd>'+watchteach+'</dd>'+'<div class="clear"></div>'+'</dl>'+'</li>'+'</ul>'

                $(".jutcap_dtl_right").append(watchs);

            }
        });
    }

    getWatch();

//获取老师信息

    var selectTeacher;

    function getTeacher(value) {
        var thisTeacher;
        $.ajax({
            async: false,
            url: bMock.getFace("teacher"),
            success: function (data, status) {
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].userId === Number(value)) {
                        thisTeacher = data.data[i];
                        selectTeacher = thisTeacher;
                    }
                }
            }
        });
        return thisTeacher;
    }




    //获取我的预约成功返回的信息
    function appointSuccess() {
        var teacherId;
        var teacherName;


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
            }
        });

        $.ajax({
            url: bMock.getFace("appointSuccess") + "?applyId=" + applyId,
            //url: bMock.getFace("appointSuccess") + "?applyId=1",
            type:"get",
            dataType: "json",
            success: function(data, status){
                teacherId = data.data.teacherId;
                var tt = formatDate(new Date(data.data.applyTime));
                $(".jutcap_dtl_right").append(`
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
                                <dd>${data.data.whatStudy}</dd>
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
            }
        });
    }

    //提交页面评价
    function mainRemark(){
        $("#otojudge_btn").click(function(){
            var studentEvaluate = $("textarea[name='evalcoue_txt']").val();
            function GetJsonData() {
                var json = {
                    "applyId":applyId,
                    "helpfulScore": 5,
                    "attitudeScore": 5,
                    "evaluate": studentEvaluate,
                    "teacherSkillScore":5,
                    "score":5,
                    "winFlag":true
                };
                return json;
            }
            $.ajax
            ({
                async: true,
                //url: bMock.getFace("mainRemark"),
                url: bMock.getFace("mainRemark"),
                contentType: "application/json; charset=utf-8",
                type:"post",
                data: JSON.stringify(GetJsonData()),
                dataType: "json",
                success: function (data, status) {

                    window.location.href = "teacherService.html";
                },
                complete: function(xhr, status){
                    console.log(xhr.status);
                },
                error: function () {
                    alert("提交失败");
                }
            });
            //console.log(studentEvaluate);
        });  
    }
    getStudent();
    getStatus();
    //appointSuccess();
    mainRemark();
});