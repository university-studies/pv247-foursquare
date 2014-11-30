define(["foursquare-module", "Services/MarkerUtils"], function (app) {

    var injectParams = ['$scope', '$window', 'MarkerUtils'];
    var NavbarController = function ($scope, $window, MarkerUtils) {

        $scope.toggleCategory = function (category) {
            $scope.categories[category] = !$scope.categories[category];
            
            MarkerUtils.filterMarkers($scope.markers, $scope.categories, $scope.map);
        };

        $scope.transitionHome = function () {
            $window.location.href = '/'
        }
    };

    NavbarController.$inject = injectParams;
    app.controller("NavbarController", NavbarController);
});

