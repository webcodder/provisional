jQuery(document).ready(function () {

    //搜索框
    $(".search-icon").click(function () {
        $(".list_seasrch").show();
    });
    $(".close").click(function () {
        $(".list_seasrch").fadeOut();
    });
    $(".search-input ~ b").click(function () {
        $(".search-input").attr("value", "");
    });

    // function submitFn(obj, evt) {
    //     value = $(obj).find('.search-input').val().trim();
    //
    //     _html = "Yup yup! Your search text sounds like this: ";
    //     if (!value.length) {
    //         _html = "Yup yup! Add some text friend :D";
    //     } else {
    //         _html += "<b>" + value + "</b>";
    //     }
    //
    //     $(obj).find('.result-container').html('<span>' + _html + '</span>');
    //     $(obj).find('.result-container').fadeIn(100);
    //
    //     evt.preventDefault();
    // }

    //scrlit_article高度自适应 scrcleHeight
    var scrhedHeight = $(".scrlit_header").height();
    //console.log(scrhedHeight);
    $(".scrlit_article").css("height", $(window).height() - scrhedHeight - 8);
    $(".scrlit_nav").css("height", $(window).height() - scrhedHeight - 8);

    var allLabMap;
    var defaultLab;

    var vm = new Vue({
        el: '#app',
        data: {
            staticUrl: "http://static.iboom.tv/static/img/",
            greeting: 'Welcome to your Vue.js app!',
            thisViews: [],
            viewLabs: [],
            searchQuery: ""
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
                            view.isShow = true;
                            if (view.name === "默认") {
                                view.isShow = false;
                                defaultLab = view.labs
                            }
                        }
                    )
                    console.log(thisViews);
                    vm.thisViews = thisViews;
                    vm.chooseNav(0);
                });
            },
            logIsActive: function () {
                vm.thisViews.forEach(function (item) {
                    item.isActive = false;
                });
                console.log(vm.thisViews);
            },
            chooseNav: function (index) {
                vm.viewLabs = [];
                this.logIsActive();
                vm.thisViews[index].isActive = true;
                var thisLabs = vm.thisViews[index].labs;
                console.log(thisLabs);
                var newLabs
                if (Array.isArray(thisLabs)) {
                    thisLabs.forEach(function (data) {
                        var arr = vm.getAllLabs(data)
                        vm.viewLabs.push(arr);
                        console.log(vm.viewLabs);
                    })
                }
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
            toLabCourse: function (id) {
                var thisUrl = {};
                thisUrl.labs = vm.getLabEnameId(defaultLab);
                thisUrl.page = 0;
                thisUrl.size = 20;
                if (id) {
                    var thisLab = vm.getAllLabs(id);
                    var eNameId = thisLab.eName + "-" + thisLab.id;
                    thisUrl.labs.push(eNameId);
                }
                window.location.href = "courseList.html?" + JSON.stringify(thisUrl);
            },
            toALLCourse: function () {
                var thisUrl = {};
                thisUrl.labs = vm.getLabEnameId(defaultLab);
                thisUrl.page = 0;
                thisUrl.size = 20;
                window.location.href = "courseList.html?" + JSON.stringify(thisUrl);
            },
            searchCourse: function (query) {
                var newFilter = {};
                newFilter.labs = vm.getLabEnameId(defaultLab);
                newFilter.page = 0;
                newFilter.size = 20;
                newFilter.query = query;
                window.location.href = "courseList.html?" + JSON.stringify(newFilter);
            },
        },
        filters: {
            labNameFilter: function (value) {
                return vm.getAllLabs(value) == null ? "未知标签" : vm.getAllLabs(value).labName;
            },
            labImgFilter: function (value) {
                return vm.getAllLabs(value) == null ? "未知标签" : vm.getAllLabs(value).dataExt1;
            }
        }

    })

    vm.getAllViews();
    vm.getStatue();


})



