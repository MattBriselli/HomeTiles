require.config({
    //By default load any module IDs from js/lib
    baseUrl: '.',

    paths: {
        jquery: 'node_modules/jquery/src/jquery',
        underscore: 'node_modules/underscore/underscore-min'
    },

    shim: {
        jquery: {
          exports: '$'
        },
        underscore: {
            deps:["jquery"],
            exports: '_'
        }
      }
});

require(['underscore']);