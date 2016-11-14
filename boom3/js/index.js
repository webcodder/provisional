


jQuery(document).ready(function () {



    $(".bind_input li").click(function () {
        $(this).addClass("bind_input_on").siblings().removeClass("bind_input_on");
        var binput_dd = $(this).find("dd:first");
        if ($(binput_dd).hasClass("bid_name")) {
            $("#bid_name").attr("src", "images/a02.png");
            $("#bid_sele").attr("src", "images/a03.png");
        } else if ($(binput_dd).hasClass("bid_sele")) {
            $("#bid_name").attr("src", "images/a01.png");
            $("#bid_sele").attr("src", "images/a04.png");
        }
    });

    function GetRequest() {
        var testUrl = window.location.href.split("?");
        // var newUrl = decodeURI(newUrl);
        return testUrl.length == 2 ? testUrl[1] : "";
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
                $.get("http://192.168.1.122:6080/boom3/json/statue.json", function (data, status) {
                    if (data.data) {
                        console.log("已经登录");
                        window.location.href = "courseCenter.html";
                    }
                });
            },
            login: function () {
                console.log(this.name, this.pwd);
                $.get("http://192.168.1.122:6080/boom3/json/login.json?name=" + $("#name").val() + "&pwd=" + $("#pwd").val(), function (data, status) {
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

