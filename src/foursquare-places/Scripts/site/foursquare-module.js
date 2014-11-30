define([], function () {

    var app = angular.module('FoursquareModule', ['ngResource', 'ui.bootstrap']);
    app.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

            app.register =
            {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };
    }]);

    app.directive('mapDirective', function () {
       return {
           restrict: 'A',
           controller: 'MapController'
       }
    });

    return app;
})
