angular.module('FoursquareModule').factory('venuesLoader',
    ['$http', function ($http) {

    return {
        getAll: function ($scope, position) {

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
        },

        getAllByGet: function ($scope, position) {
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
        }
    };
}]);
