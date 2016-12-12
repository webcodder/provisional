 /*
 *Author:liaohs
 *Date:2016.5.5
 *Name:boomgame
 */
(function(window, undefined) {
    var L ={};
        nav={};
    var pphone=new RegExp("phone|pod|iPhone|iPod|Android|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone",'gi')
        //ios|Mobile 减去

    var pipad= new RegExp("pad|iPad",'i')
    var userAgent=navigator.userAgent;

    var pm={} //判断pc phone  ipad
        pm.phone=pphone.test(userAgent)
        pm.ipad=pipad.test(userAgent)
        pm.pc=!pm.phone&&!pm.ipad

    L.pm=pm;

    /* ------------------------- baseUI ---------------------*/
    var typeModel={
        grow:["gwt","gwl","gmt","gml","gqt","gql"],
        rank:["rc","rs"],
        count:["cwt","cwl","cmt","cml"],
        champion:["champion"]
    }
    var typeModelTrans=function(){
        var a={}
        for(var i in typeModel){
            var b=typeModel[i]
            for(var i1 in b){
                var c=b[i1]
                a[c]=i
            }
        }
        return a;
    }

    var nav1=function(type){
        var a=typeModelTrans(),
            b=a[type],
            c={
                grow:0,
                rank:1,
                count:2,
                champion:3
            },
            d = [] ;

            d[c[b]]="in";  
        return d
    }

    var nav2=function(type){
        var a=typeModelTrans(),
            b=a[type],
            c={
                grow:0,
                rank:1,
                count:2,
                champion:3
            },
            d={
                gwt:0, gwl:0, gmt:1, gml:1, gqt:2, gql:2,
                rc:0, rs:1,
                cwt:0, cwl:0, cmt:1, cml:1,
                champion:0
            },
            nav2Show=[],
            nav2Css=[];
            nav2Show[c[b]]=true; 
            nav2Css[d[type]]="in";

            return  {
                show:nav2Show,
                css:nav2Css
            }
    }

    var nav3=function(type){
        var a=typeModelTrans(),
            b=a[type],
            d={
                gwt:0, gwl:1, gmt:0, gml:1, gqt:0, gql:1,
                rc:0, rs:0,
                cwt:0, cwl:1, cmt:0, cml:1,
                champion:0
            },
            nav3Css=[];
            nav3Css[d[type]]="in";
        return nav3Css
    }

    var pcTab=function(type){
        var a=typeModelTrans(),
            b=a[type],
            c={
                grow:[0,1,2,3,6,7,8],
                rank:[0,1,2,3,4,5],
                count:[0,1,2,3,4,9],
                champion:[0,10,11,12,13,14,15]
            },
            tabShow=[];
            if( type=="rs" ) c.rank=[0,1,2,3,4];
            else c.rank=[0,1,2,3,4,5];
        var d=c[b];
        for(var i in d){
            tabShow[d[i]]=true
        }
        return tabShow
    }
    var phoneTab=function(type){
        var a=typeModelTrans(),
            b=a[type],
            c={
                grow:[0,1,3],
                rank:[0,1,4],
                count:[0,1,5],
                champion:[0,2,6] //use
            },
            tabShow=[];

        var d=c[b];
        for(var i in d){
            tabShow[d[i]]=true
        }
        return tabShow
    }


        nav.nav1=nav1;
        nav.nav2=nav2;
        nav.nav3=nav3;
    var tab={
        pc:pcTab,
        mobile:phoneTab
    }

    L.nav=nav;
    L.tab=tab;
    /* ------------------------- baseUI ---------------------*/

    /* ------------------------- dataTrans ---------------------*/

    var dataTrans={};
        dataTrans.grow=function(data,key){
            for(var i in data){
                try{   
                    var row=data[i];
                        row.topIcon="top_"+row.index;
                        row.simg=(row.header!=null)?dataport.headimg+row.header:localPath.defaultimg+"defaultIco.png";
                        row.danNow=rank.rankFunc(row.tierNow,row.queueNow);
                        row.danOld=rank.rankFunc(row.tierBefore,row.queueBefore);
                        row.growChangeClass=new Array(4);
                        if(row.change>0){
                            row.growChangeClass[0]="block"
                        }
                        if(row.change<0){
                            row.growChangeClass[1]="block"
                        }
                        if(row.change==0){
                            row.growChangeClass[2]="block"
                        }
                        if(row.change==null){
                            row.growChangeClass[3]="block"
                        }
                        if(key=="gwl"||key=="gml"||key=="gql") row.topIcon="";
                }catch(e){}
            }  
            return data;
        }
        dataTrans.rank=function(data,key){
            
            for(var i in data){
                try{
                    var row=data[i];
                    row.topIcon="top_"+row.index;
                    row.simg=(row.headImage!=null)?dataport.headimg+row.headImage:localPath.defaultimg+"defaultIco.png";
                    row.dan=rank.rankFunc(row.tier,row.queue); 
                    row.growChangeClass=new Array(4); 
                    if(row.change>0){
                        row.growChangeClass[0]="block"
                    }
                    if(row.change<0){
                        row.growChangeClass[1]="block"
                    }
                    if(row.change==0){
                        row.growChangeClass[2]="block"
                    }
                    if(row.change==null){
                        row.growChangeClass[3]="block"
                    }
                }catch(e){}
            }
            return data;
        }
        dataTrans.count=function(data,key){
            for(var i in data){
                try{
                    var row=data[i];
                        row.topIcon="top_"+row.index;
                        row.simg=(row.header!=null)?dataport.headimg+row.header:localPath.defaultimg+"defaultIco.png";
                        
                        if(key=="cwl"||key=="cml"||key=="cql") row.topIcon="";
                }catch(e){}
            }
            return data;
        }
        dataTrans.champion=function(data,key){
            for(var i in data){
                try{
                    var row=data[i];
                        row.index=row.rank;
                        row.topIcon="top_"+row.index;
                        row.img=localPath.championimg+lolObj[row.champion_id].img;
                        row.name=lolObj[row.champion_id].name;
                        row.useRate=(row.use_ratio/100).toFixed(2)+"%";
                        row.winRate=(row.win_ratio/100).toFixed(2)+"%";
                        row.KDA=(row.kda/100).toFixed(1);
                        row.k_d_a="|"+(row.avg_k_num/100).toFixed(1)+"/"+(row.avg_d_num/100).toFixed(1)+"/"+(row.avg_a_num/100).toFixed(1)
                        row.creeps=(row.minions_killed_per_min/100).toFixed(2);
                        row.money=(row.gold_earned_per_min/100).toFixed(2);
                }catch(e){
                   
                }
            }
            return data;
        }
    L.trans=dataTrans;
    /* ------------------------- dataTrans ---------------------*/


    /* ------------------------- ports ---------------------*/
    var Ports={

        gwt:dataport.grow_week,//g-w-top10
        gwl:dataport.grow_week+"?top=false",//g-w-last10
        gmt:dataport.grow_month,//g-m-top10
        gml:dataport.grow_month+"?top=false",//g-m-last10
        gqt:dataport.grow_quarter,//g-q-top10
        gql:dataport.grow_quarter+"?top=false",//g-q-last10
        //grow

        rc:dataport.rank_class+"?rp=30",
        rs:dataport.rank_school+"?rp=30",
        //rank

        cwt:dataport.count_week, //c-w-top10
        cwl:dataport.count_week+"?top=false", 
        cmt:dataport.count_month, //c-w-top10
        cml:dataport.count_month+"?top=false", 
        //count

        champion:dataport.champion, 
        //champion
    }

    var Ports1={}
    for(var i in Ports){
        var key=Ports[i]
        Ports1[key]=i
    }
    L.prots=Ports;
    /* ------------------------- ports ---------------------*/

    /* ------------------------- baseData ---------------------*/
    function getBaseData($scope,$http){
        for(var i in Ports){
            $http.get(Ports[i],{contentType: 'application/json;charset=UTF-8',datatype:"json"})
            .success(function(req,staste,fn,obj){
                var url=obj.url,
                    key=Ports1[url],
                    a=typeModelTrans(),
                    type=a[key];
                    
                    switch(type){
                        case 'grow':
                            req.rows.rows=dataTrans.grow(req.rows,key)
                            break;
                        case "count":
                            req.rows=dataTrans.count(req.rows,key)
                            break;
                        case "rank":
                            req.rows=dataTrans.rank(req.rows,key)
                            if(key=="rc"){
                                window.localStorage.classRankTotal=req.total; 
                            }else{
                                window.localStorage.schoolRankTotal=req.total;
                            }
                            break;
                        case "champion":
                            req.rows=dataTrans.champion(req.data,key)
                            break;
                    }

                    window.localStorage[key]=JSON.stringify(req.rows)
            })
        }
    }
    L.base=getBaseData;
    /* ------------------------- baseData ---------------------*/

    /* ------------------------- getData ---------------------*/
    var getData=function($scope,$http,action,param,fn){
        $scope.total=undefined;
        if(param == undefined ){ // only rank-model has param
            if(typeof window.localStorage[action] == "string"){
                $scope.rows=JSON.parse(window.localStorage[action])
            }else{
                $http.get(Ports[action],{contentType: 'application/json;charset=UTF-8',datatype:"json"})
                    .success(function(req){
                        var key=action,
                            a=typeModelTrans(),
                            type=a[key];

                            switch(type){
                                case 'grow':
                                    $scope.rows=dataTrans.grow(req.rows,key)
                                    break;
                                case "count":
                                    $scope.rows=dataTrans.count(req.rows,key)
                                    break;
                                case "rank":
                                    $scope.rows=dataTrans.rank(req.rows,key)
                                    $scope.total=req.total;
                                    break;
                                case "champion":
                                    $scope.rows=dataTrans.champion(req.data,key)
                                    break;
                            }
                    })  
            }
        }else{
            if(action=="rc"||action=="rs"){
                var url=Ports[action];
                for(var i in param){
                    if(param[i]!=undefined) url+="&"+i+"="+param[i]
                }

                $http.get(url,{contentType: 'application/json;charset=UTF-8',datatype:"json"}).success(function(req){
                    $scope.rows=dataTrans.rank(req.rows)
                    $scope.total=req.total;
                    $scope.page.show=true
                    if(typeof fn == 'function'){
                        fn()
                    }
                    
                })

            }
        }
    }
    L.get=getData;
    /* ------------------------- getData ---------------------*/

    /* ------------------------- page ---------------------*/
    var page=function(n){
        var total=n;
        var a={};
            a.pages=Math.ceil(total/30)
            a.show=(a.pages>1)?true:false
            a.nowPage=1
          
        return a
    }
    L.page=page;
    /* ------------------------- page ---------------------*/

    /* ------------------------- areaList ---------------------*/
    var areaList=function(){
        areaArr.unshift({
            "name":"全部"
        })
        for(var i=0;i<areaArr.length;i++){
            areaArr[i].index=i
        }
        return areaArr
    }
    L.area=areaList();


    /* ------------------------- areaList ---------------------*/

    /* ------------------------- champion ---------------------*/
        var championTab={
            0:[0,2,6],
            1:[0,2,7],
            2:[0,2,8],
            3:[0,2,9],
            4:[0,2,10]
        }
        var championNav=[]
        var champion={
            nav:championNav,
            tab:championTab
        }

        L.champion=champion

    /* ------------------------- champion ---------------------*/

    window.L = window.$L = L;
})(window); 
    
var pcPart=document.getElementById("pc"),
    phonePart=document.getElementById("phone");
    if(L.pm.pc){
        pcPart.style.display="block"

    }else{
        phonePart.style.display="block"
    }

mainApp.controller('color',["$scope","$http",function($scope, $http){
    $scope.nowIndex=JSON.parse(window.localStorage.myLoginInfo).nowIndex;
    $scope.nowType="gwt"
    L.base($scope,$http) 
    $scope.championNav=[];


   

    $scope.$watch("nowType",function(n,o){
        L.get($scope,$http,n)
        $scope.nav1=L.nav.nav1(n)
        $scope.nav2Show=L.nav.nav2(n).show;
        $scope.nav2Css=L.nav.nav2(n).css;
        $scope.nav3=L.nav.nav3(n);
        $scope.pc=L.tab.pc(n);
        $scope.mobile=L.tab.mobile(n);
        $scope.championNav[0]="in"
        $scope.area=angular.copy(L.area)
        $scope.area[0].css="in"
        $scope.nowArea=$scope.area[0].name;

        switch(n){
            case 'rc':
                $scope.total=window.localStorage.classRankTotal;
                $scope.page=L.page($scope.total)
                break;
            case 'rs':
                $scope.total=window.localStorage.schoolRankTotal;
                $scope.page=L.page($scope.total)
                break;
            default:
                $scope.total=undefined;
                $scope.page=L.page(0)

        }
    })
    $scope.pageDis=true


    $scope.$watch('page',function(n,o){
        n.nowPage=(Number(n.nowPage)>-1)?Number(n.nowPage):1
    },true)

    $scope.pageFn=function(target){
        var add=target.getAttribute("add"),
            nowPage=target.getAttribute("nowPage"),
            nextPage;

        if(add != undefined){
            
            nowPage=Number(nowPage.replace(/\D/gi,''));
            if(nowPage<1) nowPage=1;
            if(nowPage>$scope.page.pages) nowPage=$scope.page.pages;
            
            switch(Number(add)){
                case -1:
                    nextPage=(nowPage-1>0)?nowPage-1:1
                    break;
                case 1:
                    nextPage=(nowPage+1>$scope.page.pages)?$scope.page.pages:nowPage+1
                    break;
                case 0:
                    if(nowPage>0&&nowPage<$scope.page.pages+1) nextPage=nowPage;
                    else{
                        if(nowPage<1) nextPage=1;
                        if(nowPage>$scope.page.pages) nextPage=$scope.page.pages;
                    }
                    break;
            }
            $scope.page.nowPage=nextPage
            $scope.page.show=false
            L.get($scope,$http,$scope.nowType,{
                areaCode:$scope.areaCode,
                page:$scope.page.nowPage
            })
        }  
          
    }


    $scope.changeType=function(target){
        var type=target.getAttribute("type")
        if(type != null) $scope.nowType=type;
        var  top=target.getAttribute("top")
        if(top != null){ 
            var arr={
                 1:["gwt","gmt","gqt","cwt","cmt"],
                 0:["gwl","gml","gql","cwl","cml"]
            };
            var t=(Number(top)+1)%2;
            for(var i in arr[top]){
                var a=arr[top][i]
                if($scope.nowType==a){
                    var b=arr[t][i]
                    $scope.nowType=b
                }
            }
        }
    }

    $scope.championClick=function(target){
        var i=target.getAttribute("championType")
        if(i != null){
                $scope.championNav=[];
                $scope.championNav[i]="in"
                var a=L.champion.tab[i]
                $scope.mobile=[]
                for(var i in a){
                    $scope.mobile[a[i]]=true
                }
        }
    }

    $scope.areaShow=false
    $scope.areaCheck=function(target){
        var areaCode=target.getAttribute("areaCode")
        var areaIndex=target.getAttribute("areaIndex")
        $scope.areaShow=false
        if(areaIndex!=null){
            $scope.nowArea=$scope.area[areaIndex].name
            $scope.area=angular.copy(L.area)
            $scope.area[areaIndex].css="in"  
            L.get($scope,$http,$scope.nowType,{
                areaCode:areaCode
            },function(){
               $scope.page=L.page($scope.total) 
            })      
        }

    }
    $scope.areaShowFn=function(){
        $scope.areaShow=!$scope.areaShow;
    }

}])



// document.documentElement.scrollTop = document.body.scrollTop =0;