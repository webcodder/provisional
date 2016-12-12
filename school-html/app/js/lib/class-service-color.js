 /*
  * Author:liaohs
  * Date:2016.3.16
  * Name:boomgame
  */



mainApp.controller('color',["$scope","$http", '$parse', function($scope, $http,$parse) {

    // $scope.areaArr=areaArr.slice(0);
    
    // $scope.heros=lolArr;

	// $http.get('data/time.json')
	// .success(function(data,status,headers,config){ 
	// 	var time={}
	// 		time.toptime=toptime(data)
	// 		time.lists=timehandle(data)

	// 	$scope.tabtime=time
	// }).error(function(data,status,headers,config){ });


	 
	
	console.log(location.pathname)
	$scope.otoo=[true,false]
  $scope.studyModelSelect=[
    {
      teachModeType:0,
      txt:"英雄学习",
      ui:"part3.step2.step2-1",
    },{
      teachModeType:1,
      txt:"技巧学习",
      ui:"part3.step2.step2-2",
    }
  ]
	$scope.postData={}
	
	$scope.uiRouter={
		floor1:["part2",''],
		floor1_1:[]
	}
	$http.get(dataport.mybaseInfo)
	.success(function(data){
		
		var studentInfo=data.baseInfo.student;
		$scope.postData.studentNum=studentInfo.studentNum
		$scope.postData.classId=studentInfo.classId
		$scope.postData.qq=studentInfo.qq
		$scope.postData.tier=studentInfo.tier
		$scope.postData.queue=studentInfo.queue


	})
	.error()


/* /part3/step4 */

  $scope.teachModeArr=[
    {
      value:"SOLO教学， 提升对线能力，英雄能力。",
      check:false,
      disabled:false
    },{
      value:"实战教学，提升大局观能力，意识能力。",
      check:false,
      disabled:false
    },{
      value:"录像教学，了解自己游戏缺点，学习他人优点。",
      check:false,
      disabled:false
    }
  ] 

/* /part3/step4 */



  $scope.postData.teachModeType=0;
 }]);


mainApp.filter('heroFilter',function(){
    return function(arrs,b,c){
        var array = [];
        var carr=c.split("-");
        var str=[];
        b=b||'';
        for(var i=0;i<carr.length;i++){
        	var a='r.'+carr[i]+'.match("'+b+'")';
        	str.push(a)
        }
        var astr=str.join("||")
        for(var i=0;i<arrs.length;i++){
        	var r=arrs[i]
        	if(eval(astr)){
        		array.push(r)
        	}
        }
        return array;
    }
});






var classTime=["13:00-14:30","14:30-16:00","16:00-17:30","17:30-19:00","20:00-21:30"]

function timehandle(data){
	console.log(data.data)
	var timeArr=[];	
	var tarr=[]
	for(var i in classTime){
		var a=[]
		for(var i1 in data.data){
			var a1={}
				a1.date=(data.data[i1].date[i])?"able":"disable";
				a1.day=data.data[i1].day;
				a1.time=classTime[i]
			a.push(a1)
		}
		tarr.push(a)
	}

	return 	tarr
}

function toptime(data){
	var arr=[]
	var a=["","一","二", "三", "四", "五", "六", "日"]
	for(var i in a){
		var o={};
			o.name=a[i];
			try{
				o.day=data.data[i-1].day
			}catch(e){}
		arr.push(o)
	}
	return arr
};



