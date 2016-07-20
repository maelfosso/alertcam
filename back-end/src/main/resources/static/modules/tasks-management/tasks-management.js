'use strict';

angular.module('alertcam.tasks', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("tasks", {
            url: "/tasks",
            templateUrl: "modules/tasks-management/index.html",
            controller: function($rootScope, $http, $scope) {
                $rootScope.state = "tasks";
                
                $http.get('/resource/tasks-management/scripts')
	            	.success(function(response) {
	            		$scope.scripts = response;
	            	})
	            	.error(function(error) {
	            		$scope.error = error;
	            	});
                
                $http.get('/resource/tasks-management/scheduled-tasks')
	            	.success(function(response) {
	            		$scope.schedulings = response;
	            	})
	            	.error(function(error) {
	            		$scope.error = error;
	            	});
            }
        })
    ;
})


;
