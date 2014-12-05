define(["foursquare-module"], function (app) {

    var injectParams = ['$http', '$q'],
        UserLoader = function ($http, $q) {
            return {
                getUser: function () {
                    var deferred = $q.defer();
                    $http({
                        url: '/api/user',
                        method: 'GET',
                    }).success(function (data, status, header, config) {
                        deferred.resolve(data);
                    }).error(function (data, status, header, config) {
                        deferred.reject();
                    });
                    return deferred.promise;
                }
            };
        };

    UserLoader.$inject = injectParams;
    app.factory("UserLoader", UserLoader);
});