define("tab", [
    "jquery",
    "moment",
    "Sortable",
    "underscore",
    "stock",
    "weather",
    "calendar"
    ],
    function(
        $,
        moment,
        Sortable,
        _,
        stockJs,
        weatherJs,
        calendarJs
    ){
        var _stored,
            _prefs,
            _configs,
            _tiles,
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
            _bindListener = function _bindListener() {
                $(".editMode .fa-bars").off("click").on("click", function() {
                    if ($(".editPanel").css("left") == "0px" || $(".editPanel").css("left") == "0%") {
                        direction = '-19%';
                        $(".tile").removeClass("sort mousedown");
                    } else {
                        direction = '0%';
                        $(".tile").addClass("sort");
                    }
                    $(".editPanel").animate({
                        "left": direction
                    }, 350);
                    $(".body").animate({
                        "left": (19)+parseFloat(direction) + "%",
                        "width": (81-parseInt(direction) + "%")
                    }, 350);
                    var tiles = $(".tileBody");
                    Sortable.create(tiles[0], {
                        animation: 150,
                        draggable: ".tile.sort",
                        onUpdate: function(e) {
                            var oldI = e.oldIndex,
                                newI = e.newIndex,
                                target = $(e.currentTarget);
                                _tileSwapper(oldI, newI);

                        }
                    });
                    $(".tile.sort").on("mousedown", function(e) {
                        $(e.currentTarget).addClass("mousedown");
                    });
                    $(".tile.sort").on("mouseup", function(e) {
                        $(e.currentTarget).removeClass("mousedown");
                    });
                });
                $(".editBody .tiles button").off("click").on("click", function(e) {
                    var target = $(e.currentTarget),
                        tVal = target.attr("value"),
                        nInd = $(".tileBody .tile").length;

                    _tiles.push(tVal);
                    _dataStore({"tiles": _tiles});

                    if (!_configs.hasOwnProperty(target.attr("value"))) {
                        _configs[target.attr("value")] = {}
                    }
                    
                    if (target.attr("value") == "weather") {
                        _configs[tVal][nInd] = {"country": "US", "zipcode": "90210"};
                    } else if (target.attr("value") == "stock") {
                        _configs[tVal][nInd] = {"stock": "AAPL"};
                    }
                    _dataStore({"configs": _configs});
                    _tileLoader(tVal, nInd);
                });
                $(".units input").off("change").on("change", function(e) {
                    var val = $(e.currentTarget).attr("class");
                    _prefs["unit"] = val; 
                    _dataStore({"prefs": _prefs});
                    _init();
                });
                $(".darkMode input").off("change").on("change", function(e) {
                    _prefs["dark"] = e.currentTarget.checked;
                    $(".tile .stock, .tile .weather").toggleClass("dark");
                    _dataStore({"prefs": _prefs});
                });
                $(".reset").off("click").on("click", function() {
                    chrome.storage.sync.clear();
                    $(".tile").remove();
                    _init();
                });
            },
            _tileLoader = function _tileLoader(data, index) {
                if (typeof index == "number") {
                    switcher(data, index);
                } else if (data && data.length != 0) {
                    data.forEach(function(elem, index) {
                        if (_configs[elem][index]) {
                            switcher(elem, index);
                        } else {
                            _tiles.splice(index, 1);
                            _dataStore({"tiles": _tiles});
                        }
                    });
                }
                function switcher(elem, index) {
                    switch (elem) {
                        case "weather":
                            weatherJs.init(index, _stored, _prefs, _configs);
                            break;
                        case "stock":
                            stockJs.init(index, _stored, _prefs, _configs);
                            break;
                        case "calendar":
                            calendarJs.init(index, _stored, _prefs, _configs);
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
                        if (index == "back") {
                            $(".background input").val(data[index]);
                        } else if (index == "dark" && data[index] == true) {
                            $(".editBody .darkMode input").attr("checked", "checked");
                        } else {
                            //buttons
                            $(".editBody input."+data[index]).attr("checked", "checked");
                        }
                    }
                }
            },
            _dataLoader = function _dataLoader(keyL) {
                chrome.storage.sync.get(keyL, function(items) {
                    //null loads all of the data
                    _prefs = items["prefs"];
                    _configs = items["configs"];
                    _tiles = items["tiles"];
                    console.log(items);
                    if (!items.hasOwnProperty("prefs")) {
                        _dataStore({"prefs": {"unit": "imperial", "dark": true}} );
                        $(".tile .weather").addClass("dark");
                        $(".darkMode input").attr("checked", "checked");
                        _prefs = {"unit": "imperial", "dark": true};
                    }
                    _prefLoader(_prefs);

                    if (!items.hasOwnProperty("configs")) {
                        var loadObj = {"configs": {"weather": {0: {}}}};
                        loadObj["configs"]["weather"][0]["country"] = "us";
                        loadObj["configs"]["weather"][0]["zipcode"] = 90210;
                        _dataStore(loadObj);
                        _configs = loadObj["configs"];
                    }

                    if (items.hasOwnProperty("tiles")) {
                        _stored = items;
                    } else {
                        _tiles = ["weather"];
                        _dataStore( {"tiles": ["weather"]} );
                        _stored = {"prefs": _prefs, "configs": _configs, "tiles": _tiles};
                    }
                    _tileLoader(_tiles);
                });
            },
            _tileSwapper = function _tileSwapper(o, n) {
                var low,
                    hi,
                    opp;

                if (o < n) {
                    //moved a tile right
                    low = o;
                    hi = n;
                    opp = 1;
                } else {
                    //moved a tile left
                    low = o;
                    hi = n;
                    opp = -1;
                }

                while (low != hi) {
                    //Grab the two switching tiles
                    var tileLen = $(".tile").length,
                        next = (low + (1 * opp));
                        lowTile = $(".tile[data-index='"+low+"']"),
                        nextTile = $(".tile[data-index='"+(next)+"']");

                    //switch their data-indexes
                    lowTile.data("index", next).attr("data-index", next);
                    nextTile.data("index", low).attr("data-index", low);

                    //need to swap the associated config files
                    var oldConfig, oldConfigKey, newConfig, newConfigKey;

                    if (_configs["weather"].hasOwnProperty(low)) {
                        oldConfig = _configs["weather"][low];
                        oldConfigKey = "weather";
                        delete _configs["weather"][low];
                        delete _stored["weather"][low];
                    } else {
                        oldConfig = _configs["stock"][low];
                        oldConfigKey = "stock";
                        delete _configs["stock"][low];
                    }

                    if (_configs["weather"].hasOwnProperty(next)) {
                        newConfig = _configs["weather"][next];
                        newConfigKey = "weather";
                        delete _configs["weather"][next];
                        delete _stored["weather"][next];
                    } else {
                        newConfig = _configs["stock"][next];
                        newConfigKey = "stock";
                        delete _configs["stock"][next];
                    }

                    _configs[oldConfigKey][next] = oldConfig;
                    _configs[newConfigKey][low] = newConfig;

                    //lastly swap in the tiles array
                    var oldLow = _tiles[low];
                    _tiles[low] = _tiles[next];
                    _tiles[next] = oldLow;

                    low += (1 * opp);
                }

                _stored["configs"] = _configs;
                _stored["tiles"] = _tiles;
                _dataStore({"configs": _configs});
                _dataStore({"tiles": _tiles});
                _dataStore({"weather": _configs["weather"]});
                weatherJs.resetter(_stored, _prefs, _configs);
            },
            _dataStore = function _dataStore(obj) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                });
            };
        return _init;
});