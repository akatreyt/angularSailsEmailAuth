'use strict';

 var app =
// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.directives',
  'ui.bootstrap'
]);

app.config(['$routeProvider', function($routeProvider) {
  
  $routeProvider.when('/login',{
 		templateUrl : 'partials/auth/index.html',
    controller: 'AuthController'
 	});

  $routeProvider.when('/success',{
 		templateUrl : 'partials/auth/success.html'
 	});

  $routeProvider.otherwise({redirectTo: '/login'});
}]);
