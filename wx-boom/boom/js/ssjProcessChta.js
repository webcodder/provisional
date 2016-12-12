/**
 * Created by Administrator on 2016/11/25.
 */


$(function () {

    var thisApi = {
        statue: {dev: "mock/statue.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/statue",
            product: "/wx/school/v1.0/statue"
        },
        ssjProcessChta: {
            dev: "mock/ssjProcessChta.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/ssj /lol/allTeacher",
            product: "/wx/school/v1.0/ssj /lol/allTeacher"
        },
        getUser: {
            dev: "mock/getUserInfo.json",
            test: "http://192.168.1.150:9000/wx/school/v1.0/getUserInfo",
            product: "/wx/school/v1.0/getUserInfo"
        }

    };
    bMock.setFace(thisApi);
    bMock.setEnv("product")


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


    //判断学生信息（电话，QQ，邮箱）
    function getUserInfo(){
        var stuid="userId=1";
        var userurl=bMock.getFace("getUser")
        $.get(userurl+'?'+stuid, function (data, status) {
            if(data.data){
                if (data.data.phone || data.data.qq || data.data.yy ) {
                    console.log("可以预约老师！");
                    console.log(data);

                } else {
                    window.open("revtProcessConn.html");
                    console.log("没有学生联系方式，跳转到联系页面");
                }
            }else{
                //window.open("revtProcessConn.html");
                console.log("没有学生联系方式，跳转到联系页面");

            }
        });
    };

    getUserInfo();




    //获取全部老师信息
    function getSsjProcessChta() {
        console.log($("#ssel option").val() );
        $.get(bMock.getFace("ssjProcessChta"), function (data, status) {
            console.log(data.data);
            var sections="";
            $.each(data.data,function(i,v){

                var imgages="";
                //$.each(data.data[i].imgs,function(k,v){
                //    var images1="";
                //    images1+='<li>'+'<img src="'+data.data[i].imgs[k]+'">'+'</li>';
                //    imgages+=images1;
                //});

                var pp= imgages;



                var section1="";
                section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+pp+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="ssjservice.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
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
                $.get(bMock.getFace("ssjProcessChta"), function (data, status) {
                    var sections = "";
                    var arry=[];
                    var u=0;
                    $.each(data.data,function(k,val){
                        if(data.data[k].teachRange.indexOf("中路")!=-1){
                            arry[u]=data.data[k];
                            u++;
                        }
                    });

                    if($("#ssel option[value='按分路筛选']").val()==="按分路筛选"){
                        $("#ssel option[value='按分路筛选']").remove();
                        $("#ssel").prepend("<option value='全部老师'>全部老师</option>");
                    }else{
                        $("#ssel option[value='全部老师']").remove();
                        $("#ssel").prepend("<option value='全部老师'>全部老师</option>");
                    }

                    $.each(data.data,function(i,v){

                        var imgages="";
                        //$.each(data.data[i].imgs,function(k,v){
                        //    var images1="";
                        //    images1+='<li>'+'<img src="'+data.data[i].imgs[k]+'">'+'</li>';
                        //    imgages+=images1;
                        //});


                        var pp= imgages;



                        var section1="";
                        section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+pp+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="ssjservice.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                        sections+=section1;

                    })
                    $(".revpros_chta_body").append(sections)

                });
            }
            getRevtProcessChta2()
        }else if($("#ssel").find("option:selected").text()=="上路"){
            function getRevtProcessChta2() {
                $.get(bMock.getFace("ssjProcessChta"), function (data, status) {
                    var sections = "";
                    var arry=[];
                    var u=0;
                    $.each(data.data,function(k,val){
                        if(data.data[k].teachRange.indexOf("上路")!=-1){
                            arry[u]=data.data[k];
                            u++;
                        }
                    });


                    if($("#ssel option[value='按分路筛选']").val()==="按分路筛选"){
                        $("#ssel option[value='按分路筛选']").remove();
                        $("#ssel").prepend("<option value='全部老师'>全部老师</option>");
                    }else{
                        $("#ssel option[value='全部老师']").remove();
                        $("#ssel").prepend("<option value='全部老师'>全部老师</option>");
                    };


                    $.each(data.data,function(i,v){

                        var imgages="";
                        //$.each(data.data[i].imgs,function(k,v){
                        //    var images1="";
                        //    images1+='<li>'+'<img src="'+data.data[i].imgs[k]+'">'+'</li>';
                        //    imgages+=images1;
                        //});


                        var pp= imgages;



                        var section1="";
                        section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+pp+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="ssjservice.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                        sections+=section1;

                    })
                    $(".revpros_chta_body").append(sections)

                });
            }
            getRevtProcessChta2()
        }else if($("#ssel").find("option:selected").text()=="下路"){
            function getRevtProcessChta2() {
                $.get(bMock.getFace("ssjProcessChta"), function (data, status) {
                    var sections = "";
                    var arry=[];
                    var u=0;
                    $.each(data.data,function(k,val){
                        if(data.data[k].teachRange.indexOf("下路")!=-1){
                            arry[u]=data.data[k];
                            u++;
                        }
                    });


                    if($("#ssel option[value='按分路筛选']").val()==="按分路筛选"){
                        $("#ssel option[value='按分路筛选']").remove();
                        $("#ssel").prepend("<option value='全部老师'>全部老师</option>");
                    }else{
                        $("#ssel option[value='全部老师']").remove();
                        $("#ssel").prepend("<option value='全部老师'>全部老师</option>");
                    }


                    $.each(data.data,function(i,v){

                        var imgages="";
                        //$.each(data.data[i].imgs,function(k,v){
                        //    var images1="";
                        //    images1+='<li>'+'<img src="'+data.data[i].imgs[k]+'">'+'</li>';
                        //    imgages+=images1;
                        //});


                        var pp= imgages;



                        var section1="";
                        section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+pp+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="ssjservice.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                        sections+=section1;

                    })
                    $(".revpros_chta_body").append(sections)

                });
            }
            getRevtProcessChta2()
        }else if($("#ssel").find("option:selected").text()==="全部老师"){

            $.get(bMock.getFace("ssjProcessChta"), function (data, status) {
                console.log(data.data);
                var sections="";
                $.each(data.data,function(i,v){

                    var imgages="";
                    //$.each(data.data[i].imgs,function(k,v){
                    //    var images1="";
                    //    images1+='<li>'+'<img src="'+data.data[i].imgs[k]+'">'+'</li>';
                    //    imgages+=images1;
                    //});

                    var pp= imgages;



                    var section1="";
                    section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+pp+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="ssjservice.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                    sections+=section1;

                })
                $(".revpros_chta_body").append(sections);
                $("#ssel").prepend("<option value='按分路筛选'>按分路筛选</option>");
                $("#ssel option[value='全部老师']").remove();


            });
        }else if($("#ssel").find("option:selected").text()==="按分路筛选"){
            $.get(bMock.getFace("ssjProcessChta"), function (data, status) {
                console.log(data.data);
                var sections="";
                //var obj1={};
                $.each(data.data,function(i,v){

                    var imgages="";
                    //$.each(data.data[i].imgs,function(k,v){
                    //    var images1="";
                    //    images1+='<li>'+'<img src="'+data.data[i].imgs[k]+'">'+'</li>';
                    //    imgages+=images1;
                    //});


                    var pp= imgages;



                    var section1="";
                    section1+= '<div class="chat">'+'<section>'+'<div class="revpros_chta_cont revpros_chta_cont'+i+'">'+'<div class="revpros_chta_pic_wrap">'+'<div class="revpros_chta_pic">'+'<div class="revcp_cot">'+'<div class="revcp_cott">'+'<img src="images/revcp_teach_cs1.png">'+'</div>'+'</div>'+'</div>'+'</div>'+'<div class="revpros_chta_cnt_wrap">'+'<div class="revpros_chta_cnt">'+'<dl>'+'<dt>'+'<ul>'+'<li>'+data.data[i].name+'</li>'+'<li>明天可约</li>'+'</ul>'+'</dt>'+'<dd class="revpros_chta_cnt_d1">'+'<ul>'+'<li>授课范围：</li>'+'<li class="revcp_cott_jx'+i+'">'+data.data[i].teachRange+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>累计完成：</li>'+'<li>378次一对一教学</li>'+'</ul>'+'</dd>'+'<dd>'+'<ul>'+'<li>擅长英雄：</li>'+'<li>'+'<ol>'+pp+'</ol>'+'</li>'+'</ul>'+'</dd>'+'<dd>'+'<a href="ssjservice.html?'+data.data[i].userId+'">'+'<button>预约老师</button>'+'</a>'+'</dd>'+'</dl>'+'</div>'+'</div>'+'<div class="clear"></div>'+'</div>'+'</section>'+'</div>'
                    sections+=section1;

                })
                $(".revpros_chta_body").append(sections)

            });
        }

    })


    getStatus();
    getSsjProcessChta();



})