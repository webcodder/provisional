 /*
  * Author:liaohs
  * Date:2016.3.16
  * Name:boomgame
  */



mainApp.controller('color',["$scope" ,"$http" ,function($scope,$http) {

	$scope.otohref={
		infoready:false,
		serviceIsOpen:false,
		href:"#"
	}

     $http.get(dataport.mybaseInfo)
      .success(function(data){
      	// console.log(data)
        $scope.otohref.infoready=true
        sessionStorage.setItem("myAchievement",JSON.stringify(data.achievement))
        sessionStorage.setItem("myClassInfo",JSON.stringify(data.baseInfo.boomClass))
        data.baseInfo.student.headimg=(data.baseInfo.student.headImage!=null)?dataport.headimg+data.baseInfo.student.headImage:localPath.defaultimg+"defaultIco.png"
        sessionStorage.setItem("myBaseInfo",JSON.stringify(data.baseInfo.student))

      })  
      .error(function(e){
        console.log(e)
      }); 



    /*  能否预约   */
     $http.get(dataport.serviceIsOpen)
      .success(function(data){

      	console.log(data)
      	if(!data.error){
      		if(data.data.ok){
      			// alert()
      			$scope.otohref.serviceIsOpen=true
      		}
      	}

      })  
      .error(function(e){
        console.log(e)
      }); 

      $scope.$watch('otohref',function(n,o){
      	
      	if(n.infoready&&n.serviceIsOpen){
      		$scope.otohref.href="one-to-one.html"
      	}
      },true)

}])




