var app = angular.module('FoursquarePlaces', []);

app.controller('MapController', ['$scope', function ($scope) {
    $scope.greeting = "hello from angular!";
}]);


app.directive('map', function () {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {
            console.log(element);

            var mapOptions = {
                zoom: 15,
                center: new google.maps.LatLng(40.69847032728747, -73.9514422416687)
            }

            map = new google.maps.Map(document.getElementById(attrs.id), mapOptions);
        }
    }
})