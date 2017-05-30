'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.main',
  'ui.carousel',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/main'});
}]).run(['$rootScope', function ($rootScope) {
    $rootScope.event=[];
}]).filter('toCelsius', function () {
  //a method for converting fahrenheit to celsius and appending the celsius character
  return function (fahrenheit) {
      return Math.round((fahrenheit - 32) * 5 / 9) + "°";
  };

});