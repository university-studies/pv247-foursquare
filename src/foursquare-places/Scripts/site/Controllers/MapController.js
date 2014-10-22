module = angular.module('FoursquareModule');

module.controller('MapController', ['$scope', 'Geolocation', 'CurrentLocation', '$http', function ($scope, Geolocation, CurrentLocation, $http) {
    $scope.greeting = "hello from angular!";

    var map;

    var init = function () {
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(40.69847032728747, -73.9514422416687)
        }

        map = new google.maps.Map(document.getElementById('areaMap'), mapOptions);
    };

    var processGeolocation = function (data) {
        var infowindow = new google.maps.InfoWindow({
            map: map,
            position: data.position,
            content: data.content
        });
        map.setCenter(data.position);
    };

    var advertizeCurrentLocation = function (data) {
        //CurrentLocation.save(data.position);
        
       
        var loc = {latitude: data.position.B, longitude: data.position.k}
        $http.post('/api/venues', loc)
            .success(function (data, status, headers, config) {
                console.log("succ")
            })
            .error(function (data, status, headers, config) {
                console.log("err")
            })

    };

    Geolocation.getLocation().then(function (data) {
        console.log(data);
        advertizeCurrentLocation(data);
        init();
        processGeolocation(data);
    });
}]);