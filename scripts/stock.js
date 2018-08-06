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

                var code = _configs["stock"][index]["stock"],
                    url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + code + "&types=quote,news,chart&range=1d";
                $.ajax({
                    url: url,
                    type: "GET"
                }).done(function(data) {
                    if (data[code]["chart"].length > 0) {
                        //only true on error or at 9:30am
                        _tileStyler(data, code, index);
                        _grapher(data, code, index);
                        _dataInfo(data, code, index);
                    }
                }).fail(function(error) {
                    console.log('ERROR' + error + 'FAILED TO LOAD STOCK DATA');
                });
            },
            _tileStyler = function _tileStyler(wData, code, index) {
                var tile = $(_tmpl);

                tileJs.init(tile, index);

                var newTile = $(".tile[data-index='"+index+"']");
                newTile.find(".stockName").text(wData[code]["quote"]["symbol"]);

                if (_prefs["dark"] == true) {
                    newTile.find(".stock").addClass("dark");
                }

                newTile.find(".stock .back button").on("click", _changer);
                newTile.find(".stock .back input").on("keyup", function(e) {
                    if (e.keyCode == 13) {
                        _changer(e);
                    }
                });
                _remover(index);
            },
            _changer = function _changer(e) {
                var target = $(e.currentTarget),
                    ind = target.parents(".tile").attr("data-index"),
                    text = target.parents(".back").find("input").val();

                if (text && text.length > 0) {
                    if (!_configs["stock"][ind]) {
                        _configs["stock"][ind] = {}
                    }

                    _configs["stock"][ind]["stock"] = text.toUpperCase();

                    var url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + text + "&types=quote&range=1d";
                    $.ajax({
                        url: url,
                        type: "GET"
                    }).done(function(data, textStatus, jqXHR) {
                        if (!$.isEmptyObject(data)) {
                            _dataStore({"configs": _configs}, ind, true);
                        } else if (target.parents(".back").find(".error").length == 0) {
                            target.parents(".back").find("button")
                                .after("<div class='error' style='text-align:center;'>Enter a Valid Code</div>");
                        }
                    });
                }
            },
            _remover = function _remover(index) {
                var tile = $(".tile[data-index='"+index+"']"),
                    tileInd = tile.data("index");

                tile.find(".fa-trash-o").on("click", function() {
                    var i = tileInd;
                    
                    while (_stored["configs"]["stock"].hasOwnProperty(i+1)) {
                        _stored["configs"]["stock"][i] = _stored["configs"]["stock"][i+1];
                        i++;
                    }
                    delete _stored["configs"]["stock"][i];
                    //need to delete the last one as the rest have shifted up

                    _stored["tiles"].splice(tileInd, 1);
                    //the array of the tile types
                    _dataStore(_stored, tileInd, false);

                    $(tile).remove();
                });
            },
            _grapher = function _grapher(data, code, index) {
                var chart = $(".tile[data-index='"+index+"'] svg"),
                    svg = d3.select(chart[0]),
                    margin = {top: 20, right: 30, bottom: 0, left: 50},
                    width =+ 300 - margin.left - margin.right,
                    height =+ 180 - margin.top - margin.bottom,
                    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"),
                    parseTime = d3.timeParse("%H:%M"),
                    x = d3.scaleTime().rangeRound([0, width]),
                    y = d3.scaleLinear().rangeRound([height, 0]),
                    lastY = 0;

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

                var ddata = data[code]["chart"];

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
                    .call( d3.axisBottom(x).tickArguments([5]) )
                    .classed("xAxis", true)
                    .select(".domain")
                        .remove();

                g.append("g").call(d3.axisLeft(y).tickArguments([8]))
                    .classed("yAxis", true)
                    .append("text")
                        .attr("fill", "white")
                        .attr("stroke", "white")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 6)
                        .attr("dy", "0.71em")
                        .attr("text-anchor", "end");

                var xTicks = $(chart).find(".xAxis .tick");
                if (xTicks.length > 8) {
                    for (var i = 0; i < xTicks.length; i++) {
                        if (i % 2 == 0) {
                            $(xTicks[i]).remove();
                        }
                    }
                }

                g.append("path")
                    .datum(ddata)
                    .attr("class", "curve")
                    .attr("fill", "none")
                    .attr("stroke", "green")
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 3)
                    .attr("d", line);
                
                chart.on("mouseover mousemove", function(e) {
                    _hoverLine(e, g, chart, ddata);
                });
            },
            _hoverLine = function _hoverLine(e, g, chart, ddata) {
                if (e["offsetX"] > 50 && e["offsetX"] < 270 && !$(e["target"]).hasClass("line")) {
                    chart.parents(".tileBody").find(".line, .lineText").remove();
                    var svgRect = chart[0].getBoundingClientRect(),
                        y = svgRect["height"] - svgRect["y"],
                        xPos = e["offsetX"] - 50,
                        xPort = xPos/220;

                    var dataLine = g.append("line")
                        .attr("x1", xPos)
                        .attr("x2", xPos)
                        .attr("y1", 0)
                        .attr("y2", 162)
                        .attr("class", "line");
                    

                    var dataIndex = Math.floor(xPort * ddata.length);
                    if (dataIndex < 0) {
                        dataIndex = 0;
                    } else if (dataIndex >= ddata.length) {
                        dataIndex = ddata.length - 1;
                    }

                    var dVal = ddata[dataIndex]["average"];
                    if (dVal == -1) {
                        var off = 1;
                        while (!dVal || dVal < 0) {
                            var first = dataIndex + off,
                                sec = dataIndex - off,
                                firstV = -1,
                                secV = -1;

                            off++;
                            if (first < ddata.length) {
                                firstV = ddata[first]["average"];
                            }
                            if (sec > 0) {
                                secV = ddata[sec]["average"];
                            }
                            dVal = Math.max(firstV, secV);
                        }

                    }

                    var dataText = g.append("text")
                        .attr("x", xPos - 14)
                        .attr("y", -10)
                        .attr("class", "lineText")
                        .text(_decFormat(dVal));


                    if (_prefs["dark"]) {
                        dataText.attr("fill", "white");
                        dataLine.attr("stroke", "white");
                    } else {
                        dataText.attr("fill", "black");
                        dataLine.attr("stroke", "black");
                    }
                    
                }
            },
            _dataInfo = function _dataInfo(data, code, index) {
                var left = $(".tile[data-index='"+index+"'] .bottom .left"),
                    right = $(".tile[data-index='"+index+"'] .bottom .right"),
                    len = data[code]["chart"].length,
                    last = data[code]["chart"][len-1],
                    first = data[code]["chart"][0];

                if (!first["open"] || first["open"] < 0) {
                    var ind = 0;
                    while (ind < len && (!data[code]["chart"][ind]["open"] || data[code]["chart"][ind]["open"] < 0)) {
                        ind++;
                    }
                    first = data[code]["chart"][ind];
                }

                if (!last["close"] || last["close"] < 0) {
                    while (len > 0 && (!last["close"] || last["close"] < 0)) {
                        len -= 1;
                        last = data[code]["chart"][len];
                    }
                }

                var change = (last["close"] - first["open"]),
                    changeP = 100 * (last["close"] / (first["open"]) -1);

                left.text("$" + _decFormat(last["close"]));

                var prefix = (change > 0) ? "+" : "",
                    rightString = prefix + _decFormat(change)+" (";
                rightString += prefix + _decFormat(changeP)+"%)";
                
                right.text(rightString);

                if (change > 0) {
                    $(left).css("color", "green");
                    $(right).css("color", "green");
                } else {
                    $(left).css("color", "red");
                    $(right).css("color", "red");
                }

                if (prefix !== "+") {
                    left.parents(".tile").find(".curve").attr("stroke", "red");
                }
            },
            _dataStore = function _dataStore(obj, index, refresh) {
                chrome.storage.sync.set(obj, function() {
                    if (refresh) {
                        _init(index, _stored, _prefs, _configs);
                    }
                });
            },
            _decFormat = function _decFormat(num) {
                var numRound = Math.round(num * 100) / 100;
                if (num < 1) {
                    numRound = Math.round(num * 1000) / 1000;
                }
                
                return numRound;
            };

        return {
            init: _init
        };
});