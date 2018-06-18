define([
    "jquery",
    "underscore",
    "moment",
    "Sortable",
    "tile",
    "d3",
    "text!../tiles/stock.html"
    ],
    function(
        $,
        _,
        moment,
        Sortable,
        tileJs,
        d3,
        tmpl
    ){
        var _stored,
            _prefs,
            _configs,
            _tmpl,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init(index, stored, prefs, configs) {
                _stored = stored;
                _prefs = prefs;
                _configs = configs;
                _tmpl = tmpl;

                console.log(configs);

                var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=";
                url += "ADBE" + "&types=quote,news,chart&range=1d&chartSimplify=true";
                $.ajax({
                    url: url,
                    type: "GET"
                })
                .done(function(data) {
                    _tileStyler(data, index);
                    _grapher(index, data);
                })
                .fail(function(error) {
                    console.log('ERROR' + error + 'FAILED TO LOAD STOCK DATA');
                });
            },
            _tileStyler = function _tileStyler(wData, index) {
                var tile = $(_tmpl),
                    tF = tile.find(".top .front");
                if (_configs && _configs["stock"]) {

                }
                tileJs(tile, index);
            },
            _dataStore = function _dataStore(obj, index) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                    console.log("STORED: "+obj+" and "+index);
                });
            },
            _grapher = function _grapher(index, data) {
                var chart = $(".tile[data-index='"+index+"'] svg"),
                    svg = d3.select(chart[0]),
                    margin = {top: 40, right: 30, bottom: 90, left: 50},
                    width =+ 300 - margin.left - margin.right,
                    height =+ 300 - margin.top - margin.bottom,
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
                    parseTime = d3.timeParse("%H:%M"),
                    x = d3.scaleTime().rangeRound([0, width]),
                    y = d3.scaleLinear().rangeRound([height, 0]);

                var lastY = 0;

                var line = d3.line()
                    .x(function(d) {
                        return x(parseTime(d.minute));
                    })
                    .y(function(d) {
                        if (d.average > 0) {
                            lastY = d.average;
                            return y(d.average);
                        } else if (d.marketAverage > 0) {
                            lastY = d.marketAverage;
                            return y(d.marketAverage);
                        } else {
                            return y(lastY);
                        }
                    });

                var ddata = data["ADBE"]["chart"],
                    dRed = ddata.reduce(function(acc, cur, i) {
                      acc[i] = cur;
                      return acc;
                    }, {});


                x.domain(d3.extent(ddata, function(d) { return parseTime(d.minute); }));
                y.domain(d3.extent(ddata, function(d) {
                    if (d.average > 0) {
                        lastY = d.average;
                        return d.average;
                    } else if (d.marketAverage > 0) {
                        lastY = d.marketAverage;
                        return d.marketAverage;
                    } else {
                        return lastY;
                    }
                }));


                g.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(
                        d3.axisBottom(x).ticks(5)
                        )
                    .select(".domain")
                        .remove();

                g.append("g")
                    .call(d3.axisLeft(y))
                    .append("text")
                        .attr("fill", "#000")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end");

                g.append("path")
                    .datum(ddata)
                    .attr("fill", "none")
                    .attr("stroke", "steelblue")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 1.5)
                    .attr("d", line);
            };

        return {
            init: _init
        };
});