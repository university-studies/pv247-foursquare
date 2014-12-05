define(["foursquare-module"], function (app) {

    var injectParams = ['$scope', '$window'];
    var AppController = function ($scope, $window) {

        $scope.map = null;
        $scope.venues = [];
        $scope.categories = {};
        $scope.markers = [];
        $scope.currentPosition = null;
        $scope.categories = {
            'Arts & Entertainment': true,
            'Restaurant': true,
            'School & Business': true,
            'Residence & Recreation': true,
            'Travel & Transport': true,
            'Shop & Service': true,
            'Unknown': true
        };

        $scope.addMapCenterChangedListener = function () {
            google.maps.event.addListener($scope.map, 'center_changed', function () {
                var newCenter = $scope.map.getCenter(),
                    oldCenter = $scope.mapCenter,
                    distance = Math.sqrt(Math.pow(newCenter.k - oldCenter.latitude, 2) + Math.pow(newCenter.B - oldCenter.longitude, 2));

                if (distance > 0.0015) {
                    $scope.$apply(function () {
                        $scope.mapCenter = { latitude: newCenter.k, longitude: newCenter.B };
                    });
                }
            });
        };

        if ($window.location.hash && $window.location.hash == '#_=_') {
            $window.location.hash = '';
        }
    }

    AppController.$inject = injectParams;
    app.controller("AppController", AppController);
});
