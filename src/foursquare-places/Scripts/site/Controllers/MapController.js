module = angular.module('FoursquareModule');

module.controller('MapController', ['$scope', '$element', '$window', 'venuesLoader',
                           function ($scope, $element, $window, venuesLoader) {

    $scope.venues = [];
    $scope.currentPosition = null;
    $scope.map = null;

    if ($window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $scope.currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            });
        });
    }

    $scope.$watch('currentPosition', function(newValue, oldValue) {
        if (newValue) {
            initVenues();

            var latitude = newValue.latitude;
            var longitude = newValue.longitude;

            var centerPosition = new google.maps.LatLng(latitude, longitude);
            var mapOptions = {
                zoom: 18,
                center: centerPosition
            }

            $scope.map = new google.maps.Map($element[0], mapOptions);
        }
    });


    $scope.$watch('venues', function (newValue, oldValue) {
        newValue.forEach(function (item, i) {

            var latlng = new google.maps.LatLng(item.location.lat, item.location.lng);

            var infowindow = new google.maps.Marker({
                map: $scope.map,
                position: latlng,
                title: item.name
            });
        });
    });

    function initVenues() {
        venuesLoader.getAll($scope, $scope.venues);
    }
}]);