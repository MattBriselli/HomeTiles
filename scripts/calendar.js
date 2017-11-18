define([
    "jquery",
    "underscore",
    "moment",
    "tile",
    "text!../tiles/calendar.html"
    ],
    function(
        $,
        _,
        moment,
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

                if (!_stored["calendar"]) {
                    _stored["calendar"] = {"index": {}};
                }

                _tileStyler(_stored["calendar"][index]);

            },
            _tileStyler = function _tileStyler(wData, index) {
                var tile = $(_tmpl),
                    tF = tile.find(".top .front");
                if (_configs && _configs["calendar"]) {

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
    }
});