'use strict';

angular.module('alertcam.users', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state("users", {
            url: "/users",
            templateUrl: "modules/users/index.html",
            controller: function($rootScope, $scope, $http) {
                $rootScope.state = "users";
                
                $http.get('/resource/users/events')
            	.success(function(response) {
            		$scope.events = response;
            	})
            	.error(function(error) {
            		$scope.error = error;
            	});
            } 
        })
})


;
