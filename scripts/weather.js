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
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init() {
                console.log("now");

            };

        return {
            init: _init
        };
});