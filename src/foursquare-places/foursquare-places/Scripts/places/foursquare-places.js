var app = angular.module('FoursquarePlaces', []);

app.controller('MapController', ['$scope', function ($scope) {
    $scope.greeting = "hello from angular!";
}]);


app.directive('map', function () {



    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var pos = new google.maps.LatLng(position.coords.latitude,
                                                     position.coords.longitude);

                    var infowindow = new google.maps.InfoWindow({
                        map: gmap,
                        position: pos,
                        content: 'Location found using HTML5.'
                    });

                    gmap.setCenter(pos);
                }, function () {
                    handleNoGeolocation(true);
                });
            } else {
                // Browser doesn't support Geolocation
                handleNoGeolocation(false);
            }

            function handleNoGeolocation(errorFlag) {
                if (errorFlag) {
                    var content = 'Error: The Geolocation service failed.';
                } else {
                    var content = 'Error: Your browser doesn\'t support geolocation.';
                }

                var options = {
                    map: map,
                    position: new google.maps.LatLng(60, 105),
                    content: content
                };

                var infowindow = new google.maps.InfoWindow(options);
                map.setCenter(options.position);
            }

            var mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(40.69847032728747, -73.9514422416687)
            }

            var gmap = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
            map = gmap;
        }
    }
})