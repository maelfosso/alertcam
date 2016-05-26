'use strict';

// Declare app level module which depends on views, and components
angular.module('alertcam', [
  'ngRoute',
  'ui.bootstrap',

  'alertcam.users',
  // 'myApp.view2',
  // 'myApp.version'

]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/users'});
}]);
