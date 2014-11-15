angular.module('FoursquareModule').factory('MarkerUtils',
    ['InfoboxFormatter', function (InfoboxFormatter) {

        var infobox;
        return {
            filterMarkers: function (markers, categories, map) {
                angular.forEach(markers, function (value, key) {
                    if (categories[value.category] && value.map == null) {
                        value.setMap(map);
                    } else if (!categories[value.category] && value.map != null) {
                        value.setMap(null);
                    }
                });                
            },

            addMarkerListener: function (marker, map, item) {
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
                    infobox.open(map, this);
                });
            },

             findDuplicate: function (venue, markers) {
                var duplicate = false;

                if (markers.length > 0) {

                    for (var i = 0; i < markers.length; i++) {
                        if (markers[i].id === venue.Id) {
                            duplicate = true;
                            break;
                        }
                    }
                    /* native 'for' seems to perform better in Chrome 38
                    angular.forEach(markers, function (value, key) {
                        console.log(value)
                        if (venue.Id === value.id) {
                            duplicate = true;
                            return false;
                        }
                    });*/
                }

                if (!duplicate) {
                    return venue;
                } else {
                    return null;
                }
            },
        }
}]);