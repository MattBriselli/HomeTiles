require.config({
    paths: {
        jquery: "../libraries/jquery-3.2.1.min",
        moment: "../node_modules/moment/moment",
        Sortable: "../node_modules/sortablejs/Sortable",
        underscore: "../node_modules/underscore/underscore-min",
        text: "../node_modules/text/text",
        tab: "index",
        calendarCall: "https://apis.google.com/js/api"
    }
});

require(["tab"], function(App){
    // The "app" dependency is passed in as "App"
    App();
});