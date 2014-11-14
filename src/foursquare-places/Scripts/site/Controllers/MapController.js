module = angular.module('FoursquareModule');

module.controller('MapController', ['$scope', '$element', '$window', 'VenuesLoader', 'MarkerFormatter', 'MarkerUtils',
                           function ($scope, $element, $window, VenuesLoader, MarkerFormatter, MarkerUtils) {

    $scope.currentPosition = null;   

    if ($window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $scope.currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            });
        });
    } else {
        // TODO - show some location or ERROR
    }

     

    $scope.$watch('currentPosition', function(newValue, oldValue) {
        if (newValue) {

            VenuesLoader.getAll($scope, newValue);

            var latitude = newValue.latitude,
                longitude = newValue.longitude,
                centerPosition = new google.maps.LatLng(latitude, longitude),
                mapOptions = {
                    zoom: 18,
                    center: centerPosition
                };

            $scope.map = new google.maps.Map($element[0], mapOptions);

            MarkerFormatter.markPosition($scope.map, centerPosition);
        }
    });


    $scope.$watch('venues', function (newValue, oldValue) {

        //$scope.venues.length = 15;
        console.log($scope.venues);        
        
        newValue.forEach(function (item, i) {

            var marker = MarkerFormatter.markVenue(item, $scope.map, $scope.markers);

            /*if (marker.title == 'Nihao') {
                console.log(marker);
            }*/

            $scope.markers.push(marker);

            MarkerUtils.addMarkerListener(marker, $scope.map, item);
        });
    });
}]);