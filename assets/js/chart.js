var SpringOscillationChart = (function () {
    var ctx = null;
    var chart = null;
    return {
        init: function (pdata, pwidth, pheight) {
            chart = Highcharts.chart('myChart', {
                chart: {
                    type: 'spline',
                    width: pwidth,
                    height: pheight,
                    animation: false,
                    backgroundColor: 'transparent'
                },
                plotOptions: {
                    series: {
                        enableMouseTracking: false,
                        lineWidth: 2
                    }
                },
                xAxis: {
                    title: {
                        text: 'Time (Sec)',
                        enabled: false
                    },
                    labels: {
                        enabled: false
                    },
                    min: 0,
                    max: 15,
                    tickInterval: 1,
                    gridLineWidth: 1,
                    lineWidth: 0,
                    minorTickLength: 0,
                    tickLength: 0,
                    gridLineColor: '#AFAFAF',
                    gridLineDashStyle: 'longdash'
                },
                title: false,
                subtitle: false,
                yAxis: {
                    title: {
                        text: 'Displacement (cm)',
                        enabled: false,
                        align: 'high',
                        style: {
                            color: "#E0E0E0",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10
                        }
                    },
                    labels: {
                        style: {
                            color: "#545454",
                            fontFamily: "Montserrat-SemiBold"
                        }
                    },
                    min: -70,
                    max: 70,
                    tickInterval: 10,
                    gridLineWidth: 1,
                    tickLength: 5,
                    lineWidth: 1,
                    majorTickPosition: "outside",
                    minorGridLineWidth: 0,
                    minorTickInterval: 10,
                    minorTickLength: 10,
                    minorTickWidth: 1,
                    minorTickColor: '#AFAFAF',
                    gridLineColor: '#AFAFAF',
                    gridLineDashStyle: 'longdash'
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "",
                    color: "#CD5052",
                    marker: {
                        enabled: false
                    },
                    data: []
                }]
            });

            $("text.highcharts-axis-title").attr("x",35);
            var yaxishtml = '<div class="yAxisLine"><img class="y-axis-arrow" src="assets/images/arrow-y-axis.svg"></div>'
            var xaxishtml = '<div class="xAxisLine">' +
            '<img class="x-axis-arrow" src="assets/images/arrow-x-axis.svg">' +
            '<div class="y-axis-text"><span class="vText">Displacement (cm)<span></div>'+
            '<div class="x-axis-text">Time (sec)</div>'+
            '<div class="x-axis-minlimit">00</div>'+
            '<div class="x-axis-maxlimit">150</div>'+
            '<div class="x-axis-minlimit-hider"></div>'+
            '</div>'
            $("#myChart").append(yaxishtml)
            $("#myChart").append(xaxishtml)
            //NM: Add custom axis Lines
            var yaxispath = $("g.highcharts-axis.highcharts-yaxis path.highcharts-axis-line").attr("d")
            var axisLeft = yaxispath.split(" ")[1];
            
            $(".yAxisLine").css({"left": (axisLeft -10 + 40) + "px"});
            $(".xAxisLine").css({"left": (axisLeft -10 + 40) + "px"});
            //$(".highcharts-background").attr({"fill":"transparent"});
        },
        update: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chart.series[0].addPoint(datapoint, true, false);
            //chart.redraw();
            $("text.highcharts-axis-title").attr("x",35);
        },
        clearSeriesData: function () {
            chart.series[0].setData([]);
            $("text.highcharts-axis-title").attr("x",35);
        }
    }
})();