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

    return {
        markVenue: function (venue, map, markers) {

            var latlng = new google.maps.LatLng(venue.Location.Latitude, venue.Location.Longitude),
                size = determineIconSize(venue),
                image = determineIcon(venue),
                markerIcon = new google.maps.MarkerImage(
                    image,
                     null,
                     null,
                     null,
                     new google.maps.Size(size, size)
                );            
            
            var marker = new google.maps.Marker({
                icon: markerIcon,
                map: map,
                position: latlng,
                title: venue.Name,
                clickable: true,
                category: venue.Category
            });            

            markers.push(marker);
            return marker;
        }, 

        filterMarkers: function (markers, categories, map) {

            for (i in markers) {                
                if (categories[markers[i].category] && markers[i].map == null) {                    

                    markers[i].setMap(map);
                    console.log(markers[i])

                } else if (!categories[markers[i].category] && markers[i].map != null) {

                    markers[i].setMap(null);
                    console.log(markers[i])

                }
            }
        }
    };
});

