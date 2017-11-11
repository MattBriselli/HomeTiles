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
        var _permissions,
            _stored,
            _cards,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init() {
                _loader();
                _bindListener();
            },
            _weatherCall = function _weatherCall() {
                _stored["zipcode"];
                $.ajax({
                    url: "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=a77b08a6d315fb4d974c16345ae1ba70",
                    type: "GET"
                })
                .done(function(wData) {
                    console.log(wData, _permissions);
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
            _loader = function _loader() {
                chrome.storage.sync.get(null, function(items) {
                    //null loads all of the data
                    _stored = items;
                    if (items) {
                        console.log(items);
                    }
                });
                chrome.storage.sync.remove("zipcode", function(items) {
                    //null loads all of the data
                    _stored = items;
                    if (true) {

                    }
                });
            };
        $(document).ready(function() {
            _init();
        });
});