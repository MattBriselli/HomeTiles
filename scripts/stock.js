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
                var tile = $(_tmpl),
                    tF = tile.find(".top .front");

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

                    url = "https://api.iextrading.com/1.0/stock/market/batch?symbols=" + text + "&types=quote&range=1d";
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
                    index = tile.data("index");

                tile.find(".fa-trash-o").on("click", function() {
                    var i = index;
                    
                    while (_stored["configs"]["stock"].hasOwnProperty(i+1)) {
                        _stored["configs"]["stock"][i] = _stored["configs"]["stock"][i+1];
                        i++;
                    }
                    delete _stored["configs"]["stock"][i];
                    //need to delete the last one as the rest have shifted up

                    _stored["tiles"].splice(index, 1);
                    //the array of the tile types
                    _dataStore(_stored, index, false);

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

                var ddata = data[code]["chart"],
                    dRed = ddata.reduce(function(acc, cur, i) {
                        //need to remove all of the -1 values from the array
                        if (cur.hasOwnProperty("open") && cur.hasOwnProperty("close") && cur["open"] > 0 && cur["close"] > 0) {
                            acc[i] = cur;
                        }
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
                
                chart.find(".curve").on("mouseover", function(e) {
                    var svgRect = chart[0].getBoundingClientRect(),
                        x = svgRect["x"],
                        y = svgRect["height"] - svgRect["y"];
                    g.append("line")
                        .attr("x1", e["clientX"])
                        .attr("x2", e["clientX"])
                        .attr("y1", svgRect["y"])
                        .attr("y2", y)
                        .attr("stroke", "white")
                        .attr("class", "line");

                    console.log(e);
                    console.log(chart[0].getBoundingClientRect());
                })
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
                return Math.round(num * 100) / 100;
            };

        return {
            init: _init
        };
});