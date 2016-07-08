/**
 * Created by Administrator on 7/4/2016.
 */
$(function(){
    var ctx = document.getElementById("bingtuchart");
    var data = {
        labels: [
            "愉悦",
            "平静",
            "恐惧",
            "厌恶",
            "愤怒",
            "惊奇",
            "悲伤"
        ],
        datasets: [
            {
                data: bingtudata,
                backgroundColor: [
                    "#FF3500",
                    "#70E500",
                    "#7109AA",
                    "#666600",
                    "#FFFF00",
                    "#FF9900",
                    "#33CCFF"
                ],
                hoverBackgroundColor: [
                    "#FF3500",
                    "#70E500",
                    "#7109AA",
                    "#666600",
                    "#FFFF00",
                    "#FF9900",
                    "#33CCFF"
                ]
            }]
    };
    //And for a doughnut chart
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            height:300,
            widhth:400
        }
    });

    var ctx1 = document.getElementById("anxietychart");
    var data1 = {
        labels: ["1", "2", "3", "4", "5", "6", "7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25"],
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
    var myLineChart1 = new Chart(ctx1, {
        type: 'line',
        data: data1
    });

    var ctx2 = document.getElementById("chart2");
    var data2 = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
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
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };
    var myLineChart2 = new Chart(ctx2, {
        type: 'line',
        data: data2
    });

    var ctx3 = document.getElementById("chart3");
    var data3 = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
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
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };
    var myLineChart3 = new Chart(ctx3, {
        type: 'line',
        data: data3
    });

    var ctx4 = document.getElementById("chart4");
    var data4 = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
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
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };
    var myLineChart4 = new Chart(ctx4, {
        type: 'line',
        data: data4
    });

    var ctx5 = document.getElementById("chart5");
    var data5 = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
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
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };
    var myLineChart5 = new Chart(ctx5, {
        type: 'line',
        data: data5
    });

    var ctx6 = document.getElementById("chart6");
    var data6 = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
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
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };
    var myLineChart6 = new Chart(ctx6, {
        type: 'line',
        data: data6
    });

    var ctx7 = document.getElementById("chart7");
    var data7 = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
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
                data: [65, 59, 80, 81, 56, 55, 40],
            }
        ]
    };
    var myLineChart7 = new Chart(ctx7, {
        type: 'line',
        data: data7
    });
});