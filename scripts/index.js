require([
    "node_modules/jquery/src/jquery",
    "node_modules/moment/moment",
    "node_modules/sortablejs/Sortable"
    ],
    function(
        $,
        moment,
        Sortable
    ){
        var _stored,
            _prefs,
            _configs,
            _weather,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init() {
                _stored = {};
                _dataLoader(null);
                _bindListener(); 
            },
            _weatherCall = function _weatherCall(index) {
                $.get("tiles/weather.html", function(tmpl) {
                    if (_stored["weather"] && _stored["weather"][index] && !oldData(_stored["weather"][index])) {
                        //there's old data that's still good
                        tileStyler(_stored["weather"][index], tmpl);
                        changer();
                        
                    } else {
                        var url = "http://api.openweathermap.org/data/2.5/weather";
                        if (_stored["weather"] && _stored["weather"][index] && _configs["weather"] && _configs["weather"][index] &&
                            _configs["weather"][index]["zipcode"] && _configs["weather"][index]["country"]) {
                            //the user has assigned values
                            url += "?zip=" + _configs["weather"][index]["zipcode"] + "," + _configs["weather"][index]["country"];
                        } else {
                            //lets go with malibu
                            url += "?zip=90210,us"
                        }
                        url += "&id=524901&APPID=a77b08a6d315fb4d974c16345ae1ba70";

                        $.ajax({
                            url: url,
                            type: "GET"
                        })
                        .done(function(wData) {
                            wData["time"] = moment().format("YYYY-MM-DD-HH-mm");
                            var newObj = {"weather": {}};
                            newObj["weather"][index] = wData;

                            _dataStore(newObj);
                            tileStyler(wData, tmpl);
                            changer();
                        })
                        .fail(function(error) {
                            console.log("ERROR");
                            console.log("FAILED TO GET WEATHER DATA");
                        });
                    }
                });

                function oldData(dataWT) {
                    if (!dataWT.hasOwnProperty("time")) {
                        return true;
                    } else {
                        var now = moment(),
                            old = moment(dataWT["time"], "YYYY-MM-DD-HH-mm");
                        return (now.diff(old, "minutes") > 30);
                    }
                }
                function changer() {
                    $(".weather .back button").on("click", function(e) {
                        var target = $(e.currentTarget),
                            ind = target.parents(".tile").data("index"),
                            zip = target.parent().find(".zipcode").val(),
                            count = target.parent().find(".country").val();
                        if (zip != "" && count != "") {
                            _configs["weather"][ind]["zipcode"] = zip;
                            _configs["weather"][ind]["country"] = count;

                            var newObj = {"weather": {}};
                            newObj["weather"][ind] = _stored["weather"][ind];
                            newObj["configs"] = {"weather": {}};
                            newObj["configs"]["weather"][ind] = _configs["weather"][ind];

                            _stored["weather"][ind] = {};
                            
                            _dataStore(newObj, ind);
                            _dataStore(newObj, ind);
                            _weatherCall(ind);
                        }
                    });
                }
                function tileStyler(wData, tmpl) {
                    var tile = $(tmpl);
                    //Load tile's top stuff
                    tile.find(".location").text(wData["name"]+", "+wData["sys"]["country"]);
                    tile.find(".conditions").text(wData["weather"][0]["description"]);
                    tile.find(".clouds").text("Cloud Cover: " + wData["clouds"]["all"] +"%");
                    var condSrc = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/";
                    condSrc += wData["weather"][0]["icon"] + ".png";
                    tile.find("img.condition").attr("src", condSrc);
                    //Load tile's bottom left
                    var fB = tile.find(".front .bottom");
                    fB.find(".temp").html(tempConvert(wData["main"]["temp"]));
                    fB.find(".high").html(tempConvert(wData["main"]["temp_max"])+"<br/>High");
                    fB.find(".low").html(tempConvert(wData["main"]["temp_min"])+"<br/>Low");

                    if (_prefs["unit"] == "imperial"){
                        fB.find(".wind").text("Wind: " + (2.23694 * wData["wind"]["speed"]).toPrecision(2) +
                            "mph " + windDir(wData["wind"]["deg"]));
                        fB.find(".visibility").text("Visibility: "+(wData["visibility"]*0.000621371).toPrecision(3) +"mi");
                        fB.find(".pressure").text("Barometric Pressure: "+(wData["main"]["pressure"]*0.02953).toPrecision(4) +"inHg");
                    } else {
                        fB.find(".wind").text("Wind: " + wData["wind"]["speed"].toPrecision(2) + "m/s " +
                            windDir(wData["wind"]["deg"]));
                        fB.find(".visibility").text("Visibility: "+(wData["visibility"]/1000).toPrecision(3) +"km");
                    }
                    if (wData["rain"]) {
                        fB.find(".rain").text()
                    }
                    if (wData["snow"]) {
                        fB.find(".snow").text()
                    }
                    fB.find(".humidity").text("Humidity: "+wData["main"]["humidity"] +"%");
                    // fB.find(".feel").html("Feels Like: " +
                        // realFeel(wData["main"]["temp"], wData["main"]["humidity"]));

                    _tileCommon(tile, index);
                }
                function tempConvert(temp) {
                    if (_prefs["unit"] == "imperial") {
                        //let's assume F bc i'm american
                        return (1.8 * (temp - 273) + 32).toPrecision(3) + " &#8457;";
                    } else {
                        return (temp - 273.15).toPrecision(3) + " &#8451;";
                    }
                }
                function windDir(dir) {
                    dir = (dir/27.5).toPrecision(1);
                    // there are 27.5 degrees separating each of the depth 3 direction
                    dirArr = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
                    return dirArr[dir];
                }
                function realFeel(t, h) {
                    // source https://en.wikipedia.org/wiki/Heat_index
                    t = parseFloat(tempConvert(t));
                    console.log(t, h);
                    if (_prefs["unit"] == "imperial") {
                        return ((-42.379+(2.04901523*t)+(10.1433127*h)+(-0.22475541*t*h) +
                            (-6.83783*Math.pow(10, -3)*t*t)+(-5.481717*Math.pow(10,-2)*h*h)+
                            (1.22874*Math.pow(10,-3)*t*t*h)+(8.5282*Math.pow(10,-4)*t*h*h)+
                            (-1.99*Math.pow(10,-6)*t*t*h*h)).toPrecision(3) + " &#8457;");
                    } else {

                    }
                }
            },
            _stockLoader = function _stockLoader(index) {
                $.get("tiles/stock.html", function(tmpl) {
                    var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=",
                        keys = ["AK45C9WF40HN3PRW", "LYSB01MBM0109645"];
                    url += "GOOG" +"&interval=60min&apikey=" + keys[0];
                    $.ajax({
                        url: url,
                        type: "GET"
                    })
                    .done(function(data) {
                        console.log(data)
                        var dataSet = data["Time Series (60min)"],
                            _ = require("underscore"),
                            minD = Math.pow(10, 9),
                            maxD = 0,
                            time,
                            newest = _.values(dataSet)[0];

                        console.log(newest);

                        for (var j in dataSet) {
                            var targ = dataSet[j];

                            if (targ["low"] < minD) {
                                minD = targ["low"];
                            }
                            if (targ["high"] < minD) {
                                maxD = targ["high"];
                            }
                        }

                        tileStyler(data, tmpl);
                    })
                    .fail(function(error) {
                        console.log('ERROR');
                        console.log(error);
                        console.log('FAILED TO LOAD STOCK DATA');
                    });
                    


                    function tileStyler(wData, tmpl) {
                        var tile = $(tmpl),
                            tF = tile.find(".top .front");
                        if (_configs && _configs["stock"]) {
                            for (var i=0; i<_configs["stock"].length; i++) {

                            }
                        }

                        _tileCommon(tile, index);
                    }
                });
            },
            _spotifyLoader = function _spotifyLoader(index) {
                $.get("tiles/spotify.html", function(tmpl) {
                    _tileCommon(tmpl, index);
                });
            },
            _tileCommon = function _tileCommon(tile, index) {
                var newTile = $(tile).find(".tile");
                newTile.find(".fa").on("click", function() {
                    $(newTile).find(".front, .back").toggle();
                });
                newTile.attr("data-index", index);
                newTile.css("backgroundColor", "yellow");

                if ($(".tile[data-index='"+index+"']").length != 0) {
                    //a simple replacement
                    $(".tile[data-index='"+index+"']").replaceWith(newTile);
                } else {
                    //order matters, the user sets that preference
                    if (index == 0) {
                        //0 will always be first
                        $(".tileBody").prepend(newTile);
                    } else if ($(".tile[data-index='"+parseInt(index-1)+"']").length != 0) {
                        $(".tile[data-index='"+parseInt(index-1)+"']").after(newTile);
                    } else if ($(".tile[data-index='"+parseInt(index+1)+"']").length != 0) {
                        $(".tile[data-index='"+parseInt(index+1)+"']").before(newTile);
                    } else {
                        //very weird order, just stick it at the end and hope for the best
                        $(".tileBody").append(newTile);
                    }
                }
            },
            _bindListener = function _bindListener() {
                $(".editMode .fa-bars").on("click", function() {
                    if ($(".editPanel").css("left") == "0px" || $(".editPanel").css("left") == "0%") {
                        direction = '-19%';
                        $(".tile").removeClass("sort mousedown");
                    } else {
                        direction = '0%';
                        $(".tile").addClass("sort");
                    }
                    $(".editPanel").animate({
                        "left": direction
                    }, 500);
                    $(".body").animate({
                        "left": (19)+parseFloat(direction) + "%",
                        "width": (81-parseInt(direction) + "%")
                    }, 500);
                    $(".tile.sort").on("mousedown", _tileSort);
                });
                $(".editMode .fa").on("mouseover", function(e) {

                });
                $(".reset").on("click", function() {
                    chrome.storage.sync.clear()
                });
            },
            _tileLoader = function _tileLoader(data, index) {
                if (typeof index == "number") {
                    switcher(data, index);
                } else if (data && data.length != 0) {
                    data.forEach(function(elem, index) {
                        switcher(elem, index);
                    });
                }
                function switcher(elem, index) {
                    switch (elem) {
                        case "weather":
                            _weatherCall(index);
                            break;
                        case "stock":
                            _stockLoader(index);
                            break;
                        default:
                            // statements_def
                            break;
                    }
                }
            },
            _prefLoader = function _prefLoader(data) {
                if (data && data.length != 0) {
                    for (index in data) {
                        $(".editBody input."+data[index]).attr("checked", "checked");
                    }
                }
            },
            _dataLoader = function _dataLoader(keyL) {
                chrome.storage.sync.get(keyL, function(items) {
                    //null loads all of the data
                    console.log("Data Loaded: ");
                    console.log(items);
                    _prefs = items["prefs"];
                    _configs = items["configs"];
                    if (items.hasOwnProperty("prefs")) {
                        _prefLoader(items["prefs"]);
                    } else {
                        _dataStore( {"prefs": {"unit": "imperial"}} );
                        _prefs = {"unit": "imperial"};
                    }
                    if (!items.hasOwnProperty("configs")) {
                        var loadObj = {"configs": {"weather": {0: {}}}};
                        loadObj["configs"]["weather"][0]["country"] = "us";
                        loadObj["configs"]["weather"][0]["zipcode"] = 90210;
                        loadObj["configs"]["stock"] = ["DOWJ", "NYSE", "AAPL", "GOOG"];
                        _dataStore(loadObj);
                        _configs = loadObj["configs"];
                    }

                    if (items.hasOwnProperty("tiles")) {
                        _stored = items;
                        _tileLoader(items["tiles"]);
                    } else {
                        _dataStore( {"tiles": ["weather", "stock"]} );
                        _tileLoader(["weather", "stock"]);
                    }
                });
            },
            _dataStore = function _dataStore(obj, index) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                    console.log("STORED: "+obj+" and "+index);
                });
            }
            _tileSort = function _tileSort(e) {
                e.stopImmediatePropagation();
                var target = $(e.currentTarget);
                target.addClass("mousedown");
                target.on("mouseup", function(e) {
                    $(".tile").removeClass("mousedown");
                });
                var tiles = $(".tileBody");
                Sortable.create(tiles[0], {
                    animation: 150,
                    draggable: ".tile.sort",
                    onUpdate: function(e) {
                        var oldI = e.oldIndex,
                            newI = e.newIndex,
                            target = $(e.currentTarget);
                        //need to reorder the _config, _stored and data-indexes

                    }
                });
            };
        $(document).ready(function() {
            _init();
        });
});