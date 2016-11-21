


jQuery(document).ready(function () {



    $(".bind_input li").click(function () {
        $(this).addClass("bind_input_on").siblings().removeClass("bind_input_on");
        var binput_dd = $(this).find("dd:first");
        if ($(binput_dd).hasClass("bid_name")) {
            $("#bid_name").attr("src", "images/a02.png");
            $("#bid_sele").attr("src", "images/a03.png");
            $(".bind_input li:first").css({zIndex: 1});
            $(".bind_input li:last").css({zIndex: 0});
            $(".bind_input ul > li:first dl dd:nth-child(2)").text("");
            $(".bind_input ul > li:last dl dd:nth-child(2)").text("密码");
        } else if ($(binput_dd).hasClass("bid_sele")) {
            $("#bid_name").attr("src", "images/a01.png");
            $("#bid_sele").attr("src", "images/a04.png");
            $(".bind_input li:first").css({zIndex: 0});
            $(".bind_input li:last").css({zIndex: 1});
            $(".bind_input ul > li:first dl dd:nth-child(2)").text("账号");
            $(".bind_input ul > li:last dl dd:nth-child(2)").text("");
        }
    });

    function GetRequest() {
        var testUrl = window.location.search;
        var newUrl = decodeURI(testUrl);
        var rightUrl = newUrl.slice(1);
        return rightUrl;
    }

    var locationUrlJson = GetRequest();

    console.log(locationUrlJson);

    var index = {
        el: '#app',
        data: {
            name: "",
            pwd: ""
        },
        methods: {
            getStatue: function () {
                $.get("wx/school/v1.0/statue", function (data, status) {
                    if (data.data) {
                        console.log("已经登录");
                        window.location.href = "courseCenter.html";
                    }
                });
            },
            login: function () {
                console.log(this.name, this.pwd);
                $.get("/wx/school/v1.0/login?name=" + $("#name").val() + "&pwd=" + $("#pwd").val(), function (data, status) {
                    if (data) {
                        index.methods.toRightPage();
                    }
                    console.log(data);
                });
            },
            toRightPage: function () {
                if (locationUrlJson) {
                    window.location.href = locationUrlJson;
                } else {
                    window.location.href = "courseCenter.html";
                }
            }
        }
    };

    $("#login").click(function () {
        index.methods.login()
    })

    index.methods.getStatue();



})
