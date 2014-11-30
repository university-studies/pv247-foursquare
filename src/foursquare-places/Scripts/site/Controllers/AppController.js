define(["foursquare-module"], function (app) {

    var injectParams = ['$scope'];
    var AppController = function ($scope) {

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
    }

    AppController.$inject = injectParams;
    app.controller("AppController", AppController);
});
