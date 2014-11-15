module = angular.module('FoursquareModule');

module.controller('MapController', ['$scope', '$element', '$window', 'VenuesLoader', 'MarkerFormatter', 'MarkerUtils',
                           function ($scope, $element, $window, VenuesLoader, MarkerFormatter, MarkerUtils) {

    $scope.currentPosition = null;
    $scope.mapCenter = null;    

    if ($window.navigator.geolocation) {
        $window.navigator.geolocation.getCurrentPosition(function (position) {
            $scope.$apply(function () {
                $scope.currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                $scope.mapCenter = $scope.currentPosition;
            });
        });
    } else {
        // TODO - show some location or ERROR
    }     

    $scope.$watch('mapCenter', function(newValue, oldValue) {
        if (newValue) {
            
            VenuesLoader.getAll($scope, newValue);

            var latitude = newValue.latitude,
                longitude = newValue.longitude,
                maxZoom = 16;
                centerPosition = new google.maps.LatLng(latitude, longitude),
                mapOptions = {
                    zoom: 18,
                    center: centerPosition
                };
            
            if (!$scope.map) {                

                $scope.map = new google.maps.Map($element[0], mapOptions);

                MarkerFormatter.markPosition($scope.map, centerPosition);

                google.maps.event.addListener($scope.map, 'center_changed', function () {
                    var newCenter = $scope.map.getCenter(),
                        oldCenter = $scope.mapCenter,
                        distance = Math.sqrt(Math.pow(newCenter.k - oldCenter.latitude, 2) + Math.pow(newCenter.B - oldCenter.longitude, 2));

                    if (distance > 0.0015) {
                        $scope.$apply(function () {
                            $scope.mapCenter = { latitude: newCenter.k, longitude: newCenter.B };
                        });
                    }
                });

                google.maps.event.addListener($scope.map, 'zoom_changed', function () {
                    if ($scope.map.getZoom() < maxZoom) {
                        $scope.map.setZoom(maxZoom);
                    } 
                });
            }          
        }
    });

    $scope.$watch('venues', function (newValue, oldValue) {

        //$scope.venues.length = 15;
        //console.log($scope.venues);        
        
        newValue.forEach(function (item, i) {

            var marker,
                isNotDuplicateItem = MarkerUtils.findDuplicate(item, $scope.markers);

            if (isNotDuplicateItem) {
                marker = MarkerFormatter.markVenue(item, $scope.map, $scope.markers);

                $scope.markers.push(marker);

                MarkerUtils.addMarkerListener(marker, $scope.map, item);
            }           
        });
        
    });
}]);