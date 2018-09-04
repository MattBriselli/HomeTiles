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
        /*
         * a brslli labs application
         * made by Matt Briselli
         * brslli.com
         */
        var _init = function _init(tile, index) {
            var newTile = _newTileSet(tile, index);

            if ($(".tile[data-index='"+index+"']").length != 0) {
                //a simple replacement
                $(".tile[data-index='"+index+"']").replaceWith(newTile);
            } else {
                //order matters, the user sets that preference
                if (index == 0) {
                    //0 will always be first
                    $(".tileBody").prepend(newTile);
                } else {
                    var added = false;
                    $(".tile").each(function() {
                        var thisIndex = $(this).data("index");
                        if (thisIndex == index - 1 && !added) {
                            $(this).after(newTile);
                            added = true;
                        } else if (!added && thisIndex > index) {
                            $(this).before(newTile);
                            added = true;
                        }
                    });
                    if (!added) {
                        $(".tileBody").append(newTile);
                    }
                }
            }
        },
        _error = function _error(tile, index, error) {
            var newTile = _newTileSet(tile, index);
            if ($(tile).find(".weather").length > 0) {
                //no data, throw an error msg
                var place = (error["city"] ? error["city"] + ", " + error["country"] : error["zipcode"]);
                if (!error["country"]) {
                    place = "Beverly Hills, CA";
                }

                newTile.find(".front .top").html("<div class='error'><div>Error Loading Data for</div><div>" +
                    place + "</div></div>");
                if ($(".tile[data-index='"+index+"']").length != 0) {
                    $(".tile[data-index='"+index+"']").replaceWith(newTile);
                } else {
                    $(".tileBody").append(newTile);
                }
            } else {
                newTile.find(".front .top").html("<div class='error'><div>Error Loading Data for</div><div>" +
                    error["stock"] + "</div></div>");
                if ($(".tile[data-index='"+index+"']").length != 0) {
                    $(".tile[data-index='"+index+"']").replaceWith(newTile);
                } else {
                    $(".tileBody").append(newTile);
                }
            }
        },
        _newTileSet = function _newTileSet(tile, index) {
            var newTile = $(tile).find(".tile");
            newTile.find(".fa-pencil").on("click", function() {
                $(newTile).find(".front, .back, .fa-trash-o").toggle();
                $(newTile).find(".back input").first().focus();
            });
            newTile.attr("data-index", index);
            return newTile;
        };


    return {
        init: _init,
        error: _error
    };
});