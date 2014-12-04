define(["foursquare-module", "Services/MarkerUtils"], function (app) {

    var injectParams = ['$scope', '$window', 'MarkerUtils'];
    var NavbarController = function ($scope, $window, MarkerUtils) {

        var initNavbarStyle = true;

        $scope.toggleCategory = function (category) {
            $scope.navCollapsed = true;
            initNavbarStyle = false;
            for (var cat in $scope.categories) {                
                if (cat == category) {
                    $scope.categories[cat] = true;
                } else {
                    $scope.categories[cat] = false;
                }                
            }
                       
            MarkerUtils.filterMarkers($scope.markers, $scope.categories, $scope.map);
        };        

        $scope.toCurrentPosition = function () {
            $scope.navCollapsed = true;
            initNavbarStyle = false;
            google.maps.event.clearListeners($scope.map, 'center_changed');
            $scope.map.setCenter(new google.maps.LatLng($scope.currentPosition.latitude, $scope.currentPosition.longitude));
            $scope.addMapCenterChangedListener();
        };

        $scope.chooseStyle = function (category) {
            if (initNavbarStyle) {
                return false;
            } else {
                if ($scope.categories[category]) {                    
                    return true;
                } else {
                    return false;
                }
            }
        }

    };

    NavbarController.$inject = injectParams;
    app.controller("NavbarController", NavbarController);
});

