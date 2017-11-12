requirejs([
    "node_modules/jquery/src/jquery",
    "node_modules/underscore/underscore",
    "node_modules/moment/moment",
    "node_modules/sortablejs/Sortable",
    "scripts/weather",
    ],
    function(
        $,
        _,
        moment,
        Sortable,
        Weather
    ){
        var _stored,
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
                    if (_stored.hasOwnProperty("weather"+index) && !oldData(_stored["weather"+index])) {
                        //there's old data that's still good
                        tileStyler(_stored["weather"+index], tmpl);
                        
                    } else {
                        var url = "http://api.openweathermap.org/data/2.5/weather";
                        if (_stored.hasOwnProperty("weather"+index) && _stored["weather"+index].hasOwnProperty("zipcode") &&
                            _stored["weather"+index].hasOwnProperty("country")) {
                            //the user has assigned values
                            url += "?zip=" + _stored["weather"+index]["zipcode"] + "," + _stored["weather"+index]["country"];
                        } else {
                            //lets go with malibu
                            url += "?zip=22201,us"
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
                        })
                        .fail(function(error) {
                            console.log("ERROR");
                            console.log("FAILED TO GET WEATHER DATA");
                        });
                    }
                });

                function oldData(dataWT) {
                    if (!dataWT.hasOwnProperty("time")) {
                        return false;
                    } else {
                        var now = moment(),
                            old = moment(dataWT["time"], "YYYY-MM-DD-HH-mm");
                        return (now.diff(old, "minutes") > 30);
                    }
                }
                function tileStyler(wData, tmpl) {
                    console.log(wData, tmpl);
                    _tileCommon(tmpl, index);
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
                console.log(newTile, tile, index);
                newTile.attr("data-index", index);
                newTile.css("backgroundColor", "yellow");
                $(".tileBody").append(newTile);
            },
            _bindListener = function _bindListener() {
                $(".editMode .fa-bars").on("click", function() {
                    if ($(".editPanel").css("left") == "0px" || $(".editPanel").css("left") == "0%") {
                        direction = '-19%';
                        $(".tile").removeClass("sort");
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
            },
            _tileLoader = function _tileLoader(data) {
                if (data && data.length != 0) {
                    data.forEach(function(elem, index) {
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
                    });
                }
            },
            _dataLoader = function _dataLoader(keyL) {
                chrome.storage.sync.get(keyL, function(items) {
                    //null loads all of the data
                    console.log("Data Loaded: ");
                    console.log(items);
                    if (items && items.hasOwnProperty("tiles")) {
                        _stored = items;
                        _tileLoader(items["tiles"]);
                    } else {
                        //the user hasn't set preferences, let's give them some times
                        _dataStore("tiles", ["weather0", "stock"]);
                    }
                });
            },
            _dataStore = function _dataStore(keyS, value) {
                data = {};
                //weird things happened with single line object init and assignment
                data[keyS] = value;
                chrome.storage.sync.set(data, function() {
                    //null loads all of the data
                    console.log("STORED: "+keyS+" as "+value);
                    _stored[keyS] = value;
                    _tileLoader(value);
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