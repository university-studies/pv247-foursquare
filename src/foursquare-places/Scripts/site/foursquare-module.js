var module = angular.module('FoursquareModule', ['ngResource']);

module.directive('locationsMap', function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="areaMap" class="body-content"></div>',
        controller: 'MapController'
    }
});
