angular.module('FoursquareModule').factory('venuesLoader',
    ['$http', function ($http) {

    return {
        getAll: function ($scope, position) {
            var location = {
                latitude: position.latitude,
                longitude: position.longitude
            }

            $http({
                url: '/api/venues',
                method: 'GET',
                params: location
            }).success(function (data, status, headers, config) {
                $scope.venues = data;
            }).error(function (data, status, headers, config) {
                alert("Error while loading venues from server!");
            });
        },
    };
}]);
