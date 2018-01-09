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
            _cObj,
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
                    _changer();
                    
                } else {
                    var url = "http://api.openweathermap.org/data/2.5/weather";
                    if (_configs["weather"] && _configs["weather"][index] && _configs["weather"][index]["country"]) {
                        //the user has assigned values
                        if (_configs["weather"][index]["zipcode"]) {
                            url += "?zip=" + _configs["weather"][index]["zipcode"] + "," + _configs["weather"][index]["country"];
                        } else if (_configs["weather"][index]["city"]) {
                            url += "?q=" + _configs["weather"][index]["city"] + "," + _configs["weather"][index]["country"];
                        } else  {
                            //lets go with malibu
                            url += "?zip=90210,us"
                        }
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
                        _changer();
                    })
                    .fail(function() {
                        tileStyler(undefined, _configs["weather"][index]);
                        _changer();
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
                function tileStyler(wData, errorData) {
                    var tile = $(_tmpl);
                    if (wData) {
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
                            fB.find(".pressure").text("Pressure: "+(wData["main"]["pressure"]*0.02953).toPrecision(4) +"inHg");
                        } else {
                            fB.find(".wind").text("Wind: " + wData["wind"]["speed"].toPrecision(2) + "m/s " +
                                windDir(wData["wind"]["deg"]));
                            fB.find(".visibility").text("Visibility: "+(wData["visibility"]/1000).toPrecision(3) +"km");
                            fB.find(".pressure").text("Pressure: "+ Math.round(wData["main"]["pressure"]) +"mb");
                        }
                        if (wData["rain"]) {
                            fB.find(".rain").text();
                        }
                        if (wData["snow"]) {
                            fB.find(".snow").text();
                        }
                        fB.find(".humidity").text("Humidity: "+wData["main"]["humidity"] +"%");
                        // fB.find(".feel").html("Feels Like: " +
                            // realFeel(wData["main"]["temp"], wData["main"]["humidity"]));
                        tileJs(tile, index);
                    } else {
                        tileJs(tile, index, errorData);
                    }
                    _remover(index);
                }
                function tempConvert(temp) {
                    if (_prefs["unit"] == "imperial") {
                        //let's assume F bc i'm american
                        return (1.8 * (temp - 273) + 32).toPrecision(3) + " &#8457;";
                    } else {
                        return (temp - 273.15).toPrecision(2) + " &#8451;";
                    }
                }
                function windDir(dir) {
                    dir = Math.round(dir/27.5);
                    // there are 27.5 degrees separating each of the depth 3 direction
                    dirArr = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
                    return dirArr[dir % dirArr.length];
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
            _changer = function _changer() {
                $(".weather .back input.country").off("keyup").on("keyup", function(e) {
                    if ($(e.currentTarget).val().length != 0) {
                        var text = $(e.currentTarget).val();
                        if (!_cObj) {
                            $.ajax({
                                type: "GET",
                                url: "../countries.json"
                            }).done(function(data) {
                                _cObj = data;
                                _autoComplete($(e.currentTarget), text);
                            });
                        } else {
                            _autoComplete($(e.currentTarget), text);
                        }
                    }
                });
            },
            _autoComplete = function _autoComplete(targ, text) {
                targ.parent().find(".options").remove();
                var rData = _.filter(_cObj, function(elem) {
                    return (elem["name"].toLowerCase().indexOf(text.toLowerCase()) != -1);
                });
                if (rData.length != 0) {
                    var dH = "<div class='options'>";
                    rData.forEach( function(element, index) {
                        dH += "<div class='option' data-code='"+element["code"]+"'>" + element["name"] + "</div>";
                    });
                    dH += "</div>";
                    targ.after(dH);

                    if (targ.parent().find(".zipcode").length != 0) {
                        targ.parent().find(".zipcode").prev().remove();
                        targ.parent().find(".zipcode").remove();
                    } else if (targ.parent().find(".city").length != 0) {
                        targ.parent().find(".city").prev().remove();
                        targ.parent().find(".city").remove();
                    }

                    targ.parent().find(".save").remove();

                    targ.parent().find(".options .option").on("click", function(e) {
                        var code = $(e.currentTarget).data("code"),
                            usH = '<div class="subtitle">Zipcode</div>\
                                    <input type="text" class="zipcode">\
                                    <button class="save" type="save">Save</button>',
                            oH = '<div class="subtitle city">City</div>\
                                    <input type="text" class="city">\
                                    <button class="save" type="save">Save</button>';
                        targ.val(code);
                        targ.parent().find(".options").remove();

                        code == "US" ? targ.after(usH) : targ.after(oH);

                        $(".weather .back button").off("click").on("click", newSaver);
                        $(".weather .back input.city, .weather .back input.zipcode").on("keypress", function(e) {
                            if (e.keyCode == 13 && $(e.currentTarget).val().length != 0) {
                                newSaver(e);
                                $(".weather .back input").off("keypress");
                            }
                        });
                    });
                }
                function newSaver(e) {
                    var target = $(e.currentTarget),
                        ind = target.parents(".tile").data("index"),
                        zip = target.parent().find("input.zipcode").val(),
                        city = target.parent().find("input.city").val(),
                        count = target.parent().find("input.country").val();

                    if ((zip != "" || city != "") && count != "") {
                        _configs["weather"][ind] = {};
                        zip ?
                            _configs["weather"][ind]["zipcode"] = zip :
                            _configs["weather"][ind]["city"] = city;

                        _configs["weather"][ind]["country"] = count;
                        _stored["weather"][ind] = {};

                        console.log(ind, target);
                        
                        _dataStore({"configs": _configs});
                        _init(ind, _stored, _prefs, _configs);
                    }
                };
            },
            _remover = function _remover(index) {
                var tile = $(".tile[data-index='"+index+"']"),
                    index = tile.data("index");

                tile.find(".fa-trash-o").on("click", function() {

                    var i = index;
                    
                    while (_stored["configs"]["weather"].hasOwnProperty(i+1)) {
                        _stored["configs"]["weather"][i] = _stored["configs"]["weather"][i+1];
                        _stored["weather"][i] = _stored["weather"][i+1];
                        i++;
                    }

                    delete _stored["weather"][i];
                    delete _stored["configs"]["weather"][i];
                    //need to delete the last one as the rest have shifted up

                    _stored["tiles"].splice(index, 1);
                    //the array of the tile types
                    _dataStore(_stored);

                    $(tile).remove();

                    _changer();
                });
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