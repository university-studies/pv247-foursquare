angular.module('FoursquareModule').controller('NavbarController', 
    ['$scope', '$window', 'MarkerUtils',
        function ($scope, $window,  MarkerUtils) {

            $scope.toggleCategory = function (category) {
                $scope.categories[category] = !$scope.categories[category];
                
                MarkerUtils.filterMarkers($scope.markers, $scope.categories, $scope.map);
            };

            $scope.transitionHome = function () {
                $window.location.href = '/'
            }
    }]
)