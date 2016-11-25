$(function () {


    //livage_box高度自适应

    //  var livdoHeight = $(".livage_video").height();
    var liveboxHeight = $(".livage_video_box").height();
    var linavHeight = $(".livage_nav").height();
    var libotHeight = $(".livage_bottom").height();
    $(".livage_box").css("height", $(window).height() - liveboxHeight - linavHeight - libotHeight);
    console.log($(".livage_box").height());


});
var mainApp = angular.module("mainApp", []);

mainApp.provider("webSocketService", function () {
    this.stompClient = null;
    this.setStompEndPoint = function (endPoint) {
        this.endPoint = endPoint;
    }


    this.$get = function () {
        var self = this;
        var receive = new Date().getTime();
        var service = {
            listen: function (url, handler, scope) {

                if (!self.stompClient) {
                    var socket = new SockJS("http://chat.iboom.tv/" + self.endPoint);
                    self.stompClient = Stomp.over(socket);
                }

                self.stompClient.connect({}, function (frame) {
                    $("#info").text("连接直播聊天室成功！")
                    self.subUrl = url;
                    self.stompClient.subscribe(url, function (greeting) {
                        receive = new Date().getTime();
                        if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                            scope.$apply(function () {
                                console.log(greeting.body)
                                handler ? handler(JSON.parse(greeting.body), scope) : null;
                            });
                        }
                    });
                });
                return this;
            },
            reSubscribe: function (url) {
                self.stompClient.subscribe(self.subUrl, function (greeting) {
                    if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                        scope.$apply(function () {
                            console.log(greeting.body)
                            handler ? handler(JSON.parse(greeting.body), scope) : null;
                        });
                    }
                });
            },
            say: function (url, data, handler, scope) {
                self.stompClient.send(url, {}, JSON.stringify(data));
                if (scope.$root.$$phase != '$apply' && scope.$root.$$phase != '$digest') {
                    scope.$apply(function () {
                        handler ? handler(data, scope) : null;
                    });
                }
            }

        };
        return service;
    }
});

mainApp.config(function (webSocketServiceProvider) {
    webSocketServiceProvider.setStompEndPoint("hello")
})

mainApp.controller("show", ["webSocketService", "$http", "$scope", function (webSocketService, $http, $scope) {

    //根据url来找ID
    var urlNumber = window.location.href.split('?')[1];

    function GetRequest() {
        //获取url中"?"符后的字串
        var json = decodeURI(urlNumber);
        return json;
    }

    var urlInfo = GetRequest();

    console.log(urlInfo);

    //聊天室的初始化
    $scope.chats = [];
    var speaker = {};
    var group = "default"

    var contentBox = $("#contentBox");

    $scope.getStatue = function () {
        $.get("wx/school/v1.0/statue", function (data, status) {
            if (!data.data) {
                window.location.href = "index.html?" + window.location.pathname + window.location.search;
            } else {
                console.log("登录成功！");
            }
        });
    };

    $scope.connect = function () {
        $http.get("/wx/school/v1.0/statue").success(function (data) {
            var auth = data.data;
            console.log(auth);
            speaker = boomWebSocket.createSpeaker(auth.summoner, auth.studentNum, auth.headImage ? auth.headImage : "defaultIco.png");
            group = auth.areaCode ? auth.areaCode : "default";
            webSocketService.listen("/topic/greetings/" + urlNumber, function (data, $scope) {
                $scope.chats.push(data);
                var move = $("#inner").height()
                contentBox.scrollTop(move);
                $scope.toBottom();
            }, $scope)
            clearInterval(contectClock)
        }).error(function () {
        })
    }

    var contectClock = setInterval($scope.connect, 3000);

    $scope.myKeyup = function (e) {
        var keycode = window.event ? e.keyCode : e.which;
        console.log("-------")
        if (keycode == 13) {
            $scope.say();
        }
    };

    $scope.say = function () {
        if ($scope.data) {
            var data = boomWebSocket.createGroupMessage($scope.data, urlNumber, speaker)
            webSocketService.say("/app/hello", data, null, $scope);
            $scope.data = "";
            $scope.toBottom();
        }
    };
    $scope.toBottom = function () {
        $("#inner").scrollTop(88888);
    };

    $scope.saySome = function () {
        console.log("test");
    };


    //根据ID查找直播

    //初始化直播
    var playerId;
    var player = new CloudLivePlayer();

    function initPlayer() {
        player.init({
            activityId: playerId,
            rate: "yuanhua"
        }, "player");
    }

    $scope.getThisLive = function () {
        $http.get("/wx/school/v1.0/live/" + urlNumber).success(function (data) {
            console.log(data);
            if (data) {
                playerId = data.data.activityId;
                initPlayer(playerId);
            } else {
                alert("暂无此直播！")
            }
        }).error(function () {
        })
    }

    $scope.getStatue();
    $scope.getThisLive();

}])
