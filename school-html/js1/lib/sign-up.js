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

mainApp.controller('color',["$scope","$http", 'ajax',function($scope, $http,ajax) {
	
/* --------------------- 获取基础信息 --------------------  */
	$scope.student=myBaseInfo
      /* --------------------- 获取申请状态 --------------------  */
  	$http.get(dataport.applyStatue+"?studentNum="+myBaseInfo.studentNum)
        .success(function(data){
            if(!data.error){
                var applyStatue=data.data.statue
               	if(applyStatue!="apply"){
               		 location.href="one-to-one.html"
               	}
            }
        })
        .error(function(e){
     		console.log(e)
        }); 
  /* --------------------- 获取申请状态 --------------------  */



  $scope.applyData={
  	studentNum	: myBaseInfo.studentNum,
  	classId	    : myBaseInfo.classId,
  	qq          : myBaseInfo.qq,
  	tier        : myBaseInfo.tier,
  	queue       : myBaseInfo.queue,
    phone       : myBaseInfo.phone,
  	areaName    : areaArr[0].name,
  	teachModeType:0,
  	desrieWay   : "中单",
    skillTeach  : ""


  }


  $scope.stepsTop=[
    {
      num:1,
      txt:'大区选择',
      right:75,
    },{
      num:2,
      txt:'学习模式', 
      right:50,
    },{
      num:3,
      txt:'教学时间',
      right:25,
    },{
      num:4,
      txt:'教学模式',
      right:0,
    }
  ]	 

/* --------------------- 大区选择 --------------------  */

  $scope.areaArr=areaArr.slice(0);

  $scope.areaInit=$scope.areaArr[0].name+"("+areaArr[0].code+")" ;

  $scope.selectListShow=false;
  $scope.selectListToggleFunc=function(e){
    stopFunc(e)
    $scope.selectListShow=!$scope.selectListShow

  }
  $scope.selectListFunc=function(a,b){
    
    $scope.areaInit=a
    $scope.applyData.areaName=b
  }

/* --------------------- step1 --------------------  */


/* --------------------- 学习模式 --------------------  */

  /* --------------------- 学习模式选择 --------------------  */
  $scope.studyModelSelect=[
    {
      teachModeType:0,
      txt:"英雄学习",
      css:"active"

    },{
      teachModeType:1,
      txt:"技巧学习",
    }
  ] 
  $scope.teachModeTypeFunc=function(a){
  	$scope.applyData.teachModeType=a
  	for(var i=0; i<$scope.studyModelSelect.length;i++){
  		if($scope.studyModelSelect[i].teachModeType==a){
  			$scope.studyModelSelect[i].css="active"
  		}else{
  			$scope.studyModelSelect[i].css=""
  		}
  	}
  }
  /* --------------------- 学习模式选择 --------------------  */

  /* --------------------- 英雄学习选择 --------------------  */
	  $scope.desrieWays=[{
	    desrieWay:"中单",
	    css:"active"
	  },{
	    desrieWay:"打野",
	  },{
	    desrieWay:"辅助",
	  },{
	    desrieWay:"上单",
	  },{
	    desrieWay:"ADC",
	  }]

	  $scope.desrieWayCheck=function(a){
	  	$scope.applyData.desrieWay=a
	  	for(var i=0; i<$scope.desrieWays.length;i++){
	  		if($scope.desrieWays[i].desrieWay==a){
	  			$scope.desrieWays[i].css="active"
	  		}else{
	  			$scope.desrieWays[i].css=""
	  		}
	  	}
	  }


	  $scope.heros=lolArr;

	  $scope.championCheck=function(a,b){
	  	$scope.applyData.championName=a
      $scope.applyData.championId=b
	  	for(var i=0; i<$scope.heros.length;i++){
	  		if($scope.heros[i].name==a){
	  			$scope.heros[i].css="active1"
	  			$scope.heros[i].border1active="border1active"
	  			$scope.heros[i].namecolor="namecolor"
	  		}else{
	  			$scope.heros[i].namecolor=$scope.heros[i].border1active=$scope.heros[i].css=""
	  		}
	  	}
	  }



  /* --------------------- 英雄学习选择 --------------------  */

	/* --------------------- 技巧学习选择 --------------------  */
	var skillstudyArr=[{
	      value:"对线学习",
	      name:"skillstudy",
	      checked:false,
	      index:0,
        type:"radio"
	   },{
	      value:"补刀学习",
	      name:"skillstudy",
	      checked:false,
	      index:1,
        type:"radio"
	   },{
	      value:"打野学习",
	      name:"skillstudy",
	      checked:false,
	      index:2,
        type:"radio"
	   },{
	      value:"其他",
	      name:"skillstudyOther",
	      checked:false ,
	      index:3,
        type:"radio"
	   }] 
	$scope.skillstudyArr=skillstudyArr

	$scope.textareaDisable=true;

	$scope.skillTeachOtherLen=0


var skillTeach1="";
var skillTeach2="";

  $scope.$watch("skillTeachOtherContent",function(n,o){
    skillTeach2=(n==undefined)?"":n
    $scope.applyData.skillTeach=skillTeach1+"&"+ skillTeach2
  })

	$scope.skillstudyFunction=function(a){
    


		if(a==3){
			$scope.textareaDisable=false;
      
			if($scope.skillTeachOtherContent==undefined||$scope.skillTeachOtherContent==""){
				skillTeach2="";
				$scope.skillTeachOtherLen=0

			}else{
			   skillTeach2=angular.copy($scope.skillTeachOtherContent);
			   
			}
			
		}else{
			
      skillTeach1=$scope.skillstudyArr[a].value
			

		}
    $scope.applyData.skillTeach=skillTeach1+"&"+ skillTeach2
	}
	

	/* --------------------- 技巧学习选择 --------------------  */

/* --------------------- step3  教学时间 --------------------  */
$scope.pweek=false;
$scope.nweek=false;
$scope.calendarUrl=dataport.calendarNow;
    $scope.getWeekCalendar=function(a){
      $http.get(dataport.calendarOther+"?date="+a+" 00:00").success(function(data,status,headers,config){ 
      $scope.nowWeek=data.data[0].day;
      if($scope.nowWeek>$scope.nowWeek1){
        $scope.pweek=false;
      }else{
        $scope.pweek=true;
      }
      if(($scope.nowWeek-$scope.nowWeek1)<24*60*60*1000*7*8){
        $scope.nweek=false
      }else{
        $scope.nweek=true
      }


      $scope.prevWeek=Timehandle1(data.data[0].day-24*60*60*1000*7);
      $scope.nextWeek=Timehandle1(data.data[0].day+24*60*60*1000*7);

      var time={}
        time.toptime=toptime(data)
        time.lists=timehandle(data)

      $scope.tabtime=time
      }).error(function(data,status,headers,config){ });
    }


  $http.get($scope.calendarUrl)

  .success(function(data,status,headers,config){ 
    
    $scope.nweek=false;
    $scope.nowWeek=data.data[0].day;
    $scope.nowWeek1=data.data[0].day;
    $scope.prevWeek=Timehandle1(data.data[0].day-24*60*60*1000*7);
    $scope.nextWeek=Timehandle1(data.data[0].day+24*60*60*1000*7);

    var time={}
      time.toptime=toptime(data)
      time.lists=timehandle(data)

    $scope.tabtime=time
    
  }).error(function(data,status,headers,config){ });


  $scope.teachTimeCheck=function(a){
  	if(a.date=="able"){
  		var timestr=Timehandle1(a.day)+" "+a.time
  		$scope.applyData.teachTime=timestr
  	}
  }

/* --------------------- step3  教学时间 --------------------  */


/* --------------------- step4  教学模式 --------------------  */

  $scope.teachModeArr=[
    {
      value:"SOLO教学， 提升对线能力，英雄能力。",
      type:"SOLO教学",
      check:false,
      disabled:false
    },{
      value:"实战教学，提升大局观能力，意识能力。",
      type:"实战教学",
      check:false,
      disabled:false
    },{
      value:"录像教学，了解自己游戏缺点，学习他人优点。",
      type:"录像教学",
      check:false,
      disabled:false
    }
  ] 

  $scope.$watch("teachModeArr",function(n,v){
  	var checkeds=0
  	var teachMode=""
  	for(var i in n){
  		if(n[i].check){
  			teachMode+=n[i].type+"&"	
  			
  			checkeds++
  			if(checkeds==2){

	  			for(var i1 in n){

	  				if(!n[i1].check){
	  					n[i1].disabled=true
	  				}
	  			}

  			}else{
	  			for(var i1 in n){
	  				n[i1].disabled=false
	  			}
  			}
  			
  		}else{

  		}

  	}
  	$scope.applyData.teachMode=teachMode

  },true)
  $scope.teachModeCheck=function(a){
  	
  }

/* --------------------- step4  教学模式 --------------------  */
 
/* --------------------- step4  提交 --------------------  */
	$scope.StepProgress=true
	$scope.StepResult=false

  $scope.applyOne=function(){
    
    $http.post(dataport.applyOnetoOne,$scope.applyData).success(function(data){
       $scope.step4msg=data.msg;
       // 当前时间已被预约，请重试！
      if(data.error){
          if(data.msg=="当前时间已被预约，请重试！"){
            $scope.step4msg=data.msg;
          }else{
            $scope.step4msg="填写信息不全，请重新填写信息"
          }

        
      }else{
      	console.log(data)
		$scope.StepProgress=false
		$scope.StepResult=true
		setTimeout(function(){
			location.href="one-to-one.html"
		},5000)
        
      }
      
    }).error(function(e){
      console.log(e)
    })

  }

/* --------------------- step4  提交 --------------------  */

/* --------------------- steps  animate --------------------  */

var stepsShowArr=[false,false,false,false]
$scope.stepsShowArr=[true,false,false,false]

$scope.nowStepRight=75
$scope.stepsFunc=function(a){
	$scope.stepsShowArr=angular.copy(stepsShowArr)
	$scope.stepsShowArr[a]=true
	$scope.nowStepRight=75-25*a
}


/* --------------------- steps  animate --------------------  */



  $scope.$watch('applyData',function(n,o){
  	
  	$scope.teachModeTypeNext=true;
    
  	console.log(n)
    
    $scope.applyData.skillTeach=n.skillTeach.replace(/&/gi," ")

	switch (n.teachModeType)
	{
	case 0:
	  $scope.teachModeType=[true,false]
	  if(n.championName!=undefined){
	  	$scope.teachModeTypeNext=false
	  }else{
	  	$scope.teachModeTypeNext=true
	  }
	  break;
	case 1:
	  $scope.teachModeType=[false,true]
	  if(n.skillTeach!=undefined&&n.skillTeach!=" "){
	  	$scope.teachModeTypeNext=false
	  }else{
	  	$scope.teachModeTypeNext=true

	  }

	  break;
	}

	if(n.teachTime==undefined){
		$scope.teachTimeNext=true;
	}else{
		$scope.teachTimeNext=false;
	}

	if(n.teachMode==undefined||n.teachMode==""){
		$scope.teachModeNext=true;
	}else{
		$scope.teachModeNext=false;
	}


  },true)








 }]);

mainApp.directive("selectListHideFunc",function(){
  return {
    restrict:'AE',
    scope:{
      selectlistshide:"="
    },
    link:function(scope,ele,attrs){
      ele.on("click",function(){
        scope.$apply(function(){
          scope.selectlistshide=false;
        })
      })
    }
  }
})


mainApp.directive("teachTimeCheck",function(){
  return {
    restrict:'AE',
    link:function(scope,ele,attrs){
      ele.on("click",function(){
       	
        ele.parents("tbody").find(".bg").removeClass("active")
        ele.find(".bg").addClass("active")

      })
    }
  }
})

 /* --------------------- 英雄选择filter --------------------  */
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
 /* --------------------- 英雄选择filter --------------------  */





var classTime=["13:00-14:30","14:30-16:00","16:00-17:30","17:30-19:00","20:00-21:30"]

function timehandle(data){
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

function Timehandle(data){
  var time=new Date(data.day),
      YYYY=time.getFullYear(),
      MM=time.getMonth()+1,
      DD=time.getDate();
  var str=YYYY+"-"+MM+"-"+DD+" "+data.time.split("-")[0]
  return str
}
function Timehandle1(data){
  var time=new Date(data),
      YYYY=time.getFullYear(),
      MM=time.getMonth()+1,
      DD=time.getDate();
  var str=YYYY+"-"+MM+"-"+DD
  return str
}



