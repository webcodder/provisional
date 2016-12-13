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
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj/lol/watch",
            product: "/wx/school/v1.0/ssj/lol/watch"
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
                url: bMock.getFace("appointSuccess") + "?applyId=" + applyId,
                //url: bMock.getFace("appointSuccess") + "?applyId=1",
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

    //确认取消
    function confirmCel(){
        $(".bomb-box-btn .cancel").click(function(){
            // console.log(teacherName);
            // console.log(whatStudy);
            // console.log(tt);
            // console.log(applyId);


            alert("当前页面不可以取消！")
            $(".cancel_reservation").fadeOut();
            return;
            $.ajax({
                url: "/wx/school/v1.0/ssj/lol/cancel?applyId=" + applyId,
                type: "GET",
                success: function(data){
                    console.log("true");
                    //确认取消
                    $(".cancel_reservation").fadeOut();
                    $(".resucap_dtl_right").html('<p class="resdtght_new">已取消预约</p>');
                    setInterval(function(){
                        window.location.href="teacherService.html";
                    },5000)

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
            // console.log(applyId);
            // console.log(studentNum);
            // console.log("/wx/school/v1.0/submitBranch?applyId="+applyId+"&"+"studentNum="+studentNum);


            alert("当前页面不可以提交反馈");
            $(".rencp_feedback").fadeOut();
            return;
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



    //时间戳转换
    function formatDate(now) {
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var week = now.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var hour = now.getHours();
        var minute = now.getMinutes();
        if (minute == 0) {
            minute="00";
        }
        return month + "月" + date + "日" + " ( " + weekDay[week] + " ) " + "&nbsp;&nbsp;" + hour + ":" + minute;
    }

    //获取我的预约成功返回的信息
    var teacherId;
    var teacherName;
    var whatStudy;
    function appointSuccess() {
        //获取teacherId
        //获取课程
        //获取预约时间
        //$.ajax({
        //    url: bMock.getFace("appointSuccess") + "?applyId=" + applyId,
        //    //url: bMock.getFace("appointSuccess") + "?applyId=1",
        //    async: false,
        //    type:"get",
        //    dataType: "json",
        //    success: function(data, status){
        //        teacherId = data.data.teacherId;
        //        whatStudy = data.data.whatStudy;
        //        tt = formatDate(new Date(data.data.applyTime));
        //        studentNum = data.data.studentNum;
        //        //console.log(data.data.studentNum);
        //    }
        //});

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

       function io(data){
           if(!data){
               window.location.href = "teacherService.html";
           }
            data.date=new Date(data.hopeTeachTime);

           var whatStudy =data.howTeach;


           $(".resucap_dtl_right").append(`
       <ul>
           <li>
           <dl>
           <dd>时间：</dd>
           <dd>${formatDate(data.date)}</dd>
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
           <dd>${data.teacherName}</dd>
           <div class="clear"></div>
               </dl>
               </li>
               </ul>
                `);
       }

        io(eval("("+sessionStorage.getItem("ssjSubmit")+")"))

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
    function tj() {
        $(".revpros_btn button").click(function () {
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
                    if (returndata.error) {
                        alert("申请证明上传失败！");
                        return;
                    }

                    var submitDate = eval("(" + sessionStorage.getItem("ssjSubmit") + ")");
                    if (!submitDate) {
                        alert("上传数据缺失！");
                        return;
                    }

                    submitDate.certify = returndata.data;

                    $.ajax({
                        async: false,
                        url: "/wx/school/v1.0/ssj/lol/submitOto",
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(submitDate),
                        dataType: "json",
                        success: function (data, status) {

                            sessionStorage.removeItem("ssjSubmit");
                            if (!data.error)
                                window.location.href = "teacherService.html";
                            else
                            {
                                alert("生死局助阵提交失败！"+data.msg);
                                window.location.href = "teacherService.html";
                            }

                        },
                        complete: function (XMLHttpRequest, textStatus) {
                            console.log(XMLHttpRequest.responseText);
                            console.log(textStatus);
                        },
                        error: function () {
                            console.log("提交失败");
                        }
                    });


                },
                error: function (returndata) {
                    alert("提交失败");
                }
            });


        });
    }

    getStatus();
    //getStudent();
    appointSuccess();
    //judgeCD();
    tip();
    confirmCel();
    uploadPhotos();
    tj();
    submitFeedback();
});