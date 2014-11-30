define(["foursquare-module", "Services/MarkerFormatter", "Services/MarkerFormatter", "Services/VenuesLoader"], function (app) {
    
    var injectParams = ['$scope', '$element', '$window', 'VenuesLoader', 'MarkerFormatter', 'MarkerUtils'];
    var MapController = function ($scope, $element, $window, VenuesLoader, MarkerFormatter, MarkerUtils) {

        $scope.currentPosition = null;
        $scope.mapCenter = null;

        mapOptions = {
            zoom: 3,
            center: new google.maps.LatLng(46.545080, -23.830474)
        };

        $scope.map = new google.maps.Map($element[0], mapOptions);
        $scope.map.initialized = false;

        var geoSucc = function (position) {
            $scope.$apply(function () {
                $scope.currentPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                $scope.mapCenter = $scope.currentPosition;
            });
        };

        var geoErr = function () {
            alert("You have to allow geolocation for this app to work properly.");
        }


        if ($window.navigator.geolocation) {
            $window.navigator.geolocation.getCurrentPosition(geoSucc, geoErr);

        } else {
            alert("Geolocation failed. Check your Internet connection.");
        }

        $scope.$watch('mapCenter', function (newValue, oldValue) {
            if (newValue) {

                VenuesLoader.getAll($scope, newValue);

                if (!$scope.map.initialized) {
                    var latitude = newValue.latitude,
                        longitude = newValue.longitude,
                        maxZoom = 16;
                    centerPosition = new google.maps.LatLng(latitude, longitude);

                    $scope.map.initialized = true;
                    $scope.map.setZoom(18);
                    $scope.map.setCenter(centerPosition);

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

            //$scope.venues.length = 5;
            //console.log($scope.venues);        

            newValue.forEach(function (item, i) {

                var marker,
                    isNotDuplicateItem = MarkerUtils.findDuplicate(item, $scope.markers);

                if (isNotDuplicateItem) {
                    marker = MarkerFormatter.markVenue(item, $scope.map, $scope.categories);
                    console.log(marker)
                    $scope.markers.push(marker);

                    MarkerUtils.addMarkerListener(marker, $scope.map, item);
                }
            });

        });
    }

    MapController.$inject = injectParams;
    app.controller("MapController", MapController);
});

