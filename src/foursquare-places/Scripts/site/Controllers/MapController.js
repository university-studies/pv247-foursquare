define(["foursquare-module", "Services/MarkerFormatter", "Services/MarkerFormatter", "Services/VenuesLoader"], function (app) {
    
    var injectParams = ['$scope', '$element', '$window', 'VenuesLoader', 'MarkerFormatter', 'MarkerUtils'];
    var MapController = function ($scope, $element, $window, VenuesLoader, MarkerFormatter, MarkerUtils) {

        var infoBoxOptions = {
            content: "",
            disableAutoPan: false,
            maxWidth: 150,
            pixelOffset: new google.maps.Size(-110, 0),
            zIndex: null,
            boxStyle: {
                //background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                width: "220px"
            },
            closeBoxMargin: "0px -9px 0px 0px",
            closeBoxURL: "http://www.kalladatravels.com/close.png",
            infoBoxClearance: new google.maps.Size(1, 1)
        };

        $scope.currentPosition = null;
        $scope.mapCenter = null;
        $scope.infoBox = new InfoBox(infoBoxOptions);

        var mapOptions = {
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
                        maxZoom = 14;
                    centerPosition = new google.maps.LatLng(latitude, longitude);

                    $scope.map.initialized = true;
                    $scope.map.setZoom(16);
                    $scope.map.setCenter(centerPosition);

                    MarkerFormatter.markPosition($scope.map, centerPosition);

                    $scope.addMapCenterChangedListener();

                    google.maps.event.addListener($scope.map, 'zoom_changed', function () {
                        if ($scope.map.getZoom() < maxZoom) {
                            $scope.map.setZoom(maxZoom);
                        }
                    });
                }
            }
        });

        

        $scope.$watch('venues', function (newValue, oldValue) {
            console.log($scope.venues)
            newValue.forEach(function (item, i) {
                var marker,
                    isNotDuplicateItem = MarkerUtils.findDuplicate(item, $scope.markers);

                if (isNotDuplicateItem) {
                    marker = MarkerFormatter.markVenue(item, $scope.map, $scope.categories);
                    $scope.markers.push(marker);

                    MarkerUtils.addMarkerListener(marker, $scope, item);
                }
            });

        });
    }

    MapController.$inject = injectParams;
    app.controller("MapController", MapController);
});

