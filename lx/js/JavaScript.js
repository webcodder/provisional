$(function(){
	$.ajax({
		url: "http://school.iboom.tv/cs/data.json?x=" + Math.random(),
		type: "post",
		scriptCharset: "gbk",
		dataType: "jsonp",//数据类型为jsonp
		jsonp: "callback",//服务端用于接收callback调用的function名的参数
		jsonpCallback: "jquery",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
		success: function(data,status,xhr){
			datalength = data.length;
			var str = "";
			for(var i = 0; i < datalength; i++) {
				str += 
				`
					<dd>
		                <ul>
		                    <li>${data[i]["position"]}</li>
		                    <li>${data[i]["className"]}</li>
		                    <li>${data[i]["key"]}</li>
		                    <li>
		                        <div class="lx_pic">
		                            <img src='${Img(data[i]['header'])}' />
		                        </div>
		                        <span>${data[i]["name"]}</span>
		                    </li>
		                    <li>${data[i]["score"]}</li>
		                </ul>
            		</dd>
				`
			}
			$("#lx_main").append(str);
		},
		error: function(){
			console.log(false);
		}
	});
});

function Img(url){
	if(url == null){
		return "http://school.iboom.tv/school/images/public/default/defaultIco.png";
	}else{
		return "http://static.iboom.tv/static/img/" + url;
	}
}