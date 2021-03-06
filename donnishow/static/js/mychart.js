/**
 * Created by Administrator on 7/4/2016.
 */
$(function(){
    alllables = ["1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"];
    alllables = alllables.slice(0,anxiety_trend.length);
    var chart = new CanvasJS.Chart("bingtuchart",
        {
            title:false,
            animationEnabled: true,
            legend:{
                verticalAlign: "center",
                horizontalAlign: "left",
                fontSize: 20,
                fontFamily: "Helvetica"
            },
            backgroundColor: "#F5DEB3",
            theme: "theme2",
            data: [
                {
                    type: "pie",
                    indexLabelFontFamily: "Garamond",
                    indexLabelFontSize: 20,
                    indexLabel: "{label}#percent%",
                    startAngle:-20,
                    showInLegend: false,
                    toolTipContent:"{label}#percent%",
                    dataPoints: [
                        {  y: bingtudata[0],  label: "愉悦" },
                        {  y: bingtudata[1], label: "平静" },
                        {  y: bingtudata[2],  label: "恐惧" },
                        {  y: bingtudata[3],  label: "厌恶"},
                        {  y: bingtudata[4],  label: "愤怒"},
                        {  y: bingtudata[6],  label: "悲伤" }
                    ]
                }
            ]
        });
    chart.render();

    // var ctx = document.getElementById("bingtuchart");
    // var data = {
    //     labels: [
    //         "愉悦",
    //         "平静",
    //         "恐惧",
    //         "厌恶",
    //         "愤怒",
    //         "惊奇",
    //         "悲伤"
    //     ],
    //     datasets: [
    //         {
    //             data: bingtudata,
    //             backgroundColor: [
    //                 "#FF3500",
    //                 "#70E500",
    //                 "#7109AA",
    //                 "#666600",
    //                 "#FFFF00",
    //                 "#FF9900",
    //                 "#33CCFF"
    //             ],
    //             hoverBackgroundColor: [
    //                 "#FF3500",
    //                 "#70E500",
    //                 "#7109AA",
    //                 "#666600",
    //                 "#FFFF00",
    //                 "#FF9900",
    //                 "#33CCFF"
    //             ]
    //         }]
    // };
    // //And for a doughnut chart
    // var myDoughnutChart = new Chart(ctx, {
    //     type: 'doughnut',
    //     data: data,
    //     options: {
    //         height:300,
    //         widhth:400,
    //     }
    // });

    var ctx1 = document.getElementById("anxietychart");
    var data1 = {
        labels: alllables,
        datasets: [
            {
                label: "焦虑度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: anxiety_trend
            }
        ]
    };
    var chartoption = {scales: {
        yAxes: [{
            ticks: {
                max: 100,
                min: 0,
                stepSize: 10
            }
        }]
    }};
    var myLineChart1 = new Chart(ctx1, {
        type: 'line',
        data: data1,
        options: chartoption
    });

    var ctx2 = document.getElementById("chart2");
    var data2 = {
        labels:alllables,
        datasets: [
            {
                label: "厌恶度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#993300",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#993300",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#993300",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data:disgust_trend
            }
        ]
    };
    var myLineChart2 = new Chart(ctx2, {
        type: 'line',
        data: data2,
        options: chartoption
    });

    var ctx3 = document.getElementById("chart3");
    var data3 = {
        labels: alllables,
        datasets: [
            {
                label: "抑郁度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#3300FF",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#3300FF",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#3300FF",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data:depress_trend
            }
        ]
    };
    var myLineChart3 = new Chart(ctx3, {
        type: 'line',
        data: data3,options: chartoption
    });

    var ctx4 = document.getElementById("chart4");
    var data4 = {
        labels: alllables,
        datasets: [
            {
                label: "疲惫度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#33CC00",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#33CC00",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#33CC00",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: tired_trend
            }
        ]
    };
    var myLineChart4 = new Chart(ctx4, {
        type: 'line',
        data: data4,options: chartoption
    });

    var ctx5 = document.getElementById("chart5");
    var data5 = {
        labels:alllables,
        datasets: [
            {
                label: "悲伤度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#666600",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#666600",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#666600",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: sorrow_trend
            }
        ]
    };
    var myLineChart5 = new Chart(ctx5, {
        type: 'line',
        data: data5,options: chartoption
    });

    var ctx6 = document.getElementById("chart6");
    var data6 = {
        labels:alllables,
        datasets: [
            {
                label: "愤怒度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#FFFF00",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#FFFF00",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#FFFF00",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: anger_trend
            }
        ]
    };
    var myLineChart6 = new Chart(ctx6, {
        type: 'line',
        data: data6,options: chartoption
    });

    // var ctx7 = document.getElementById("chart7");
    // var data7 = {
    //     labels:["1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
    //     datasets: [
    //         {
    //             label: "恐惧度",
    //             fill: false,
    //             lineTension: 0.1,
    //             backgroundColor: "rgba(75,192,192,0.4)",
    //             borderColor: "#FF9900",
    //             borderCapStyle: 'butt',
    //             borderDash: [],
    //             borderDashOffset: 0.0,
    //             borderJoinStyle: 'miter',
    //             pointBorderColor: "#FF9900",
    //             pointBackgroundColor: "#fff",
    //             pointBorderWidth: 1,
    //             pointHoverRadius: 5,
    //             pointHoverBackgroundColor: "#FF9900",
    //             pointHoverBorderColor: "rgba(220,220,220,1)",
    //             pointHoverBorderWidth: 2,
    //             pointRadius: 1,
    //             pointHitRadius: 10,
    //             data: surprise_trend
    //         }
    //     ]
    // };
    // var myLineChart7 = new Chart(ctx7, {
    //     type: 'line',
    //     data: data7
    // });

    var ctx8 = document.getElementById("chart8");
    var data8 = {
        labels:alllables,
        datasets: [
            {
                label: "恐惧度",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "#33CCFF",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "#33CCFF",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "#33CCFF",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: fear_trend
            }
        ]
    };
    var myLineChart8 = new Chart(ctx8, {
        type: 'line',
        data: data8,options: chartoption
    });
});