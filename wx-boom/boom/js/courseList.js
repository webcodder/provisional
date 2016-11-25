jQuery(document).ready(function () {

    //curlit_list 高度自适应


    //搜索框


    jQuery.postJSON = function (data, url, success) {
        return jQuery.ajax({
            type: "POST",
            url: url,
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: success
        });
    };

    var defaultLab;
    var thisTeacher;
    var allLabMap;


    function GetRequest() {

        //获取url中"?"符后的字串


        var testUrl = window.location.href.split('?')[1];

        var json = decodeURI(testUrl);

        console.log(json);

        return json;
    }

    var locationUrlJson = GetRequest();
    var vm = new Vue({
        el: '#app',
        data: {
            staticUrl: "http://static.iboom.tv/static/img/",
            courseList: [],
            locationView: [],
            playView: [],
            selected: "",
            positionSelected: "位置",
            functionSelected: "打法",
            searchQuery: "",
            isEmpty: false
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
            getLocationViews: function () {
                $.get("/wx/school/v1.0/labView?viewName=位置", function (data, status) {
                    var thisViewLabs = data.data.labs;
                    console.log(thisViewLabs);
                    vm.locationView = thisViewLabs;
                });
            },
            getPlayViews: function () {
                $.get("/wx/school/v1.0/labView?viewName=打法", function (data, status) {
                    var thisViewLabs = data.data.labs;
                    console.log(thisViewLabs);
                    vm.playView = thisViewLabs;
                });
            },
            getAllViews: function () {
                $.get("/wx/school/v1.0/labView?viewName=全部视频", function (data, status) {
                    var thisViews = data.data.childs;
                    thisViews.forEach(
                        function (view) {
                            if (view.name === "默认") {
                                defaultLab = view.labs
                                console.log(defaultLab);
                            }
                        }
                    )
                });
            },
            getCourseList: function () {
                if (locationUrlJson) {
                    jQuery.postJSON = function (data, url, success) {
                        return jQuery.ajax({
                            type: "POST",
                            url: url,
                            data: JSON.stringify(data),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: success
                        });
                    };

                    jQuery.postJSON(eval("(" + locationUrlJson + ")"), '/wx/school/v1.0/courses', function (data) {
                        console.log(data);
                        if (data.data.length > 0) {
                            vm.courseList = data.data;
                        } else {
                            vm.courseList = [];
                            vm.isEmpty = true;
                        }
                    })
                }
                // else{
                //     vm.isEmpty = true;
                // }
            },
            searchCourse: function (query) {
                vm.isEmpty = false;
                var newFilter = {};
                newFilter.labs = vm.getLabEnameId(defaultLab);
                newFilter.page = 0;
                newFilter.size = 20;
                newFilter.query = query;
                jQuery.postJSON(newFilter, '/wx/school/v1.0/courses', function (data) {
                    console.log(data);
                    if (data.data.length > 0) {
                        vm.courseList = data.data;
                        $(".close").click();
                    } else {
                        vm.courseList = [];
                        vm.isEmpty = true;
                        $(".close").click();
                    }

                })
            },
            getTeacher: function (value) {
                if (thisTeacher) {
                    return thisTeacher;
                } else {
                    $.ajax({
                        async: false,
                        url: "/wx/school/v1.0/teacher/" + value,
                        success: function (data, status) {
                            thisTeacher = data.data;
                        }
                    });
                    return thisTeacher;
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
            getFilterCourse: function (value) {
                vm.isEmpty = false;
                var newFilter = {};
                newFilter.labs = vm.getLabEnameId(defaultLab);
                newFilter.page = 0;
                newFilter.size = 20;
                var newlabId = value;
                var newlab = vm.getAllLabs(newlabId);
                var eNameId = newlab.eName + '-' + newlab.id;
                newFilter.labs.push(eNameId);

                jQuery.postJSON(newFilter, '/wx/school/v1.0/courses', function (data) {
                    console.log(data);
                    if (data.data.length > 0) {
                        vm.courseList = data.data;
                    } else {
                        vm.courseList = [];
                        vm.isEmpty = true;
                    }

                })
            }
        },
        filters: {
            labNameFilter: function (value) {
                return vm.getAllLabs(value) == null ? "未知标签" : vm.getAllLabs(value).labName;
            },
            dateText: function (value) {
                function DateService(value) {
                    if (!value) {
                        return "时间未确定";
                    } else {
                        return new Date(parseInt(value)).toLocaleString().replace(/:\d{1,2}$/, ' ');
                    }
                }

                return DateService(value);
            },
            teacherName: function (value) {
                return vm.getTeacher(value) == null ? "未知老师" : vm.getTeacher(value).name;
            }
        }

    })
    vm.getStatue();
    vm.getCourseList();
    vm.getLocationViews();
    vm.getPlayViews();
    vm.getAllViews();
});



