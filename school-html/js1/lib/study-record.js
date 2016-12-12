 /*
  * Author:liaohs
  * Date:2016.3.28
  * Name:boomgame
  */


// dataport.headimg

var myLoginInfo=JSON.parse(sessionStorage.getItem("myLoginInfo"))
console.log(myLoginInfo)




mainApp.controller('color',["$scope","$http",function($scope, $http) {
	var topsInfo=[
		{name:"教学视频",num:0,css:"blue-linear",color:"blue",unit:"个"},
		{name:"一对一",num:0,css:"green-linear",color:"green",unit:"次"},
		{name:"生死局",num:0,css:"purple-linear",color:"purple",unit:"次"}
	]
    $scope.circles=angular.copy(topsInfo)
    

    $scope.videoWatchNum=false
    $scope.oneToOneServiceNum=false
    $scope.ssjNum=false

    /* -------------------- 一对一 ----------------  */
    $http.get(dataport.getStudyRecord+"?studentNum="+myLoginInfo.studentNum)
    	.success(function(data){
    		if(data.error){}
    		else{
    			console.log(data.data)
    			var newdata=data.data 
    			$scope.circles=angular.copy(topsInfo)
    			$scope.circles[0].num=newdata.videoWatchNum
    			$scope.circles[1].num=newdata.oneToOneServiceNum
    			$scope.circles[2].num=newdata.ssjNum
    			if(newdata.videoWatchNum>0) $scope.videoWatchNum=true;
    			if(newdata.ssjNum>0) $scope.ssjNum=true;
    			if(newdata.oneToOneServiceNum>0){
    				$scope.oneToOneServiceNum=true;
    				var lists=newdata.date
    				for(var i in lists){
    					var a=lists[i]
    					lists[i].YYYY=(function(){
    						return new Date(a.studentEvaluateTime).getFullYear()
    					})()
    					lists[i].MM=(function(){
    						return new Date(a.studentEvaluateTime).getMonth()+1
    					})()
    					lists[i].DD=(function(){
    						return new Date(a.studentEvaluateTime).getDate()
    					})()
                        // a.headimg=localPath.teacherimg+teachers[a.teacherId].img 
                         
                        lists[i].teacherImg=localPath.teacherimg+teachers[lists[i].teacherId].img 
    					switch(a.teachModeType){
    						case 0: //英雄学习   							
    							lists[i].tips={
    								tips1:["大区","学习模式","英雄",'位置','教学模式'],
    								tips2:[a.areaName,"英雄学习",a.championName,a.desrieWay,
    								(function(){
    									var str=''
    									var arr=a.teachMode.replace(/&*$/,'').split("&")
    									for(var i in arr){
    										str+=arr[i].split("，")[0]+"，"
    									}
    									return str.replace(/，*$/,'')
    								})()]
    							}
    							lists[i].championImg=localPath.championimg+lolObj[a.championId].img
    						break;
    						case 1: //技巧学习
    							lists[i].championImg=localPath.defaultimg+"defaultIco.png"
    							lists[i].tips={
    								tips1:["大区","学习模式",'学习技巧','教学模式'],
    								tips2:[a.areaName,"技巧学习",
    								(function(){
    									var str=a.skillTeach;
    										if(str.length>5){
    											str=str.slice(0,5)+"..."
    										}
    									return str 
    								})(),
    								(function(){
    									var str=''
    									var arr=a.teachMode.replace(/&*$/,'').split("&")
    									for(var i in arr){
    										str+=arr[i].split("，")[0]+"，"
    									}
    									return str.replace(/，*$/,'')
    								})()]
    							}
    						break;
    					}

    					lists[i].stars=(function(){
    						var arr=[
    							{css:"fa-star-o"},
    							{css:"fa-star-o"},
    							{css:"fa-star-o"},
    							{css:"fa-star-o"},
    							{css:"fa-star-o"}
    						]
    						for(var i=0;i<a.score;i++ ){
    							arr[i].css="fa-star"
    						}
    						return arr
    					})()

    				}

    				$scope.oneToOnelists=newdata.date
    				console.log($scope.oneToOnelists)

    			}



    		}

    	})
    	.error(function(e){
    		console.log(e)
    	})
    /* -------------------- 一对一 ----------------  */

    /* -------------------- 教学视频 ----------------  */
    $http.get(dataport.getVideoWatchRecord+"?studentNum="+myLoginInfo.studentNum)
    	.success(function(data){
    		console.log(data)
    		if(data.error){}
    		else{
    			
    			var lists=data.data
    			for(var i in lists){
    				lists[i].studyTime1=mytimehandle1(lists[i].studyTime)
    			}
    			$scope.videoLists=lists

    		}
    	})
    	.error(function(e){console.log(e)})	
    /* -------------------- 教学视频 ----------------  */
    var btns=[
    	{text:"教学视频",css:"",show:false,id:0},
    	{text:"一对一",css:"",show:false,id:1},
    	{text:"生死局",css:"",show:false,id:2},
    ]
    $scope.btns=angular.copy(btns)
    $scope.btns[0].css="active"
    $scope.btns[0].show=true

    $scope.btnFunc=function(a){
    	console.log(a)
    	$scope.btns=angular.copy(btns)
	    $scope.btns[a].css="active"
	    $scope.btns[a].show=true
    }

    setTimeout(function(){
    	$(".lists").removeClass("hidden")
    },100)


 }]);


function mytimehandle(data){
  var time=new Date(data),
      YYYY=time.getFullYear(),
      MM=time.getMonth()+1,
      DD=time.getDate();
  var str=YYYY+"年"+MM+"月"+DD+"日"
  return str
}

function mytimehandle1(data){
  var time=new Date(data),
      
      MM=time.getMonth()+1,
      DD=time.getDate();

      hh=time.getHours(),
      mm=time.getMinutes();
      if(MM<10){MM="0"+MM}
      if(DD<10){DD="0"+DD}
      if(hh<10){mm="0"+hh}
      if(mm<10){mm="0"+mm}

  var str=MM+"-"+DD+" "+hh+":"+mm
  return str
}