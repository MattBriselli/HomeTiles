define([
    "jquery",
    "underscore",
    "moment",
    "Sortable",
    "tile",
    "text!../tiles/stock.html"
    ],
    function(
        $,
        _,
        moment,
        Sortable,
        tileJs,
        tmpl
    ){
        var _stored,
            _prefs,
            _configs,
            _tmpl,
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

                var url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=",
                    keys = ["AK45C9WF40HN3PRW", "LYSB01MBM0109645"];
                url += "GOOG" +"&interval=60min&apikey=" + keys[0];
                $.ajax({
                    url: url,
                    type: "GET"
                })
                .done(function(data) {
                    console.log(data)
                    var dataSet = data["Time Series (60min)"],
                        minD = Number.MAX_SAFE_INTEGER,
                        maxD = 0,
                        newest = _.values(dataSet)[0];

                    for (var j in dataSet) {
                        var targ = dataSet[j];

                        if (targ["3. low"] < minD) {
                            minD = targ["3. low"];
                        }
                        if (targ["2. high"] > maxD) {
                            maxD = targ["2. high"];
                        }
                    }

                    console.log(newest, minD, maxD);

                    _tileStyler(data, index);
                })
                .fail(function(error) {
                    console.log('ERROR');
                    console.log(error);
                    console.log('FAILED TO LOAD STOCK DATA');
                });
            },
            _tileStyler = function _tileStyler(wData, index) {
                var tile = $(_tmpl),
                    tF = tile.find(".top .front");
                if (_configs && _configs["stock"]) {

                }
                tileJs(tile, index);
            },
            _dataStore = function _dataStore(obj, index) {
                chrome.storage.sync.set(obj, function() {
                    //null loads all of the data
                    console.log("STORED: "+obj+" and "+index);
                });
            };

        return {
            init: _init
        };
});