jQuery(document).ready(function () {

//视图与标签过滤
    var allLabMap;
    var defaultLab;
    var oldLab;
    var allLab;

    function curban_swiper() {
        var swiper = new Swiper('.curcent_hadban .swiper-container', {
            pagination: '.swiper-pagination',
            slidesPerView: 1.6,
            paginationClickable: true,
            spaceBetween: 10,
            freeMode: true
        });
    }


    var swiper = new Swiper('.curcent_hadban .swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 1.6,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true
    });

    function coruHeightauto() {
        //curcent_cont高度自适应
        var curcenhedHeight = $(".curcent_header").height();
        var curctpHeight = $(".curcent_cont_top").height();
        console.log($(".curcent_hadban").height());
        console.log(curcenhedHeight);
        $(".curcent_cont").css("height", $(window).height() - curcenhedHeight - 12);
        $(".curcent_cont_list").css("height", $(window).height() - curcenhedHeight - 12 - curctpHeight - 1);
    }

    // curban_swiper();
    var vm = new Vue({
        el: '#app',
        data: {
            staticUrl: "http://static.iboom.tv/static/img/",
            greeting: 'Welcome to your Vue.js app!',
            thisViews: [],
            viewLabs: [],
            courses: [],
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
            getCourseList: function () {
                $.get("wx/school/v1.0/recommend?groupId=12", function (data, status) {
                    console.log(data);
                    vm.courses = data.data;

                });
            },
            getSlideList: function () {
                $.get("wx/school/v1.0/recommend?groupId=11", function (data, status) {
                    var thisLives = data.data;
                    var lists = "";
                    console.log(thisLives);
                    $.each(thisLives, function (n, value) {
                        var li = "";
                        li += "<div class='swiper-slide'><a class='curcent_hadban_pic' href='http://" + value.url + "'>" + "<img src='http://static.iboom.tv/static/img/" + value.img + "'/>" + "</a>" + "</div>";
                        lists += li;
                    });
                    $("#hotCourse").append(lists);
                    curban_swiper();
                    coruHeightauto();
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
            toALLCourse: function () {
                var thisUrl = {};
                thisUrl.labs = vm.getLabEnameId(defaultLab);
                if (allLab) {
                    var newlabs = defaultLab.concat(allLab);
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
                            } else if (view.name === "全部课程") {
                                allLab = view.labs
                            }
                        }
                    )
                });
            },

        }
    });

    vm.getStatue();
    vm.getCourseList();
    vm.getSlideList();
    vm.getAllViews();

});


