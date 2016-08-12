var variables = angular.module("alertcam.surveillance");

variables.controller("ListVariables", function($scope, $stateParams, $http, $log, datasourceID) {
	// var datasourceID = $stateParams.datasourceId;
	
	$http.get('/resource/surveillance/data-sources/' + datasourceID)
	.success(function(response) {
		$log.debug(response);
		
		$scope.datasource = response;
	}).error(function(error) {
		$log.error(error);
	});
	$log.debug(datasourceID);
	$http.get('/resource/surveillance/data-sources/' + datasourceID + '/variables')
	.success(function(response) {
		$log.debug(response);
		
		$scope.variables = response;
	}).error(function(error) {
		$log.error(error);
	});
	
	$http.get('/resource/surveillance/data-sources/' + datasourceID + '/columns')
	.success(function(response) {
		$log.debug(response);
		
		$scope.columns = response;
	}).error(function(error) {
		$log.error(error);
	});
	
	
});