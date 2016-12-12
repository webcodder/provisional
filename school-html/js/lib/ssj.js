 /*
  * Author:liaohs
  * Date:2016.3.25
  * Name:boomgame
  */


var myLoginInfo=JSON.parse(localStorage.getItem("myLoginInfo"))
/*
	var applyStatues=["apply","wait","teached","end"]
*/

mainApp.controller('color',["$scope","$http", 'ajax',"$location",function($scope, $http,ajax,$location) {
	
/* ===============================
  获取生死局服务有没有打开*/
ajax.jsonp(
    dataport.ssjIsOpen+"?callback=JSON_CALLBACK",
    function(data, status, header, config){
      if(data.error){
        window.location.href="class-service.html"
      }else{
        if(!data.data.ok){
          window.location.href="class-service.html"
        }
      }
    },
    function(err){
      window.location.href="class-service.html"
    }
  )
/* ===============================
  获取所有老师 */
// dataport.getAllteachers
$scope.allTeachers={}
 ajax.jsonp(
        dataport.getAllteachers+"?callback=JSON_CALLBACK",
        function(data, status, header, config){
            if(!data.error){
                try{
                    angular.forEach(data.data,function(v,i){
                        $scope.allTeachers[v.userId]=v
                    })
                    console.log($scope.allTeachers)
                }catch(e){}
            }
        },
        function(err){}
    )

 $scope.imgUrl=dataport.imgUrl

/* ===============================
  获取当前学员状态*/
getSsjApplyStatue()

$scope.applyDetail={}
$scope.nowTeacher={}

function getSsjApplyStatue(){

  ajax.jsonp(
      dataport.ssjApplyStatue+"?callback=JSON_CALLBACK",
      function(data, status, header, config){
        console.log("获取当前学员状态")
        console.log(data)

        if(!data.error){
          $scope.applyStatue=data.data.statue
          $scope.myssjData=data.data
          $scope.id=data.data.data.id
          try{
            $scope.applyDetail=data.data.data.applyDetail
            $scope.waitDays=data.data.data.waitDays

            $scope.nowTeacher=teacherContact[$scope.applyDetail.teacherId]

            console.log($scope.nowTeacherqq)
          }catch(e){
            
          }
        }
      },
      function(err){

      }
    )
}

$scope.$watch('applyStatue',function(n){
  console.log(n)
})





/* --------------------- 获取基础信息 --------------------  */
	$scope.student=myLoginInfo


/* --------------------- 大区选择 --------------------  */

  $scope.areaArr=areaArr.slice(0);

  $scope.areaInit=$scope.areaArr[0].name+"("+areaArr[0].code+")" ;

  $scope.selectListShow=false;
  $scope.selectListToggleFunc=function(e){
    stopFunc(e)
    $scope.selectListShow=!$scope.selectListShow

  }
  angular.element(document.querySelector("body")).click(function(){
    $scope.$apply(function(){

      $scope.selectListShow=!1
    })
  })
  $scope.selectListFunc=function(a,b){
    
    $scope.areaInit=a

  }

/* ===============================
  提交申请*/
 $scope.applyFn=function(){

  ajax.jsonp(
      dataport.ssjApply+$scope.areaInit.split("(")[0]+"&callback=JSON_CALLBACK",
      function(data, status, header, config){
        console.log("提交申请")
        console.log(data)
        if(!data.error){
          getSsjApplyStatue()
        }
      },
      function(err){

      }
    )
 }

/* ===============================
  取消预约*/
 // dataport.ssjApplyCancel
$scope.ssjApplyCancelFn=function(){
    ajax.jsonp(
      dataport.ssjApplyCancel+$scope.applyDetail.id+"&callback=JSON_CALLBACK",
      function(data, status, header, config){
        getSsjApplyStatue()
      },
      function(err){
        getSsjApplyStatue()
      }
    )
}

/* ===============================
  上传图片*/
// dataport.ssjUpload
// dataport.imgUrl
// 小图 _40_40.jpg
// 大图 _400_400.jpg

  $scope.addImgs=[]
  $scope.imgFiles=[]

  $scope.deleteImg=function(index){
    $scope.addImgs.splice(index,1) 
  }



/* ===============================
  打分*/
  $scope.score=0;
  $scope.scoreFn=function(index){
    $scope.score=index+1
    $scope.mycommentTip=""
  }

/* ===============================
  发表评论*/
  $scope.myCommentDisabled=!0;
  $scope.myComment=""

  $scope.$watch('myComment',function(n){
    if(n.length>0){
      $scope.mycommentTip=""
    }
  })
  
  $scope.myCommentApply=function(){

    if($scope.score==0){
      $scope.mycommentTip="请给老师打分"
      return false;
    }
    if($scope.myComment.length==0){
      $scope.mycommentTip="请给老师评论"
      return false;
    }
    // dataport.ssjEvaluateByStudent
    // id=?&evaluate=?&score=?&photo[0]=?&photo[1]=?


    var id=$scope.applyDetail.id
    // var id=$scope.applyDetail.id;$scope.myssjData.id
    console.log($scope.myssjData)
    var score=$scope.score;
    var evaluate=$scope.myComment;
    var photos=''
    angular.forEach($scope.addImgs,function(v,i){
      // console.log(v)
      photos+='&photo['+i+']=';
      photos+=v.img
    })

    var myCommentApplyUrl=dataport.ssjEvaluateByStudent;
    myCommentApplyUrl+="id="+id;
    myCommentApplyUrl+="&evaluate="+evaluate;
    myCommentApplyUrl+="&score="+score;
    myCommentApplyUrl+=photos;
    myCommentApplyUrl+="&callback=JSON_CALLBACK"
    console.log(myCommentApplyUrl)
    ajax.jsonp(
      myCommentApplyUrl,
      function(data, status, header, config){
        console.log("发表评论")
        console.log(data)
        getSsjApplyStatue()
        getEvaluate()
      },
      function(err){
        console.log(err)
      })

  }


/* --------------------- allteacherscomments --------------------  */


  //dataport.ssjTeachersEvaluate
  getEvaluate()
  function getEvaluate(){

    $http.get(dataport.ssjTeachersEvaluate+"page=0&size=10")
    .success(function(data){
        console.log("所有评论")
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
      // console.log(e)
    })
  }


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
    $http.get(dataport.ssjTeachersEvaluate+"page="+a+"&size=10")
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


 /* --------------------- 点赞 --------------------  */
 $scope.applyPraise=function(a,b,c){

    $http.get(dataport.ssjApplyPraise+"?studentNum="+a+"&applyId="+b,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
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
      // console.log(e)
    })
 }
  /* --------------------- 点赞 --------------------  */

function CommentFunc(data){
  if(!data.error){
        data.nowpage=data.nowPage+1
        console.log(data)
        
        data.pageList=(function(){
          var arr=[]
          for(var i=0;i<data.totalPage;i++){
            var b={}
              b.num=i
            arr.push(b)
          }

          return arr
        })()

        try{
          data.pageList[data.nowPage].css="active"
        }catch(e){}
        
        $scope.teachersComments=data
        $scope.teachersComments.nowlists=(function(){
          
          var a=$scope.teachersComments.nowPage*$scope.teachersComments.size+1
          var b=($scope.teachersComments.nowPage+1)*$scope.teachersComments.size
          if(b>$scope.teachersComments.totalElement){
            b=$scope.teachersComments.totalElement
          }
          return a+"-"+b
        })()

        for(var i=0;i<data.data.length;i++){
            data.data[i].oneToOneServiceApply.teacherName=data.data[i].oneToOneServiceApply.teacherId?(teachers[data.data[i].oneToOneServiceApply.teacherId]?teachers[data.data[i].oneToOneServiceApply.teacherId].name:""):""; 
        }
        
        
        $scope.listsData=data.data
        console.log(data.data)
        for(var i=0; i<$scope.listsData.length;i++){
          var header=$scope.listsData[i].oneToOneServiceApply.header

          if(header==null||header==""){
            $scope.listsData[i].oneToOneServiceApply.headimg=localPath.defaultimg+"defaultIco.png"
          }else{
            $scope.listsData[i].oneToOneServiceApply.headimg=dataport.headimg+header
          }

          var timeDiffermm=Math.floor(($scope.listsData[i].oneToOneServiceApply.now-$scope.listsData[i].oneToOneServiceApply.closeTime)/(1000*60))
          var timeDifferhh=Math.floor(timeDiffermm/60)
          var timeDifferdd=Math.floor(timeDifferhh/24)
          console.log(timeDiffermm)
          
          if(timeDifferdd>0){
            $scope.listsData[i].oneToOneServiceApply.timeBefore=timeDifferdd+"天前"
          }else{
            if(timeDifferhh>0){
              $scope.listsData[i].oneToOneServiceApply.timeBefore=timeDifferhh+"小时前"
            }else{
              if(timeDiffermm>0){
                $scope.listsData[i].oneToOneServiceApply.timeBefore=timeDiffermm+"分钟前"
              }else{
                $scope.listsData[i].oneToOneServiceApply.timeBefore="刚刚"
              }
            }
          }
        }
        console.log($scope.listsData)
      }
}



  






 }]);




mainApp.directive('uploadImg',function(ajax){
    return {
        restrict: 'A',
        link:function(s,e,a){
            var fileInput=e.find('#addImg');
            fileInput.on('change',function(){
                var file=fileInput[0].files[0]
                if (!/\/(?:jpeg|jpg)/i.test(file.type)) {
                    fileInput.val('')
                    return;
                }
                if(file.size/1024/1024>1){
                    fileInput.val('')
                    return;
                }
                if(file.size/1024<5){
                    fileInput.val('')
                    return;
                }




                Md5(
                    $('#addImg')[0].files[0],
                    function(md5) {
                        var formData = new FormData();
                        formData.append('file', $('#addImg')[0].files[0]);
                        formData.append('md5', md5);
                        formData.append('sizes[0]', 40);
                        formData.append('sizes[1]', 400);
                        ajax.uploadImg(
                          dataport.ssjUpload,
                          formData,
                          function(data) {
                                console.log(data)
                            
                              if(!data.error){
                                try{

                                  s.$apply(function(){
                                    s.addimgtipHide=!0
                                    s.addImgs.unshift({
                                        img:data.data,
                                        originalimg:dataport.imgUrl+data.data,
                                        smallimg:dataport.imgUrl+data.data+"_40_40.jpg",
                                        bigimg:dataport.imgUrl+data.data+"_400_400.jpg"
                                    })
                                   })
                                }catch(e){}
                              }
                           
                          },
                          function(err) {
                                console.log(err)
                          }
                        )
                    }
                )
            })


        }
    }
})

mainApp.directive('imgShow',function(ajax){
    return {
        restrict: 'A',
        link:function(s,e,a){
          e.on('click',function(){
            console.log(s.img.photo)
            console.log(s.imgUrl)
            console.log(e.attr("class"))
            if(e.attr("active")==0){

              e.addClass("activeImg")
              .attr({
                active:1
              });

              e.parent().siblings(".bigimgShow")
              .find("a").attr({
                href:s.imgUrl+s.img.photo,
                target:"_blank"
              }).show()
              .find("img")
              .attr({
                src:s.imgUrl+s.img.photo+"_400_400.jpg"
              });

              e.siblings().removeClass('activeImg')
              .attr({
                active:0
              });
              
            }else{
              e.removeClass("activeImg")
              .attr({
                active:0
              })
              .parent().siblings(".bigimgShow")
              .find("a").hide()
              .find("img").attr({
                src:"",
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



