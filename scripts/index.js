define("tab", [
    "jquery",
    "moment",
    "Sortable",
    "underscore",
    "stock",
    "weather"
    ],
    function(
        $,
        moment,
        Sortable,
        _,
        stockJs,
        weatherJs
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
                $(".background input").on("blur", function(e) {
                    var link = $(e.currentTarget);
                    
                    if (isValidURL(link.val())) {
                        $("body").css("background-image", "url('"+link.val()+"')");
                        var backPref = {"prefs": {}};
                        backPref["prefs"]["back"] = link.val();
                        _prefs["back"] = link.val();
                        _dataStore(backPref);
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
                            weatherJs.init(index, _stored, _prefs, _configs);
                            break;
                        case "stock":
                            stockJs.init(index, _stored, _prefs, _configs);
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
                        if (index = "back") {
                            $("body").css("background-image", "url('"+data[index]+"')");
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
            },
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
        return _init;
});