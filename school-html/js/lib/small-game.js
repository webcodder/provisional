 /*
  * Author:liaohs
  * Date:2016.3.24
  * Name:boomgame
  */

// dataport.headimg

var myLoginInfo=JSON.parse(localStorage.getItem("myLoginInfo"))
// console.log(myLoginInfo)
var myGameRunk=JSON.parse(localStorage.getItem("myGameRunk"))
// console.log(myGameRunk)

mainApp.controller('color',["$scope","$http", 'ajax',function($scope, $http,ajax) {


/* --------------------- teacher --------------------  */


/* --------------------- allteacherscomments --------------------  */

$scope.myLoginInfo=myLoginInfo






  $scope.commentChange=function(a){
    $scope.pagesShow=false
    $scope.pagesShow1=false
	  $http.post(dataport.teacherSpecific+teacherId,{page:a,size:10},{datatype:"json"})
	  .success(function(data){
     $scope.pagesArr={
      now:data.nowPage,
    }
    $scope.pagesArr.prev=(function(){
      return (data.nowPage-1>0)?data.nowPage-1:0
    })()
    $scope.pagesArr.next=(function(){
      return (data.nowPage+1<data.totalPage-1)?data.nowPage+1:data.totalPage-1
    })()

	  		CommentFunc(data)

	  })
	  .error(function(e){
	  	// console.log(e)
	  })
  }


/* --------------------- allteacherscomments --------------------  */









/* --------------------- rank --------------------  */
// dataport.getRankList
// dataport.getRankPosition
// console.log(dataport.getRankPosition+myLoginInfo.studentNum)
  $http.get(dataport.getRankPosition+myLoginInfo.studentNum,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
  .success(function(data){
      console.log(data)
      $scope.myPosition=data
  })
  .error(function(e){})


  $scope.tabTop=["当前排名","班级","学号","召唤师同学","成绩"];


 var pagesInfo={
      totalEle:10,
      size:1,
      total:1,
      total:1,
      total:1,
      total:1,
      total:1,


 }


  $http.get(dataport.getRankList,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
  .success(function(data){
    
    for(var i in data){
      if(data[i].header==null){
        data[i].headerImg=localPath.defaultimg+"defaultIco.png"
      }else{
        data[i].headerImg=dataport.headimg+data[i].header
      }
    }
    // console.log(data)
    data.length=(data.length<50)?data.length:50
    $scope.RankList=data

  })
  .error(function(e){})


/* --------------------- rank --------------------  */




function CommentFunc(data){
	if(!data.error){
  			data.nowpage=data.nowPage+1
  			
  			data.pageList=(function(){
  				var arr=[]
  				for(var i=0;i<data.totalPage;i++){
  					var b={}
  						b.num=i
  					arr.push(b)
  				}

  				return arr
  			})()
  			data.pageList[data.nowPage].css="active"
  			$scope.teachersComments=data
  			$scope.teachersComments.nowlists=(function(){
  				// console.log($scope.teachersComments.nowPage)
  				var a=$scope.teachersComments.nowPage*$scope.teachersComments.size+1
  				var b=($scope.teachersComments.nowPage+1)*$scope.teachersComments.size
  				if(b>$scope.teachersComments.totalElement){
  					b=$scope.teachersComments.totalElement
  				}
  				return a+"-"+b
  			})()

  			for(var i=0;i<data.data.length;i++){
  				 data.data[i].teacherName=teachers[data.data[i].teacherId].name
  				
  			}
  			
  			
  			$scope.listsData=data.data
  			for(var i=0; i<$scope.listsData.length;i++){
  				var header=$scope.listsData[i].header

  				if(header==null){
  					$scope.listsData[i].headimg=localPath.defaultimg+"defaultIco.png"
  				}else{
  					$scope.listsData[i].headimg=dataport.headimg+header
  				}

  				var timeDiffermm=Math.floor(($scope.listsData[i].now-$scope.listsData[i].closeTime)/(1000*60))
  				var timeDifferhh=Math.floor(timeDiffermm/60)
  				var timeDifferdd=Math.floor(timeDifferhh/24)
  				
  				if(timeDifferdd>0){
  					$scope.listsData[i].timeBefore=timeDifferdd+"天前"
  				}else{
  					if(timeDifferhh>0){
  						$scope.listsData[i].timeBefore=timeDifferhh+"小时前"
  					}else{
  						if(timeDiffermm>0){
  							$scope.listsData[i].timeBefore=timeDiffermm+"分钟前"
  						}else{
  							$scope.listsData[i].timeBefore="刚刚"
  						}
  					}
  				}
  			}
  			// console.log($scope.listsData)
  		}
}

}]) 


