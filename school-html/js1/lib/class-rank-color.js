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

var pcpart=document.getElementById("pc")


 var mates_init=[];
 var newmates=[];
 var init_ref="?rp=30&page=1"
 var init_port=dataport.rank_class; //默认班级排行榜
 var rankports={
    "class":dataport.rank_class,
    "school":dataport.rank_school,
 }


var classObj={
    "1":"1",
    "2":"2",
    "3":"3",
    "6":"4",
    "7":"5"
}

 var  mybaseInfo={
        studentId:htmlref.split("&")[0].split("?")[1],
        nowIndex:htmlref.split("&")[1]
 }
$(".nowindex b").html(mybaseInfo.nowIndex)


 var ports={
    rank:dataport.rank_class,
    grow:dataport.grow_week,
    count:dataport.count_week,
    champion:dataport.champion,
    //control1

    rank_class:dataport.rank_class,
    rank_school:dataport.rank_school,

    grow_week:dataport.grow_week,
    grow_month:dataport.grow_month,
    grow_quarter:dataport.grow_quarter,

    count_week:dataport.count_week,
    count_month:dataport.count_month,
    //control2

    last10:{
        grow:"?sortorder=asc&sortname=ability_change",
        count:"?sortorder=asc&sortname=own_s_count"
    }
    // control3
 }


var nowdoing={ 
    name:"rank",
    type:"rank_class",
    rp:30,
    page:1,
    areaCode:""
}   
    nowdoing.port=ports[nowdoing.type]

 mainApp.controller('color',function($scope, $http ,$sce) {
    $scope.areas=areaArr;
    $http.get(init_port+init_ref).success(function(data) {
        $(".paging").addClass("hidden")
        $scope.rows=trans.rank(data) 
        trans.nav(data)
    });
    $scope.tocanvas =function(target){
        var to=target.getAttribute("for");
        $(".canvas").not("#"+to).addClass("hidden")
        var toclass=$("#"+to).attr("class");
        if(toclass.indexOf("hidden")>-1){
            $("#"+to).removeClass("hidden")

            getdata(("#canvas"+to),to)

        }else{
            $("#"+to).addClass("hidden")
        }       
     }

     $scope.control1=function(target){
        var boom=target.getAttribute("boom")
        var url = ports[boom];
        if(boom!="rank"){
            $(".paging ").hide()
        }else{
            $(".paging ").show()
            url = ports[boom]+init_ref;
            nowdoing.name="rank";
            $(".thsc").show()
        }      
        $http.get(url).success(function(data) {    
            $scope.rows=trans[boom](data) 
            if(boom=="rank")  trans.nav(data);                                    
        },setTimeout(function(){
            change_tab(boom)
        },500));
     }//control1
    $scope.control2=function(target){
        var boom=target.getAttribute("boom")
        var boom1=boom.split("_")[0]
        var boom2=boom.split("_")[1]

        var url = ports[boom]; 

        if(boom1=="rank"){
            nowdoing.port=ports[boom]          
            nowdoing.page=1;
            nowdoing.areaCode=""
            nowdoing.type=boom
            //console.log(nowdoing)
            if(boom2=="class"){
                $(".thsc").show()
            }

            $("#lolarea").html("全部")
            $http.get(url).success(function(data) {    
                $scope.rows=trans[boom1](data) 
                trans.nav(data);                                    
            },setTimeout(function(){
                
                if(boom2=="class"){
                    $(".tdsc").show()
                }
                if(boom2=="school"){
                    $(".thsc,.tdsc").hide()
                    
                }
            },500));
        }else{
            $http.get(url).success(function(data) {    
                $scope.rows=trans[boom1](data) 
                                                  
            },setTimeout(function(){
                change_tab(boom1)
            },500));  
        }
    }//control2

    $scope.control3=function(target){
        var boom=target.getAttribute("boom")
        var boom1=boom.split("_")[0]
        var boom3=boom.split("_")[2]
        var url = ports[boom1]; 
        if(boom3=="last10"){
            url+=ports.last10[boom1]
        }
        $http.get(url).success(function(data) {    
            $scope.rows=trans[boom1](data,boom3) 
                                              
        },setTimeout(function(){
            change_tab(boom1)
        },500));  
    }//control3

     $scope.areachange=function(target){
        $(".paging").addClass("hidden");
        var areaCode=target.getAttribute("area-id")
        var ref=init_ref+"&areaCode="+areaCode
        nowdoing.areaCode=areaCode
        //console.log(nowdoing)
        $scope.rows=[];
        $http.get(nowdoing.port+ref).success(function(data) {
            $scope.rows=trans.rank(data) 
             trans.nav(data)
        },setTimeout(function(){
                
                if(nowdoing.type=="rank_class"){
                    $(".tdsc").show()
                }
                if(nowdoing.type=="rank_school"){
                    $(".thsc,.tdsc").hide()
                    
                }
            },500));
     }//选择大区

    $scope.topage=function(target){
        var page = Number(target.getAttribute("page"))
            nowdoing.ref="?rp=30&page="+page+"&areaCode="+nowdoing.areaCode
        //console.log(nowdoing)
            nowdoing.page=page

        //console.log(page)   
        var h=$(".ranktab").height()
        // alert(h)
        $(".scrollfunc").animate({scrollTop:0},10)

        $http.get(nowdoing.port+nowdoing.ref).success(function(data) {
            $(".paging").addClass("hidden")
            $scope.rows=trans.rank(data) 
            trans.nav(data)
        },setTimeout(function(){
                
                if(nowdoing.type=="rank_class"){
                    $(".tdsc").show()
                }
                if(nowdoing.type=="rank_school"){
                    $(".thsc,.tdsc").hide()
                    
                }
            },500));   
    }//分页


    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行
        $(".tharea").change(function(){
             var a=$(this)
             var aid=a.find("option:selected").attr("areaid");
             $scope.mates=mates_init[aid];
        })

        $(".li3u>li").click(function(){
            $(".li3u>li").removeClass("in")
            $(this).addClass("in")
            var aid=$(this).attr("area-id")
            var val=$(this).html()
            $("#lolarea").attr("area-id",aid).html(val)
        })

        $(".control_1 li").click(function(){
            $(".control_1 li").removeClass("in")
            $(this).addClass("in")
            var i=$(this).index()
            $("#lolarea").attr("area-id","").html("全部")
            change_bg(i)
            //change_tab(boom)
        })
    });
 });


var trans={}
    trans.rank=function(data){

        var rows=[]
        for(var i in data.rows){
            var v=data.rows[i]
                v.dindex=v.frontIndex-v.nowIndex //排名变化
                
                v.num=(nowdoing.type=="rank_class")?((v.tier==255)?"——":v.nowIndex):((v.tier==255)?"——":Number(nowdoing.page-1)*Number(nowdoing.rp)+Number(i)+1);
      
                v.simg=function(){
                    if(v.headImage==null||v.headImage==""){
                        return localPath.defaultimg+"defaultIco.png"
                    }else{
                        return  dataport.headimg+v.headImage
                    }   
                }()
                v.numclass=(function(){
                    if(v.num==1){
                        return "top_1"
                    }
                    if(v.num==2){
                        return "top_2"
                    }
                    if(v.num==3){
                        return "top_3"
                    }
                })()
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
        return rows
    }//段位榜
    trans.grow= function(data,b){
        var rows=[]
        // console.log(b)
        for(var i in data.rows){
            var v=data.rows[i]
                v.dindex=v.nowAbility-v.oldAbility //排名变化
                v.summoner=(v.summoner=="")?"——":v.summoner;
                v.num=Number(i)+1;
                v.simg=function(){
                    if(v.studentHeadImage==null||v.studentHeadImage==""){
                        return localPath.defaultimg+"defaultIco.png"
                    }else{
                        return  dataport.headimg+v.studentHeadImage
                    }   
                }()
                v.classNum=classObj[v.classId]
                // v.sex1=(v.sex)?"male":"famale";
                v.numclass=(function(){
                    if(b!="last10"){
                        if(v.num==1){
                            return "top_1"
                        }
                        if(v.num==2){
                            return "top_2"
                        }
                        if(v.num==3){
                            return "top_3"
                        }
                    }

                })()
                v.olddan=rank.rankFunc(v.oldTier,v.oldQueue)
                v.nowdan=rank.rankFunc(v.nowTier,v.nowQueue)
                v.gchange=function(){
                    var d=v.nowAbility-v.oldAbility;
                    var gchange={}
                    gchange.d=d;
                    if(v.tier!=255){
                        if(d>0){gchange.up="block"};
                        if(d==0){gchange.nc="block"};
                        if(d<0){gchange.down="block"};    
                    }
                    if(v.tier==255){gchange.no="block"};
                    return gchange
                }()             
            rows.push(v)
        }
        return rows
    }
    // 成长榜

    trans.count= function(data,b){
        var rows=[]
        for(var i in data.rows){
            var v=data.rows[i]
                v.summoner=(v.summoner=="")?"——":v.summoner

                v.dindex=v.nowAbility-v.oldAbility //排名变化
                v.num=Number(i)+1;
                v.numclass=(function(){
                    if(b!="last10"){
                        if(v.num==1){
                            return "top_1"
                        }
                        if(v.num==2){
                            return "top_2"
                        }
                        if(v.num==3){
                            return "top_3"
                        }
                    }

                })()
                v.classNum=classObj[v.classId]
                v.simg=function(){
                    if(v.studentHeadImage==null||v.studentHeadImage==""){
                        return localPath.defaultimg+"defaultIco.png"
                    }else{
                        return  dataport.headimg+v.studentHeadImage
                    }   
                }()
                //v.sex1=(v.sex)?"male":"famale";             
                v.dan=rank.rankFunc(v.tier,v.queue)  
            rows.push(v)
        }
        return rows
    }
    // 场次榜

    trans.champion= function(data){
        var rows=[]
        for(var i in data.data){
            var v=data.data[i]

                v.num=v.rank;
                v.numclass=(function(){
                    if(v.num==1){
                        return "top_1"
                    }
                    if(v.num==2){
                        return "top_2"
                    }
                    if(v.num==3){
                        return "top_3"
                    }
                })()

                v.urate=numlen(v.use_ratio)
                v.wrate=numlen(v.win_ratio)
                v.kda1=(v.kda/100).toFixed(1)

                v.k_d_a=trans_k_d_a(v.avg_k_num,v.avg_d_num,v.avg_a_num)
                v.creeps=(v.minions_killed_per_min/100).toFixed(2)
                v.money=(v.gold_earned_per_min/100).toFixed(2)

                v.champion=function(){
                    var id=v.champion_id
                       
                    var c={}
                        try{
                            c.img=localPath.championimg+lolObj[id].img
                            c.name=lolObj[id].name
                            c.id=id
                        }catch(e){
                            console.log(e) 
                        }
                        return c
                }()                
            rows.push(v)
        }
        return rows
    }
    // 英雄榜

    trans.nav=function(data){
        var page=Number(data.page);
        var rp = 30;
        var total= Number(data.total);
        var pages=Math.ceil(total/rp);
        //console.log(total)
        //console.log(pages)
        if(pages>1) $(".paging").removeClass("hidden");

        var pagep=function(){
            if(page==1){
                return 1
            }else{
                return page-1
            }
        }()
        var pagen=function(){
            if(page==pages){
                return pages
            }else{
                return page+1
            }
        }()
        $(".pagecheck").val(page)
        $(".totalpage span").html(pages)
        $(".to_p,.to_n,.go_p").attr({
            rp:rp,
            pages:pages
        })
        $(".to_p").attr({page:pagep})
        $(".to_n").attr({page:pagen})
        $(".go_p").attr({page:page})
        
    }

function numlen(data){
    var a=(data/100).toFixed(2)+"%"
    return a
}//小数点两位

function trans_k_d_a(k,d,a){
    var k1=(k/100).toFixed(1)
    var d1=(d/100).toFixed(1)
    var a1=(a/100).toFixed(1)
    var kda="|"+k1+"/"+d1+"/"+a1
    return kda
}

$("#lolarea").parent().click(function(e){
    $(".li3uout").removeClass("hidden")
    stopFunc(e)
})
$("body").click(function(){
    $(".li3uout").addClass("hidden")
})

$(".pagecheck").keyup(function(){
    var a=$(this).val()
    var d=Number($(".totalpage>span").html())
    var b=(!isNaN(a))?a:1
    var c=(b>d)?d:b
    if(a=="") c=1
    $(this).val(c)
    $(".go_p").attr({
        page:c
    })
})


var grow_last_10="?sortorder=asc&sortname=ability_change";
var count_last_10="?sortorder=asc&sortname=own_s_count";

var rankObj={};
    rankObj.arr=["rank","grow","count","champion"];
    rankObj.info = {
        rank: [
            ["class", "school"],
            ["lolare"]
        ],
        grow: [
            ["week","month","quarter"],
            ["top10","last10"]
        ],
        count: [
            ["week","month"],
            ["top10","last10"]
        ],
        champion: []
    }
    rankObj.eq={
        rank:[0,1,2,3,4,5],
        grow:[0,1,2,3,6,7,8],
        count:[0,1,2,3,4,9],
        champion:[0,10,11,12,13,14,15],
        school:[0,1,2,3,4]
    }

    rankObj.c=".control";

    rankObj.addboom=(function(){
        for(var i in rankObj.arr){ 
            var k =rankObj.arr[i]
            var v= rankObj.info[k] 
            var v1=v[0]
            var v2=v[1]      
            $(".control_1>li").eq(i).attr("boom",k)
            $(".control_2>.rmli").eq(i).attr("boom",k)
            for(var i1 in v1){
               $(".control_2>.rmli").eq(i).find(".rmul1").eq(0).find(".rmli2").eq(i1).attr("boom",k+"_"+v1[i1])
            }
            for(var i2 in v2){
               $(".control_2>.rmli").eq(i).find(".rmul1").eq(1).find(".li3").eq(i2).attr("boom",k+"_"+v1[i1]+"_"+v2[i2])
            }

        }
    })();

function change_tab(boom){
    $(".rtheadtr th").addClass("hidden")
    $(".rtbodytr td").addClass("hidden")
    var max_eq=Math.max.apply(Math,rankObj.eq[boom])
    for(var i in rankObj.eq[boom]){ 
        var v=rankObj.eq[boom][i]
        $(".rtheadtr th").eq(v).removeClass("hidden")
        $(".rtbodytr").each(function(){
           $(this).find("td").eq(v).removeClass("hidden")  
        })
        //$(".rtbodytr td").eq(v).removeClass("hidden")    
    }
}

function change_bg(i){
    $(".control_2 .rmli").addClass("hidden")
    $(".control_2 .rmli").eq(i).removeClass("hidden")
    $(".rmul2 .rmli2").removeClass("in")
    $(".rmul2 .li3").removeClass("in")
    $(".rmul2").each(function(){
        $(this).find(".rmli2").eq(0).addClass("in")
        $(this).find(".li3").eq(0).addClass("in")
    })  
}

$(".rmli2").click(function(){
    $(this).addClass("in").siblings().removeClass("in")
    $(".rmul2 .li3").removeClass("in")
    $(".rmul2").each(function(){
        $(this).find(".li3").eq(0).addClass("in")
    }) 

})
$(".li3").click(function(){
    $(this).addClass("in").siblings().removeClass("in")
})
$('[boom="rank_class"]').click(function(){
    $(".nowindex").show()
})
$('[boom="rank_school"]').click(function(){
    $(".nowindex").hide()
})



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
    gwl:dataport.grow_week+"?sortorder=asc&sortname=ability_change",//g-w-last10
    gmt:dataport.grow_month,//g-m-top10
    gml:dataport.grow_month+"?sortorder=asc&sortname=ability_change",//g-m-last10
    gqt:dataport.grow_quarter,//g-q-top10
    gql:dataport.grow_quarter+"?sortorder=asc&sortname=ability_change",//g-q-last10
    //grow

    rc:dataport.rank_class,
    rs:dataport.rank_school,
    //rank

    cwt:dataport.count_week, //c-w-top10
    cwl:dataport.count_week+"?sortorder=asc&sortname=own_s_count", 
    cmt:dataport.count_month, //c-w-top10
    cml:dataport.count_month+"?sortorder=asc&sortname=own_s_count", 
    //count

    champion:dataport.champion, 
    //champion
}

var phoneTrans=[
    function(data){
    var rows=[]

        for(var i in data.rows){
            var v=data.rows[i]
                v.dindex=v.nowAbility-v.oldAbility //排名变化
                v.summoner=(v.summoner=="")?"——":v.summoner;
                v.num=Number(i)+1;
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
                    var d=v.nowAbility-v.oldAbility;
                    var gchange=[]
                    gchange.d=d;
                    if(v.tier!=255){
                        if(d>0){gchange=[true,false,false,false,]};
                        if(d==0){gchange=[false,true,false,false,]};
                        if(d<0){gchange=[false,false,true,false,]};    
                    }
                    if(v.tier==255){gchange=[false,false,false,true,]};
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
                v.num=Number(i)+1;
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


