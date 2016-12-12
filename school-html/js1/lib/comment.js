 /*
  * Author:liaohs
  * Date:2016.3.25
  * Name:boomgame
  */

var myClassInfo=JSON.parse(sessionStorage.getItem("myClassInfo"))
var myBaseInfo=JSON.parse(sessionStorage.getItem("myBaseInfo"))
var myAchievement=JSON.parse(sessionStorage.getItem("myAchievement"))

/*
	var applyStatues=["apply","wait","teached","end"]
*/

var myCommentData={}

mainApp.controller('color',["$scope","$http", 'ajax',function($scope, $http,ajax) {
	
/* --------------------- 获取基础信息 --------------------  */
	$scope.student=myBaseInfo
      /* --------------------- 获取申请状态 --------------------  */
  	$http.get(dataport.applyStatue+"?studentNum="+myBaseInfo.studentNum)
        .success(function(data){
            if(!data.error){
            	
                var applyStatue=data.data.statue
               	if(applyStatue!="teached"){
               		 location.href="one-to-one.html"
               	}

               	$scope.teachComment=data.data.data
                $scope.teachComment.teacherEvaluate1=JSON.parse($scope.teachComment.teacherEvaluate)
                console.log($scope.teachComment.teacherEvaluate1)
              
               	$scope.teachComment.teacherName=teachers[$scope.teachComment.teacherId].name
               	myCommentData.id=$scope.teachComment.id
               	
            }

        })
        .error(function(e){
     		console.log(e)
        }); 
  /* --------------------- 获取申请状态 --------------------  */

  /* --------------------- 发表评论 --------------------  */
  
  var stars=[
	  {num:1,css:"fa-star-o"},
	  {num:2,css:"fa-star-o"},
	  {num:3,css:"fa-star-o"},
	  {num:4,css:"fa-star-o"},
	  {num:5,css:"fa-star-o"}
  ]

  $scope.stars=angular.copy(stars)

  $scope.starsChange=function(a){
  	$scope.stars=angular.copy(stars)
  	myCommentData.score=a
  	for(var i in $scope.stars){
  		if(i<a){
  			$scope.stars[i].css="fa-star"
  		}
  	}
  	console.log(a)
  }
  

  $scope.myCommentRestLen=300
  $scope.$watch('myComment',function(n,o){

  	if(n!=undefined){

  		$scope.myCommentRestLen=300-n.length

  		myCommentData.evaluate=n
  		if(n.length==0){
  			myCommentData.evaluate=undefined
  		}

  	}
  		
  })
  $scope.myCommentDisabled=true
  $scope.myCommentData=myCommentData
  $scope.$watch('myCommentData',function(n,o){
  	if(n.score!=undefined&&n.evaluate!=undefined){
  		$scope.myCommentDisabled=false
  	}else{
  		$scope.myCommentDisabled=true
  	}
  		
  },true)

  $scope.process=true
  $scope.result=false

  setTimeout(function(){
  	$(".part4").removeClass("hidden")
  },100)

  	$scope.myCommentApply=function(){
  		var data=$scope.myCommentData
  		console.log(data)
  		$http.post(dataport.evaluateByStudent,data)
  			.success(function(data){
			  $scope.process=false
			  $scope.result=true
			  setTimeout(function(){
			  	location.href="one-to-one.html"
			  },1000)

  				
  			})
  			.error(function(e){
  				console.log(e)
  			})
  	}


  

  /* --------------------- 发表评论 --------------------  */

  

 }]);









