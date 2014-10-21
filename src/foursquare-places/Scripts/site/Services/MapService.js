app.factory('CurrentLocation', function ($resource) {
    return $resource('api/location/:id')
});

app.factory('Geolocation', [function () {

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
