/**
 * Created by Administrator on 2016/11/25.
 */


$(function () {

    var thisApi = {
        statue: {dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto/lol/hasNeedEvaluate?studentNum=666",
            product: "/wx/school/v1.0/statue"
        },
        revtProcessChta: {
            dev: "mock/revtProcessChta.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/oto /lol/allTeacher",
            product: "/wx/school/v1.0/evaluate"
        },

    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev")
    //console.log(bMock.getFace("evaluate"))

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

    //获取预约信息
    function getReserve(){
        $.get("wx/school/v1.0/statue", function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    }

    //获取全部老师信息
    function getRevtProcessChta() {
        console.log($("#ssel option").val() );
        $.get(bMock.getFace("revtProcessChta"), function (data, status) {
            console.log(data.data);
            var sections="";
            $.each(data.data,function(i,v){
                var section1="";
                section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="revtProcessTmct.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                sections+=section1;

            })
            $(".revpros_chta_body").append(sections)

        });
    }
    //获取符合筛选条件的老师信息
    $("select").change(function () {
        $(".chat").remove();
        if($("#ssel").find("option:selected").text()=="中路"){
            function getRevtProcessChta2() {
                $.get(bMock.getFace("revtProcessChta"), function (data, status) {
                    var sections = "";
                    var arry=[];
                    var u=0;
                    $.each(data.data,function(k,val){
                        if(data.data[k].teachRange.indexOf("中路")!=-1){
                            arry[u]=data.data[k];
                            u++;
                        }
                    })
                    $.each(arry, function (i, v) {
                        console.log(arry);
                        var section1 = "";
                        section1 += '<div class="chat">'+'<section>' + '<div class="revpros_chta_cont revpros_chta_cont' + i + '">' + '<div class="revpros_chta_pic_wrap">' + '<div class="revpros_chta_pic">' + '<div class="revcp_cot">' + '<div class="revcp_cott">' + '<img src="images/revcp_teach_cs1.png">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="revpros_chta_cnt_wrap">' + '<div class="revpros_chta_cnt">' + '<dl>' + '<dt>' + '<ul>' + '<li>' + arry[i].name + '</li>' + '<li>明天可约</li>' + '</ul>' + '</dt>' + '<dd class="revpros_chta_cnt_d1">' + '<ul>' + '<li>授课范围：</li>' + '<li class="revcp_cott_jx' + i + '">' + arry[i].teachRange + '</li>' + '</ul>' + '</dd>' + '<dd>' + '<ul>' + '<li>累计完成：</li>' + '<li>378次一对一教学</li>' + '</ul>' + '</dd>' + '<dd>' + '<ul>' + '<li>擅长英雄：</li>' + '<li>' + '<ol>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '</ol>' + '</li>' + '</ul>' + '</dd>' + '<dd>' + '<a href="revtProcessTmct.html?'+ arry[i].userId+'">'+'<button>预约老师</button>'+'</a>' + '</dd>' + '</dl>' + '</div>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</section>'+ '</div>'

                        sections += section1;

                    })
                    $(".revpros_chta_body").append(sections)

                });
            }
            getRevtProcessChta2()
        }else if($("#ssel").find("option:selected").text()=="上路"){
            function getRevtProcessChta2() {
                $.get(bMock.getFace("revtProcessChta"), function (data, status) {
                    var sections = "";
                    var arry=[];
                    var u=0;
                    $.each(data.data,function(k,val){
                        if(data.data[k].teachRange.indexOf("上路")!=-1){
                            arry[u]=data.data[k];
                            u++;
                        }
                    })
                    $.each(arry, function (i, v) {
                        console.log(arry);
                        var section1 = "";
                        section1 += '<div class="chat">'+'<section>' + '<div class="revpros_chta_cont revpros_chta_cont' + i + '">' + '<div class="revpros_chta_pic_wrap">' + '<div class="revpros_chta_pic">' + '<div class="revcp_cot">' + '<div class="revcp_cott">' + '<img src="images/revcp_teach_cs1.png">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="revpros_chta_cnt_wrap">' + '<div class="revpros_chta_cnt">' + '<dl>' + '<dt>' + '<ul>' + '<li>' + arry[i].name + '</li>' + '<li>明天可约</li>' + '</ul>' + '</dt>' + '<dd class="revpros_chta_cnt_d1">' + '<ul>' + '<li>授课范围：</li>' + '<li class="revcp_cott_jx' + i + '">' + arry[i].teachRange + '</li>' + '</ul>' + '</dd>' + '<dd>' + '<ul>' + '<li>累计完成：</li>' + '<li>378次一对一教学</li>' + '</ul>' + '</dd>' + '<dd>' + '<ul>' + '<li>擅长英雄：</li>' + '<li>' + '<ol>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '</ol>' + '</li>' + '</ul>' + '</dd>' + '<dd>' + '<a href="revtProcessTmct.html?'+ arry[i].userId+'">'+'<button>预约老师</button>'+'</a>' + '</dd>' + '</dl>' + '</div>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</section>'+ '</div>'

                        sections += section1;

                    })
                    $(".revpros_chta_body").append(sections)

                });
            }
            getRevtProcessChta2()
        }else if($("#ssel").find("option:selected").text()=="下路"){
            function getRevtProcessChta2() {
                $.get(bMock.getFace("revtProcessChta"), function (data, status) {
                    var sections = "";
                    var arry=[];
                    var u=0;
                    $.each(data.data,function(k,val){
                        if(data.data[k].teachRange.indexOf("下路")!=-1){
                            arry[u]=data.data[k];
                            u++;
                        }
                    })
                    $.each(arry, function (i, v) {
                        console.log(arry);
                        var section1 = "";
                        section1 += '<div class="chat">'+'<section>' + '<div class="revpros_chta_cont revpros_chta_cont' + i + '">' + '<div class="revpros_chta_pic_wrap">' + '<div class="revpros_chta_pic">' + '<div class="revcp_cot">' + '<div class="revcp_cott">' + '<img src="images/revcp_teach_cs1.png">' + '</div>' + '</div>' + '</div>' + '</div>' + '<div class="revpros_chta_cnt_wrap">' + '<div class="revpros_chta_cnt">' + '<dl>' + '<dt>' + '<ul>' + '<li>' + arry[i].name + '</li>' + '<li>明天可约</li>' + '</ul>' + '</dt>' + '<dd class="revpros_chta_cnt_d1">' + '<ul>' + '<li>授课范围：</li>' + '<li class="revcp_cott_jx' + i + '">' + arry[i].teachRange + '</li>' + '</ul>' + '</dd>' + '<dd>' + '<ul>' + '<li>累计完成：</li>' + '<li>378次一对一教学</li>' + '</ul>' + '</dd>' + '<dd>' + '<ul>' + '<li>擅长英雄：</li>' + '<li>' + '<ol>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '<li>' + '<img src="images/repo_yxtx_cs.png" />' + '</li>' + '</ol>' + '</li>' + '</ul>' + '</dd>' + '<dd>' + '<a href="revtProcessTmct.html?'+ arry[i].userId+'">'+'<button>预约老师</button>'+'</a>' + '</dd>' + '</dl>' + '</div>' + '</div>' + '<div class="clear"></div>' + '</div>' + '</section>'+ '</div>'

                        sections += section1;

                    })
                    $(".revpros_chta_body").append(sections)

                });
            }
            getRevtProcessChta2()
        }else if($("#ssel").find("option:selected").text()=="按分路筛选"){
            $.get(bMock.getFace("revtProcessChta"), function (data, status) {
                console.log(data.data);
                var sections="";
                var obj1={};
                $.each(data.data,function(i,v){
                    var section1="";
                    section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'<li>'+'<img src="images/repo_yxtx_cs.png" />'+'</li>'+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="revtProcessTmct.html?'+ data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                    obj1.i=i;
                    sections+=section1;

                })
                $(".revpros_chta_body").append(sections)

            });
        }

    })


    //getStatus();
    getRevtProcessChta();



})