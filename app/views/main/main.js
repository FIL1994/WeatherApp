'use strict';

angular.module('myApp.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/main', {
    templateUrl: 'views/main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    //get the user's location
    getLocation();
    //the query for the Yahoo Weather API
    var query = "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='chicago, il, us')";
    $scope.getWeather = function () {
      //the api request to be made
      var request = "https://query.yahooapis.com/v1/public/yql?u=c&q=" + query + "&format=json";

      //send the request
        $http.get(request).then(function (response) {
          console.log(response);
          $scope.info = response.data.query.results.channel;
        });
    };

    //get the user's geolocation
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }
    //handling getting the geolocation
    function showPosition(position) {
        query = "select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text='("
            + position.coords.latitude + "," + position.coords.longitude + ")')";
    }
}]);