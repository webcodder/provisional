/*
 *Author:liaohs
 *Date:2016.1.19
 *Name:boomgame
 */
var infobase={}
var infobaseNames=["studentNum", "areaCode","areaName","summoner","tier","queue","winPoint","ageRange","sex","region","phone","desireWay"]

//watchFunc.iflogined()

 var firstSubmit=sessionStorage.firstSubmit

 var page2;
 var firstSubmitFunc;
mainApp.controller('color',function($scope, $http,infos) {
 	$scope.lolareas=areaArr;
 	$scope.ages=ages;
 	$scope.lolroles=lolroleArr
 	$scope.ps=transp(pJudge);
 	$scope.submitreq=false
	$http.get(dataport.userStatue,{contentType: 'application/json;charset=UTF-8',datatype:"json"})
     .success(function(response) {
     	if(!response.fload){
          $scope.studentNum=response.auth.studentNum
          $scope.className=response.boomClass.className
          infobase.studentNum=response.auth.studentNum	
	    }else{
	     	window.location.href="class-notice.html"
	    }    

     });

 	$scope.li1select=function(target){
 		var val=target.getAttribute("data-li-val")
 		var id=target.getAttribute("data-li-id")
 		var code=target.getAttribute("data-li-code")
 		var lifor=target.getAttribute("data-li-for")
 		var name=target.getAttribute("data-li-name")

 		$("#"+id).val(val)
 		$("#"+id).attr("data-li-id",code)
 		$("#"+id).attr("data-li-name",val)

 	}
 	$scope.pselect=function(target){
 		var val=target.getAttribute("data-li-val");
 		var id=target.getAttribute("data-li-id")
 		var lifor=target.getAttribute("data-li-for")
 		$scope.province=val
 		$scope.cs=cityArr[val]
 		$scope.city=cityArr[val][0]
 	}
 	$scope.cselect=function(target){
 		var val=target.getAttribute("data-li-val");
 		$scope.city=val
 	}

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        // 渲染完成后执行
	    $(".cselect").click(function(e){
	 		$(".ulp1").show()
	 		$(".ulp2").hide()
	    	//stopFunc(e)
	    })
    });

    






    $scope.formInfos={
        mostWantStudyChampions:{},
        mostWantFunction:{}
    }
    $scope.champions=angular.copy(lolArr) 
    $scope.selectChampionStudy=function(item){
        item.selected=!item.selected
        
        if(!item.selected){
        	delete $scope.formInfos.mostWantStudyChampions[item.id]
        }

    }

    $scope.removeChampionStudy=function(item,filed){
    	item.selected=!item.selected
    	delete $scope.formInfos.mostWantStudyChampions[item[filed]]
    }

    $scope.firstSubmit=firstSubmit

    $scope.mostWantStudyChampionsShow=false

	$scope.championsStudy=function(){
		var arr=[]
		for(var i in $scope.champions){
			var item=$scope.champions[i]
			if(item.selected){
				arr.push(item)
			}
		}
		return arr
	}

	$scope.page2=false

    $scope.nextFunc=function(){

    	// if(!firstSubmit){
    	// 	if($scope.championsStudy().length>0){

    	// 		
    	// 	}
    	// }else{
    	// 	$scope.page2=true
    	// }
    	// console.log(2)
		$("#page1").addClass("ng-hide")
		$("#page2").removeClass("ng-hide")
    	$scope.page2=true
    	$scope.mostWantStudyChampionsShow=true

    }

    $scope.$watch("firstSubmit",function(n,o){


    	// console.log(n)
    })
    $scope.$watch("page2",function(n,o){


    	// console.log(n)
    })

    $scope.prevFunc=function(){
    	$scope.page2=false
    }

    $scope.infos=infos



    $scope.mostWantFunction=function(item){
        item.selected=!item.selected
        if(!item.selected){
        	delete $scope.formInfos.mostWantFunction[item.val]
        }
    }

    // secoundSubmit
    $scope.secoundSubmit=function(){


    	var mostWantStudyChampions=[]
    	for(var i in $scope.formInfos.mostWantStudyChampions){
    		mostWantStudyChampions.push({mostWantChampionId:i})
    	}
    	var mostWantFunction=[]
    	for(var i in $scope.formInfos.mostWantFunction){
    		mostWantFunction.push({function:i})
    	}
    	var playTime=$scope.formInfos.playTime
    	var maxTier=$scope.formInfos.maxTier
    	var everyWeekTimes=$scope.formInfos.everyWeekTimes
    	var mainPurpose=$scope.formInfos.mainPurpose

    	if(mostWantStudyChampions.length>0&&mostWantFunction.length>0&&playTime!=undefined&&maxTier!=undefined&&everyWeekTimes!=undefined&&mainPurpose!=undefined){
    		var data={
    			mostWantStudyChampions:mostWantStudyChampions,
    			mostWantFunction:mostWantFunction,
    			playTime:playTime,
    			maxTier:maxTier,
    			everyWeekTimes:everyWeekTimes,
    			mainPurpose:mainPurpose

    		}

    		firstSubmitFunc(page2,secoundfn)


    		function secoundfn(){

	    		$http.post(dataport.secoundSubmit,data,{datatype:"json"})
	    		.success(function(data){
	    			// console.log(data)
	    			if(!data.error){
	    				window.location.href="class-notice.html"
	    				
	    			}
	    		})
	    		.error(function(e){})
    		}
    	}



    }


 })
.value("infos",{
	playTime:["500场以下","500到1000场","1000到2000场","2000到3000","3000以上"],
	mostWantFunction:[
	{val:"帮助学生打晋级赛的生死局（BO5的2胜2负或者BO3的1胜1负）"},
	{val:"英雄视频教学库，方便学生去搜索想学习的英雄"},
	{val:"实时对局技巧，每局游戏开局之前会提示你对线英雄的技巧和要点（放在学院盒子上）"},
	{val:"问答系统，学生的问题老师们都可以看到进行回答，相同的问题直接可以搜索到老师回答过的答案 "}],
	everyWeekTimes:[
	"小于20场",
	"20-40场",
	"40-60场",
	"大于60场"
	],
	maxTier:[
	{tier:255,val:"无段位"},
	{tier:5,val:"青铜"},
	{tier:4,val:"白银"},
	{tier:3,val:"黄金"},
	{tier:2,val:"铂金"},
	{tier:1,val:"钻石"},
	{tier:6,val:"超凡大师"},
	{tier:0,val:"最强王者"}
	]
})

.filter("result",function(){
	return function(data){
	    if(angular.isArray(data)){
	        var result=[]
	        for(var i in data){
	            if(data[i].selected) result.push(data[i])
	        }
	        return result
	    }
	    return data;
	}
})
.filter("limit",function(){
    return function(data,len){
        if(angular.isArray(data)){
            var count=0
            for(var i in data){
                if(data[i].selected) count++;
            }
            if(count>=len){
                for(var i in data) if(!data[i].selected) data[i].disabled=true;
            }else{
                for(var i in data) data[i].disabled=false;
            }
            return data
        }else{
            return data
        }
    }
})
.filter("checkResult",function(){
    return function(data,type){
        if(angular.isArray(data)&&angular.isString(type)){
            var result=[]
            for(var i in data){
                if(data[i].selected) result.push(data[i][type]);
            }
            return result
        }else{
            return data
        }
    }
})
.filter("indexFilter",function(){
    return function(data,arr,info){
        if(angular.isArray(data)&&angular.isArray(arr)&&angular.isString(info)){
            var result=[]
            var pattern=new RegExp(info,'gi')
            for(var i in data){
                var item=data[i]
                var stringObj=''
                for(var i1 in arr){
                    stringObj+=item[arr[i1]];
                    stringObj+="/";
                }
                if(stringObj.match(pattern))  result.push(item);
            }
            return result
        }else{
            return data
        }  
    }
}) 



function transp(data){
	var a=[]
	for(var i in data){
		var b={};
		b.key=i;
		b.val=data[i];
		a.push(b)
	}
	return a
}


$(document).ready(function() {
	$("body").click(function(e){
		$("[data-ul-id]").hide()
		 $(".ulp1").show()
 		 $(".ulp2").hide()
	})

	var sexlabel=$("#group-sex").find("label")
	sexlabel.click(function(){
		var radio=$(this).find('[type="radio"]')
		var sex=radio.attr("data-sex")
		$("#sex-required").html("")
		//console.log(sex)
		$("#group-sex").attr("sex",sexObj[sex] )

	})
	$("#group-summoner").change(function(){
		// firstSubmitFunc()

	})

	firstSubmitFunc=function(page2,fn){
		// $('[data-group-id="group-summoner"]').attr("exist","undefined")
		$("#g-rank").html("");
		$("#g-win").html("")
		$("#g-dian").hide()

		var _him=$("#group-submit")
		var ff=new form.func(page2)
		ff.submit(_him,fn)

	}

	$("[data-p-required]").html("")
	$("#group-submit").click(function(){		
		// var _him=$(this)
		// var ff=new form.func()
		// ff.submit(_him)
		// console.log(_him)
	})
	$("[data-btn]").click(function(e){
		var _him=$(this)
		var ff=new form.func()
		ff.databtn(_him,e)
	})

	$("#group-mobile").keyup(function(){
		$('[data-group-id="group-mobile"]').find('[data-p-required]').html("")
		infobase.phone=""

	})



    $(".pselect").click(function(e){

 		 $(".ulp1").hide()
 		 $(".ulp2").show()
    	stopFunc(e)
    })

    $("#summoner-check").click(function(){
    	$("#group-summoner-required").html("")
    	var url=dataport.floginsummoner;
    	var a=$("#group-lol-area").attr("data-li-id")
    	var s=$("#group-summoner").val()

    	//console.log(a)
    	//console.log(s)
    	if(a==undefined){
    		$("#group-summoner-required").html("请选择大区")
    		return
    	}
    	if(s==""){
    		$("#group-summoner-required").html("请输入召唤师")
    		return
    	}else{
    		floginsummoner(url,a,s)
    	}
    })

})

function floginsummoner(url,a,s,fn) {
		// infobase.summoner=""
		// infobase.tier=""
  //       infobase.queue=""
  //       infobase.winPoint=""

    // 召唤师检测
    $.ajax({ 
        url: url,
       
        timeout: publicFunc.time,
        type:"POST",
        //提交的数据
        data:{areaCode:a,summoner:s},
        // contentType: 'application/json;charset=UTF-8',
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend:function(){
        	$("#group-summoner-required").html("正在检测...")
        	
        },
        //成功返回之后调用的函数             
        success: function(data) {
        	if(data.error){
        		$("#group-summoner-required").html(data.msg)
        		$('[data-group-id="group-summoner"]').attr("exist","no")

        	}else{
        		$("#group-summoner-required").html("")
        		var tier=data.attachment.tier;
        		var queue=data.attachment.queue;
        		var winPoint=data.attachment.winPoint;
        		var rankinfo=rank.rankFunc(tier,queue)
        		$("#g-rank").html(rankinfo);
        		$("#g-win").html(winPoint)
        		$("#g-dian").show()
        		$('[data-group-id="group-summoner"]').attr("exist","yes")
        		infobase.summoner=data.attachment.name
        		infobase.tier=tier
        		infobase.queue=queue
        		infobase.winPoint=winPoint
        		if(winPoint==null||winPoint==""||winPoint==undefined){
        			infobase.winPoint="0"
        		}
        		// console.log(infobase)

        	}
        	
          // console.log(data)
        },
            complete: function(XMLHttpRequest, textStatus){
               //console.log(XMLHttpRequest.responseText);
               //console.log(textStatus);
                //HideLoading();
            },
        error: function(request) {
            alert("提交失败")
        }
    }, "json");

    // 召唤师检测
}

var form={}

	form.id="data-form-id";
	form._id="[data-form-id]";
	form.gid="data-group-id";
	form._gid="[data-group-id]";
	form.gtype="data-group-type";
	form._gtype="[data-group-type]";
	form.ginfo="data-group-info";
	form._ginfo="[data-group-info]";
	form._greq="[data-p-required]"

	form.reqo={
		select:"您没有选择",
		in:"您没有输入",
		radio:"您没有选择",
	}

	form.groups=(function(){
		var dg=$(form._id).find(form._gid)
		var o={}
		var reqo=form.reqo

		for(var i=0; i<dg.length ; i++){
			var k=dg.eq(i).attr(form.gid)
			var v={};
				v.id=k
				v.type=dg.eq(i).attr(form.gtype)
				v.info=dg.eq(i).attr(form.ginfo)
				v.req=reqo[v.type]+v.info
			  o[k]=v
		}
		return o

	})();


	form.func=function(page2,fn){
			

		function topage1(){
			$("#page1").removeClass("ng-hide")
			$("#page2").addClass("ng-hide")
		}

		this.submit=function(him,fn){
			//console.log(2)
			$(form._greq).html("")
			//console.log(form.groups)
			// infobase.summoner=""
			for(var i in form.groups){
				var v=form.groups[i]
				var fg=$("[data-group-id='"+i+"']")
				var inputs=fg.find("input[data-type='select']")
				var inputin=fg.find("input[data-type='in']")
				var inputr=fg.find("input[data-type='radio']")

				
				//console.log(inputin.attr("placeholder"))
				if(inputs.val()==""){
					fg.find(form._greq).html(v.req)
					topage1()
					return
				}

				if(inputin.val()==""){
					fg.find(form._greq).html(v.req)
					topage1()
					return
				}else{
					if(i=="group-mobile"){ 
						var mobile=$("#group-mobile").val()
						if(!/^(1)\d{10}$/i.test(mobile)){
							fg.find(form._greq).html("请填写正确的手机号码")
							topage1()
							return
						}else{
							infobase.phone=mobile
						}

					}
					if(i=="group-sex"){
						var sex=$("#group-sex").attr("sex")
						if(sex==undefined){
							fg.find(form._greq).html("请选择性别")
							topage1()
							return
						}
					}
					if(i=="group-summoner"){
						var exist=$('[data-group-id="group-summoner"]').attr("exist")
						//console.log("exist:"+exist)

						// console.log(exist)
						if(exist==undefined){
							$("#group-summoner-required").html("请先检测召唤师")
							topage1()
							return

						}
						if(exist=="no"){
							$("#group-summoner-required").html("请先检测召唤师")
							topage1()
							return
						}
						if(exist=="yes"){
							infobase.summoner=$("#group-summoner").val()
						}
					}

				}


			}
			
			infobase.areaCode=$("#group-lol-area").attr("data-li-id")
			infobase.areaName=$("#group-lol-area").val()
			infobase.ageRange=$("#group-age").val()
			infobase.sex=$("#group-sex").attr("sex")
			infobase.region=$('[data-ul-id="group-china-area"]').attr("region")
			infobase.desireWay=$("#group-position").attr("data-li-name")
		


			//console.log(infobase)
			// var infolen=0
			// for(var i in infobaseNames){
			// 	var i1=infobaseNames[i]
			// 	var v=infobase[i1]
			// 	 console.log(i1)
			// 	 console.log(v)
			// 	if(v!=null&&v!="undefined"&&v!=""){
			// 		console.log(v)
			// 		 infolen+=1
			// 	}
			// }


			//console.log("infobaseNames.length"+infobaseNames.length)
			//console.log("infolen"+infolen)
			//console.log(infobase.length)
			//console.log(infobase)
			// console.log(infobase)
			// console.log(infobase.summoner)
			// console.log(infobaseNames)
			// console.log(infolen)
			// console.log(infobaseNames.length)
			//if(infolen==infobaseNames.length){
				// console.log("ok")
				var data=infobase
				// console.log(data)
				var url= dataport.floginsubmit
				

				floginsubmit(url,data,fn)
			//}
		}
		this.databtn=function(him,e){
			var dg=him.parents(form._gid)
			var dgi=dg.attr(form.gid)
			var dgt=dg.attr(form.gtype)
			var dgf=dg.attr(form.ginfo)
			// console.log(dgi)
			// console.log(dgt)
			// console.log(dgf)
			dg.find(form._greq).html("")
			$("[data-ul-id]").hide()
			$("[data-ul-id='"+dgi+"' ]").show()
			stopFunc(e)
		}
	}



function floginsubmit(url,data,fn) {

	// console.log(data)
	data.summoner=$("#group-summoner").val()
	// console.log(data)
	// return 
  //提交
    $.ajax({
        url: url,       
        timeout: publicFunc.time,
        type:"POST",
        //提交的数据
        data:data,
        // contentType: 'application/json;charset=UTF-8',
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend:function(){
        	$(".btnafter1").show()
        	$(".btnafter2").hide()
        	
        },
        //成功返回之后调用的函数             
        success: function(data) {
        	if(data.error){
 				// console.log(data.msg)
 				$("#group-summoner-required").html(data.msg)
 				$(".btnafter1").hide()
        		$(".btnafter2").hide()

        	}else{




        		actionObj.actionName="补填"
        		try{BOOMLogging.Action(actionObj)}catch(e){}
        		
        		// console.log(data)
	        	firstSubmit=true 
	        	sessionStorage.firstSubmit=true
				$("#page1").addClass("ng-hide")
				$("#page2").removeClass("ng-hide")

				// alert("tijiaochengong")


    $.ajax({
        url: dataport.mybaseInfo,       
        timeout: publicFunc.time,
        type:"get",
        contentType: 'application/json;charset=UTF-8',
        datatype:"json",
        success: function(data) {
        	// console.log(data)
        	// alert(data)
            if(data.baseInfo.student.headImage==null){
                data.baseInfo.student.headimg=localPath.defaultimg+"defaultIco.png"
            }else{
                data.baseInfo.student.headimg=dataport.headimg+data.baseInfo.student.headImage
            }
        	localStorage.setItem("myLoginInfo",JSON.stringify(data.baseInfo.student)) 
        	// alert("cuncuchenggong")


        	 // window.location.href="class-notice.html"
        	 fn()
        },
        error:function(e){
        	alert(e.msg)
        }

       }) 


        		// 
        	}
        	
           //console.log(data)
        },
            complete: function(XMLHttpRequest, textStatus){
               //console.log(XMLHttpRequest.responseText);
               //console.log(textStatus);
                //HideLoading();
            },
        error: function(request) {
            // console.log(request);
        	$(".btnafter1").hide()
        	$(".btnafter2").show()

        }
    }, "json");
}	








	
