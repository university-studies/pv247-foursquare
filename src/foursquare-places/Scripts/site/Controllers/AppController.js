angular.module('FoursquareModule').controller("AppController",
    ['$scope', function ($scope) {

        $scope.map = null;
        $scope.venues = [];
        $scope.categories = {};

        $scope.markers = [];


    }]
)


