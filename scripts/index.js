require([
    "node_modules/jquery/src/jquery",
    "node_modules/underscore/underscore",
    "node_modules/moment/moment",
    "node_modules/sortablejs/Sortable"
    ],
    function(
        $,
        _,
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
                    console.log(_stored["weather"+index]);
                    if (_stored.hasOwnProperty("weather"+index) && !oldData(_stored["weather"+index])) {
                        //there's old data that's still good
                        tileStyler(_stored["weather"+index], tmpl);
                        changer();
                        
                    } else {
                        var url = "http://api.openweathermap.org/data/2.5/weather";
                        if (_stored.hasOwnProperty("weather"+index) && _stored["weather"+index].hasOwnProperty("zipcode") &&
                            _stored["weather"+index].hasOwnProperty("country")) {
                            //the user has assigned values
                            url += "?zip=" + _stored["weather"+index]["zipcode"] + "," + _stored["weather"+index]["country"];
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
                            _dataStore("weather"+index, wData);
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
                            index = target.parents(".tile").data("index"),
                            zip = target.parent().find(".zipcode").val(),
                            count = target.parent().find(".country").val();
                        if (zip != "" && count != "") {
                            chrome.storage.sync.remove("weather"+index, function() {
                                _stored["weather"+index] = {};
                                _stored["weather"+index]["zipcode"] = zip;
                                _stored["weather"+index]["country"] = count;
                                _dataStore("weather"+index, _stored["weather"+index], index);
                            });
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
                    } else {
                        fB.find(".wind").text("Wind: " + wData["wind"]["speed"].toPrecision(2) + "m/s " +
                            windDir(wData["wind"]["deg"]));
                        fB.find(".visibility").text("Visibility: "+(wData["visibility"]/1000).toPrecision(3) +"km");
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
                    var apiKey = "LRRFZ6VVIF8ODL1D";
                    console.log(apiKey);
                    _tileCommon(tmpl, index);
                });
            },
            _spotifyLoader = function _spotifyLoader(index) {
                $.get("tiles/spotify.html", function(tmpl) {
                    var apiKey = "LRRFZ6VVIF8ODL1D";
                    console.log(apiKey);
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
                $(".tileBody").append(newTile);
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
                $(".reset").on("click", chrome.storage.sync.clear());
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
                        $(".editBody input[name='"+data[index]+"']").attr("checked", "checked");
                    }
                }
            },
            _dataLoader = function _dataLoader(keyL) {
                chrome.storage.sync.get(keyL, function(items) {
                    //null loads all of the data
                    console.log("Data Loaded: ");
                    console.log(items);
                    if (items) {
                        _prefs = items["prefs"];
                        _configs = items["configs"];
                        if (items.hasOwnProperty("prefs")) {
                            _prefLoader(items["prefs"]);
                        } else {
                            _dataStore("prefs", {"unit": "imperial"});
                            _prefs = {"unit": "imperial"};
                        }
                        if (items.hasOwnProperty("tiles")) {
                            _stored = items;
                            _tileLoader(items["tiles"]);
                        } else {
                            _dataStore("tiles", ["weather", "stock"]);
                            _tileLoader(["weather", "stock"]);
                        }
                    } else {
                        //the user hasn't set preferences, let's give them some defaults
                        _dataStore("prefs", [{"unit": "imperial"}]);
                        _dataStore("tiles", ["weather", "stock"]);
                        _tileLoader(["weather", "stock"]);
                    }
                });
            },
            _dataStore = function _dataStore(keyS, value, index) {
                data = {};
                //weird things happened with single line object init and assignment
                data[keyS] = value;
                chrome.storage.sync.set(data, function() {
                    //null loads all of the data
                    console.log("STORED: "+keyS+" as "+value);
                });
            }
            _tileSort = function _tileSort(e) {
                e.stopImmediatePropagation();
                var target = $(e.currentTarget);
                target.addClass("mousedown");
                target.on("mouseup", function(e) {
                    $(".tile").removeClass("mousedown");
                });

            };
        $(document).ready(function() {
            _init();
        });
});