$(function(){
//ajax
	$.ajax({
	    url: 'http://school.iboom.tv/cs/data.json?'+Math.random(),
	    type: 'post',
	    dataType: "json",
	    data: {

	    },
	    success: function (returndata) {
	        var data = returndata["data"];//获取json返回值的data属性
	        var msg = returndata["msg"];//获取json返回值的msg属性
	        console.log(data);
	        $("#lx_main").append(
	            "<div>111</div>"
	        );
	        console.log(data[0]["url"]);
	    }
	});
});