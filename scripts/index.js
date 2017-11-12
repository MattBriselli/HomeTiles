requirejs([
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
            _weatherTmpl,
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
                    if (_stored.hasOwnProperty("weather") && !oldData(_stored["weather"])) {
                        //there's old data that's still good
                        tileStyler(_stored["weather"], tmpl);
                        
                    } else {
                        var url = "http://api.openweathermap.org/data/2.5/weather";
                        if (_stored.hasOwnProperty("weather") && _stored["weather"].hasOwnProperty("zipcode") &&
                            _stored["weather"].hasOwnProperty("country")) {
                            //the user has assigned values
                            url += "?zip=" + _stored["weather"]["zipcode"] + "," + _stored["weather"]["country"];
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
                            _dataStore("weather", wData);
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
                    $(".tileBody").append(tmpl);
                }
            },
            _stockLoader = function _stockLoader(index) {
                $.get("tiles/stock.html", function(tmpl) {
                    var apiKey = "LRRFZ6VVIF8ODL1D";
                    console.log(apiKey);
                    $(".tileBody").append(tmpl);
                });
            },
            _spotifyLoader = function _spotifyLoader(index) {


            },
            _bindListener = function _bindListener() {
                $(".editMode .fa-pencil").on("click", function() {
                    if ($(".editPanel").css("right") == "0px" || $(".editPanel").css("right") == "0%") {
                        direction = '-19%';
                        $(".tile").removeClass("sort");
                    } else {
                        direction = '0%';
                        $(".tile").addClass("sort");
                    }
                    $(".editPanel").animate({
                        "right": direction
                    }, 500);
                    $(".tile.sort").off("mousedown", _tileSort).on("mousedown", _tileSort);
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
                                _stockLoader();
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
                        _store("tiles", ["weather", "stock"]);
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
                console.log(e.currentTarget);
                $()

            };
        $(document).ready(function() {
            _init();
        });
});