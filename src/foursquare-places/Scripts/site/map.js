window.namespace("cz.muni.pv247.foursquare.map");

$(function () {

    console.log("jquery beffore init");
    console.log("jquery after init");

    google.maps.event.addDomListener(window, 'load', cz.muni.pv247.foursquare.map.init);
})

cz.muni.pv247.foursquare.map = (function (config) {

    console.log("foursquare map");
    //var initialLocation;
    //var siberia = new google.maps.LatLng(60, 105);
    //var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
    //var browserSupportFlag = new Boolean();

    function initialize() {
        var mapOptions = {
            zoom: 15
        };
        map = new google.maps.Map(document.getElementById(config.selectors.map),
            mapOptions);

        // Try HTML5 geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = new google.maps.LatLng(position.coords.latitude,
                                                 position.coords.longitude);

                var infowindow = new google.maps.InfoWindow({
                    map: map,
                    position: pos,
                    content: 'Location found using HTML5.'
                });

                map.setCenter(pos);
            }, function () {
                handleNoGeolocation(true);
            });
        } else {
            // Browser doesn't support Geolocation
            handleNoGeolocation(false);
        }
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

    return {
        init: initialize 
    };
})(cz.muni.pv247.foursquare.config)
