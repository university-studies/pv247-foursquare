angular.module('FoursquareModule').controller("AppController",
    ['$scope', function ($scope) {

        $scope.map = null;
        $scope.venues = [];
        $scope.categories = {};

        $scope.markers = [];

        $scope.categories = {
            'Arts & Entertainment': true,
            'Restaurant': true,
            'School & Business': true,
            'Residence & Recreation': true,
            'Travel & Transport': true,
            'Shop & Service': true,
            'Unknown': true
        };

    }]
)



