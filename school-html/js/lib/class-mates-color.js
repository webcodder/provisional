 /*
 *Author:liaohs
 *Date:2016.1.11
 *Name:boomgame
 */


 var mates_init=[];
 var newmates=[];
 mainApp.controller('color',function($scope, $http) {
     $http.get(dataport.classmates,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
         .success(function(response) {
            $scope.mates = transdata(response); 
            var matesInit   = transdata(response); 
            $scope.areas = areaSelect(response);
             mates_init =  Analysis(matesInit )
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
    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行

        $(".tharea").change(function(){
             var a=$(this)
             var aid=a.find("option:selected").attr("areaid");
             $scope.mates=mates_init[aid];
        })
    });
 });

$(".areabtn").click(function(e){
    var x=e.clientX;
    var y=e.clientY;
    var ox=$(this).offset().left;
    var oy=$(this).offset().top;
    $(".areaul").css({
        left:ox,
        top:oy+35
    })
})

function Analysis(data){
    var a={}
    a.all=data;
    areaArr.forEach(function(v,i){
        a[v.id]=[]
        data.forEach(function(v1,i1){
            if(v1.area!=null){
                if(v1.area.id==v.id){
                    a[v.id].push(v1)
                }
            }
        })

    })
    return a
}


function transdata(data,area){
    var mates=[];
    data.forEach(function(v, i) {
        var mate = v;
            mate.sex=(function(){
                return (mate.sex)?"icon-symbol-male bg-success":"icon-symbol-female bg-danger"; 
            })() /*性别*/
            mate.remark=(function(){
                return (mate.remark!=null)?mate.remark:"未签名"; 
            })() /*签名*/

            if(mate.region!=null){
                mate.province=(mate.region).split("_")[0];
                mate.city=(mate.region).split("_")[1];
                if(mate.city==null){
                    mate.city="-"
                }
            }
            mate.area=areaObj[mate.areaCode]
            
            mate.change=matechange(mate.frontIndex,mate.nowIndex,mate.tier);
            mate.rank=rank.rankFunc(mate.tier,mate.queue);
            if(mate.nowIndex==0){
                mate.nowIndex="-"
            }
            if(mate.summoner==""){
                mate.summoner="-"
            }

            mate.headimg=function(){
                if(mate.headImage==null||mate.headImage==""){
                    return localPath.defaultimg+"defaultIco.png"
                }else{
                    return  dataport.headimg+mate.headImage
                }
                
            }()

        mates.push(mate)
    })
    return mates;
}

function areaSelect(data){
    var a=[];
    data.forEach(function(v, i) {
        if(v.areaCode!=null){
            a.push(v.areaCode)
        }
    })
    var b=[]
    a.forEach(function(v, i) {
        b[v]=i
    })
    var c=[];
    b.forEach(function(v, i) {
        c.push(i)
    }) 
    var d=[]
    c.forEach(function(v, i) {
        d.push(areaObj[v])
    }) 

    return d

}
function matechange(f,n,t){ //排名改变
    var change={};
    if(f>n) {
        change.color="text-success";
        change.fa="fa  fa-long-arrow-up";
        change.num=f-n;
        return change
    };
    if(f<n) {
        change.color="text-danger";
        change.fa="fa  fa-long-arrow-down";
        change.num=n-f;
        return change
    };
    if(f==n||t==255) {
        change.color="";
        change.fa="";
        change.num="-";
        return change
    }

}



