require.config({
  paths: {
    jquery: "../libraries/jquery-3.2.1.min",
    moment: "../node_modules/moment/moment",
    Sortable: "../node_modules/sortablejs/Sortable",
    underscore: "../node_modules/underscore/underscore-min"
  }

});

require([

  // Load our app module and pass it to our definition function
  'index',
], function(App){
  // The "app" dependency is passed in as "App"
  App.init();
});