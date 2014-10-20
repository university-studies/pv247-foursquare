var app = angular.module('FoursquarePlaces', ['ngResource']);

app.controller('MapController', ['$scope', 'Geolocation', 'CurrentLocation', function ($scope, Geolocation, CurrentLocation) {
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
        CurrentLocation.save(data.position);
    };
    
    Geolocation.getLocation().then(function (data) {
        console.log(data);
        advertizeCurrentLocation(data);
        init();
        processGeolocation(data);

    });

    
        
}])


app.directive('locationsMap', function () {

    return {
        restrict: 'A',
        replace: true,
        template: '<div id="areaMap" class="body-content"></div>',
        controller: 'MapController'
    }
});

app.factory('CurrentLocation', function ($resource) {
    return $resource('api/location/:id')
});

app.factory('Geolocation', [ function () {

    return {
        getLocation: function () {
            if (navigator.geolocation) {
                return new Promise(function (resolve, reject) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                        if (pos) {
                            resolve({ position: pos, content: 'Location found using HTML5.' });
                        } else
                            reject({ position: new google.maps.LatLng(60, 105), content: 'Error: The Geolocation service failed.' });
                    });
                });

            } else {
                return new Promise(function (resolve, reject) {
                    reject({ position: new google.maps.LatLng(60, 105), content: 'Geolocation not available in your browser, sorry.' });
                });
            }            
        } 
    }
}]);

