$(function(){
	//我的预约下拉框
	$(".resucap_nav a").toggle(
        function(){
        	$(".rencp_dotel").slideDown();
        },
        function(){
            $(".rencp_dotel").slideUp();
        }
    );

    //mock
    var thisApi = {
        statue: {
            dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate?studentNum=666",
            product: "/wx/school/v1.0/statue"
        },
    	evaluate: {
            dev: "mock/evaluate.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate",
            product: "/wx/school/v1.0/evaluate"
        },
        revtProcessChta: {
            dev: "mock/revtProcessChta.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto /lol/allTeacher",
            product: "/wx/school/v1.0/evaluate"
        },
        appointSuccess: {
            dev: "mock/appointSuccess.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/watch",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    console.log(bMock.getFace("revtProcessChta"));

    //学员userId查询
    var thisStudent;
    function getStudent() {
        $.ajax
            ({
                async: false,
                url: bMock.getFace("statue"),
                success: function (data) {
                applyId = data.data.studentId;
            }
        });
    }
    getStudent();

    //获取登录状态
    function getStatus() {
        $.get(bMock.getFace("evaluate"), function (data, status) {
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
        return month + "月" + date + "日" + " ( " + weekDay[week] + " ) " + "&nbsp;&nbsp;" + hour + ":" + minute;
    }

    //获取我的预约成功返回的信息
    function appointSuccess() {
        var teacherId;
        var teacherName;

        //获取teacherId
        $.ajax({
            url: bMock.getFace("appointSuccess"),
            async: false,
            type:"get",
            dataType: "json",
            success: function(data, status){
                teacherId = data.data.teacherId;
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
            url: bMock.getFace("appointSuccess") + "?applyId=" + applyId,
            type:"get",
            dataType: "json",
            success: function(data, status){
                teacherId = data.data.teacherId;
                var tt = formatDate(new Date(data.data.applyTime));
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
            },
            error: function(){
                $(".revpros_tbx span").text("预约失败");
            },
        });
    }  

    getStatus();
    appointSuccess();
});