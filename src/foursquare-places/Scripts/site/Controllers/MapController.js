module = angular.module('FoursquareModule');

module.controller('MapController', ['$scope', '$element', '$window', 'venuesLoader', 'InfoboxFormatter',
                           function ($scope, $element, $window, venuesLoader, InfoboxFormatter) {

    $scope.venues = [];
    $scope.currentPosition = null;
    $scope.map = null;
    $scope.markers = [];

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
            initVenues(newValue);

            var latitude = newValue.latitude;
            var longitude = newValue.longitude;

            var centerPosition = new google.maps.LatLng(latitude, longitude);
            var mapOptions = {
                zoom: 18,
                center: centerPosition
            }          

            $scope.map = new google.maps.Map($element[0], mapOptions);

            var positionMarker = new google.maps.Marker({
                icon: 'http://google.com/mapfiles/arrow.png',
                map: $scope.map,
                position: centerPosition,
                title: 'You are here!'
            });
        }
    });


    $scope.$watch('venues', function (newValue, oldValue) {
        console.log($scope.venues);
        $scope.markers = [];
        var infobox;
        newValue.forEach(function (item, i) {

            var latlng = new google.maps.LatLng(item.location.lat, item.location.lng);

            var marker = new google.maps.Marker({
                map: $scope.map,
                position: latlng,
                title: item.name,
                clickable: true,
            });

            $scope.markers.push(marker);

            google.maps.event.addListener(marker, "click", function (e) {
                if (infobox) {
                    infobox.close();
                }
                InfoboxFormatter.addElement(item);
                infobox = new InfoBox({
                    content: document.getElementById("infobox"),
                    disableAutoPan: false,
                    maxWidth: 150,
                    pixelOffset: new google.maps.Size(-140, 0),
                    zIndex: null,
                    boxStyle: {
                        background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                        opacity: 0.75,
                        width: "280px"
                    },
                    closeBoxMargin: "12px 4px 2px 2px",
                    closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                    infoBoxClearance: new google.maps.Size(1, 1)
                });
                infobox.open($scope.map, this);
            });          
        });
    });

    function initVenues(position) {
        venuesLoader.getAll($scope, position);
    }

    function addInfoBox() { }
}]);