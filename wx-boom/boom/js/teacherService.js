/**
 * Created by liufangzhou on 2016/11/21.
 */
jQuery(document).ready(function () {


    var thisApi = {
        statue: {dev: "mock/statue.json", test: "http://192.168.1.150:9000/wx/school/v1.0/statue", product: "/wx/school/v1.0/statue"},
        serviceStatue: {
            dev: "mock/serviceStatue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/serviceStatue",
            product: "/wx/school/v1.0/serviceStatue"
        },
        teacher: {dev: "mock/teacher.json", test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/allTeacher", product: "/wx/school/v1.0/oto/lol/allTeacher"}
    };
    bMock.setFace(thisApi);

    bMock.setEnv("product");


    //时间戳转换
    function formatDate(now) {
        var month = now.getMonth() + 1;
        var date = now.getDate();
        var week = now.getDay();
        var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
        var hour = now.getHours();
        var minute = now.getMinutes();
        minute=="0"?minute="00":minute;
        return month + " 月 " + date + " 日 " + " ( " + weekDay[week] + " ) " + hour + ":" + minute;
    }


    //老师信息查询


    function getTeacher(value) {
        var thisTeacher;
        $.ajax({
            async: false,
            url: bMock.getFace("teacher"),
            success: function (data, status) {
                thisTeacher = data.data;
            }
        });
        return thisTeacher;
    }

    //获取登录状态
    function getStatus() {
        $.get(bMock.getFace("statue"), function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    }

    //获取预约信息
    function getReserve() {
        $.get("wx/school/v1.0/statue", function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    }

    function getServiceStatue() {
        $.get(bMock.getFace("serviceStatue"), function (data, status) {
            console.log(data.data);
            var thisServiceStatus = data.data;
            if(thisServiceStatus.oto){
                var otoStatus = thisServiceStatus.oto;
                switch (otoStatus.statue) {
                    case "apply" :
                        console.log('一对一可申请状态');
                        $("#oneToOneOn").hide();
                        break;
                    case "wait" :
                        console.log('一对一已经有申请');
                        $("#oneToOne").hide();
                        // var thisTime = new Date(otoStatus.lolServiceApplyDetailResponse.hopeTeachTime);
                        $("#otoTime").text(formatDate(new Date(otoStatus.lolServiceApplyDetailResponse.hopeTeachTime)));
                        $("#otoInfo").text(otoStatus.lolServiceApplyDetailResponse.info);
                        $("#otoTeacher").text(getTeacher(otoStatus.lolServiceApplyDetailResponse.teacherId).teacherName);
                        break;
                    default:
                        $("#oneToOneOn").hide();
                        console.log('一对一其他状态');
                };
            }else{
                $("#oneToOneOn").hide();
            }
            if(thisServiceStatus.ssj){
                var ssjStatus = thisServiceStatus.ssj;
                switch (ssjStatus.statue) {
                    case "apply" :
                        console.log('生死局可申请状态');
                        $("#SSJOn").hide();
                        break;
                    case "wait" :
                        console.log('生死局已经有申请');
                        $("#SSJ").hide();
                        $("#ssjTime").text(formatDate(new Date(ssjStatus.lolServiceApplyDetailResponse.hopeTeachTime)));
                        $("#ssjInfo").text(ssjStatus.lolServiceApplyDetailResponse.info);
                        $("#ssjTeacher").text(getTeacher(ssjStatus.lolServiceApplyDetailResponse.teacherId).teacherName);
                        break;
                    default:
                        $("#SSJOn").hide();
                        console.log('生死局其他状态');
                }
            }else {
                $("#SSJOn").remove();
            }
        });
    }

    // $("#oneToOne").remove();
    // $("#SSJ").remove();

    getStatus();
    getServiceStatue();
})