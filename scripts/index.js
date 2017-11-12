requirejs([
    "node_modules/jquery/src/jquery",
    "node_modules/underscore/underscore",
    "node_modules/moment/moment",
    "node_modules/sortablejs/Sortable",
    ],
    function(
        $,
        _,
        moment,
        Sortable
    ){
        var _stored,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init() {
                _stored = {};

                _loader(null);
                _bindListener();
            },
            _weatherCall = function _weatherCall() {
                _stored["zipcode"];
                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a77b08a6d315fb4d974c16345ae1ba70",
                    type: "GET"
                })
                .done(function(wData) {
                    console.log(wData);
                })
                .fail(function(error) {
                    console.log("ERROR");
                    console.log("FAILED TO GET WEATHER data");
                });
            },
            _stockLoader = function _stockLoader() {
                var apiKey = "LRRFZ6VVIF8ODL1D";
            },
            _bindListener = function _bindListener() {
                $(".editMode .fa-pencil").on("click", function() {
                    if ($(".editPanel").css("right") == "0px" || $(".editPanel").css("right") == "0%") {
                        direction = '-19%';
                    } else {
                        direction = '0%';
                    }
                    $(".editPanel").animate({
                        "right": direction
                    }, 500);
                });
                $(".editMode .fa").on("mouseover", function(e) {

                });
            },
            _loader = function _loader(keyL) {
                chrome.storage.sync.get(keyL, function(items) {
                    //null loads all of the data
                    _stored = items;
                    if (items && items.hasOwnProperty("tiles")) {
                        console.log(items);
                    } else {
                        //the user hasn't set preferences, let's give them some times
                        _store("tiles", ["weather", "stock"]);
                    }
                });
            },
            _store = function _store(keyS, value) {
                data = {};
                //weird things happened with single line object init and assignment
                data[keyS] = value;
                chrome.storage.sync.set(data, function() {
                    //null loads all of the data
                    console.log("STORED: "+keyS+" as "+value);
                });
                _stored[keyS] = value;
            };
        $(document).ready(function() {
            _init();
        });
});