require.config({
  paths: {
    jquery: "../libraries/jquery-3.2.1.min",
    moment: "../node_modules/moment/moment",
    Sortable: "../node_modules/sortablejs/Sortable",
    underscore: "../node_modules/underscore/underscore-min",
    text: "../node_modules/text/text",
    tab: "index"
  }
});

require([
  "tab"
  // Load our app module and pass it to our definition function
  ,
], function(App){
  // The "app" dependency is passed in as "App"
  App.init();
});