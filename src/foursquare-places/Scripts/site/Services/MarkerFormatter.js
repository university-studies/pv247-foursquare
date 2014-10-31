angular.module('FoursquareModule').factory('MarkerFormatter', function () {

    var determineIconSize = function (venue) {
        var checkins = venue.stats.checkinsCount,            
            size = 20;

        if (checkins < 50) {
            size = 20;
        }else if (checkins < 100) {
            size = 38;
        }else if (checkins < 500) {
            size = 46;
        } else if (checkins < 1000) {
            size = 56;
        }
        return size;
    }

    return {
        markVenue: function (venue, map, markers) {
            var latlng = new google.maps.LatLng(venue.location.lat, venue.location.lng),
                size = determineIconSize(venue),
                markerIcon = new google.maps.MarkerImage(
                    'http://maps.google.com/mapfiles/kml/pal3/icon31.png',
                     null,
                     null,
                     null,
                     new google.maps.Size(size, size)
                );
            
            var marker = new google.maps.Marker({
                icon: markerIcon,
                map: map,
                position: latlng,
                title: venue.name,
                clickable: true
            });            

            markers.push(marker);
            return marker;
        }
    };
});
