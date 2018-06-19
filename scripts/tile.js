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
        var _init = function _init(tile, index, error) {
                var newTile = $(tile).find(".tile");
                newTile.find(".fa-pencil").on("click", function() {
                    $(newTile).find(".front, .back, .fa-trash-o").toggle();
                });
                newTile.attr("data-index", index);

                if (!error) {
                    //we have data
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
                } else {
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
                }
            };

    return {
        init: _init
    };
});