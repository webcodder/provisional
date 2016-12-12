 /*
 *Author:liaohs
 *Date:2016.1.13
 *Name:boomgame
 */
 

(function(){
    if(htmlref.lastIndexOf("my")>-1){
            

    }//myhomepage
    else{

    }//hishomepage
})()
var StudentId=htmlref.split("=")[1]


 mainApp.controller('color',function($scope, $http) {
    $http.get(dataport.hisbaseInfo+StudentId) 
         .success(function(response) {
            //console.log(response)
            $scope.nowTqwa=nowTqwa(response.achievement.nowTqwa)
            $scope.oldTqwa=nowTqwa(response.achievement.originalTqwa)
            $scope.baseInfo=baseInfoFunc(response.baseInfo.student)
            
            $("#pagetitle span").html($scope.baseInfo.summoner+"的主页")    
            $scope.classNum=response.baseInfo.boomClass.className.replace(/班/gi,"")
            $scope.studentCount=response.baseInfo.boomClass.studentCount;
            $scope.headTeacherName=response.baseInfo.boomClass.headTeacherName;

            //$scope.index=response.baseInfo.student.nowIndex;
            
     });
     //base

    $http.get(dataport.hisgrowInfo+StudentId) 
         .success(function(response) {
            // console.log("grow")
            // console.log(response)
            
    });
    //grow
    $http.get(dataport.hisgameInfo+StudentId) //game
         .success(function(response) {
            $scope.boomC=boomCalculate(response.boomCalculate); 
            $scope.boomR=response.boomCalculate;
            $scope.boomT=response.sceneCount;
            $scope.useheros=useheros(response.championUserRanking)

    });
    //game
    $http.get(dataport.hislolInfo+StudentId) //lol
         .success(function(response) {
            $scope.uselols=uselols(response.recentUseChampion.data[0].recent_champion_list);
            //常用英雄
            $scope.killInfos=killInfo(response.continuousKillInfo);
            //三杀，四杀...
            $scope.game_statistics=gamestatistics(response.qualifying.data)
            //比赛统计
            $scope.dayInfos=recent7DayInfo(response.recent7DayInfo)
            //近7天数据         
    });
    //lol

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行
        bar($scope.uselols)
        

    });
 });

getdata("#linearea", StudentId)


function baseInfoFunc(data){
    var a=data
        if(a.headImage==null){
            a.headimg=localPath.defaultimg+"defaultIco.png"
        }else{
            a.headimg=dataport.headimg+a.headImage
        }
    var b=a.nowIndex;
    var c=a.frontIndex;
    var f={}
        
        if(c!=0){
            var d=c-b
            f.d=d;
            if(d>0){
                f.up=true;
                f.down=false;
            }
            if(d<0){
                f.up=false;
                f.down=true;
            }
        }
        a.change=f
        
    return a;
}
function nowTqwa(data){
    var a=data;
        a.img=localPath.rankimg+a.tier+".png"
        a.rank=rank.rankFunc(a.tier,a.queue)
    return a
}
function useheros(data){
    var a=[]
    if(data.length>4) data.length=4;
    for(var i in data){
        var b=data[i]
            b.img=lolObj[b.championId].img
            b.failCount=b.appearCount-b.winCount
        a.push(b)
    }
    return a
}
function boomCalculate(data){
    if(data.assistsCount!=null&&data.assistsCount!=0&&data.assistsCount!==undefined){
        data.KDA=((data.killCount+data.assistsCount)/data.dieCount).toFixed(1)
    }else{
        data.KDA=1
    }

    var arr0=["money","hurt"]
    var arr1=[
        "killCount",
        "dieCount",
        "assistsCount",
        "creepsCount",    
        "pushTower" 

    ]
    var arr2 = [  
     
    ]
    var arr=[arr0,arr1,arr2]
    var newdata=data;
    if(data.sceneCount==0){
        newdata.winCountAverage=0
        arr.forEach(function(v,i){
            v.forEach(function(v1,i1){
                newdata[v1+"Average"]=0
             })
        })
    }else{
        newdata.winCountAverage=(data.winCount*100)/data.sceneCount.toFixed(0)
        arr.forEach(function(v,i){
            v.forEach(function(v1,i1){

                newdata[v1+"Average"]=(data[v1]/data.sceneCount).toFixed(i)
             })
        })  
    } 

    return newdata
}

function uselols(data){ 
    var lols=[]
    for(var i in data){
        var v=data[i]
        v.img=localPath.championimg+lolObj[v.champion_id].img;
        v.name=lolObj[v.champion_id].name;
        lols.push(v)
    }
    return lols
}//常用英雄
function killInfo(data){
    var info=[]
    var arr={
        "threeKill":"三杀",
        "fourKill":"四杀",
        "fiveKill":"五杀",
        "godLike":"超神"
    }
    for(var k in arr){
        try{
            var v={}
            v.name=arr[k]
            v.num=data[k]
            info.push(v)  
        }catch(e){}
    }
    return info
}
function gamestatistics(data){
    var arr=["S6排位赛","S5排位赛","S4排位赛"];
    var infos=[]
    //console.log(data)
    for(var i in arr){
        try{
            var info=data[i].batt_sum_info;
                info.name=arr[i]
                info.img=info.tier+".png"
                info.rank=rank.rankFunc(info.tier,info.queue)

            infos.push(info)      
        }catch(e){}

    }   
    return infos
}
function recent7DayInfo(data){
    var a=[]
    for(var k in lolrole){
        var v={}
            v.name=lolrole[k]
            v.useNum=data[k+"_use_num"]
            v.winNum=data[k+"_win_num"]

            v.winper=topercent(v.winNum,v.useNum)

            v.failNum=data[k+"_use_num"]-data[k+"_win_num"]

            v.failper=topercent(v.failNum,v.useNum)
            
        a.push(v)
    }

    return a
}
function topercent(num,total){
    if(total!=0){
        return (num*100/total).toFixed(1)+"%";
    }else{
        return ""
    }
}


//点赞
//dataport.mypraiseInfo
//StudentId

$("#addpraise").click(function(){
    $.ajax({
        url: dataport.mypraiseInfo+StudentId,
        type: "get",
        timeout: publicFunc.time,
        success: function(data) {
            if(data.error==false){
                $("#addpraiserequire").html("点赞成功");
                var val= $("#getpraise").html()
                $("#getpraise").html(Number(val)+1)
                setTimeout(function(){
                    $("#addpraiserequire").html("");
                },1000)

            }else{
                $("#addpraiserequire").html(data.msg);
                setTimeout(function(){
                    $("#addpraiserequire").html("");
                },1000)
            }

        },
        error: function(request) {
            console.log(request);  

        }
    }, "json");
})