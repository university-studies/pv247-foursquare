var module = angular.module('FoursquareModule', ['ngResource']);

module.directive('mapDirective', function () {
    return {
        restrict: 'A',
        controller: 'MapController'
    }
});
