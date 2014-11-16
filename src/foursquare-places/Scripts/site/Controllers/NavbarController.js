angular.module('FoursquareModule').controller('NavbarController', 
    ['$scope', 'MarkerUtils',
        function ($scope, MarkerUtils) {

            $scope.toggleCategory = function (category) {
                $scope.categories[category] = !$scope.categories[category];
                
                MarkerUtils.filterMarkers($scope.markers, $scope.categories, $scope.map);
            };       
    }]
)