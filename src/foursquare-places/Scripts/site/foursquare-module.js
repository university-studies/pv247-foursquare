var module = angular.module('FoursquareModule', ['ngResource', 'ui.bootstrap']);

module.directive('mapDirective', function () {
    return {
        restrict: 'A',
        controller: 'MapController'
    }
});
