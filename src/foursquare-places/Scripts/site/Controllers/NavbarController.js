define(["foursquare-module", "Services/MarkerUtils"], function (app) {

    var injectParams = ['$scope', '$window', 'MarkerUtils'];
    var NavbarController = function ($scope, $window, MarkerUtils) {

        $scope.toggleCategory = function (category) {
            $scope.categories[category] = !$scope.categories[category];            
            MarkerUtils.filterMarkers($scope.markers, $scope.categories, $scope.map);
        };        

        $scope.toCurrentPosition = function () {            
            google.maps.event.clearListeners($scope.map, 'center_changed');
            $scope.map.setCenter(new google.maps.LatLng($scope.currentPosition.latitude, $scope.currentPosition.longitude));
            $scope.addMapCenterChangedListener();
        };
    };

    NavbarController.$inject = injectParams;
    app.controller("NavbarController", NavbarController);
});

