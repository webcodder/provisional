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
        getStudents: {
            dev: "mock/getStudents.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/getUserInfo",
            product: "/wx/school/v1.0/updateUserInfo"
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("test");
    console.log(bMock.getFace("statue"));

    //获取登录状态
    function getStatus() {
        $.get(bMock.getFace("evaluate"), function (data, status) {
            //console.log(data);
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                //console.log("登录成功！");
            }
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
                thisStudent = data.data.studentId;
            }
        });
        console.log(thisStudent);
    }
    getStudent();

    //获取学员信息
    function getStudents() {
        $.get(bMock.getFace("getStudents") +"?userId=" + thisStudent , function (data, status) {
        //$.get(bMock.getFace("getStudents") , function (data, status) {
            if(data.data == null){
                $("#students_info").append(`
                    <li>
                        <dl>
                            <dd>电话</dd>
                            <dd><input name="studentphone" type="text" placeholder="请输入电话"></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>QQ</dd>
                            <dd><input name="studentqq" type="text" placeholder="请输入QQ"></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>邮箱</dd>
                            <dd><input name="studentyy" type="text" placeholder="请输入邮箱"></dd>
                        </dl>
                    </li>
                `);
                /*$(".revpros_btn button").addClass("revpros_btn_off").attr({"href":true});*/
                $(".revpros_btn a").addClass("revpros_btn_off").attr({"href":"javascript:;"});
       
                var ok1 = false;
                var ok2 = false;
                var ok3 = false;
                function isRight(){
                    if(ok1 && ok2 && ok3){
                        /*$(".revpros_btn button").removeClass("revpros_btn_off").attr({"disabled":false});*/
                        //$(".revpros_btn a").removeClass("revpros_btn_off").attr({"href":"revtProcessChta.html"});
                        $.ajax({
                            type: "POST",
                            url: "/wx/school/v1.0/updateUserInfo", 
                            data: {
                                studentphone: $('input[name="studentphone"]').val(),
                                studentqq: $('input[name="studentqq"]').val(),
                                studentyy: $('input[name="studentyy"]').val()
                            },
                            dataType: "json",
                            success: function (){
                                $(".revpros_btn a").removeClass("revpros_btn_off").attr({"href":"revtProcessChta.html"});
                            }
                        });
                    }
                }
                // 验证手机号码
                $('input[name="studentphone"]').focus(
                function(){
                    $(this).attr("placeholder","请输入电话");
                }).blur(function(){
                    $(this).attr("placeholder","电话不能为空");
                }).keyup(function(){
                    if($(this).val().search(/^1[3|5|7|8|][0-9]{9}$/)){
                        console.log("电话格式不对");
                    }else{
                        ok1=true;
                        isRight();
                        console.log(ok1);
                    }
                });

                // 验证QQ
                $('input[name="studentqq"]').focus(
                function(){
                    $(this).attr("placeholder","请输入QQ");
                }).blur(function(){
                    $(this).attr("placeholder","QQ不能为空");
                }).keyup(function(){
                    if($(this).val().search(/^[1-9][0-9]{4,9}$/)){
                        console.log("QQ格式不对");
                    }else{
                        ok2 = true;
                        isRight();
                        console.log(ok2);
                    }
                });

                // 验证邮箱
                $('input[name="studentyy"]').focus(
                function(){
                    $(this).attr("placeholder","请输入邮箱");
                }).blur(function(){
                    $(this).attr("placeholder","邮箱不能为空");
                }).keyup(function(){
                    if($(this).val().search(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)==-1){
                        console.log("邮箱格式不对");
                    }else{
                        ok3 = true;
                        isRight();
                        console.log(ok3);
                    }
                });
            } else {
                $("#students_info").append(`
                    <li>
                        <dl>
                            <dd>电话</dd>
                            <dd>${data.data["phone"]}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>QQ</dd>
                            <dd>${data.data["qq"]}</dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>邮箱</dd>
                            <dd>${data.data["yy"]}</dd>
                        </dl>
                    </li>
                `);
            }
        });
    }

    getStatus();
    getStudents();
});