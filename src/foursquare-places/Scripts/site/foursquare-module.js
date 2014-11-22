angular.module('FoursquareModule', ['ngResource', 'ui.bootstrap']).directive('mapDirective', function () {
    return {
        restrict: 'A',
        controller: 'MapController'
    }
});
