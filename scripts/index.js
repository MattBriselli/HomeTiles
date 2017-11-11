requirejs([
    "node_modules/jquery/src/jquery",
    "node_modules/moment/moment"
    ],
    function(
        $,
        moment
    ){
        var _permissions,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init() {
                _weatherCall();
                _bindListener()
            },
            _weatherCall = function _weatherCall() {
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
            _bindListener = function _bindListener() {
                $(".editMode .fa-pencil").on("click", function() {
                    if ($(".editPanel").css("right") == "0px" || $(".editPanel").css("right") == "0%") {
                        direction = '-16%'
                    } else {
                        direction = '0%';
                    }
                    $(".editPanel").animate({
                        "right": direction
                    }, 500);
                });
                $(".editMode .fa").on("mouseover", function(e) {

                });
            };
        $(document).ready(function() {
            _init();
        });
});