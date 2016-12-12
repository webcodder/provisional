 /*
  * Author:liaohs
  * Date:2016.3.25
  * Name:boomgame
  */


var myLoginInfo=JSON.parse(localStorage.getItem("myLoginInfo"))

/*
	var applyStatues=["apply","wait","teached","end"]
*/

var myCommentData={};

var helpEffectData={};

mainApp.controller('color',["$scope","$http", 'ajax',function($scope, $http,ajax) {

/* --------------------- 获取基础信息 --------------------  */
	$scope.student=myLoginInfo
      /* --------------------- 获取申请状态 --------------------  */

    ajax.get(dataport.getAllteachers,
    	function(data){
    		if(!data.error){
    			var arr={}

    			for(var i=0;i<data.data.length;i++){
    				var v=data.data[i]
    				arr[v.userId]=v
    			}

    			$scope.teachersAll=arr

    		}
    	},function(err){

    })
  	$http.get(dataport.applyStatue+"?studentNum="+myLoginInfo.studentNum,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
        .success(function(data){
            if(!data.error){

            	$scope.nowTeacherId=data.data.data.teacherId
                var applyStatue=data.data.statue
               	if(applyStatue!="teached"){
               		 location.href="one-to-one.html"
               	}

               	$scope.teacherCommentTime=function(){
               		var time=new Date(data.data.data.teachFinishTime)

				    var YYYY=time.getFullYear();
				    var MM=time.getMonth()+1;
				    var DD=time.getDate();
				    var hh=time.getHours()
				    var mm=time.getMinutes()

				  	var str=YYYY+"年"+MM+"月"+DD+"日 "+hh+":"+mm
               		return str
               	}

               	$scope.teachComment=data.data.data
                $scope.teachComment.teacherEvaluate1=JSON.parse($scope.teachComment.teacherEvaluate)
                // console.log($scope.teachComment.teacherEvaluate1)

               	$scope.teachComment.teacherName=$scope.teachComment.teacherId?(teachers[$scope.teachComment.teacherId]?(teachers[$scope.teachComment.teacherId]):""):"";
               	// $scope.teachComment.teacherName=teachers[$scope.teachComment.teacherId]==undefined?"":teachers[$scope.teachComment.teacherId].name
               	myCommentData.id=$scope.teachComment.id

            }

        })
        .error(function(e){
     		// console.log(e)
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
  	// console.log(a)
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

	$scope.helpEffectRestLen=300;
	$scope.$watch('myHelpEffect',function(n,o){

		if(n!=undefined) {

			$scope.helpEffectRestLen = 300-n.length

			myCommentData.adviceContent = n
			if(n.length==0) {
				myCommentData.adviceContent = undefined
			}

		}

	})

	$scope.helpEffect =function(a){
		$scope.isShowEffect = true;
		$scope.effect=[
			"详细说说吧,具体在哪个方面有帮助呢?",
			"给学院和老师提点建议吧，我们争取下次做得更好",
			"给学院和老师提点建议吧，我们争取下次做得更好"]
			$scope.placeHolder = $scope.effect[a];
			myCommentData.canHelp = a;
	}


  $scope.myCommentDisabled= true;
  $scope.myCommentData=myCommentData
  $scope.$watch('myCommentData',function(n,o){
  	if(n.score!=undefined&&n.evaluate!=undefined&&n.canHelp!=undefined&&n.adviceContent!=undefined){
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

		  if (myCommentDisabled=false){
				alert("您还有未填内容")
			}

			// data.canHelp=	$scope.effectIndex;
			// data.adviceContent=$scope.myHelpEffect;


  		$http.post(dataport.evaluateByStudent,data,{datatype:"json"})
  			.success(function(data){
			  $scope.process=false
			  $scope.result=true
			  setTimeout(function(){
			  	location.href="one-to-one.html"
			  },1000)


  			})
  			.error(function(e){
  				// console.log(e)
  			})
  	}

  $scope.isPublic = false;
	$scope.publicTab = function(){
		$scope.isPublic = !this.isPublic;
	}
	$scope.isAnonymity = false;
	$scope.anonymityTab = function(){
		$scope.isAnonymity = !this.isAnonymity;
	}
	$scope.placeHolder = "详细说说吧,具体在哪个方面有帮助呢?"

	// $scope.helpEffect =function(a){
	// 	$scope.isShowEffect = true;
  //   $scope.effect=[
	// 		"详细说说吧,具体在哪个方面有帮助呢?",
	// 		"给学院和老师提点建议吧，我们争取下次做得更好",
	// 		"给学院和老师提点建议吧，我们争取下次做得更好"]
	// 		$scope.placeHolder = $scope.effect[a];
	// 		myCommentData.canHelp = a;
	// }



  /* --------------------- 发表评论 --------------------  */



 }]);
