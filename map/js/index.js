var map_init = function(){
    //创建和初始化地图函数：
    function initMap() {
        createMap(); //创建地图
        setMapEvent(); //设置地图事件
        // addMapControl(); //向地图添加控件
    }

    function icon(url) {
      switch (url){
        case 'jin':
          return  ("images/map/jin.png");
          break;
        case 'nong':
          return  ("images/map/nong.png");
          break;
        case 'cun':
          return  ("images/map/cun.png");
          break;
        case 'su':
          return  ("images/map/su.png");
          break;
        default :
          return  ("images/map/jin.png");
      }
    }

    // console.log(icon('jing'));

    var markerArr = [
        { title: "方山", point: "105.330670,28.825850", address: "四川省泸州市江阳区西郊方山镇", tel: "12306" , pro: "方山", url: "#方山", imgurl: "images/map/bzp.jpg", iconurl: "images/map/su.png"},
        { title: "九狮山风景区", point: "105.44406,28.962949", address: "123123", tel: "110" , pro: "九狮山风景区", url: "#九狮山风景区", imgurl: "images/map/hunz.jpg", iconurl: "images/map/nong.png"},
        { title: "尧坝古镇", point: "105.651766,28.742824", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#尧坝古镇", imgurl: "images/map/sfj.jpg", iconurl: "images/map/cun.png"},
        { title: "福宝风景名胜区", point: "106.133905,28.664317", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "福宝风景名胜区", url: "#福宝风景名胜区", url: "#福宝风景名胜区", imgurl: "images/map/wsc.jpg", iconurl: "images/map/su.png"},
        { title: "玉龙湖景区", point: "105.674547,29.165004", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#玉龙湖景区", imgurl: "images/map/xcx.jpg", iconurl: "images/map/jin.png"},
        { title: "玉蟾山风景区", point: "105.416769,29.157875", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#玉蟾山风景区", imgurl: "images/map/hunz.jpg", iconurl: "images/map/nong.png"},
        { title: "自怀风景区", point: "106.258877,28.705384", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#自怀风景区", imgurl: "images/map/yks.jpg", iconurl: "images/map/su.png"},
        { title: "笔架山景区", point: "105.793808,28.814567", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#笔架山景区", imgurl: "images/map/hunz.jpg", iconurl: "images/map/jin.png"},
        { title: "天仙硐风景区", point: "105.418476,28.723377", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#天仙硐风景区", imgurl: "images/map/yswt.jpg", iconurl: "images/map/jin.png"},
        { title: "凤凰湖风景区", point: "105.322447,28.704829", address: "泸州城以北10公里，安宁镇境内", tel: "0830-3710264" , pro: "泸州市近郊型风景旅游胜地。景区景点繁多", url: "#凤凰湖风景区", imgurl: "images/map/hunz.jpg", iconurl: "images/map/su.png"}
    ];


    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("allmap"); //在百度地图容器中创建一个地图
        var point = new BMap.Point(105.457103,28.895163); //定义一个中心点坐标
        map.centerAndZoom(point, 12); //设定地图的中心点和坐标并将地图显示在地图容器中

        window.map = map; //将map变量存储在全局
        
        var point = new Array(); //存放标注点经纬信息的数组
        var marker = new Array(); //存放标注点对象的数组
        var content = new Array(); //存放提示信息窗口对象的数组

        var myIcon = new BMap.Icon(markerArr[0].iconurl , new BMap.Size(50,50));  //自定义定位图标

        var markers = [];

        //向地图添加标注
        var bounds = map.getBounds();        

        for(var i=0; i<markerArr.length; i++){
            var p0 = markerArr[i].point.split(",")[0]; //
            var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
            point[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
            marker[i] = new window.BMap.Marker(point[i], {icon:myIcon}); //按照地图点坐标生成标记

            var myIcon = new BMap.Icon(markerArr[i].iconurl , new BMap.Size(50,50));  //自定义定位图标

            // marker[i].enableDragging(); //marker可拖拽
            
            //设置文字标注
            var label = new BMap.Label(markerArr[i].title ,{"offset":new BMap.Size(30,35)});

            label.setStyle({  
               fontSize: "12px",
               fontFamily: "微软雅黑",
               height: "18px",
               lineHeight: "18px", 
               padding: "0 5px",
               backgroundColor:"none",
               cursor:"pointer",
               background: "none",
               border: "none",
               color: "#333",
               fontWeight: "bold",
           });

           marker[i].setLabel(label);

            // 创建信息窗口对象
            content[i] = `
                <div class="info_box clearfix">
                    <div class="inbx_l">
                        <ul>
                            <li>名称：${markerArr[i].title}</li>
                            <li>地址：${markerArr[i].address}</li>
                            <li>电话：${markerArr[i].tel} </li>
                            <li>简介：${markerArr[i].pro}</li>
                        </ul>
                    </div>
                    <a href="${markerArr[i].url}" class="inbx_r">
                        <img src="${markerArr[i].imgurl}" alt="" />
                    </a>
                </div>
            `;

            //调用SearchInfoWindow控件
            searchInfoWindow = new BMapLib.SearchInfoWindow(map, content[i], {
                // title  : "图文简介",   //标题
                width  : 290,             //宽度
                height : 115,              //高度
                panel  : "panel",         //检索结果面板
                enableAutoPan : true,     //自动平移
                enableSendToPhone: false,
                searchTypes   :[
                  // BMAPLIB_TAB_TO_HERE, //到这里去
                  // BMAPLIB_TAB_FROM_HERE //从这里出发
                ]
            });

            //闭包，监听事件
            !function(i){
              //设置文字标注跳转
              label.addEventListener("click", function(e){
                location.href = markerArr[i].url;
              });

              //加载searchInfoWindow信息
              marker[i].addEventListener("click", function(e){
                searchInfoWindow.open(point[i]); 
                searchInfoWindow.setContent(content[i]);
                searchInfoWindow.setTitle(markerArr[i].title);
              });
            }(i);

            markers.push(marker[i]);

            map.addOverlay(marker[i]);
        }
        
        //启用点聚合
        var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
    }
    

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
        // map.disableDragging();     //禁止拖拽
    }

    //地图控件添加函数：
    function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        map.addControl(ctrl_sca);
        map.addControl(new BMap.MapTypeControl());
    }
    
    initMap(); //创建和初始化地图
}

//异步调用百度js
function map_load() {
    var load = document.createElement("script");
    load.src = "http://api.map.baidu.com/api?v=2.0&callback=map_init";
    document.body.appendChild(load);
}

$(function(){
  map_load();
});