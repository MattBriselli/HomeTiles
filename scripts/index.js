requirejs([
    "node_modules/jquery/src/jquery",
    "node_modules/moment/moment"
    ],
    function(
        $,
        moment
    ){
        var _init = function _init() {
            _weatherCall();
            chrome.permissions.contains({
                permissions: ['storage']
              }, function(result) {
                console.log(result)
              });
              
            console.log(moment);
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
        }   

        _init();
});