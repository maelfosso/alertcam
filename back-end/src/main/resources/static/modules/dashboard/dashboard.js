'use strict';

angular.module("alertcam.dashboard", [])

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
    .state("dashboard", {
        url: "/dashboard",
        templateUrl: "modules/dashboard/index.html",
        controller: function($rootScope, $http, $scope) {
            $rootScope.state = "dashboard";
            
            /*$http.get('/resource/surveillance/data-sources')
            	.success(function(response) {
            		// console.log(response);
            		
            		$scope.dsl = response;
            	})
            	.error(function(error) {
            		$scope.error = error;
            	});*/
        } 
    })
;
})
;

