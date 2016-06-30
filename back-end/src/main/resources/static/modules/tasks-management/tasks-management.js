'use strict';

angular.module('alertcam.tasks', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("tasks", {
            url: "/tasks",
            templateUrl: "modules/tasks-management/index.html",
            controller: function($rootScope, $http, $scope) {
                $rootScope.state = "tasks";

                /*$scope.dsl = [
                    { name: "influenza_ds", event: "influenza" },
                    { name: "Surveillance Grippe", event: "influenza" },
                    { name : "test", event: "influenza" }
                ]*/
                
                $http.get('/resource/tasks-management/scripts')
	            	.success(function(response) {
	            		// console.log(response);
	            		$scope.scripts = response;
	            		
	            		// $rootScope.scripts = response;
	            		
	            	})
	            	.error(function(error) {
	            		$scope.error = error;
	            	});
                
                $http.get('/resource/tasks-management/scheduled-tasks')
	            	.success(function(response) {
	            		// console.log(response);
	            		$scope.schedulings = response;
	            		
	            		// $rootScope.schedulings = response;
	            	})
	            	.error(function(error) {
	            		$scope.error = error;
	            	});
            } //"SurveillanceController",
        })
    ;
})


;
