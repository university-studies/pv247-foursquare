angular.module('FoursquareModule').controller('NavbarController', 
    ['$scope', 'MarkerFormatter',
        function ($scope, MarkerFormatter) {
            

            $scope.categories = {
                'Arts & Entertainment': true,
                'Restaurants': true,
                'School & Business': true,
                'Residence & Recreation': true,
                'Travel & Transport': true,
                'Shop & Service': true,
                'Unknown': true
            };

            
            $scope.toggleCategory = function (category) {
                $scope.categories[category] = !$scope.categories[category];
                
                MarkerFormatter.filterMarkers($scope.markers, $scope.categories, $scope.map);
            };

        
    }]
)