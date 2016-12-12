
mainApp.controller('color',function($scope,$http,ajax,$sce,budao,kongxian){
    
    $scope.myInfo=JSON.parse(localStorage.myLoginInfo||'{}')


    $scope.item1=false;
    $scope.item2=false;
    $scope.item3=false;
    $scope.item4=false;
    $scope.item5=false;


    $scope.len=3;
    $scope.index=0;



    //  补刀
    $scope.budaoInfos=budao;
    $scope.budao1=$sce.trustAsHtml($scope.budaoInfos[0].txt)
    $scope.budao2=$sce.trustAsHtml($scope.budaoInfos[1].txt)
    $scope.budao3=$sce.trustAsHtml($scope.budaoInfos[2].txt)
    $scope.budaoLen=budao.length;
    $scope.budaoIndex=0;

    // 控线 
    $scope.kongxianInfos=kongxian;
    $scope.kongxian1=$sce.trustAsHtml(kongxian[0].txt)
    $scope.kongxian2=$sce.trustAsHtml(kongxian[1].txt)
    $scope.kongxian3=$sce.trustAsHtml(kongxian[2].txt)
    $scope.kongxianLen=kongxian.length;
    $scope.kongxianIndex=0;


    $scope.championIndex=0;
    $scope.championsVideoArr=[];
    $scope.championsTabShow=false;


    $scope.championChange=function(index){
        $scope.championIndex=index;

        Canvas($scope.championDatas[$scope.championIds[index]])

    }



    $http.get(dataport.growthPlan,{timeout:5000,contentType: 'application/json;charset=UTF-8',datatype:"json"})
    .success(function(data){
        if(data.error){
            
        }else{
            if(data.data){
                // console.log(data)
                View(data.data)
            }
        }
    }).error(function(err){})

    
    function View(data){
        if(angular.isArray(data.overallGrowths)){
            $scope.overallGrowths=true;
            // avgSoldierKill：补刀；avgDeath：死亡； damagePrecent：输出 ；ctl：参团；
            if(data.overallGrowths.length==0){
                $scope.growthNotData=true;
            }
            var avgSoldierKill=[],ctl=[],avgDeath=[],damagePrecent=[];
            for(var i in data.overallGrowths){
               avgSoldierKill.push(data.overallGrowths[i].avgSoldierKill);
               ctl.push(data.overallGrowths[i].ctl);
               avgDeath.push(data.overallGrowths[i].avgDeath);
               damagePrecent.push(data.overallGrowths[i].damagePrecent);
            
            }
            if(data.overallGrowths.length==0){
                avgSoldierKill=ctl=avgDeath=damagePrecent=undefined;
            }
            var fillKnife=new Config(
                    {
                        data:avgSoldierKill||[0],
                        color:"rgba(299,61,61,1)",
                        color1:"rgba(299,61,61,.2)",
                        color2:"rgba(299,61,61,.9)",
                        type:"int",
                        id:"fillKnife",
                        name:"场均每分钟补刀"
                    });
            var groupRate=new Config(
                    {
                        data:ctl||[0],
                        color:"rgba(61,164,229,1)",
                        color1:"rgba(61,164,229,.2)",
                        color2:"rgba(61,164,229,.9)",
                        type:"rate",
                        id:"groupRate",
                        name:"参团占比"
                    });
            var death=new Config(
                {
                    data:avgDeath||[0],
                    color:"rgba(209,77,208,1)",
                    color1:"rgba(209,77,208,.2)",
                    color2:"rgba(209,77,208,.9)",
                    type:"int",
                    id:"death",
                    name:"场均死亡"
                });
            var config_hurtRate=new Config(
                {
                    data:damagePrecent||[0],
                    color:"rgba(61,213,58,1)",
                    color1:"rgba(61,213,58,.2)",
                    color2:"rgba(61,213,58,.9)",
                    type:"rate",
                    id:"hurtRate",
                    name:"输出占比"
                });

            setTimeout(function(){
                creatCanvas(fillKnife)
                creatCanvas(groupRate)
                creatCanvas(death)
                creatCanvas(config_hurtRate)
            },100)

        } //成长视图
        if(angular.isArray(data.championStages)&&data.championStages.length>0){
            $scope.championStages=true;
            $scope.championLen=data.championStages.length;
            $scope.champions=[];


            
            
            for(var i in data.championStages){
                var item=data.championStages[i]



                $scope.champions.push({
                    championInfo:lolObj[item.id],
                    championData:(function(){
                        var data={};
                        data.avgSoldierKill=[];
                        data.ctl=[];
                        data.avgDeath=[];
                        data.damagePrecent=[];
                        if(item.championScore.length>0){
                            data.show=true;
                            for(var i in item.championScore){
                                data.avgSoldierKill.push(item.championScore[i].avgSoldierKill)
                                data.ctl.push(item.championScore[i].ctl)
                                data.avgDeath.push(item.championScore[i].avgDeath)
                                data.damagePrecent.push(item.championScore[i].damagePrecent)
                            } 
                            return data
                        }else{
                            return {show:false}
                        }

                                            
                    })()
                })


               



                $http.get(dataport.getChampionVideo+item.id,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
                    .success(function(data){

                        if(!data.error){
                            var videos=[]
                            for(var i in data.data){
                                var li=data.data[i]

                                var li1=li.videoUrl.replace(/http:\/\/yuntv.letv.com\/bcloud.swf\?uu=/,'').replace(/&auto_play=1&gpcflag=1/gi,'').replace(/vu=/gi,'')

                                var video={
                                    videoUrl:li1,
                                    videoName:li.videoName,
                                    championId:li.championId
                                }
                                videos.push(video)
                            }
                            $scope.championsVideoArr.push(videos)

                       

                        }
                    }).error(function(err){})
            }



            /* -------- 补刀练习状态 ---------- */
            $scope.budaoStatus={};

            $scope.budaoStatus.total={
                level:"total",
                status:1
            }
            for(var i in data.budaoStages){
                var item=data.budaoStages[i];
                $scope.budaoStatus[item.level]={
                    level:item.level,
                    status:item.status
                }
                if(item.status==0) $scope.budaoStatus.total.status=0;
            }

            // console.log($scope.budaoStatus)

            if($scope.budaoStatus.total.status==1){
                $scope.item3=true
            }
            /* -------- 补刀练习状态 ---------- */

            /* -------- 走砍练习状态 ---------- */
                $scope.zoukanStatus=data.zooukanStage.status;
                if($scope.zoukanStatus){
                    $scope.item4=true
                }
            /* -------- 走砍练习状态 ---------- */

            /* -------- 控线练习状态 ---------- */

            $scope.kongxianStatus={};

            $scope.kongxianStatus.total={
                level:"total",
                status:1
            }
            for(var i in data.kongxianStages){
                var item=data.kongxianStages[i];
                $scope.kongxianStatus[item.level]={
                    level:item.level,
                    status:item.status
                }
                if(item.status==0) $scope.kongxianStatus.total.status=0;
            }

            // console.log($scope.kongxianStatus)
            if($scope.kongxianStatus.total.status==1){
                $scope.item5=true
            }

            /* -------- 控线练习状态 ---------- */






            $scope.championIds=[];
            $scope.championInfos={};
            $scope.championDatas={};
            $scope.champinNotData={}


            for(var i in data.championStages){
                var item=data.championStages[i];
                var championId=item.championId ;
                var championScore=item.championScore;

            /*----------获取主练英雄id--------------*/
                $scope.championIds.push(championId);
            /*----------获取主练英雄id--------------*/

            /*----------获取主练英雄info--------------*/
                $scope.championInfos[championId]=lolObj[championId]
            /*----------获取主练英雄info--------------*/


            /*----------获取主练英雄数据--------------*/
                $scope.championDatas[championId]={}
                $scope.championDatas[championId].avgSoldierKill=[];
                $scope.championDatas[championId].ctl=[];
                $scope.championDatas[championId].avgDeath=[];
                $scope.championDatas[championId].damagePrecent=[];

                for(var i1 in championScore){
                    var item=championScore[i1];
                    $scope.championDatas[championId].avgSoldierKill.push(item.avgSoldierKill);
                    $scope.championDatas[championId].ctl.push(item.ctl);
                    $scope.championDatas[championId].avgDeath.push(item.avgDeath);
                    $scope.championDatas[championId].damagePrecent.push(item.damagePrecent);

                }
                if(championScore.length==0){
                    $scope.championDatas[championId].avgSoldierKill=undefined
                    $scope.championDatas[championId].ctl=undefined
                    $scope.championDatas[championId].avgDeath=undefined
                    $scope.championDatas[championId].damagePrecent=undefined
                    $scope.champinNotData[championId]=false
                }else{$scope.champinNotData[championId]=true}

            /*----------获取主练英雄数据--------------*/


            }

            $scope.championVideos={};

            /*----------获取主练英雄视频--------------*/
                for(var i in $scope.championIds){
                    var championId=$scope.championIds[i];
                    $http.get(dataport.getChampionVideo+championId,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
                        .success(function(data,statu,fn,config){
             
                            var championId=config.url.split("championId=")[1];

                            $scope.championVideos[championId]=[];
                            if(!data.error){
                                var videos=[]
                                for(var i in data.data){
                                    var li=data.data[i]

                                    var li1=li.videoUrl.replace(/http:\/\/yuntv.letv.com\/bcloud.swf\?uu=/,'').replace(/&auto_play=1&gpcflag=1/gi,'').replace(/vu=/gi,'')

                                    var video={
                                        videoUrl:li1,
                                        videoName:li.videoName,
                                        championId:li.championId
                                    }
                                    $scope.championVideos[championId].push(video)
                                }
                            }
                        }).error(function(err,statu,fn,config){
                            var championId=config.url.split("championId=")[1];
                            $scope.championVideos[championId]=[];
                        })
                }
            /*----------获取主练英雄视频--------------*/
            
        Canvas($scope.championDatas[$scope.championIds[0]])


            

        } // 主练英雄视图


         // 成长进度条视图
        $scope.beginRank=rankProgressClass(data.beginRank)
        $scope.recentRank=rankProgressClass(data.recentRank)
        // 成长进度条视图


        $scope.evaluateShow=data.showConfirm;


        $scope.teacherQQ=data.teacherId?(teacherContact[data.teacherId]?teacherContact[data.teacherId].qq:""):"";


        $scope.Evaluates={
            planId:data.planId,
            teacherId:data.teacherId
        };
        $scope.EvaluatesSubmit=true;
        $scope.$watch('Evaluates',function(newVal,oldVal){

            if(newVal.planScore==undefined){
                $scope.EvaluatesSubmit=true;
                return;
            }
 
            // if(newVal.planMsg==undefined||newVal.planMsg.length==0){
            //     ;$scope.EvaluatesSubmit=true
            //     return; 
            // }
                
            if(newVal.teacherServiceScore==undefined){
                $scope.EvaluatesSubmit=true
                return;   
            }

            // if(newVal.teacherServiceMsg==undefined||newVal.teacherServiceMsg.length==0) {
            //     $scope.EvaluatesSubmit=true
            //     return;
            // }

            $scope.EvaluatesSubmit=false;   
        },true)

        $scope.postEvaluates=function(){
            $scope.EvaluatesSubmit=!0;  
            $http.post(dataport.growthEvaluates,$scope.Evaluates,{timeout:5000,contentType: 'application/json;charset=UTF-8',datatype:"json"})
            .success(function(data){
                $scope.EvaluatesSubmit=!1; 
                if(!data.error){
                    $scope.evaluateShow=false;
                }
            }).error(function(err){
                $scope.EvaluatesSubmit=!1; 
                // console.log(err)
            })
        }

    }
    function rankProgressClass(data){
            if(data.tier==255) {
                data.tier=5;
                data.queue=4;
            }
            if(data.tier==1||data.tier==0||data.tier==6) {
                data.tier=2;
                data.queue=4;
            }
            var obj={}
            obj.tier=data.tier;
            obj.queue=data.queue;
            obj.name=rank.rankFunc(data.tier,data.queue);
            obj.lens=(5-data.tier)*5+4-data.queue;
            obj.left=((obj.lens*100)/15).toFixed(5)
            return obj

    }



    function Canvas(data){
            var champinCanvas1=new Config(
                    {
                        data:data.avgSoldierKill||[0],
                        color:"rgba(299,61,61,1)",
                        color1:"rgba(299,61,61,.2)",
                        color2:"rgba(299,61,61,.9)",
                        type:"int",
                        id:"champinCanvas1",
                        name:"场均每分钟补刀"
                    });
            var champinCanvas2=new Config(
                    {
                        data:data.ctl||[0],
                        color:"rgba(61,164,229,1)",
                        color1:"rgba(61,164,229,.2)",
                        color2:"rgba(61,164,229,.9)",
                        type:"rate",
                        id:"champinCanvas2",
                        name:"参团占比"
                    });
            var champinCanvas3=new Config(
                {
                    data:data.avgDeath||[0],
                    color:"rgba(209,77,208,1)",
                    color1:"rgba(209,77,208,.2)",
                    color2:"rgba(209,77,208,.9)",
                    type:"int",
                    id:"champinCanvas3",
                    name:"场均死亡"
                });
            var champinCanvas4=new Config(
                {
                    data:data.damagePrecent||[0],
                    color:"rgba(61,213,58,1)",
                    color1:"rgba(61,213,58,.2)",
                    color2:"rgba(61,213,58,.9)",
                    type:"rate",
                    id:"champinCanvas4",
                    name:"输出占比"
                });

            setTimeout(function(){
                creatCanvas(champinCanvas1)
                creatCanvas(champinCanvas2)
                creatCanvas(champinCanvas3)
                creatCanvas(champinCanvas4)
            },100) 
    }


})
.value("budao",[
    {
        title:"简单难度",
        txt:"自定义开游戏练习补刀，不添加电脑<br/>出门购买上古钱币（10分钟的时候看上古钱币收集了多少钱，漏一个小兵4金币<br/>不能回家更新装备，不能击杀中立野怪，只能在一条线上去补刀<br/>不能使用技能，可以带正常的天赋，符文<br/>（法师就带法强类，不可以选择攻击和攻速）"
    },
    {
        title:"普通难度",
        txt:"自定义开游戏，添加电脑，增加对线难度<br/>出门购买上古钱币（10分钟的时候看上古钱币收集了多少钱，漏一个小兵4金币）<br/>不能回家更新装备，不能击杀中立野怪，只能在一条线上去补刀<br/>不能使用技能，可以带正常的天赋，符文<br/>（法师就带法强类，不可以选择攻击和攻速）"
    },
    {
        title:"实战难度",
        txt:"实战（匹配排位）中记录自己的补刀数量"
    }

 ])
.value("kongxian",[
    {
        title:"简单难度",
        txt:"开自定义游戏，不要添加电脑<br/>5级开始将兵线控制在防御塔攻击范围之前（持续5分钟以上）<br/>自定义会看到防御塔的攻击范围，保证在那个圈外一点是最正确的位置<br/>当小兵超过10头要进塔，就需要利用技能清理一部分一半以上<br/>可以选择利用身体吸引小兵仇恨"},
    {
        title:"普通难度",
        txt:"开自定义游戏，添加对面电脑<br/>5级开始将兵线控制在防御塔攻击范围之前（持续5分钟以上）<br/>自定义会看到防御塔的攻击范围，保证在那个圈外一点是最正确的位置<br/>当小兵超过10头要进塔，就需要利用技能清理一部分一半以上<br/>可以选择利用身体吸引小兵仇恨"},
    {
        title:"实战难度",
        txt:"实战（匹配排位）中进行控线练习，记录自己和对面的补刀差距，保证10分钟时补刀超过对面15刀即为达成"
    }
])

.directive("itemShow",function(){
    return {
        restrict:"A",
        scope:{item:"=item"},
        link:function(scope,ele,attrs){
            ele.on('click',function(){
                scope.$apply(function(){
                    scope.item=!scope.item
                })
                
            })
        }
    }
}) 
.directive("selectClass",function(){
    return {
        restrict:"A",
        scope:{
            add:"@add",
            len:"=len",
            index:"=index"
        },
        link:function(scope,ele,attrs){
            ele.on('click',function(){
                var add=Number(scope.add)
                var newIndex=scope.index+add;
                scope.$apply(function(){
                    if(angular.isNumber(add)){
                        if(newIndex>-1&&newIndex<scope.len){
                            scope.index=angular.copy(newIndex)
                        }

                    }
                })  
            })
        }
    }
}) 

