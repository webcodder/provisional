//x和y为球的圆心坐标
//speed:表示球移动的速度 单位为毫秒
//radius:为球的半径
//width和height为盒子大小
var w, x,y, speed = 500, radius = 50, width = 400, height = 400;     
//初始化
function init() {
	drawCanvas();
	setInterval(moveWheel, speed);
}
init();

//画盒子
function drawCanvas() {
	//创建Canvas对象
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	//在画布面板上面创建一个矩形
	ctx.fillStyle = "#000000"; //设置填充颜色值           
	ctx.fillRect(0, 0, width, height);
	ctx.fill();
	w = ctx;
}

//随机移动球
function moveWheel() {
	clearCanvas();
	drawCanvas(); 
	//获得随机坐标
	x = getRandomNum();
	y = getRandomNum();
	//在画布上渲染一个圆形
	w.fillStyle = '#FFFFFF';
	w.beginPath();
	w.arc(x, y, radius, 0, Math.PI * 2, true);
	w.closePath();
	w.fill();           
}

//清除画布
function clearCanvas() {
	if (typeof w != "undefined") {
		w.clearRect(0, 0, width, height);
	}
}

//获取随机数
function getRandomNum() {
	return Math.random() * (width - radius * 2) + radius;
}