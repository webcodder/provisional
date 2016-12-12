
// var herodata = [

//     [123, 156, 90],
//     [80, 70, 90],
//     [90, 101, 150],
//     [35, 75, 50],
//     [62, 75, 80],

// ];
    




// $(function() {
//     // bar
//     var d1_1 = [ //出场
//         [10, 1],
//         [20, 2],
//         [30, 3],
//         [40, 4],
//         [50, 5],

//     ];

//     var d1_2 = [ //胜场
//         [10, 120],
//         [20, 90],
//         [30, 100],
//         [40, 60],
//         [50, 60.3333333333]
//     ];

//     var d1_3 = [ //负场
//         [10, 120],
//         [20, 90],
//         [30, 100],
//         [40, 60],
//         [50, 60]
//     ];

//     var data1 = [{
//         label: "出场",
//         label1:"df",
//         data: d1_1,
//         bars: {
//             show: true,
//             fill: true,
//             lineWidth: 0,
//             barWidth: 0.9,
//             order: 1,
//             fillColor: {
//                 colors: [{
//                     opacity: 1
//                 }, {
//                     opacity: 1
//                 }]
//             }
//         },
//         color: "#7e8fa1"
//     }, {
//         label: "胜场",
//         data: d1_1,
//         bars: {
//             show: true,
//             fill: true,
//             lineWidth: 0,
//             barWidth: 0.9,
//             order: 2,
//             fillColor: {
//                 colors: [{
//                     opacity: 1
//                 }, {
//                     opacity: 1
//                 }]
//             }

//         },
//         color: "#5cb85c"
//     }, {
//         label: "负场",
//         data: d1_1,
//         bars: {
//             show: true,
//             fill: true,
//             lineWidth: 0,
//             barWidth: 0.9,
//             //align: "right",
//             order: 3,
//             fillColor: {
//                 colors: [{
//                     opacity: 1
//                 }, {
//                     opacity: 1
//                 }]
//             }
//         },
//         color: "#d9534f"
//     }];
//     $("#flot-bar").length && $.plot($("#flot-bar"), data1, {
//         xaxis: {
//             show: false,
            
//             min: 5, 
//             max:55
            
//         },
//         yaxis: {
//             show: true,
//             tickDecimals: 0, 

//         },

//         grid: {
//             hoverable: true,
//             clickable: false,
//             borderWidth: 0
//         },
//         legend: {
//             labelBoxBorderColor: "none",
//             position: "left",
//             noColumns: 5,
//         },
//         series: {
//             shadowSize: 1,

//         },

//         tooltip: true,

//         tooltipOpts: {
//             //content: " %s次数: %y.1",
//             content: function(label,xval, yval) {
//               var content = label+":" + yval+"次";
//               return content;
//             },
//             defaultTheme: false,
//             shifts: {
//                 x: 0,
//                 y: -30
//             },
//             fontSize:30
            
//         },

//     });
// });
