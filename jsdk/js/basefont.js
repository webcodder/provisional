//改变根元素font-size
document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
window.addEventListener("resize",function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
},false);