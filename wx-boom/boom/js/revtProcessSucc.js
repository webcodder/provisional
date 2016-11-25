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
    	evaluate: {
            dev: "mock/evaluate.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate",
            product: "/wx/school/v1.0/evaluate"
        },
        appointSuccess: {dev: "mock/appointSuccess.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/statue",
            product: "/wx/school/v1.0/recommend"
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("test");
    //console.log(bMock.getFace("evaluate"));
    console.log(bMock.getFace("appointSuccess"));

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

    //获取我的预约成功返回的信息
    function appointSuccess() {
        $.get(bMock.getFace("appointSuccess"), function (data, status) {
        	console.log(data);
        });
    }  

    getStatus();
    appointSuccess();
});