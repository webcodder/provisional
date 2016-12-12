    var eventUint={
        add:function(ele,type,fn){
            if(ele.addEventListener){
                ele.addEventListener(type,fn,false);
            }else if(ele.attachEvent){
                ele.attachEvent("on"+type,fn);
            }else{
                ele["on"+type]=fn;
            }
        },
        remove:function(ele,type,fn){
            if(ele.removeEventListener){
                ele.removeEventListener(type,fn,false);
            }else if(ele.detachEvent){
                ele.detachEvent("on"+type,fn);
            }else{
                ele["on"+type]= null ;
            }
        },
    }
var _change = {
           ary0:["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
           ary1:["", "十", "百", "千"],
           ary2:["", "万", "亿", "兆"],
           init:function (name) {
               this.name = name;
           },
           strrev:function () {
               var ary = []
               for (var i = this.name.length; i >= 0; i--) {
                   ary.push(this.name[i])
               }
               return ary.join("");
           }, //倒转字符串。
           pri_ary:function () {
               var $this = this
               var ary = this.strrev();
               var zero = ""
               var newary = ""
               var i4 = -1
               for (var i = 0; i < ary.length; i++) {
                   if (i % 4 == 0) { //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
                       i4++;
                       newary = this.ary2[i4] + newary; //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
                       zero = ""; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空
 
                   }
                   //关于0的处理与判断。
                   if (ary[i] == '0') { //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
                       switch (i % 4) {
                           case 0:
                               break;
                           //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
                           case 1:
                           case 2:
                           case 3:
                               if (ary[i - 1] != '0') {
                                   zero = "零"
                               }
                               ; //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
                               break;
 
                       }
 
                       newary = zero + newary;
                       zero = '';
                   }
                   else { //如果不是“0”
                       newary = this.ary0[parseInt(ary[i])] + this.ary1[i % 4] + newary; //就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
                   }
 
               }
               if (newary.indexOf("零") == 0) {
                   newary = newary.substr(1)
               }//处理前面的0
               return newary;
           }
       }
 
       //创建class类
       function change() {
           this.init.apply(this, arguments);
       }
       change.prototype = _change
 
//创建实例
       var k = new change("12");
        // alert(k.pri_ary())


    
        function Config(config){
            this.data=config.data;
            this.color=config.color;
            this.type=config.type;
            this.id=config.id;
            this.name=config.name;
            this.color1=config.color1;
            this.color2=config.color2;
        }
        Config.prototype={
            cunstructor:Config,
            category:function(){
                var len=this.data.length;
                var initCategory=["初始","第一周","第二周","第三周"];
                if(len<=4) return initCategory;
                else{
                    var d=len-4;
                    for(var i=0;i<d;i++){
                        initCategory.push("第"+(new change((i+4).toString())).pri_ary()+"周")
                    }
                    return initCategory;
                }
            },
            dataZoom : function(){
                function DataZoom(arr,color1,color2){
                    this.show=arr.length>4?true:false ;
                    this.start=(function(){
                        var len=arr.length;
                        var len1=len%2;
                        if(len<=4){
                            return 0
                        }else{
                            
                            return ((len-3.5)*100/len).toFixed(0)
                        }
                    })();
                    this.end=100;
                    this.textStyle={
                        fontFamily:'microsoft yahei',
                        fontSize:13,
                        color:"#414548",
                    };
                    this.dataBackgroundColor="#cdcdcd";
                    this.fillerColor=color1;
                    this.handleColor=color2;
                    this.handleSize=12;
                    this.backgroundColor="#f4f4f4";
                    this.color="red";
                    this.height=20;
                }
                return new DataZoom(this.data,this.color1,this.color2)
            },

            min:function(){
                var min = Math.min.apply(Math,this.data);
                
                if(min>2) return min-1;
                return 0
            },
            max:function(){
                var max = Math.max.apply(Math,this.data);
                return max+1;
            },
        }



        

 


        // 路径配置


        
        



        function creatCanvas(config){
            require.config({
                paths: {
                    echarts: 'js/lib/echarts/build/dist'
                }
            });
        
        // 使用
            require(
                [
                    'echarts',
                    'echarts/chart/line',
                ],

                function (ec) {
                    // 基于准备好的dom，初始化echarts图表
                    var myChart = ec.init(document.getElementById(config.id)); 

                    eventUint.add(window,'resize',function(){
                        myChart.resize()
                    })
                    // window.onresize = myChart.resize;// 自适应
                    // myChart.showLoading({
                    //     text : "正在努力加载数据......",
                    //     // effect : effect[effectIndex],
                    //     textStyle : {
                    //         fontSize : 20
                    //     },
                    //     backgroundColor:"#f00"
                    // });

                    
                    var option = {
                        color:[config.color],
                        borderColor:["#000"],
                        title : { // 标题，每个图表最多仅有一个标题控件，每个标题控件可设主副标题。
                            show:false, // 显示策略，可选为：true（显示） | false（隐藏）
                            text: config.name, // 主标题文本，'\n'指定换行
                            zlevel:0,
                            z:0,
                            subtext: 'boomGame', 
                            // link:"http://www.baidu.com",  //指定窗口打开主标题超链接，支持'self' | 'blank'，不指定等同为'blank'（新窗口）
                            // target:'self',
                            // sublink:"http://www.baidu.com",
                            // subtarget:'blank',
                            x: 100, //水平安放位置，默认为左侧，可选为：'center' | 'left' | 'right' | {number}（x坐标，单位px）
                            y:60,
                            backgroundColor:'#ccc',
                            textAlign:'left',//水平对齐方式，默认根据x设置自动调整，可选为： left' | 'right' | 'center
                            borderColor:'lightgreen',
                            borderWidth:2,
                            itemGap:10,//主副标题纵向间隔，单位px，默认为10
                            textStyle:{ 
                                fontSize: 14,
                                fontWeight: 'bolder',
                                color: '#333'
                            },  //主标题文本样式
                            subtextStyle:{ 
                                fontSize: 14,
                                fontWeight: 'ligther',
                                color: '#333'
                            },  //副标题文本样式
                            borderRadius:10,
                        },
                        toolbox: {
                            show : false,
                            feature : {
                                mark : {show: true},
                                dataView : {show: true, readOnly: false},
                                magicType : {show: true, type: ['line', 'bar']},
                                restore : {show: true},
                                saveAsImage : {show: true}
                            }
                        },
                        tooltip:{
                            show:true,
                            showContent:true,
                            transitionDuration:0.1,
                            enterable:true,
                            borderRadius:5,
                            trigger:'axis',//'item' | 'axis'
                            backgroundColor:"rgba(0,0,0,0.7)",
                            x:'top',
                            paddig:20,
                            axisPointer : {  
                                type : 'line',  
                                lineStyle : {  
                                    color : config.color,  
                                    width : 1,  
                                    type : 'solid' ,
                                    
                                }  ,
                            } ,
                            textStyle:{
                                fontFamily:'microsoft yahei',
                                fontSize:14,
                                color:"#fff",
                            },
                            formatter:function(params,ticket,callback){
                                var res = "";
                                res += config.name + '<br/>  ';
                                res += params[0].name+':';
                                res +='<b style="text-align:center;font-size:16px;margin-left:10px;color:'+config.color+'">'+params[0].value;
                                res +=(config.type=="rate")?"%":"";
                                res +='</b>';
                                return res
                            },
                        } ,
                        calculable :false,
                        legend: {
                            show:true,
                            orient:'horizontal',//'horizontal' | 'vertical'
                            x:40,
                            y:'top',
                            itemWidth:20,
                            itemHeight:14,
                            selectedMode:false,

                            data:[
                                    {   
                                        name:config.name,
                                        textStyle:{
                                            fontFamily:'microsoft yahei',
                                            fontSize:14,
                                            color:"#414548",
                                        },
                                        icon:'circle',
                                    }
                            ],
                            
                        },
                        grid:{
                            backgroundColor:'#fff',

                            x:60,
                            y:30,
                           
                            x2:30,
                            y2:55,
                            borderColor:'red',
                            borderWidth:0,
                            zlevel:0,
                            z:0,
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : config.category(),
                                // splitNumber:10,
                                axisLabel : {
                                    formatter: '{value}',
                                    textStyle:{
                                        fontFamily:'microsoft yahei',
                                        fontSize:13,
                                        color:"#414548",
                                    },
                                },
                                axisTick:{
                                    length:0
                                },

                                axisLine : {
                                    onZero: true,
                                    lineStyle:{
                                        color: '#5b6f76',
                                        width: 2,
                                        type: 'solid'
                                    } ,
                                },
                            }
                        ],

                        yAxis : [
                            {
                                type : 'line',
                                // boundaryGap:[-0.1,0.1],
                                data:[1,2,3],
                                axisLine : {
                                    onZero: true,
                                    lineStyle:{
                                        color: '#5b6f76',
                                        width: 2,
                                        type: 'solid'
                                    } ,
                                },
                                axisLabel : {
                                    formatter: function(pramas){
                                        switch(config.type){
                                            case 'rate':
                                                return (pramas)+"%";
                                            case 'int':
                                                return pramas.toFixed(2);
                                            default:
                                                return pramas.toFixed(2);
                                        }  
                                    },
                                    textStyle:{
                                        fontFamily:'microsoft yahei',
                                        fontSize:13,
                                        color:"#414548",
                                    },
                                },
                                splitArea:{
                                    show:true,
                                    areaStyle:{
                                        color:["#f4f4f4","#ededed"]
                                    }
                                },
                                splitLine:{
                                     show:true,
                                     lineStyle:{
                                        color: ['#ced4d9'],
                                        width: 1,
                                        type: 'solid'
                                    }    
                                },
                                min:config.min(),
                                max:config.max(),
                            }
                        ],

                        dataZoom :config.dataZoom(),
                        series : [
                            {
                                "name":config.name,
                                "type":"line",
                                smooth:false,
                                // showAllSymbol:true,
                                stack: config.name,
                                symbolSize:3,
                                symbol: 'circle',
                                itemStyle: {
                                    normal: {
                                        areaStyle: {
                                            type: 'default',
                                            color:  (function () {
                                                var zrColor = require('zrender/tool/color');
                                                return zrColor.getLinearGradient(
                                                    0, 60, 0, 200,
                                                    [[0, 'rgba(100,100,100,0.2)'],[1, 'rgba(100,100,100,0.05)']]
                                                )
                                            })(),
                                            
                                        },
                                        lineStyle: {        // 系列级个性化折线样式
                                            width: 3,
                                            type: 'solid',
                                            color:config.color
                                        }
                                    },
                                    emphasis: {
                                        symbolSize:10,
                                    }
                                },
                                "data":config.data
                            }, 
                        ]
                        ,animation:{
                            boolean:true
                        },

                    };

            
                    // 为echarts对象加载数据 
                    myChart.setOption(option); 
                    
                    // setTimeout(function(){
                    //     myChart.hideLoading({
                           
                    //     });
                    //     myChart.setOption(option); 
                    //     // setTimeout(function(){
                    //     //     myChart.noDataLoading({
                                
                    //     //     })

                    //     // },2000)
                    // },100)

                }
            );
        }