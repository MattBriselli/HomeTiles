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
                    var tiles = $(".tileBody");
                    Sortable.create(tiles[0], {
                        animation: 150,
                        draggable: ".tile.sort",
                        onUpdate: function(e) {
                            var oldI = e.oldIndex,
                                newI = e.newIndex,
                                target = $(e.currentTarget);
                            //need to reorder the _configs, _stored and data-indexes

                        }
                    });
                    $(".tile.sort").on("mousedown", _tileSort);
                });
                $(".editBody .tiles button").on("click", function(e) {
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
                        _configs[tVal][nInd] = {};
                    }
                    _dataStore({"configs": _configs});
                    _tileLoader(tVal, nInd);
                });
                $(".units input").on("change", function(e) {
                    var val = $(e.currentTarget).attr("class");
                    _prefs["unit"] = val; 
                    _dataStore({"prefs": _prefs});
                });
                $(".background input").on("blur", function(e) {
                    var link = $(e.currentTarget);
                    
                    if (isValidURL(link.val())) {
                        $("body").css("background-image", "url('"+link.val()+"')");
                        _prefs["back"] = link.val();
                        _dataStore({"prefs": _prefs});
                    } else {
                        link.text("Please Enter a Valid Url");
                    }

                    function isValidURL(url){
                        var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                        if(RegExp.test(url)){
                            return true;
                        }else{
                            return false;
                        }
                    } 
                });
                $(".reset").on("click", function() {
                    chrome.storage.sync.clear();
                    $(".background input").focus();
                    $(".background input").val("http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-1.jpg");
                    $(".background input").blur();
                    $(".tile").remove();
                    _init();
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
                            $("body").css("background-image", "url('"+data[index]+"')");
                            $(".background input").val(data[index]);
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
                    if (items.hasOwnProperty("prefs")) {
                        _prefLoader(items["prefs"]);
                    } else {
                        _dataStore({"prefs": {"unit": "imperial", 
                            "back": "http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-1.jpg"}} );
                        $("body").css("background-image",
                            "url('http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-1.jpg')");
                        $(".background input").val("http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-1.jpg");
                        _prefs = {"unit": "imperial", 
                            "back": "http://wallpaper-gallery.net/images/weather-wallpaper/weather-wallpaper-1.jpg"};
                        _prefLoader(items["prefs"]);
                    }
                    if (!items.hasOwnProperty("configs")) {
                        var loadObj = {"configs": {"weather": {0: {}}}};
                        loadObj["configs"]["weather"][0]["country"] = "us";
                        loadObj["configs"]["weather"][0]["zipcode"] = 90210;
                        _dataStore(loadObj);
                        _configs = loadObj["configs"];
                    }

                    if (items.hasOwnProperty("tiles")) {
                        _stored = items;
                        _tileLoader(items["tiles"]);
                    } else {
                        _tiles = ["weather"];
                        _dataStore( {"tiles": ["weather"]} );
                        _tileLoader(["weather"]);
                    }
                });
            },
            _dataStore = function _dataStore(obj) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                });
            },
            _tileSort = function _tileSort(e) {
                e.stopImmediatePropagation();
                var target = $(e.currentTarget);
                target.addClass("mousedown");
                target.on("mouseup", function(e) {
                    $(".tile").removeClass("mousedown");
                });
            };
        return _init;
});