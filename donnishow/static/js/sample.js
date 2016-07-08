window.onload = function () {
    onLoadDoc();
};
var chart1;

function loadheartbeat(){
    chart1 = new cfx.Chart();
    chart1.getData().setSeries(1);
    chart1.getData().setPoints(6000);

    chart1.getAxisY().getLabelsFormat().setDecimals(1);
    chart1.getAxisY().setMin(-0.8);
    chart1.getAxisY().setMax(0.8);

    chart1.getAxisX().getGrids().getMajor().setTickMark(cfx.TickMark.None);
    chart1.getAxisX().getGrids().getMinor().setTickMark(cfx.TickMark.None);

    chart1.getAxisX().getGrids().getMajor().setVisible(true);


    var realTime = chart1.getRealTime();
    realTime.getLoopMarker().setColor("#00E402");
    realTime.setBufferSize(1000);
    realTime.setMode(cfx.RealTimeMode.Loop);

    chart1.setGallery(cfx.Gallery.Lines);

    chart1.getAllSeries().setMarkerShape(cfx.MarkerShape.None);
    chart1.getLegendBox().setVisible(false);

    nTick = 0;
    forceR = false;


    var divHolder = document.getElementById('ChartDiv1');
    chart1.create(divHolder);
}
function onLoadDoc() {
    loadheartbeat();
}
var allDatas;
var count = 0;
var js_intervalId;
function readNewData(){
    $.getJSON("/static/json/heartBeat.json",function(data){
        allDatas = data;
        js_intervalId = setInterval(function () {
            setNewPoint();
        }, 1);
    });
}
readNewData();
function setNewPoint() {
    if(count>=allDatas.length){
        clearInterval(js_intervalId);
        return;
    }
    dPotential = allDatas[count];
    count ++;
    //console.log(dPotential);
    chart1.getRealTime().beginAddData(1, cfx.RealTimeAction.Append);
    chart1.getData().setItem(0, 0, dPotential);
    chart1.getRealTime().endAddData(true, false);
}
function restart(){
    console.log("restart");
    count = 0;
}