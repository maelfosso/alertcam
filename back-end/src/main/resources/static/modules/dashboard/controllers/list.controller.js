var dashboards = angular.module("alertcam.dashboard");

dashboards.controller('ListDashboard', function($rootScope, $scope, $stateParams, $uibModal, $http, $log, Variable) {

	$http.get('/resource/dashboards')
	.success(function(response) {
		$log.debug(response);
		$scope.dashboards = response;
	})
	.error(function(error) {
		$log.error(error);
	});
	
	$scope.config = function(dashboard) {
		
	}
	
	$scope.refresh = function(dashboard) {
		
	}
	
	$scope.delete = function(dashboard) {
		
	}
	
	$scope.next = function(dashboard) {
		
	}
	
	$scope.back = function(dashbaord) {
		
	}
	
});