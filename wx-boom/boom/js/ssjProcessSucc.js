$(function(){
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

    //时间戳转换
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
        //localtime = formatDate(new Date());
    }

    //预约时间查询
    var thisApontime;
    function getApontime() {
        $.ajax
            ({
                async: false,
                url: bMock.getFace("appointSuccess"),
                success: function (data) {
                thisApontime = formatDate1(new Date(data.data.applyTime));
                //thisApontime = data.data.applyTime;
            }
        });
    }

    //判断CD状态
    function judgeCD(){
        //系统时间
        getlocaltime();
        //console.log(localtime);
        //预约时间
        getApontime();
        //console.log(thisApontime);
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
        //提交反馈
        $(".rencp_dotel .noret_btn").click(function(){
            $(".rencp_feedback").fadeIn();
            $(".rencp_dotel").slideUp();
        });
        $(".bomb-box-btn .submit").click(function(){
            $(".rencp_feedback").fadeOut();
        });
        //确认取消
        $(".rencp_dotel .cancel_btn").click(function(){
            $(".cancel_reservation").fadeIn();
            $(".rencp_dotel").slideUp();
        });
        $(".bomb-box-btn .submit").click(function(){
            $(".cancel_reservation").fadeOut();
        });
    }

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

    //实现本地图片上传前的预览
    function uploadPhotos(){
        $(".sss_picbox input[type='file']").change(function(){
            $(".sss_picot").show();
            $(".sss_picbox").css({
                border: "none"
            });
            var objUrl = getObjectURL(this.files[0]);
            console.log(objUrl);
            if(objUrl) {
                $("#img0").attr("src", objUrl);
            }
        });
        function getObjectURL(file) {
            var url = null; 
            if (window.createObjectURL!=undefined) { // basic  
                url = window.createObjectURL(file) ;  
                } else if (window.URL!=undefined) { // mozilla(firefox)  
                    url = window.URL.createObjectURL(file) ;  
                } else if (window.webkitURL!=undefined) { // webkit or chrome  
                    url = window.webkitURL.createObjectURL(file) ;  
                }  
            return url ;  
        } 
    }

    //上传图片
    function tj(){
        $(".revpros_btn button").click(function(){
            var formData = new FormData();
            formData.append('file', $('#file0')[0].files[0]); 
            console.log(formData);
            $.ajax({  
                url: '/admin/upload',  
                type: 'POST',  
                data: formData,  
                async: false,  
                cache: false,  
                contentType: false,  
                processData: false,  
                success: function (returndata) {  
                    console.log(data);  
                },  
                error: function (returndata) {  
                    console.log("false"); 
                }  
            });
        });
    }

    getStatus();
    appointSuccess();
    judgeCD();
    tip();
    uploadPhotos();
    tj();
});