define(["foursquare-module", "Services/MarkerUtils", "Services/UserLoader"], function (app) {

    var injectParams = ['$scope', '$window', 'MarkerUtils', 'UserLoader'];
    var NavbarController = function ($scope, $window, MarkerUtils, UserLoader) {

        var initNavbarStyle = true;
        $scope.userInfo = null;

        UserLoader.getUser().then(function (data) {      
             $scope.userInfo = data;          
             console.log(data);
        });
        

        $scope.toggleCategory = function (category) {
            $scope.navCollapsed = true;
            initNavbarStyle = false;
            angular.forEach($scope.categories, function (value, key) {
                if (key == category) {                    
                    $scope.categories[key] = true;
                } else {
                    $scope.categories[key] = false;
                }
                console.log(key)
            });            
                       
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

