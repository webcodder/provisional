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
    bMock.setEnv("dev");
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
        $.get(bMock.getFace("appointSuccess"), function (data, status) {
        	//console.log(data);
            //console.log(formatDate(new Date(data.data.time)));
            var tt = formatDate(new Date(data.data.time));
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
                            <dd>${data.data.course}</dd>
                            <div class="clear"></div>
                        </dl>
                    </li>
                    <li>
                        <dl>
                            <dd>预约导师：</dd>
                            <dd>${data.data.teacher}</dd>
                            <div class="clear"></div>
                        </dl>
                    </li>
                </ul>
            `);
        });
    }  

    getStatus();
    appointSuccess();
});