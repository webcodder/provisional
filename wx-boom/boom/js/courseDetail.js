jQuery(document).ready(function () {

    //赞
    $('.course_info_bottom ul li:last').toggle(
        function () {
            $(this).find("span").addClass("couin_bood");
        },
        function () {
            $(this).find("span").removeClass("couin_bood");
        }
    );

    function GetRequest() {
        //获取url中"?"符后的字串
        var url = window.location.href.split('?')[1];
        var json = decodeURI(url);
        return json;
    }

    var urlInfo = GetRequest();
    console.log(urlInfo);
    var vm = new Vue({
        el: '#app',
        data: {
            greeting: 'Welcome to your Vue.js app!',
            thisViews: [],
            viewLabs: [],
            isShowCourse: true,
            isShowAsk: false,
            thisCourse: {},
            courseContent: {},
            isHaveContent: true
        },
        methods: {
            getStatue: function () {
                $.get("wx/school/v1.0/statue", function (data, status) {
                    if (!data.data) {
                        window.location.href = "index.html?" + window.location.pathname + window.location.search;
                    } else {
                        console.log("登录成功！");
                    }
                });
            },
            getAllViews: function () {
                $.get("/wx/school/v1.0/labView?viewName=课程筛选", function (data, status) {
                    var thisViews = data.data.childs;
                    thisViews.forEach(
                        function (view) {
                            view.isActive = false;
                        }
                    )
                    console.log(thisViews);
                    vm.thisViews = thisViews;
                    vm.chooseNav(0);
                });
            },
            getCourseInfo: function () {
                $.get("/wx/school/v1.0/course/" + urlInfo, function (data, status) {
                    if (data.data) {
                        vm.thisCourse = data.data;
                        if (data.data.mainPointsList.length > 0) {
                            vm.courseContent = vm.thisCourse.mainPointsList[0].keyPoint;
                        } else {
                            vm.isHaveContent = false;
                        }
                        var thisVideoId = vm.thisCourse.course.videoId;
                        $.get("/wx/school/v1.0/video/" + thisVideoId, function (data, status) {
                            if (data.data.length > 0) {
                                console.log(data);
                                thisVideo = data.data[0];
                                thisVideoUin = thisVideo.videoUin;
                                initVideo(thisVideoUin);
                            }
                        })
                    }
                })
            },
            showCourse: function () {
                vm.isShowCourse = true;
                vm.isShowAsk = false;
            },
            showAsk: function () {
                vm.isShowCourse = false;
                vm.isShowAsk = true;
            }
        }
    })

    var pNode = document.getElementById("autoJs6f527b7c18").parentNode,

        pt, pb, dWidth = pNode.clientWidth,
        pHeight = pNode.clientHeight,
        dHeight = ReCallHeight(pHeight, dWidth, pNode);

    function ReCallHeight(h, w, a) {
        try {
            pt = window.getComputedStyle(a, null).paddingTop;
            pb = window.getComputedStyle(a, null).paddingBottom;
        } catch (e) {
            pt = a.currentStyle.paddingTop;
            pb = a.currentStyle.paddingBottom;
        }
        h = h - parseInt(pt) - parseInt(pb);
        if (h && (typeof h == "number") && h == h && h > 0) {
            return h;
        } else {
            var ua = navigator.userAgent.toLowerCase();
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                isMobile = isIphone || isAndroid;
            if (isMobile) {
                return w * 9 / 16;
            } else {
                return (w * 9 / 16) + 36;
            }
        }
    };
    var player = new CloudVodPlayer();

    function initVideo(Vuin) {
        player.init({
            "uu": "fiyztsskze",
            "vu": Vuin,
            "pu": "c1dad40eb3",
            "auto_play": 1,
            "gpcflag": 1,
            "width": dWidth,
            "height": dHeight,
            "lang": "zh_CN",
            "rate": "yuanhua"
        }, "autoJs6f527b7c18");
    }

    var cdivdoHeight = $(".curdtil_video").height();
    var cdinavHeight = $(".curdtil_nav").height();
    var cdibotHeight = $(".curdtil_bottom").height();
    $(".curdtil_box").css("height", $(window).height() - cdivdoHeight - cdinavHeight - cdibotHeight - 1);
    vm.getStatue();
    vm.getCourseInfo();

})
