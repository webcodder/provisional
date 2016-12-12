 /*
  * Author:liaohs
  * Date:2016.3.16
  * Name:boomgame
  */



mainApp.controller('color',["$scope" ,"$http" ,"ajax",function($scope,$http,ajax) {

/* ===============================
	获取生死局服务有没有打开*/
ajax.jsonp(
    dataport.ssjIsOpen+"?callback=JSON_CALLBACK",
    function(data, status, header, config){
      console.log(data)
      try{

      	$scope.ssjIsOpen=data.data.ok
      }catch(e){}
    },
    function(err){
      console.log(err)
    }
  )

}])




