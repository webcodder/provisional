 /*
 *Author:liaohs
 *Date:2016.1.11
 *Name:boomgame
 */
 mainApp.controller('color',function($scope, $http) {
    $scope.classes_show=false;
    $scope.boomClassStatu=false;
    $scope.classes_toggle=function(){
       $scope.classes_show=!$scope.classes_show 
    }
    $http.get(dataport.userStatue)
         .success(function(response) {
            var classId=response.boomClass.classId;
            var className=response.boomClass.className;
            var ref="?classId="+classId;
            var url=dataport.classlist+ref;

            $scope.boomClassStatu=(response.boomClass.status=="000")?false:true
            
            $scope.myclassId=classId;

            

            $http.get(dataport.allclass)
                 .success(function(classes) {
                     $scope.classes =(function(){
                        var a=[];
                        for(var i in classes){
                            var b={}
                                b=classes[i]
                                b.className+="课程"
                                b.className=(i==0)?b.className+'(当前课程)':b.className

                            a.push(b)
                        }
                        return a
                     })()
                $scope.className=$scope.classes[0].className;
                $scope.classId=$scope.classes[0].classId;
                var init_classId=$scope.classes[0].classId
                var init_url=dataport.classlist+"?classId="+init_classId;
                
                var url1=(response.boomClass.status=="000")?url:init_url
                $http.get(url1)
                 .success(function(weeks){
                    $scope.weeks = transdata(weeks); 
                });  //默认班级

             }); //所有班级
  
    });


    $scope.change_lists=function(target){
         $scope.classes_show=!$scope.classes_show 
        var classId=target.getAttribute("classId")
        var myclassId=target.getAttribute("myclassId")
        var className=target.getAttribute("className")
        $scope.classId=classId;
        $scope.className=className;

        var ref="?classId="+classId;
        var url=dataport.classlist+ref;
            $http.get(url)
             .success(function(data){
                $scope.weeks = transdata(data); 

            });  
    }      
     
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行

        $(".closetv,.hclosetv").click(function(){
            $(".trtv").addClass("hidden")
        })

    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
            $(".pcbtn").hide()
            $(".mobile-btn").removeClass("visible-xs")
            if((navigator.userAgent.match(/(pad|ios|iPad)/i))) {
                $(".mobile-btn").removeClass("btn-sm pull-right").css({
                    "margin-top":"15px",
                })
            }
    }
    else{
        $(".pcbtn").click(function(){
            pcbtn($(this))
        });
    }


    });
 });



function pcbtn(btn) {
    $(".trtv").addClass("hidden")
    btn.parents(".trli").next(".trtv").removeClass("hidden")
    var listweek = $(".listweek")
    listweekW = listweek.width();
    $('embed').css({
        "width": listweekW * 1 - 40,
        "height": listweekW * 0.4,
    })
} //pctv播放


 function transdata(data){  // data格式转换
     var weeks = [];
     data.forEach(function(v, i) {
         var week = {}
         week.num = v.name; //周次序
         week.title = v.remark; //周标题
         week.index = i + 1;
         week.sysTime = transdate(v.sysTime); //系统时间
         week.startTime = transdate(v.startTime); //周开始时间
         week.endTime = week.startTime + 24 * 60 * 60 * 7; //周结束时间
         week.statu = weekstatu(week.startTime, week.sysTime, week.endTime) //周状态
         week.lists=[]; //课程
         (v.courses).forEach(function(v1,i1){  
            var day={}
                day.sysTime=week.sysTime;
                day.week=v1.week; //星期
                day.Time=transdate(v1.courseDate);//课程日期
                day.vtime=getDate(day.Time).mm+"-"+getDate(day.Time).dd;
                day.statu=daystatu(day.Time,day.sysTime); //课程状态
                day.ClassName=v1.courceName; //课程名称
                day.startTime=v1.startTime; //课程开始时间
                day.endTime=v1.endTime; //课程结束时间
                day.remark=v1.remark; // 课程简介
                day.teacher=v1.courseTeacher; //课程老师
                day.videocss="hidden";
                if(v1.videos.length!=0){
                    day.videocss="";
                    day.videoName=v1.videos[0].videoName; //视频名称
                    day.videoUrl=v1.videos[0].videoUrl;  //视频url
                    day.videoUrlArr=video.url(day.videoUrl)
                }
            week.lists.push(day)
         })
         weeks.push(week)
     })
     return weeks;
 }


var video={
    url:function(url){
        var urlval=url.split("?")[1];
        var urlarr=urlval.split("&")
        var urlo={}
        urlarr.forEach(function(v,i){
            var key=v.split("=")[0];
            var val=v.split("=")[1];
            urlo[key]=val
        })
        return urlo
    }
}
 function transdate(endTime) { //时间戳转换
     var date = new Date();
     date.setFullYear(endTime.substring(0, 4));
     date.setMonth(endTime.substring(5, 7) - 1);
     date.setDate(endTime.substring(8, 10));
     date.setHours(00); 
     date.setMinutes(00); 
     date.setSeconds(000); 
     return Date.parse(date) / 1000;
 }

function getDate1(tm){ 
var tt=new Date(parseInt(tm) * 1000).toLocaleString() 
return tt; 
} 

 function getDate(tm) {
     var tt = new Date(parseInt(tm) * 1000);
     var newdate={};
     newdate.yyyy=tt.getFullYear(); 
     newdate.mm=tt.getMonth()+1;
     newdate.dd=tt.getDate();
     newdate.week=tt.getDay();

     return newdate;
 }

 function weekstatu(startime, systime, endtime) {
     var statu = (systime >= startime && systime <= endtime) ? "in" : "";
     return statu;
 }
function daystatu(startime, systime) {
     var statu='';
     if(startime<systime) return statu="fa fa-circle"; //过去
     if(startime==systime) return statu="fa fa-clock-o"; //现在
     if(startime>systime) return statu=""; //将来
 }
