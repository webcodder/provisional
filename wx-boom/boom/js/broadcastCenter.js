jQuery(document).ready(function () {

//轮播
    var swiper = new Swiper('.boacteer_header_ban .swiper-container', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 5,
        centeredSlides: true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    });

    //boacteer_cont 高度自适应
    var boatehedHeight = $(".boacteer_header").height();
    // console.log(boatehedHeight);
    var boatectpHeight = $(".boacteer_cont_top").height();
    $(".boacteer_cont").css("height", $(window).height() - boatehedHeight - 12);
    $(".boacteer_cont_list").css("height", $(window).height() - boatehedHeight - 12 - boatectpHeight - 1);


    //页面相关

    var allLabMap;
    var defaultLab;
    var oldLab;
    var allLab;

    function boactnSwiper() {
        var swiper = new Swiper('.boacteer_header_ban .swiper-container', {
            pagination: '.swiper-pagination',
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            paginationClickable: true,
            spaceBetween: 5,
            centeredSlides: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: false
        });
    }

    var vm = new Vue({
        el: '#app',
        data: {
            staticUrl: "http://static.iboom.tv/static/img/",
            greeting: 'Welcome to your Vue.js app!',
            lives: [],
            slides: []
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
            getLiveList: function () {
                $.get("wx/school/v1.0/recommend?groupId=14", function (data, status) {
                    console.log(data);
                    vm.lives = data.data;
                });
            },
            getSlideList: function () {
                $.get("wx/school/v1.0/recommend?groupId=13", function (data, status) {
                    var thisLives = data.data;
                    var lists = "";
                    console.log(thisLives);
                    $.each(thisLives, function (n, value) {
                        var li = "";
                        li += "<div class='swiper-slide'><a class='curcent_hadban_pic' href='http://" + value.url + "'>" + "<div class='boacteer_header_ban_pic'>" + "<img src='http://static.iboom.tv/static/img/" + value.img + "'/>" + "</div>" + "</a>" + "</div>";
                        lists += li;
                    });
                    $("#vsrmd").append(lists);
                    boactnSwiper();
                });
            },
            toOldCourse: function () {
                var thisUrl = {};
                thisUrl.labs = vm.getLabEnameId(defaultLab);
                if (oldLab) {
                    var newlabs = defaultLab.concat(oldLab);
                    thisUrl.labs = vm.getLabEnameId(newlabs);
                }
                thisUrl.page = 0;
                thisUrl.size = 20;
                window.location.href = "courseList.html?" + JSON.stringify(thisUrl);
            },
            getLabEnameId: function (array) {
                var LabEnameIdList = [];
                array.forEach(function (li) {
                    var list = vm.getAllLabs(li);
                    var newlist = list.eName + "-" + list.id;
                    LabEnameIdList.push(newlist);
                })
                return LabEnameIdList;
            },
            getAllLabs: function (value) {
                if (allLabMap) {
                    return allLabMap[value];
                }
                $.ajax({
                    async: false,
                    url: "/wx/school/v1.0/labs",
                    success: function (data, status) {
                        var allLabs = data.data;
                        allLabMap = {};
                        if (Array.isArray(allLabs)) {
                            allLabs.forEach(function (data) {
                                allLabMap[data.id] = data;
                            })
                        }
                    }
                });
                return allLabMap[value];
            },
            getAllViews: function () {
                $.get("/wx/school/v1.0/labView?viewName=直播推荐页-中", function (data, status) {
                    var thisViews = data.data.childs;
                    thisViews.forEach(
                        function (view) {
                            if (view.name === "默认") {
                                defaultLab = view.labs
                            } else if (view.name === "往期课程录播") {
                                oldLab = view.labs
                            }
                        }
                    )
                });
            },
        }
    })
    vm.getStatue();
    vm.getLiveList();
    vm.getSlideList();
    vm.getAllViews();


})


