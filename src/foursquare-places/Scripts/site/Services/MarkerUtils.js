define(["foursquare-module", "Services/InfoboxFormatter"], function (app, formatter) {

    var injectParams = ["InfoboxFormatter"];
    var MarkerUtils = function (InfoboxFormatter) {

        return {
            addMarkerListener: addMarkerListener,
            filterMarkers: filterMarkers,
            findDuplicate: findDuplicate
        };

        function addMarkerListener (marker, $scope, item) {
            google.maps.event.addListener(marker, "click", function (e) {

                $scope.infoBox.close();
                $scope.infoBox.setContent(InfoboxFormatter.createContent(item));
                $scope.infoBox.open($scope.map, this);
            });
        }

       function filterMarkers (markers, categories, map) {
            angular.forEach(markers, function (value, key) {
                if (categories[value.category] && value.map === null) {
                    value.setMap(map);
                } else if (!categories[value.category] && value.map !== null) {
                    value.setMap(null);
                }
            });
        }

        function findDuplicate (venue, markers) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].id === venue.Id) {
                    return null;
                }
            }

            return venue;
        }
    }

    MarkerUtils.$inject = injectParams;
    app.factory("MarkerUtils", MarkerUtils);
});
