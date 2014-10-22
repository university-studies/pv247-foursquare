module = angular.module('FoursquareModule');

module.factory('venuesLoader', ['$http', function ($http) {

    function getAll($scope, position) {

        var location = {
            latitude: position.latitude,
            longitude: position.longitude
        }

        $http.post('/api/venues', location).
            success(function (data) {
                $scope.venues = data;
            }).error(function () {
                alert("Error while loading venues from server!");
            });
    }

    return {
        getAll: getAll
    };
}]);
