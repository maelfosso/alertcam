var dashboards = angular.module("alertcam.dashboard");

dashboards.controller('AddDashboard', function($rootScope, $scope, $state, $stateParams, $uibModal, 
													$timeout, $http, $log, Variable) {
	
	$scope.dashboard = {
			title: '',
			graphic: {
				axis: [
				       {
				    	   name: 'xAxis',
				    	   display: 'sample',
				    	   variable: new Variable('sample', 'sample', 'Unknown', 'sample')
				       },
				       {
				    	   name: 'yAxis',
				    	   display: 'sample',
				    	   variable: new Variable('sample', 'sample', 'Unknown', 'sample')
				       },
				       {
				    	   name: 'zAxis',
				    	   display: 'sample',
				    	   variable: new Variable('sample', 'sample', 'Unknown', 'sample')
				       }
				]
			},
			settings: {}
	}
	
	$http.get('/resource/surveillance/data-sources/events/' + $stateParams.eventId)
	.success(function(response) {
		$scope.datasources = response;
	})
	.error(function(error) {
		$scope.error = error;
	});
	
	$scope.types = ['NUMERIC', 'CATEGORICAL', 'DATE'];
	
	// $timeout(angular.element('#wizard').smartWizard(), 200)
	setTimeout(function(){ 
    	angular.element('#wizard').smartWizard();
	}, 100);
	
	$scope.variablesFromDs = function() {
		$http.get('/resource/surveillance/data-sources/'  + $scope.ds.id + '/variables/')
		.success(function(response) {
			$log.debug(response);
			
			$scope.variables = response;
			$scope.dashboard.graphic.datasource = $scope.ds;
			
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
	
	$scope.onDropOnAxis = function(name, item) {
		$log.debug('On Drop On Axis .... ' + name);
		$log.debug(item);
		// item.axis = name;
		var ax = {
				name: name,
				display: '',
				variable: item
		}
		for(i = 0; i < $scope.dashboard.graphic.axis.length; i++) {
			var a = $scope.dashboard.graphic.axis[i];
			if (a.name == name && a.display == 'sample') {
				$scope.dashboard.graphic.axis.splice(i, 1);
			}
		}
		$scope.dashboard.graphic[name] = ax;
		$scope.dashboard.graphic.axis.push(ax);
		$log.debug(ax);
		$log.debug($scope.dashboard.graphic);
		$log.debug($scope.variables);
		return ax;
	}
	
	$scope.next = function(param) {
		var currentStep = angular.element('#wizard').smartWizard("currentStep");
		$log.debug($scope.dashboard);
		
		if (currentStep == 1) {
			console.log($scope.dashboard);
			angular.element('#wizard').smartWizard("goForward");
		} else if (currentStep == 2) {
			$scope.dashboard.graphic.name = param;
			
			console.log($scope.dashboard);
			angular.element('#wizard').smartWizard("goForward");
		} else if (currentStep == 3) {
			$log.debug($scope.dashboard);
			
			$http.post('/resource/dashboards/' + $stateParams.eventId, $scope.dashboard)
			.success(function(success) {
				$log.debug(success);
				
				$state.go('dashboard.list')
			})
			.error(function(error) {
				$log.debug(error);
			});
			
			// console.log($scope.dashboard);
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
	
	$scope.collapse = function($event) {
    	var el = jQuery($event.target).parent().closest(".panel").children(".panel-body");
    	
		if($($event.target).hasClass("collapses")) {
			$($event.target).addClass("expand").removeClass("collapses");
			el.slideUp(200);
		} else {
			$($event.target).addClass("collapses").removeClass("expand");
			el.slideDown(200);
		}
    }
	
	$scope.configAxis = function(axis) {
    	
    	var modalInstance = $uibModal.open({
    		 	animation: $scope.animationsEnabled,
    		 	templateUrl: '/modules/dashboard/views/config-axis.html',
    		 	controller: function($scope, $uibModalInstance, axis) {
    		 		$log.debug('In ... Axis Modal Config');
    		 		$log.debug(axis);
    		 		$scope.axis = axis;
    		 		
    		 		$scope.submit = function () {
    		 	        $uibModalInstance.close($scope.axis);
    		 	    };
    		 	},
    		 	resolve: {
    		 		axis: function () {
    		 			return axis;
        	        }
    		 	}
	 	});
    	modalInstance.result.then(function (axis) {
    		// $scope.ds = dashboard;
    		$log.debug('Out ... Axis Modal Config');
    		$log.debug(axis);
    		$log.debug($scope.dashboard.graphic);
	    }, function () {
	    	
	    });
    }
})

;