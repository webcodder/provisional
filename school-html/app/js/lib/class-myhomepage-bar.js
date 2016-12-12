function bar(data){
    var newdata={}
        newdata.use=[]
        newdata.win=[]
        newdata.fail=[]
     for(var i in data){

        newdata.use.push([i*10+10, data[i].use_num])
        newdata.win.push([i*10+10, data[i].win_num])
        newdata.fail.push([i*10+10, (data[i].use_num-data[i].win_num)])
     }

    var data1 = [{
        label: "出场",
        label1:"df",
        data: newdata.use,
        bars: {
            show: true,
            fill: true,
            lineWidth: 0,
            barWidth: 0.9,
            order: 1,
            fillColor: {
                colors: [{
                    opacity: 1
                }, {
                    opacity: 1
                }]
            }
        },
        color: "#7e8fa1"
    }, {
        label: "胜场",
        data: newdata.win,
        bars: {
            show: true,
            fill: true,
            lineWidth: 0,
            barWidth: 0.9,
            order: 2,
            fillColor: {
                colors: [{
                    opacity: 1
                }, {
                    opacity: 1
                }]
            }

        },
        color: "#5cb85c"
    }, {
        label: "负场",
        data: newdata.fail,
        bars: {
            show: true,
            fill: true,
            lineWidth: 0,
            barWidth: 0.9,
            //align: "right",
            order: 3,
            fillColor: {
                colors: [{
                    opacity: 1
                }, {
                    opacity: 1
                }]
            }
        },
        color: "#d9534f"
    }];
    $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
        xaxis: {
            show: false,
            
            min: 5, 
            max:55
            
        },
        yaxis: {
            show: true,
            tickDecimals: 0, 

        },

        grid: {
            hoverable: true,
            clickable: false,
            borderWidth: 0
        },
        legend: {
            labelBoxBorderColor: "none",
            position: "left",
            noColumns: 5,
        },
        series: {
            shadowSize: 1,

        },

        tooltip: true,

        tooltipOpts: {
            //content: " %s次数: %y.1",
            content: function(label,xval, yval) {
              var content = label+":" + yval+"次";
              return content;
            },
            defaultTheme: false,
            shifts: {
                x: 0,
                y: -30
            },
            fontSize:30
            
        },

    });
}