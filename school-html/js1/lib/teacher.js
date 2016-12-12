 /*
  * Author:liaohs
  * Date:2016.3.24
  * Name:boomgame
  */

// dataport.headimg

var myLoginInfo=JSON.parse(sessionStorage.getItem("myLoginInfo"))
console.log(myLoginInfo)

mainApp.controller('color',["$scope","$http", 'ajax',function($scope, $http,ajax) {

/* --------------------- 获取基础信息 --------------------  */
	




/* --------------------- teacher --------------------  */

var teacherId=location.search.split("?")[1]

  $scope.teacher=teachers[teacherId]
  $scope.teacher.headimg=localPath.teacherimg+$scope.teacher.img  

$http.get(dataport.onetooneAllteachers)
  .success(function(data){
    $scope.teachers=[]
    for(var i=0;i<data.data.length;i++){
      var a=data.data[i]
        a.well=(a.wellPrecent>0)?a.wellPrecent:100
        
      if(a.teacherId==teacherId){
       $scope.teacher.well=a.well+"%"
      }
    }



  })
  .error(function(e){
    console.log(e)
  })


console.log($scope.teacher)







/* --------------------- teacher --------------------  */


/* --------------------- allteacherscomments --------------------  */

$scope.myLoginInfo=myLoginInfo

  $http.post(dataport.teacherSpecific+teacherId,{page:0,size:10})
  .success(function(data){
      console.log(data)
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
  	console.log(e)
  })


  $scope.pagesShow=false
  $scope.pagesShow1=false
  $scope.pagesShowTottle1=function(){
    $scope.pagesShow1=!$scope.pagesShow1
  }
  $scope.pagesShowTottle=function(){
    $scope.pagesShow=!$scope.pagesShow
  }




  $scope.commentChange=function(a){
    $scope.pagesShow=false
    $scope.pagesShow1=false
	  $http.post(dataport.teacherSpecific+teacherId,{page:a,size:10})
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
	  	console.log(e)
	  })
  }


/* --------------------- allteacherscomments --------------------  */




// dataport.applyPraise=publicport+"boot/oneToOne/applyPraise" //评论点赞 studentNum,applyId//点赞
 /* --------------------- 点赞 --------------------  */
 $scope.applyPraise=function(a,b,c){
    console.log(a)
    console.log(b)
    console.log(c)

    $http.get(dataport.applyPraise+"?studentNum="+a+"&applyId="+b)
    .success(function(data){
      if(data.data==null){ //已点赞

      }else{  //未点赞
        for(var i in $scope.listsData){
          if($scope.listsData[i].$$hashKey==c){
            $scope.listsData[i].praise+=1
          }
        }
      }
    })
    .error(function(e){
      console.log(e)
    })
 }
  /* --------------------- 点赞 --------------------  */

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


