angular.module('FoursquareModule').factory('MarkerFormatter', function () {

    var categoriesList = ['Arts & Entertainment',
                                 'Restaurant',
                                 'School & Business',
                                 'Residence & Recreation',
                                 'Travel & Transport',
                                 'Shop & Service',
                                 'Unknown'];

    var determineIconSize = function (venue) {
        var checkins = venue.CheckinsCount,            
            size = 20;
        if (checkins < 50) {
            size = 20;
        }else if (checkins < 100) {
            size = 38;
        }else if (checkins < 500) {
            size = 46;
        } else {
            size = 56;
        }
        return size;
    }

    var determineIcon = function (venue) {
        var value = 'http://maps.google.com/mapfiles/kml/pal3/icon31.png';        
        switch (venue.Category) {
            case categoriesList[0]:
                value = 'http://maps.google.com/mapfiles/kml/pal2/icon27.png';
                break;
            case categoriesList[1]:
                value = 'http://maps.google.com/mapfiles/kml/pal2/icon40.png';
                break;
            case categoriesList[2]:
                value = 'http://maps.google.com/mapfiles/kml/pal2/icon61.png';
                break;
            case categoriesList[3]:
                value = 'http://maps.google.com/mapfiles/kml/pal2/icon28.png';
                break;
            case categoriesList[4]:
                value = 'http://maps.google.com/mapfiles/kml/pal2/icon56.png';
                break;
            case categoriesList[5]:
                value = 'http://maps.google.com/mapfiles/kml/pal3/icon26.png';
                break;
        }
        
        return value;
    };

    var setMapForNewMarker = function (venue, map, categories) {
        for (var category in categories) {
            if (venue.Category === category) {
                if (categories[category]) {
                    return map;
                }
                break;
            }
        }
        return null;
    };
    

    return {
        markVenue: function (venue, map, categories) {

            var latlng = new google.maps.LatLng(venue.Location.Latitude, venue.Location.Longitude),
                size = determineIconSize(venue),
                image = determineIcon(venue),
                mapToSet = setMapForNewMarker(venue, map, categories),
                markerIcon = new google.maps.MarkerImage(
                    image,
                     null,
                     null,
                     null,
                     new google.maps.Size(size, size)
                );            
            
            var marker = new google.maps.Marker({
                icon: markerIcon,
                map: mapToSet,
                position: latlng,
                title: venue.Name,
                clickable: true,
                category: venue.Category,
                id: venue.Id
            });        
            return marker;
        },

        markPosition: function (map, centerPosition) {
            new google.maps.Marker({
                icon: 'http://google.com/mapfiles/arrow.png',
                map: map,
                position: centerPosition,
                title: 'You are here!'
            });
        },
    };
});

