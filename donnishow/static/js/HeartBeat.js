/**
 * Created by t-hexiao on 2016/10/11.
 */
window.onload = function() {

    var svg = null;
    var circle = null;
    var circleTransition = null;
    var latestBeat = null;
    var insideBeat = false;
    var data = [];

    var SECONDS_SAMPLE = 5;
    var BEAT_TIME = 800;
    var TICK_FREQUENCY = SECONDS_SAMPLE * 1000 / BEAT_TIME;
    var BEAT_VALUES = [-0.0059082033,-0.003442383,-0.0036376952,-0.0020996095,-0.0026611327,-0.0035644532,-0.0026855469,-8.789062E-4,0.0018554687,0.0061035156,0.010205078,0.011108398,0.0073974608,0.0068603517,0.005200195,0.0029052733,5.615234E-4,0.0020263672,-6.591797E-4,-0.0031982423,-0.006518555,-0.01015625,-0.013574218,-0.0170166,-0.019726563,-0.02084961,-0.020043945,-0.018676758,-0.017333984,-0.016601563,-0.016186524,-0.01665039,-0.018481445,-0.021166991,-0.023168946,0.079956055,0.10378418,0.19931641,0.20107421,0.30561525,0.21525879,0.25979003,0.16147462,0.16040039,0.06010742,0.053710938,-0.028027344,-0.03339844,-0.03017578,-0.025317382,-0.028222656,0.027026366,0.103027344,0.13164063,0.12404785,0.12080078,0.07990722,0.0105957035,-0.02211914,-0.024291992,-0.026000977,-0.025,-0.02055664,-0.015673827,-0.010205078,-0.00612793,-0.0043212892,-4.8828125E-4,0.002001953,0.005566406,-0.008178711,-0.005029297,-0.003149414,-4.8828125E-4,-0.0046142577,0.013671875,0.013989258,0.013989258,0.015332031,0.020629883,0.021850586,0.02355957,0.024951171,0.016503906,0.01826172,0.010839844,0.0029296875];

    var CIRCLE_FULL_RADIUS = 40;
    var MAX_LATENCY = 5000;

    var colorScale = d3.scale.linear()
        .domain([BEAT_TIME, (MAX_LATENCY - BEAT_TIME) / 2, MAX_LATENCY])
        .range(["#E80C7A", "#E82C0C", "#E80C7A"]);

    var radiusScale = d3.scale.linear()
        .range([5, CIRCLE_FULL_RADIUS])
        .domain([MAX_LATENCY, BEAT_TIME]);

    function beat() {

        if (insideBeat) return;
        insideBeat = true;

        var now = new Date();
        var nowTime = now.getTime();

        if (data.length > 0 && data[data.length - 1].date > now) {
            data.splice(data.length - 1, 1);
        }

        data.push({
            date: now,
            value: 0
        });

        var step = BEAT_TIME / BEAT_VALUES.length - 2;
        for (var i = 1; i < BEAT_VALUES.length; i++) {
            data.push({
                date: new Date(nowTime + i * step),
                value: BEAT_VALUES[i]
            });
        }

        latestBeat = now;

        circleTransition = circle.transition()
            .duration(BEAT_TIME)
            .attr("r", CIRCLE_FULL_RADIUS)
            .attr("fill", "#E80C7A");

        setTimeout(function() {
            insideBeat = false;
        }, BEAT_TIME);
    }

    var svgWrapper = document.getElementById("svg-wrapper");
    var margin = {left: 10, top: 10, right: CIRCLE_FULL_RADIUS * 3, bottom: 10},
        width = svgWrapper.offsetWidth - margin.left - margin.right,
        height = svgWrapper.offsetHeight - margin.top - margin.bottom;

    // create SVG
    svg = d3.select('#svg-wrapper').append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    circle = svg
        .append("circle")
        .attr("fill", "#E80C7A")
        .attr("cx", width + margin.right / 2)
        .attr("cy", height / 2)
        .attr("r", CIRCLE_FULL_RADIUS);

    // init scales
    var now = new Date(),
        fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);

    // create initial set of data
    data.push({
        date: now,
        value: 0
    });

    var x = d3.time.scale()
            .domain([fromDate, new Date(now.getTime())])
            .range([0, width]),
        y = d3.scale.linear()
            .domain([-10, 10])
            .range([height, 0]);

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) {
            return x(d.date);
        })
        .y(function(d) {
            return y(d.value);
        });

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .ticks(d3.time.seconds, 1)
        .tickFormat(function(d) {
            var seconds = d.getSeconds() === 0 ? "00" : d.getSeconds();
            return seconds % 10 === 0 ? d.getMinutes() + ":" + seconds : ":" + seconds;
        });

    // add clipPath
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

    var axis = d3.select("svg").append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    var path = svg.append("g")
        .attr("clip-path", "url(#clip)")
        .append("path")
        .attr("class", "line");

    svg.select(".line")
        .attr("d", line(data));

    var transition = d3.select("path").transition()
        .duration(100)
        .ease("linear");

    (function tick() {

        transition = transition.each(function() {

            // update the domains
            now = new Date();
            fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);
            x.domain([fromDate, new Date(now.getTime() - 100)]);

            var translateTo = x(new Date(fromDate.getTime()) - 100);

            // redraw the line
            svg.select(".line")
                .attr("d", line(data))
                .attr("transform", null)
                .transition()
                .attr("transform", "translate(" + translateTo + ")");

            // slide the x-axis left
            axis.call(xAxis);

        }).transition().each("start", tick);
    })();

    setInterval(function() {

        now = new Date();
        fromDate = new Date(now.getTime() - SECONDS_SAMPLE * 1000);

        for (var i = 0; i < data.length; i++) {
            if (data[i].date < fromDate) {
                data.shift();
            } else {
                break;
            }
        }

        if (insideBeat) return;

        data.push({
            date: now,
            value: 0
        });

        if (circleTransition != null) {

            var diff = now.getTime() - latestBeat.getTime();

            if (diff < MAX_LATENCY) {
                circleTransition = circle.transition()
                    .duration(TICK_FREQUENCY)
                    .attr("r", radiusScale(diff))
                    .attr("fill", colorScale(diff));
            }
        }


    }, TICK_FREQUENCY);

    setInterval(function() {
        beat();
    }, 2000);
    beat();
};
