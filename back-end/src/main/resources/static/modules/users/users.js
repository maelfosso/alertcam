'use strict';

angular.module('alertcam.users', [])

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state("users", {
            url: "/users",
            templateUrl: "modules/users/index.html",
            controller: function($rootScope) {
                $rootScope.state = "users";
            } //"SurveillanceController",
        })
})


;
