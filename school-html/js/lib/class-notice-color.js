 /*
 *Author:liaohs
 *Date:2016.1.11
 *Name:boomgame
 */
 mainApp.controller('color',function($scope, $http,$timeout) {



     $http.get(dataport.classnotice,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
         .success(function(response) {

            $scope.notices = transdata(response)
         });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行



        $scope.notices.forEach(function(v,i){
            var id=v.bulletinId

            if(i==1){
                $("#notice"+id).addClass("in")
            }
            $("#notice"+id).find(".panel-body").append(v.content)
        })
        $(".panel-heading").click(function(){
            var a=$(this).find("a")
            var aclass=a.attr("class")
            var ntc=$(this).find(".ntc")
           // console.log(aclass)
            $(".ntc").show()
            if(aclass.indexOf("collapsed")==-1){//收起
               // console.log("收起")
                ntc.show()
            }else{//展开
                ntc.hide()
            }
        })


        $scope.isShowTicket = true;
        $scope.showTicket = function(){
          $http({
            method: 'GET',
            url: '/school/getMyCoupons.do'
          }).then(function successCallback(response) {
                console.log(response);
                $scope.myTicket = response.data.data;

                if($scope.myTicket.length>0){
                  $scope.myTicket =$scope.myTicket [0];
                  $scope.isShowTicket = true;
		 console.log("-----")
		$timeout(function(){
			console.log(">>>>>")
            $(".mask-level").css("display","block");
             
          },1000); 
               }else{
                  $scope.myTicket =null;
                  $scope.isShowTicket = false;
                }
                  console.log($scope.myTicket)
            }, function errorCallback(data) {
               console.log("获取数据错误");
            });
        }
        $scope.showTicket();

        //打开相应的直播间
        // $scope.showThisRoom = function(num){
        //     var liveId = ["A2016101900001rk","A2016101900001rn","A2016101900001ro","A2016101900001rp"];
        //     var thisLiveId = liveId[num];
        //     console.log(thisLiveId);
        //     // var player = new CloudLivePlayer();
        //     // player.init({activityId:thisLiveId},"player");
        //     console.log("hello!");
        // }

    });
     $scope.showThisRoom = function(num){
         var liveId = ["A2016101900001rk","A2016101900001rn","A2016101900001ro","A2016101900001rp","A2016110700001sa"];
         var thisLiveId = liveId[num];
         console.log(thisLiveId);
         var player = new CloudLivePlayer();
         player.init({activityId:thisLiveId},"player");
     };

      $scope.closeTicket = function(){
        $scope.isShowTicket = false;
      }

      // socket



 });


function transTicket(data){
  var tickets = [];
  data.forEach(function(v,i){
    var ticket = v
  })
}


function transdata(data){
    var notices = [];
    data.forEach(function(v, i) {
        var notice=v
            notice.top=iftop(i)
            notice.new=ifnew(v.addTime)
            notice.title1=titleDivide(v.title)[0]
            notice.title2=titleDivide(v.title)[1]
        notices.push(notice)
    })

    return notices
}





function titleDivide(data){
    var title1=data.split("】")[0].replace(/【/i,"")
    var title2=data.split("】")[1]
    var a=[title1,title2];
    return a
}
function iftop(v){
    if(v==0){return "【置顶】"}
    else{return ""}
}
function ifnew(v){
    var nowtime= Date.parse(new Date())/1000;
    var addtime=transdate(v)
    var d=24*60*60;
    var l=(nowtime-addtime)/d
    if(l<=2){
        return "新"
    }else{
        return ""
    }

}

 function transdate(endTime) { //时间戳转换
     var date = new Date();
     date.setFullYear(endTime.substring(0, 4));
     date.setMonth(endTime.substring(5, 7) - 1);
     date.setDate(endTime.substring(8, 10));
/*     date.setHours(00);
     date.setMinutes(00);
     date.setSeconds(000); */
     return Date.parse(date) / 1000;
 }
