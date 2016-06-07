'use strict';

angular.module('alertcam.users', ['ui-router'])

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
		.state("users", {
			url: "users",
			templateUrl: "module/users/index.html"
		})
})


;
