require.config({
    paths: {
        jquery: "../libraries/jquery-3.2.1.min",
        moment: "../node_modules/moment/moment",
        Sortable: "../node_modules/sortablejs/Sortable",
        underscore: "../node_modules/underscore/underscore-min",
        d3: "../libraries/d3.v4.min",
        text: "../node_modules/text/text",
        tab: "index"
    }
});

require(["tab"], function(App){
    // The "app" dependency is passed in as "App"
    App();
});