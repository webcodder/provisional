/**
 * Created by jackpan on 2015/4/18.
 */
var canvas;
var context;
var width;
var height;
var balls=[];
var isMove=true;
var motion;
var white;
var black;
var themeColor;
window.onload= function () {
    canvas=document.getElementById("canvas");
    motion=document.getElementById("motion");
    white=document.getElementById("white");
    black=document.getElementById("black");
    motion.innerHTML="运动";
    context=canvas.getContext("2d");
    canvas.width=800;
    canvas.height=600;
    width=canvas.width;
    height=canvas.height;
    context.globalAlpha=0.7;
    for(var i=0;i<50;i++){
        var R=Math.floor(Math.random()*255);
        var G=Math.floor(Math.random()*255);
        var B=Math.floor(Math.random()*255);
        var radius=Math.random()*40+10;
        var ball={
            x:Math.random()*(width-2*radius)+radius,
            y:Math.random()*(height-2*radius)+radius,
            vx:Math.pow(-1,Math.ceil(Math.random()*2))*Math.random()*8+2,
            vy:Math.pow(-1,Math.ceil(Math.random()*2))*Math.random()*4+2,
            radius:radius,
            color:"rgb("+R+","+G+","+B+")"
        }
        balls[i]=ball;
    }
    motion.onclick= function () {
        if(isMove){
            isMove=false;
            motion.innerText="静止";
        }else{
            isMove=true;
            motion.innerHTML="运动";
        }
    }
    white.onclick= function () {
        themeColor="white";
    }
    black.onclick= function () {
        themeColor="black";
    }
    setInterval(
        function () {
            drawBall();
           if(isMove){
               updateBall();
           }
        },40
    )
}
function drawBall(){
    context.clearRect(0,0,width,height);
    if(themeColor=="black"){
        context.fillStyle=themeColor;
        context.fillRect(0,0,width,height);
    }
    for(var i=0;i<balls.length;i++){
        context.globalCompositeOperation="lighter";
        context.beginPath();
        context.arc(balls[i].x,balls[i].y,balls[i].radius,0,Math.PI*2,true);
        context.closePath();
        context.fillStyle=balls[i].color;
        context.fill();
    }
}
function updateBall(){
    for(var i=0;i<balls.length;i++){
        var aBall=balls[i];
        aBall.x+=aBall.vx;
        aBall.y+=aBall.vy;
        if(aBall.x<aBall.radius || aBall.x>width-aBall.radius){
            aBall.vx=-aBall.vx;
        }
        if(aBall.y<aBall.radius || aBall.y>height-aBall.radius){
            aBall.vy=-aBall.vy;
        }

    }
}