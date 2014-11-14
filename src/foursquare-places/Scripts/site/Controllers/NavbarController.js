angular.module('FoursquareModule').controller('NavbarController', 
    ['$scope', 'MarkerUtils',
        function ($scope, MarkerUtils) {
            

            $scope.categories = {
                'Arts & Entertainment': true,
                'Restaurant': true,
                'School & Business': true,
                'Residence & Recreation': true,
                'Travel & Transport': true,
                'Shop & Service': true,
                'Unknown': true
            };

            
            $scope.toggleCategory = function (category) {
                $scope.categories[category] = !$scope.categories[category];
                
                MarkerUtils.filterMarkers($scope.markers, $scope.categories, $scope.map);
            };

        
    }]
)