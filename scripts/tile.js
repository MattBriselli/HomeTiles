define([
    "jquery",
    "underscore",
    "moment",
    "Sortable"
    ],
    function(
        $,
        _,
        moment,
        Sortable
    ){
        var _stored,
            _prefs,
            _configs,
            /*
             * a brslli labs application
             * made by Matt Briselli
             * brslli.com
             */
            _init = function _init(tile, index) {
                var newTile = $(tile).find(".tile");
                newTile.find(".fa").on("click", function() {
                    $(newTile).find(".front, .back, .fa-trash-o").toggle();
                });
                newTile.attr("data-index", index);
                newTile.css("backgroundColor", "yellow");

                if ($(".tile[data-index='"+index+"']").length != 0) {
                    //a simple replacement
                    $(".tile[data-index='"+index+"']").replaceWith(newTile);
                } else {
                    //order matters, the user sets that preference
                    if (index == 0) {
                        //0 will always be first
                        $(".tileBody").prepend(newTile);
                    } else if ($(".tile[data-index='"+parseInt(index-1)+"']").length != 0) {
                        $(".tile[data-index='"+parseInt(index-1)+"']").after(newTile);
                    } else if ($(".tile[data-index='"+parseInt(index+1)+"']").length != 0) {
                        $(".tile[data-index='"+parseInt(index+1)+"']").before(newTile);
                    } else {
                        //very weird order, just stick it at the end and hope for the best
                        $(".tileBody").append(newTile);
                    }
                }
            };

    return _init;
});