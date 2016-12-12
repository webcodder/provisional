$(function(){
    //mock
    var thisApi = {
        statue: {
            dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate",
            product: "/wx/school/v1.0/statue"
        },
    	/*evaluate: {
            dev: "mock/evaluate.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate",
            product: "/wx/school/v1.0/oto/lol/hasNeedEvaluate"
        },*/
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
        mainRemark: {
            dev: "mock/mainRemark.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/evaluate",
            product: "/wx/school/v1.0/oto/lol/evaluate"
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("product");
    console.log(bMock.getFace("mainRemark"));

    //学员studentNum查询
    var studentNum;
    function getStudent() {
        $.ajax
            ({
                async: false,
                url: bMock.getFace("statue"),
                success: function (data) {
                    studentNum = data.data.student.studentNum;
            }
        });
    }

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

    //获取我的预约成功返回的信息
    function appointSuccess() {
        //var teacherId;
        //var teacherName;

        //获取teacherId
        $.ajax({
            url: bMock.getFace("appointSuccess") + "?studentNum=" + studentNum ,
            async: false,
            type:"get",
            dataType: "json",
            success: function(data, status){
                //teacherId = data.data.teacherId;
                teacherId = data.data.oto.lolServiceApplyDetailResponse.teacherId;
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
            }
        });

        $.ajax({
            url: bMock.getFace("appointSuccess") + "?studentNum=" + studentNum ,
            type:"get",
            dataType: "json",
            success: function(data, status){
                var tt = formatDate(new Date(data.data.oto.lolServiceApplyDetailResponse.applyTime));
                var whatStudy = data.data.oto.lolServiceApplyDetailResponse.whatStudy.whatStudy;
                console.log(teacherName);
                console.log(data.data.oto.lolServiceApplyDetailResponse.applyTime);
                console.log(data.data.oto.lolServiceApplyDetailResponse.whatStudy.whatStudy);
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
            }
        });
    }

    //提交页面评价
    function mainRemark(){
        //提交
        function tj(){
            $("#otojudge_btn").click(function(){
                function GetJsonData() {
                    var json = {
                        "abilityScore": abilityScore,
                        "serviceScore": serviceScore,
                        "studentEvaluate": studentEvaluate,
                    };
                    return json;
                }
                studentEvaluate = $("textarea[name='evalcoue_txt']").val();
                // window.location.href = "revpros_btn.html"
                $.ajax
                ({
                    async: true,
                    url: bMock.getFace("mainRemark"),
                    //url: "/wx/school/v1.0/oto/lol/evaluate",
                    contentType: "application/json; charset=utf-8",
                    type:"POST",
                    data: JSON.stringify(GetJsonData()),
                    dataType: "json",
                    success: function (data, status) {
                        alert("提交成功");
                        window.location.href = "revpros_btn.html";

                    },
                    complete: function(xhr, status){
                        console.log(xhr.status);
                    },
                    error: function () {
                        alert("提交失败");
                    }
                });
                // console.log(abilityScore);
                // console.log(serviceScore);
                // console.log(studentEvaluate);
            });
        }
        
        //获取星星评价
        $.fn.raty.defaults.path = 'images';
        //调用点击事件
        tj();
        //老师授课态度
        $('#teattu').raty({
            click: function(score, evt) {
                abilityScore = $(this).find("input").val();
                console.log(abilityScore);
            }
        });
        //是否有收获
        $('#harvest').raty({
            click: function(score, evt) {
                serviceScore = $(this).find("input").val();
                console.log(serviceScore);
            }
        }); 
    }

    getStatus();
    getStudent();
    appointSuccess();
    mainRemark();
});