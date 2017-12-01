define([
    "jquery",
    "underscore",
    "moment",
    "tile",
    "text!../tiles/weather.html"
    ],
    function(
        $,
        _,
        moment,
        tileJs,
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

                if (_stored["weather"] && _stored["weather"][index] && !oldData(_stored["weather"][index])) {
                    //there's old data that's still good
                    tileStyler(_stored["weather"][index]);
                    changer();
                    
                } else {
                    var url = "http://api.openweathermap.org/data/2.5/weather";
                    if (_configs["weather"] && _configs["weather"][index] &&
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
                        console.log('got weather data');
                        wData["time"] = moment().format("YYYY-MM-DD-HH-mm");
                        var newObj = {"weather": {}};
                        newObj["weather"][index] = wData;

                        if (!_stored["weather"]) {
                            _stored["weather"] = {};
                        }
                        _stored["weather"][index] = wData;

                        _dataStore({"weather": _stored["weather"]});
                        tileStyler(wData);
                        changer();
                    })
                    .fail(function(error) {
                        console.log("ERROR");
                        console.log("FAILED TO GET WEATHER DATA");
                    });
                }

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
                            if (!_configs["weather"][ind]) {
                                _configs["weather"][ind] = {};
                            }
                            _configs["weather"][ind]["zipcode"] = zip;
                            _configs["weather"][ind]["country"] = count;
                            _stored["weather"][ind] = {};
                            
                            _dataStore({"configs": _configs});
                            _init(ind, _stored, _prefs, _configs);
                        }
                    });
                }
                function tileStyler(wData) {
                    var tile = $(_tmpl);
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

                    tileJs(tile, index);
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
                    if (dir < 1) {
                        dir = 1;
                    }
                    dirArr = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
                    return dirArr[dir];
                }
                function realFeel(t, h) {
                    // source https://en.wikipedia.org/wiki/Heat_index
                    t = parseFloat(tempConvert(t));
                    if (_prefs["unit"] == "imperial") {
                        return ((-42.379+(2.04901523*t)+(10.1433127*h)+(-0.22475541*t*h) +
                            (-6.83783*Math.pow(10, -3)*t*t)+(-5.481717*Math.pow(10,-2)*h*h)+
                            (1.22874*Math.pow(10,-3)*t*t*h)+(8.5282*Math.pow(10,-4)*t*h*h)+
                            (-1.99*Math.pow(10,-6)*t*t*h*h)).toPrecision(3) + " &#8457;");
                    } else {

                    }
                }
            },
            _dataStore = function _dataStore(obj) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                    console.log("STORED: ");
                    console.log(obj);
                });
            };

        return {
            init: _init
        };
});