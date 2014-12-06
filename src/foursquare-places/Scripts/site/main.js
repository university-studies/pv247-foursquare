require.config({

    paths: {
        angular: '../lib/angular',
        angularResource: '../lib/angular-resource',
        uiBootstrap: '../lib/ui-bootstrap-tpls-0.11.2'
    },

    shim: {
        'angular': { 'exports': 'angular' },
        'angularResource': ['angular'],
        'uiBootstrap': {
            deps: ['angular'],
            exports: 'uiBootstrap'
        },
    }
});

require(["foursquare-module",
         "Controllers/AppController",
         "Controllers/NavbarController",
         "Controllers/MapController",
        ],

         function () {
            angular.bootstrap(document, ['FoursquareModule']);
});