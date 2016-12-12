 /*
 *Author:liaohs
 *Date:2016.2.3
 *Name:boomgame
 */
var pphone=new RegExp("phone|pod|iPhone|iPod|Android|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone",'gi')
    //ios|Mobile 减去

var pipad= new RegExp("pad|iPad",'i')
var userAgent=navigator.userAgent;

var pm={}
    pm.phone=pphone.test(userAgent)
    pm.ipad=pipad.test(userAgent)
    pm.pc=!pm.phone&&!pm.ipad

console.log(navigator)

var pcpart=document.getElementById("pc")


 


var pcPorts={

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

var pcPorts1={}
for(var i in pcPorts){
    var key=pcPorts[i]
    pcPorts1[key]=i
}



var in1=new Array(4),
    c1Show=[false,false,false,false],
    rankListShow=new Array(16),
    rankListShowPart=[
        [0,1,2,3,6,7,8],
        [0,1,2,3,4,5],
        [0,1,2,3,4,9],
        [0,10,11,12,13,14,15]
    ];

    for(var i=0;i<16;i++){
        rankListShow[i]=false;
    }


mainApp.controller('color_pc',["$scope","$http",function($scope, $http){

    for(var i in pcPorts){
        $http.get(pcPorts[i])
        .success(function(req,staste,fn,obj){
            var url=obj.url,
                key=pcPorts1[url]
                window.localStorage[key]=JSON.stringify(req)
        })
    }




    $http.get(pcPorts.gwt)
    .success(function(req){
        var data=dataTrans.grow(req.rows)
        window.sessionStorage.gwt=JSON.stringify(data)
    }).error(function(e){})
    $http.get(pcPorts.gwl)
    .success(function(req){
        window.sessionStorage.gwl=JSON.stringify(req)
    }).error(function(e){})
    $http.get(pcPorts.gmt)
    .success(function(req){
        window.sessionStorage.gmt=JSON.stringify(req)
    }).error(function(e){})
    $http.get(pcPorts.gml)
    .success(function(req){
        window.sessionStorage.gml=JSON.stringify(req)
    }).error(function(e){})
    $http.get(pcPorts.gqt)
    .success(function(req){
        window.sessionStorage.gqt=JSON.stringify(req)
    }).error(function(e){})
    $http.get(pcPorts.gql)
    .success(function(req){
        window.sessionStorage.gql=JSON.stringify(req)
    }).error(function(e){})

    $http.get(pcPorts.rc)
    .success(function(req){
        var data=dataTrans.rank(req.rows)
        window.sessionStorage.rc=JSON.stringify(data)
    }).error(function(e){})
    $http.get(pcPorts.rs)
    .success(function(req){
        window.sessionStorage.rs=JSON.stringify(req)
    }).error(function(e){})

    $http.get(pcPorts.cwt)
    .success(function(req){
        var data=dataTrans.count(req.rows)
        window.sessionStorage.cwt=JSON.stringify(data)
    }).error(function(e){})
    $http.get(pcPorts.cwl)
    .success(function(req){
        window.sessionStorage.cwl=JSON.stringify(req)
    }).error(function(e){})
    $http.get(pcPorts.cmt)
    .success(function(req){
        window.sessionStorage.cmt=JSON.stringify(req)
    }).error(function(e){})
    $http.get(pcPorts.cml)
    .success(function(req){
        window.sessionStorage.cml=JSON.stringify(req)
    }).error(function(e){})

    $http.get(pcPorts.champion)
    .success(function(req){
        var data=dataTrans.champion(req.data)
        window.sessionStorage.champion=JSON.stringify(data)
    }).error(function(e){})
   


    $scope.in1=angular.copy(in1);
    $scope.in1[0]="in";

    $scope.c1Show=angular.copy(c1Show);
    $scope.c1Show[0]=true;

    $scope.rankListShow=angular.copy(rankListShow);
    for(var i in rankListShowPart[0]){
        $scope.rankListShow[rankListShowPart[0][i]]=true
    }

    if(typeof window.sessionStorage.gwt == "string"){
        $scope.rows=JSON.parse(window.sessionStorage.gwt)
    }else{

    }

    $scope.control1=function(event){
        var target=event.target;
        if(target.nodeName.toLowerCase()=="li"){
            var index=target.getAttribute("index");
                $scope.in1=angular.copy(in1);
                $scope.in1[index]="in";
                $scope.c1Show=angular.copy(c1Show);
                $scope.c1Show[index]=true;
                $scope.rankListShow=angular.copy(rankListShow);
                for(var i in rankListShowPart[index]){
                    $scope.rankListShow[rankListShowPart[index][i]]=true;
                }
            var action=target.getAttribute("action");
            if(typeof window.sessionStorage[action] == "string"){
                $scope.rows=JSON.parse(window.sessionStorage[action])
                console.log($scope.rows[0])
            }else{

            }   
        }
    };

}])



var dataTrans={};
    dataTrans.grow=function(data){
        for(var i in data){
            try{   
                var row=data[i];
                    row.topIcon="top_"+row.index;
                    row.simg=(row.head!=null)?dataport.headimg+row.head:localPath.defaultimg+"defaultIco.png";
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
            }catch(e){console.log(e)}
        }  
        return data;
    }
    dataTrans.rank=function(data){
        
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
            }catch(e){console.log(e)}
        }
        return data;
    }
    dataTrans.count=function(data){
        for(var i in data){
            try{
                var row=data[i];
                    row.topIcon="top_"+row.index;
                    row.simg=(row.header!=null)?dataport.headimg+row.header:localPath.defaultimg+"defaultIco.png";
                    

            }catch(e){console.log(e)}
        }
        return data;
    }
    dataTrans.champion=function(data){
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
            }catch(e){console.log(e)}
        }
        return data;
    }





// phone
var phonepart1=document.getElementById("phone")
     if(!pm.phone) {
        pcpart.style.display="block"
     }
    if(pm.phone) {
        phonepart1.style.display="block"
        colorphone()
    } 


var phonepart = {
    c1: {
        css: [1, 0, 0, 0]
    },
    c2: {
        show: [1, 0, 0, 0],
        child: [{
            css: [1, 0, 0,0,0]
        }, {
            css: [1, 0]
        }]
    },
    tab:{
        show:[1,1,0,1,0,0,0,0,0,0,0]
    },
    nowport:"gwt",
    top3Ico:true
}

var tabObj=[
    [0,1,3],
    [0,1,4],
    [0,1,5],
    [0,2,6]
]


//021 0:grow,2:quarter,1:last10
var portpart={
    gwt:dataport.grow_week,//g-w-top10
    gwl:dataport.grow_week+"?top=false",//g-w-last10
    gmt:dataport.grow_month,//g-m-top10
    gml:dataport.grow_month+"?top=false",//g-m-last10
    gqt:dataport.grow_quarter,//g-q-top10
    gql:dataport.grow_quarter+"?top=false",//g-q-last10
    //grow

    rc:dataport.rank_class,
    rs:dataport.rank_school,
    //rank

    cwt:dataport.count_week, //c-w-top10
    cwl:dataport.count_week+"?top=false", 
    cmt:dataport.count_month, //c-w-top10
    cml:dataport.count_month+"?top=false", 
    //count

    champion:dataport.champion, 
    //champion
}

var phoneTrans=[
    function(data){
    var rows=[]

        for(var i in data.rows){
            var v=data.rows[i]
                v.dindex=v.change //排名变化
                v.summoner=(v.summoner=="")?"——":v.summoner;
                v.num=v.index;

                v.simg=function(){
                    if(v.studentHeadImage==null||v.studentHeadImage==""){
                        return localPath.defaultimg+"defaultIco.png"
                    }else{
                        return  dataport.headimg+v.studentHeadImage
                    }   
                }()
                v.classNum=classObj[v.classId]
                v.sex1="hidden";
                v.olddan=rank.rankFunc(v.oldTier,v.oldQueue)
                v.nowdan=rank.rankFunc(v.nowTier,v.nowQueue)
                v.gchange=function(){
                    var d=v.change;
                    
                    var gchange=[]
                    gchange.d=d;
                    if(v.tierNow!=255){
                        if(d>0){gchange=[true,false,false,false,]};
                        if(d==0){gchange=[false,true,false,false,]};
                        if(d<0){gchange=[false,false,true,false,]};    
                    }
                    if(v.tierNow==255){gchange=[false,false,false,true,]};
                    return gchange
                }()             
            rows.push(v)
        }
        return rows
    },//grow
    function(data){
        var rows=[]
        for(var i in data.rows){
            var v=data.rows[i]
                v.dindex=v.frontIndex-v.nowIndex //排名变化
                
                // v.num=(nowdoing.type=="rank_class")?((v.tier==255)?"——":v.nowIndex):((v.tier==255)?"——":Number(nowdoing.page-1)*Number(nowdoing.rp)+Number(i)+1);
                v.num=Number(i)+1+pagingPart.rp*(data.page-1);
                v.simg=function(){
                    if(v.headImage==null||v.headImage==""){
                        return localPath.defaultimg+"defaultIco.png"
                    }else{
                        return  dataport.headimg+v.headImage
                    }   
                }()
                v.classNum=classObj[v.classId]
                v.summoner=(v.summoner=="")?"——":v.summoner
                v.self=(v.studentId==mybaseInfo.studentId)? "self":""
                v.sex1=(v.sex)?"male":"famale";
                v.dan=rank.rankFunc(v.tier,v.queue)
                v.schange=function(){
                    var d=v.frontIndex-v.nowIndex;
                    var schange={}

                    schange.d=d;
                    if(v.tier!=255){
                        if(d>0){schange.up="block"};
                        if(d==0){schange.nc="block"};
                        if(d<0){schange.down="block"};    
                    }
                    if(v.tier==255){schange.no="block"};
                    return schange
                }()               
            rows.push(v)
        }
        // console.log(rows)
        return rows  
    },//rank
    function(data){
        var rows=[]
        for(var i in data.rows){
            var v=data.rows[i]
                v.summoner=(v.summoner=="")?"——":v.summoner

                v.dindex=v.nowAbility-v.oldAbility //排名变化
                v.num=v.index;
                v.classNum=classObj[v.classId]
                v.simg=function(){
                    if(v.studentHeadImage==null||v.studentHeadImage==""){
                        return localPath.defaultimg+"defaultIco.png"
                    }else{
                        return  dataport.headimg+v.studentHeadImage
                    }   
                }()
                v.sex1="hidden"             
                v.dan=rank.rankFunc(v.tier,v.queue)  
            rows.push(v)
        }
        return rows
    },//count
    function(data){
        var rows=[]
        for(var i in data.data){
            var v=data.data[i]
                v.num=v.rank;
                v.urate=numlen(v.use_ratio)
                v.wrate=numlen(v.win_ratio)
                v.kda1=(v.kda/100).toFixed(1)

                v.k_d_a=trans_k_d_a(v.avg_k_num,v.avg_d_num,v.avg_a_num)
                v.creeps=(v.minions_killed_per_min/100).toFixed(2)
                v.money=(v.gold_earned_per_min/100).toFixed(2)

                v.champion=function(){
                    var id=v.champion_id
                    var c={}
                        c.img=localPath.championimg+lolObj[id].img
                        c.name=lolObj[id].name
                        c.id=id
                        return c
                }()                
            rows.push(v)
        }
        return rows
    } //champion
]


var areas=areaArr
areas.unshift({"version":0,"id":"","name":"全部","code":"","net":""});

var pagingPart={
    show:false,
    rp:10,
    page:1,
    total:0,
    type:'rc',
    url:portpart.rc,
}
pagingPart.pages=pagesFunc(pagingPart.rp,pagingPart.total)


function pagesFunc(a,b){
    return Math.ceil(Number(b)/Number(a))
}
function colorphone(){

    mainApp.controller('color_phone',function($scope, $http ,$sce) {
        $scope.phonepart=phonepart;
        $scope.areas=areas;
        $scope.nowarea=areas[0]
        $scope.areaSelectShow=false

        $scope.pagingPart=pagingPart

        $http.get(portpart.gwt).success(function(response) {
            $scope.rows=phoneTrans[0](response)
        });
        $scope.phonec1=function(a,d){
            phonepart.nowport=d
            $http.get(portpart[d]).success(function(response) {
                $scope.rows=phoneTrans[a](response)
                if(a==1){
                   pagingPart.total=response.total
                   if(pagingPart.total>pagingPart.rp){
                        pagingPart.show=true
                        pagingPart.page=1
                        pagingPart.pages=pagesFunc(pagingPart.rp,pagingPart.total)  
                   }
                }else{
                    pagingPart.show=false 
                    pagingPart.total=0
                }
                //console.log(pagingPart)
                phonepart.top3Ico=true;
                $scope.pagingPart=pagingPart
            });
            phonepart.tab.show=(function(){
                var b=[0,0,0,0,0,0,0,0,0,0,0];
                for(var i in tabObj[a]){
                    b[tabObj[a][i]]=1
                }
                return b
            })()
            phonepart.c1.css=function(){
                var b=[0,0,0,0]
                    b[a]=1
                return b
            }()
            phonepart.c2.show=function(){
                var b=[0,0,0,0]
                    b[a]=1
                return b
            }()
            phonepart.c2.child=[{css: [1, 0, 0,0,0]}, {css: [1, 0]}]

            $scope.phonepart=phonepart;
        }
        $scope.phonec21=function(a,b,c,d){
            //console.log(phonepart.iftop)
            if(a=="champion"){
                phonepart.nowport="champion"
                phonepart.c2.child[0].css=function(){
                    var css=[0,0,0,0,0]
                        css[b]=1
                        // console.log(css)
                    return css
                }()
                var b=[1,0,1,0,0,0,0,0,0,0,0]
                    b[c]=1
                phonepart.tab.show=b
                $scope.rows.sort(function(a,b){
                    return Number(b[d])-Number(a[d])
                })
                for(var i in $scope.rows){
                    $scope.rows[i].num=Number(i)+1;
                }
            }else{
                phonepart.nowport=c
                var url=portpart[c]
                // console.log(url)
                $http.get(url).success(function(response) {
                    //console.log(phoneTrans[b](response))
                    $scope.rows=phoneTrans[b](response)
                    if(c=="rc"||c=="rs"){
                        // console.log(c)
                        pagingPart.type=c;
                        pagingPart.url=portpart[c];
                        pagingPart.page=1
                        pagingPart.total=response.total
                        pagingPart.pages=pagesFunc(pagingPart.rp,pagingPart.total)
                        // console.log(pagingPart)

                    }
                });   
                phonepart.c2.child[0].css=function(){
                    var b=[0,0,0,0,0]
                        b[a]=1
                    return b
                }() 
            }
            phonepart.c2.child[1].css=[1, 0];
            $scope.nowarea=areas[0];

            phonepart.top3Ico=true; 
            $scope.phonepart=phonepart;
        }
        $scope.phonec22=function(a,b){
            var urlstr=(a==0)?phonepart.nowport:phonepart.nowport.replace(/t$/,"l")
            
            // console.log(urlstr)
            var url=portpart[urlstr]
            $http.get(url).success(function(response) {
                //console.log(phoneTrans[b](response))
                $scope.rows=phoneTrans[b](response)
            });
            phonepart.c2.child[1].css=function(){
                var b=[0,0,0,0,0]
                    b[a]=1
                return b
            }()
            phonepart.top3Ico=(a==0)?true:false;
            $scope.phonepart=phonepart;
        }
        $scope.areasShow=function(){
            $scope.areaSelectShow=!$scope.areaSelectShow
        }
        $scope.areaSelectFunc=function(a){
            $scope.areaSelectShow=false;
            $scope.nowarea=a;

            
            var url=portpart[phonepart.nowport]+"?areaCode="+a.id
            $http.get(url).success(function(response) {
                $scope.rows=phoneTrans[1](response)
                pagingPart.page=1;
                pagingPart.pages=pagesFunc(pagingPart.rp,response.total)
                if(pagingPart.pages<2){
                   pagingPart.show=false 
                }else{
                    pagingPart.show=true 
                }
                $scope.pagingPart=pagingPart
            });
        }

        $scope.pagesChange=function(){
            pagingPart.page=Number(pagingPart.page.replace(/\D/gi,''));
            if(pagingPart.page>pagingPart.pages) pagingPart.page=pagingPart.pages;
            if(pagingPart.page<1) pagingPart.page=1;
        }

        $scope.goPage=function(page,add,type,area){
            //console.log(page)
            //console.log(areaCode)
            var url=portpart[type]+"?page="+page
            if(area!=undefined){
                url=portpart[type]+"?page="+page+"&areaCode="+area.id
            }

            $http.get(url).success(function(response) {
                $scope.rows=phoneTrans[1](response)

                pagingPart.page=pagingPart.page+add
                if(pagingPart.page==0){
                    pagingPart.page=1  
                }
                if(pagingPart.page>pagingPart.pages){
                    pagingPart.page=pagingPart.pages  
                }
                 $scope.pagingPart=pagingPart;

                document.documentElement.scrollTop = document.body.scrollTop =0;
            });        
        }
    });  
} 


