    var data=[];
    var minTomax=[];
    var rank = {
        50: "青铜Ⅰ",
        51: "青铜Ⅱ",
        52: "青铜Ⅲ",
        53: "青铜Ⅳ",
        54: "青铜Ⅴ",
        40: "白银Ⅰ",
        41: "白银Ⅱ",
        42: "白银Ⅲ",
        43: "白银Ⅳ",
        44: "白银Ⅴ",
        30: "黄金Ⅰ",
        31: "黄金Ⅱ",
        32: "黄金Ⅲ",
        33: "黄金Ⅳ",
        34: "黄金Ⅴ",
        20: "铂金Ⅰ",
        21: "铂金Ⅱ",
        22: "铂金Ⅲ",
        23: "铂金Ⅳ",
        24: "铂金Ⅴ",
        10: "钻石Ⅰ",
        11: "钻石Ⅱ",
        12: "钻石Ⅲ",
        13: "钻石Ⅳ",
        14: "钻石Ⅴ",
        00: "最强王者",
        60: "超凡大师",
        255255:"无段位"
    };

    for(var i=0; i<record.length;i++){
      var tier=record[i].tier;
      var queue=record[i].queue;
      var tq=String(tier)+String(queue);

      var rankName=rank[tq];
      var c=[i+1,
              record[i].ability,
              rankName,
              record[i].addTime,
            ];
      data.push(c);
      minTomax.push(record[i].ability)

    };
    minTomax.sort(function(a,b){
      return a-b
    })
    var min= minTomax[0]-100;
    (min<=0)?min=0:min=minTomax[0]-100;
    var max= minTomax[minTomax.length-1]+100;
    
    var label="";

    var nums=5;
    var pline={
      data:data,
      label:label,
      min:min,
      max:max,
      nums:nums
    };
    $(function() {
        var pl = $.plot($("#placeholder"), [{
                label: pline.label,
                data: pline.data,
            },

        ], {
            series: { //控制线的填充、点的显示
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.5
                        }, {
                            opacity: 0.3
                        }]
                    }
                },
                points: {
                    show: true,
                    radius: 3,
                },
                grow: {
                  active: true,
                  steps: 20,
                  growings:[
                      {
                          stepDirection: "down"
                      }                    
                  ]
                },
                shadowSize: 2
            },
            grid: {
                hoverable: true,
                clickable: true,
                borderColor: '#000',
                
                tickColor: "#f0f0f0",
                borderWidth: 0,
                color: '#f0f0f0'
            },
            colors: ["#1bb399"],

        xaxis:{
          min: 1, 
          max: 30,
          tickDecimals: 0, 
          tickSize:3

        },
        yaxis: {
          ticks: pline.nums, 
          min: pline.min,  
          max: pline.max, 
          tickDecimals: 0, 
  
          
        },
            tooltip: false,
            legend:{
              show:false,
            },
        });

        function showTooltip(x, y, contents) { //浮动块信息
            $('<div id="tooltip">' + contents + '</div>').css({
                position: 'absolute',
                display: 'none',
                top: y + 5,
                left: x + 5,
                border: '1px solid #fdd',
                padding: '10px',
                'background-color': '#000',
                'border-radius':'5px',
                color:'#fff',
                opacity: 0.80,
                'font-family': 'Verdana, Arial, Helvetica, Tahoma,"microsoft yahei", sans-serif',
                'line-height':'18px'
            }).appendTo("body").fadeIn(200);
        }

        var previousPoint = null;
        $("#placeholder").bind("plothover", function(event, pos, item) {
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                    $("#tooltip").remove();
                    var x = item.datapoint[0], //x  
                        y = item.datapoint[1], //分数  
                        n = x-1,
                        c = pline.data[n][2], //段位
                        d = pline.data[n][3]; //时间

                        var contents ="<span style='color: #1ab667;font-size:20px; font-weight:bold; height:20px; line-height:20px;'>" + y + "</span><br />" +c+"<br />"+ d;
                        

                    showTooltip(item.pageX, item.pageY, contents);
                }
            } else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });
    });