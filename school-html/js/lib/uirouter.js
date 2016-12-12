 /*
  * Author:liaohs
  * Date:2016.3.16
  * Name:boomgame
  */


mainApp.config(function($stateProvider, $urlRouterProvider) { 
  $stateProvider
  	// part1
    .state('part1', {
      	url: '/part1',
      	templateUrl:"tpls/service/part1.html",
    		controller:'part1'
    })
    // part2
    .state('part2', {
      	url: '/part2',
      	templateUrl:"tpls/service/part2.html",
    		controller:'part2'
    })
    // part3
    .state('part3', {
      	url: '/part3',
      	templateUrl:"tpls/service/part3.html",
    		controller:'part3'
    })
    // part3.step1
    .state('part3.step1', {
      	url: '/step1',
      	templateUrl:"tpls/service/step1.html",
    		controller:'part3_1'
    })
    // part3.step2
    .state('part3.step2', {
      	url: '/step2',
      	templateUrl:"tpls/service/step2.html",
    		controller:'part3_2'
    })
    // part3.step2.step2-1
    .state('part3.step2.step2-1', {
        url: '/step2-1',
        templateUrl:"tpls/service/step2-1.html",
        controller:'part3_2_1'
    })
    // part3.step2.step2-2
    .state('part3.step2.step2-2', {
        url: '/step2-2',
        templateUrl:"tpls/service/step2-2.html",
        controller:'part3_2_2'
    })
    // part3.step3
    .state('part3.step3', {
      	url: '/step3',
      	templateUrl:"tpls/service/step3.html",
    		controller:'part3_3'
    })
    // part3.step4
    .state('part3.step4', {
      	url: '/step4',
      	templateUrl:"tpls/service/step4.html",
    		controller:'part3_4'
    })
	// part4
    .state('part4', {
      	url: '/part4',
      	templateUrl:"tpls/service/part4.html",
    		controller:'part4'
    })

  $urlRouterProvider
    .when("/part3", "/part3/step1")
    .when("/part3/step2", "/part3/step2/step2-1")
    .otherwise('/part1');
   
});

mainApp.controller("part1",["$scope","$http",function($scope,$http){
  $scope.srefs=angular.copy($scope.uiRouter.floor1);
  // location.href="class-list.html"

}])
.controller("part2",["$scope","$http",function($scope,$http){
  

  $("#teacher-list").slide({
    titCell: "",
    mainCell: "#teacher-list-ul",

    effect: "leftLoop",
    autoPlay: true,
    vis: 3,
    scroll:1,
    delayTime:1000,
    interTime:1000,
    nextCell:".star-cycle",
    mouseOverStop:true,
    //returnDefault:true,
    easing:"swing",
    pnLoop:true
  });

}])
.controller("part3",["$scope","$http","tops", function($scope,$http,tops){

  
  $scope.$watch('otoo',function(n,v){
    // console.log(n)
  })
  $scope.topsmodule=[
    {
      num:1,
      txt:'大区选择',
      css:''
    },{
      num:2,
      txt:'学习模式',
      css:'' 
    },{
      num:3,
      txt:'教学时间',
      css:'' 
    },{
      num:4,
      txt:'教学模式',
      css:'' 
    }

  ]
  $scope.tops=angular.copy($scope.topsmodule)
  
  $scope.areaArr=areaArr.slice(0);
  $scope.areaInit=$scope.areaArr[0];
  
  $scope.selectListShow=false;
  $scope.selectListToggleFunc=function(){
    $scope.selectListShow=!$scope.selectListShow
  }
  $scope.$watch('areaInit', function(newVal, oldVal) {
      
      $scope.$parent.postData.areaName=newVal.name
      
  });

}])
.controller("part3_1",["$scope","$http","tops", function($scope,$http,tops){
    
    $scope.tops=tops.arr($scope.tops,1)
    $scope.part3_3_prev=$scope.studyModelSelect[$scope.postData.teachModeType].ui
    
}])
.controller("part3_2",["$scope","$http","tops", function($scope,$http,tops){
  
  $scope.tops=tops.arr($scope.tops,2)
  

    for(var i=0;i<$scope.studyModelSelect.length;i++){

      if(i==$scope.postData.teachModeType){
        $scope.studyModelSelect[i].css="active"
      }else{
        $scope.studyModelSelect[i].css=""
      }
    }
  $scope.$watch('studyModelSelect', function(newVal, oldVal) {    
      $scope.studyModelSelect=newVal    
  },true);
   $scope.$parent.postData.teachModeType=0; 
   $scope.teachModeTypeFunc=function(a){
    $scope.$parent.postData.teachModeType=a; 

   }

   

}])
.controller("part3_2_1",["$scope","$http","tops", function($scope,$http,tops){
  // console.log($scope.postData.teachModeType)
  $scope.desrieWays=[{
    desrieWay:"中单",
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
    $scope.$parent.postData.desrieWay=a;

  }
  $scope.championCheck=function(a){
    $scope.$parent.postData.championName=a; 

  }


  $scope.heros=lolArr;
  $scope.$parent.nextdisabled=true
  
  $scope.$watch('postData',function(newVal,oldVal){

    if(newVal.desrieWay!=undefined&&newVal.championName!=undefined){
      $scope.$parent.nextdisabled=false
    }
  },true)


}])
.controller("part3_2_2",["$scope","$http","tops", function($scope,$http,tops){
   // console.log($scope.postData.teachModeType)
   $scope.$parent.nextdisabled=true
  
   $scope.skillstudyArr=[{
      value:"对线学习",
      name:"skillstudy",
      checked:false
   },{
      value:"补刀学习",
      name:"skillstudy",
      checked:false
   },{
      value:"打野学习",
      name:"skillstudy",
      checked:false
   },{
      value:"其他",
      name:"skillstudy",
      checked:false 
   }] 
   $scope.textareaDisable=true

  $scope.skillTeachOtherLen=0
  $scope.skillstudyFunction=function(a){
    if(a=="其他"){
      $scope.textareaDisable=false
      $scope.skillstudy=$scope.skillTeachOther
      $scope.$parent.postData.skillTeach=$scope.skillTeachOther 
    }else{
      $scope.textareaDisable=true
      $scope.skillstudy=a
      $scope.$parent.postData.skillTeach=a; 
    }

  }

  $scope.$watch('skillTeachOther', function(newVal, oldVal) {    
      $scope.skillstudy=newVal
      $scope.$parent.postData.skillTeach=newVal
      if(newVal!=undefined){
        $scope.skillTeachOtherLen=newVal.length
      }
  });

  $scope.$watch('postData',function(newVal,oldVal){
    
    if(newVal.skillTeach!=undefined){
      $scope.$parent.nextdisabled=false
    }
  },true)

}])
.controller("part3_3",["$scope","$http","tops", function($scope,$http,tops){
  $scope.delete=function(){
    delete($scope.$parent.postData.desrieWay)
    delete($scope.$parent.postData.championName)
    delete($scope.$parent.postData.skillTeach)
  }
  $scope.part3_3_prev=$scope.studyModelSelect[$scope.postData.teachModeType].ui


  $scope.pweek=true;
  $scope.nweek=true;
  $scope.tops=tops.arr($scope.tops,3)

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



  $scope.nextdisabled=true

}])
.controller("part3_4",["$scope","$http","tops","$location", function($scope,$http,tops,$location){

  $scope.tops=tops.arr($scope.tops,4)

  $scope.$watch("teachModeArr",function(newVal, oldVal){
    var teachMode=[]
    var checkedNum=0;
    for(var i in newVal){
      
      if(newVal[i].check){
        checkedNum++
        teachMode.push(newVal[i].value)
      }


    }
    $scope.postData.teachMode=teachMode.join("-")
    if(checkedNum<newVal.length-1){
      for(var i in newVal){
          newVal[i].disabled=false  
      }
    }else{
      for(var i in newVal){
        if(!newVal[i].check){
          newVal[i].disabled=true
    }}}
    if($scope.postData.teachMode.length>0) $scope.nextdisabled=false;
  },true)
  $scope.nextdisabled=true


  

  $scope.applyOne=function(){
    
    $http.post(dataport.applyOnetoOne,$scope.postData).success(function(data){
       $scope.step4msg=data.msg;
       // 当前时间已被预约，请重试！
      if(data.error){
          if(data.msg=="当前时间已被预约，请重试！"){
            $scope.step4msg=data.msg;
          }else{
            $scope.step4msg="填写信息不全，请重新填写信息"
          }

        
      }else{
      
        $scope.$parent.$parent.otoo=[false,true]
        
      }
      
    }).error(function(e){
      // console.log(e)
    })

  }

}])
.controller("part4",["$scope","$http",function($scope,$http){
  // console.log($scope.postData)
  // window.location.hash=""
  
}])

.factory('tops', function() {   
   var factory = {}; 
   factory.arr=function(a,b){
     var arr=[]
      for(var i=0;i<a.length;i++){
        if(i<b){
          a[i].css="active"
          if(i<b-1){
            a[i].css="active-light"
          }
        }else{
          a[i].css=""
        }
        arr.push(a[i])
      }
      return arr
   }

   return factory;
})
.directive("selectRadio",function(){
  return {
    restrict:'AE',
    link:function(scope,ele,attrs){
      ele.on("click",function(){
       
        ele.siblings().removeClass("active")
        ele.addClass("active")

      })
    }
  }
})
.directive("selectRadioLi",function(){
  return {
    restrict:'AE',
    link:function(scope,ele,attrs){
      ele.on("click",function(){
        
        scope.$apply(function(){
          scope.$parent.$parent.areaInit=scope.row
          scope.$parent.$parent.selectListShow=false;
        })
        
        ele.siblings().removeClass("active")
        ele.addClass("active")


      })
    }
  }
})
.directive("championCheck",function(){
  return {
    restrict:'AE',
    link:function(scope,ele,attrs){
      ele.on("click",function(){
        ele.find(".border2").addClass("active1").show()
        ele.find(".border1").hide()
        ele.siblings().find(".border2").removeClass("active1")
        ele.siblings().find(".border1").show()
        scope.$apply(function(){
          scope.$parent.$parent.areaInit=scope.row
          scope.$parent.$parent.selectListShow=false;
        })
        
        ele.siblings().removeClass("active")
        ele.addClass("active")


      })
    }
  }
})
.directive("classtimeselect",function(){
  return {
    restrict:'AE',
    link:function(scope,ele,attrs){
      ele.on("click",function(){
        if(scope.td.date=="able"){ 
          ele.parents(".studytab").find(".bg").removeClass("active").addClass('able')
          ele.removeClass('able').addClass("active")
          scope.$parent.$parent.postData.teachTime=Timehandle(scope.td)
          // console.log(scope.$parent.$parent.postData)
          scope.$apply(function(){
            scope.$parent.$parent.nextdisabled=false
          })
          
         
        }
      })
    }
  }
})
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
