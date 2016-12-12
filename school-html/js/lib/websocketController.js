/**
 * Created by Administrator on 2016/10/20.
 */

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

    $scope.chats = [];
    var speaker = {};
    var group = "default"

    var contentBox = $("#contentBox");

    $scope.connect = function () {
        $http.jsonp("http://school.iboom.tv/school/auth/userStatue.do?callback=JSON_CALLBACK").success(function (data) {
            var auth = data.auth;
            speaker = boomWebSocket.createSpeaker(auth.summoner, auth.studentNum, auth.headImage ? auth.headImage : "defaultIco.png");
            group = auth.areaCode ? auth.areaCode : "default";
            webSocketService.listen("/topic/greetings/live" , function (data, $scope) {
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
        if($scope.data){
            var data = boomWebSocket.createGroupMessage($scope.data, "live", speaker)
            webSocketService.say("/app/hello", data, null, $scope);
            $scope.data = "";
            $scope.toBottom();
        }
    };
    $scope.toBottom = function(){
        $("#show-room-chat-content").scrollTop(88888);
    };
}])