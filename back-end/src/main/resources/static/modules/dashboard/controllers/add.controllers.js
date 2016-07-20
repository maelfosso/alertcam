var dashboards = angular.module("alertcam.dashboard");

dashboards.controller('AddDashboard', function($rootScope, $scope, $stateParams, $http, $log) {
	
	
	$http.get('/resource/surveillance/data-sources/events/' + $stateParams.eventId)
	.success(function(response) {
		$scope.datasources = response;
		// console.log($scope.datasources);
	})
	.error(function(error) {
		$scope.error = error;
	});
	
	$scope.dashboard = {
		x: {name: "", type: "", axis: ""},
		y: {name: "", type: "", axis: ""},
		xvar: {
			name: ''
		},
		yvar: {
			name: ''
		}
	};
	
	$scope.types = ['NUMERIC', 'CATEGORICAL', 'DATE'];
	
	setTimeout(function(){ 
    	angular.element('#wizard').smartWizard();
	}, 100);
	
	$scope.variablesFromDs = function() {
		$http.get('/resource/surveillance/data-sources/variables/' + $scope.ds.id)
		.success(function(response) {
			$scope.variables = response;
			
			var vars = [];
			angular.forEach(response, function(v) {
				if (v.type == 'TINYTEXT' || v.type == 'VARCHAR') {
					v.type = 'CATEGORICAL';
				} else if (v.type == 'INT' || v.type == 'BIGINT') {
					v.type = 'NUMERIC';
				} else if (v.type == 'DATETIME') {
					v.type = 'DATE';
				}
				
				vars.push(v);
			})
			$scope.xVariables = vars;
			$scope.yVariables = vars;
		})
		.error(function(error) {
			$log.error(error);
		})
	}
	
	$scope.variableSelected = function() {
		
		if ($scope.dashboard.xvar.name != '') {
			$scope.dashboard.x.name = $scope.dashboard.xvar.name;
		}
		if ($scope.dashboard.yvar.name != '') {
			$scope.dashboard.y.name = $scope.dashboard.yvar.name;
		}
		
		$scope.xVariables = $scope.variables.filter(function(v) {
			return v.name != $scope.dashboard.yvar.name;
		});
		$scope.yVariables = $scope.variables.filter(function(v) {
			return v.name != $scope.dashboard.xvar.name;
		});
		
		if ($scope.dashboard.x.name != '' && $scope.dashboard.y.name != '' && $scope.dashboard.x.type != '' && $scope.dashboard.y.type != '') {
			var cols = $scope.dashboard.xvar.name + ", " + $scope.dashboard.yvar.name;
			var table = $scope.dashboard.xvar.parent;
			
			var query = "Select " + cols + " From " + table + " Limit 100";
			
				$http.post('/resource/surveillance/data-sources/' + $scope.ds.id + '/data', query)			
				.success(function(response) {
					// $log.debug(response);
					$scope.dataResult = response;
					// $scope.dataResult = response;
					$scope.data = [];
					angular.forEach(response, function(d, index) {
						var row = {
								x: d[$scope.dashboard.xvar.name],
								y: d[$scope.dashboard.yvar.name]
							};
						if ($scope.dashboard.xvar.type == "INT" || $scope.dashboard.xvar.type == "BIGINT") {
							row.x = +row.x;
						}
						if ($scope.dashboard.yvar.type == "INT" || $scope.dashboard.yvar.type == "BIGINT") {
							row.y = +row.y;
						}
						
						$scope.data.push(row);
					})
					// console.log($scope.dashboard);
					// console.log($scope.data);
				})
				.error(function(error) {
					$log.error(error);
				});
			// });
		}
	}
	
	$scope.next = function(param) {
		var currentStep = angular.element('#wizard').smartWizard("currentStep");
		
		if (currentStep == 1) {
			$scope.dashboard.graphic = param;
			
			console.log($scope.dashboard);
			angular.element('#wizard').smartWizard("goForward");
		} else if (currentStep == 2) {
			
			console.log($scope.dashboard);
			angular.element('#wizard').smartWizard("goForward");
		} else if (currentStep == 3) {
			
		}
	}
	
	$scope.back = function() {
		var currentStep = angular.element('#wizard').smartWizard("currentStep");
		
		if (currentStep == 2) {
			angular.element('#wizard').smartWizard("goBackward");
		} else if (currentStep == 3) {
			angular.element('#wizard').smartWizard("goBackward");
		}
	}
})

;