'use strict';

angular.module('alertcam.users', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/users', {
    templateUrl: 'modules/users/index.html'
  });
}])


;
