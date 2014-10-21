var app = angular.module('FoursquarePlaces', ['ngResource']);

app.directive('locationsMap', function () {
    return {
        restrict: 'A',
        replace: true,
        template: '<div id="areaMap" class="body-content"></div>',
        controller: 'MapController'
    }
});

