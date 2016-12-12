 /*
  *Author:liaohs
  *Date:2016.1.12
  *Name:boomgame
  */
 mainApp.controller('color',function($scope, $http,$sce) {
    $http.get(dataport.classactivity,{contentType: 'application/json;charset=UTF-8',dataType:"json"})
         .success(function(response) { 
            var index=htmlref.split("?")[1]
            $scope.activitys = transdata(response);
            $scope.activity=transdata(response)[index];
            $scope.activitycontent=$sce.trustAsHtml(transdata(response)[index].content)
            
         });

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行

    });
 });

function transdata(data){
    var activitys=[]
    data.forEach(function(v,i){
        var activity = v;

            activity.time=activity.addTime.split(" ")[0];
            activity.index=i;
            var imgArr=[];
            for(var i1 in activity.boomActivityPicList){

              var a=activity.boomActivityPicList[i1].url;
              var b=dataport.activityimg+a;
              imgArr.push(b)
            }
            activity.imgUrl=imgArr

        activitys.push(activity)
    })

    return activitys
}



