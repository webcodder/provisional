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
    bMock.setEnv("dev");
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
            if(data.data == null){
                $("#students_info").append(`
                    <li>
                        <dl>
                            <dd>电话</dd>
                            <dd><input id="studentphone" type="text" placeholder="请输入电话"></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>QQ</dd>
                            <dd><input id="studentqq" type="text" placeholder="请输入QQ"></dd>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>邮箱</dd>
                            <dd><input id="studentyy" type="text" placeholder="请输入邮箱"></dd>
                        </dl>
                    </li>
                `);
                $(".revpros_btn button").addClass("revpros_btn_off").attr({"disabled":true});
                /*$("#students_info").find("input[type='text']").each(function(){
                    if ($(this).val() == ""){
                        console.log(false);
                    } else {
                        if($("#studentphone").val() == "")
                        {
                            console.log("电话为空");
                        }
                        else if($("#studentqq").val() == "")
                        {
                            console.log("qq为空");
                        }
                        else if($("#studentyy").val() == "")
                        {
                            console.log("邮箱为空");
                        }
                        else
                        {
                            $(".revpros_btn button").addClass("revpros_btn_off").attr({"disabled":false});
                        }
                    }
                });*/
                var studentphone = $("#studentphone").val();
                var studentqq = $("#studentqq").val();
                var studentyy = $("#studentyy").val();
                if(studentphone == ""){
                    $("#studentphone").keyup(function(){
                        $(".revpros_btn button").removeClass("revpros_btn_off").attr({"disabled":false});
                    });
                }
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