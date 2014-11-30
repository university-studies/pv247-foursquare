require.config({
});

require(["foursquare-module",
         "Controllers/AppController",
         "Controllers/NavbarController",
         "Controllers/MapController",
        ],

         function () {
            angular.bootstrap(document, ['FoursquareModule']);
});