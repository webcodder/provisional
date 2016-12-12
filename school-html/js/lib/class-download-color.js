 /*
  *Author:liaohs
  *Date:2016.1.12
  *Name:boomgame
  */
 mainApp.controller('color',function($scope, $http) {
     $http.get(dataport.classdownload,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
         .success(function(response) { 
             $scope.files = transdata(response);
             //console.log(response)

         });
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行

    });
 });

function transdata(data){
    var files=[]
    data.forEach(function(v,i){
        var file = v;
            file.downUrl=dataport.classdownloadF+file.fileName

        files.push(file)
    })
    return files
}

