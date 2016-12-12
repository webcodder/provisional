/*
 *Author:liaohs
 *Date:2016.1.19
 *Name:boomgame
 */
var infobase={}
var infobaseNames=["studentNum", "areaCode","areaName","summoner","tier","queue","winPoint","ageRange","sex","region","phone","desireWay"]

//watchFunc.iflogined()


 mainApp.controller('color',function($scope, $http) {
 	$scope.lolareas=areaArr;
 	$scope.ages=ages;
 	$scope.lolroles=lolroleArr
 	$scope.ps=transp(pJudge);
 	$scope.submitreq=false
	$http.get(dataport.userStatue)
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
 });



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
		$('[data-group-id="group-summoner"]').attr("exist","undefined")
		$("#g-rank").html("");
		$("#g-win").html("")
		$("#g-dian").hide()
		infobase.summoner=""
		infobase.tier=""
        infobase.queue=""
        infobase.winPoint=""

	})

	$("[data-p-required]").html("")
	$("#group-submit").click(function(){		
		var _him=$(this)
		var ff=new form.func()
		ff.submit(_him)
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

function floginsummoner(url,a,s) {
    $.ajax({
        url: url,
       
        timeout: publicFunc.time,
        type:"POST",
        //提交的数据
        data:{areaCode:a,summoner:s},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        beforeSend:function(){
        	$("#group-summoner-required").html("正在检测...")
        	
        },
        //成功返回之后调用的函数             
        success: function(data) {
        	if(data.error){
        		$("#group-summoner-required").html("召唤师不存在")
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
        		infobase.tier=tier
        		infobase.queue=queue
        		infobase.winPoint=winPoint
        		if(winPoint==null||winPoint==""||winPoint==undefined){
        			infobase.winPoint="0"
        		}

        	}
        	
          // console.log(data)
        },
            complete: function(XMLHttpRequest, textStatus){
               //console.log(XMLHttpRequest.responseText);
               //console.log(textStatus);
                //HideLoading();
            },
        error: function(request) {
            console.log(request);
        }
    }, "json");
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


	form.func=function(){
		

		this.submit=function(him){
			//console.log(2)
			$(form._greq).html("")
			//console.log(form.groups)
			infobase.summoner=""
			for(var i in form.groups){
				var v=form.groups[i]
				var fg=$("[data-group-id='"+i+"']")
				var inputs=fg.find("input[data-type='select']")
				var inputin=fg.find("input[data-type='in']")
				var inputr=fg.find("input[data-type='radio']")

				
				//console.log(inputin.attr("placeholder"))
				if(inputs.val()==""){
					fg.find(form._greq).html(v.req)
				}
				if(inputin.val()==""){
					fg.find(form._greq).html(v.req)


				}else{
					if(i=="group-mobile"){ 
						var mobile=$("#group-mobile").val()
						if(!/^(1)\d{10}$/i.test(mobile)){
							fg.find(form._greq).html("请填写正确的手机号码")
						}else{
							infobase.phone=mobile
						}

					}
					if(i=="group-sex"){
						var sex=$("#group-sex").attr("sex")
						if(sex==undefined){
							fg.find(form._greq).html("请选择性别")
						}
					}
					if(i=="group-summoner"){
						var exist=$('[data-group-id="group-summoner"]').attr("exist")
						//console.log("exist:"+exist)
						if(exist=="undefined"){
							$("#group-summoner-required").html("请先检测召唤师")

						}
						if(exist=="no"){
							$("#group-summoner-required").html("请输入正确的召唤师")
							
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
			console.log(infobase.summoner)
			// console.log(infobaseNames)
			// console.log(infolen)
			// console.log(infobaseNames.length)
			//if(infolen==infobaseNames.length){
				console.log("ok")
				var data=infobase
				var url= dataport.floginsubmit
				

				floginsubmit(url,data)
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

function floginsubmit(url,data) {
    $.ajax({
        url: url,       
        timeout: publicFunc.time,
        type:"POST",
        //提交的数据
        data:data,
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
 				console.log(data.msg)
 				//$("#group-summoner-required").html(data.msg)
 				$(".btnafter1").hide()
        		$(".btnafter2").hide()
        	}else{


        		actionObj.actionName="补填"
        		BOOMLogging.Action(actionObj)
        		window.location.href="class-notice.html"
        	}
        	
           //console.log(data)
        },
            complete: function(XMLHttpRequest, textStatus){
               //console.log(XMLHttpRequest.responseText);
               //console.log(textStatus);
                //HideLoading();
            },
        error: function(request) {
            console.log(request);
        	$(".btnafter1").hide()
        	$(".btnafter2").show()

        }
    }, "json");
}	



	
