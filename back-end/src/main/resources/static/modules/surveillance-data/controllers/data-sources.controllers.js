var ds = angular.module('alertcam.surveillance');

ds.controller('DatasourceController', function($scope, $http, $uibModal, $log) {
	
	angular.element('#wizard').smartWizard();
    
    $scope.add = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/surveillance-data/views/data-sources/add.html',
                controller: 'AddDatasource',
                resolve: {
                	events: function() {
                		return $scope.events;
                	}
                }
            });

            modalInstance.result.then(function (ds) {            	
            	$http.post('resource/surveillance/data-sources', ds)
            		.success(function(response) {
            			$scope.dsl = response;
            		})
            		.error(function(error) {
            			$log.error(error);
            		})
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.edit = {
        open: function(ds) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/surveillance-data/views/data-sources/add.html',
                controller: 'EditDatasource',
                resolve: {
                    ds: function () {
                        return ds;
                    },
                    events: function() {
                    	return $scope.events;
                    }
                }
            });

            modalInstance.result.then(function (nds) {
                console.log(nds);
                
            	$http.put("resource/surveillance/data-sources/" + nds.id, nds)
            		.success(function(result) {
            			// console.log(result);
            			$scope.dsl = result;
            		})
            		.error(function(error) {
            			console.log(error);
            		})
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.delete = {
        open: function(ds) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/surveillance-data/views/data-sources/delete.html',
                controller: 'DeleteDatasource',
                resolve: {
                    ds: function () {
                        return ds;
                    }
                }
            });

            modalInstance.result.then(function (ds) {
            	console.log(ds);
            	
            	$http.delete("resource/surveillance/data-sources/" + ds.id)
	        		.success(function(result) {
	        			console.log(result);
	        			$scope.dsl = result;
	        		})
	        		.error(function(error) {
	        			console.log(error);
	        		});
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }
    
    $scope.indicators = {
		open: function(ds) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'modules/surveillance-data/views/data-sources/indicators.html',
				controller: "ListIndicators",
				resolve: {
					ds: function() {
						return ds;
					}
				}
			})
		}
    }

    
});


ds.controller('AddDatasource', function($scope, $http, $log, $uibModalInstance) {
    $scope.sources_types = ['MySQL', 'PosGre', 'Oracle'];
    $scope.events = ['influenza'];
    $scope.action = 'Add';
    
    $scope.graphics = [
               { name: "Line", description: "Visualise how your indicator evolve according to the threshold", type: "Threshold" },
               { name: "Cadran", description: "Use it when your indicator is between range", type: "Range"},
               { name: "Radar", description: "Follow many indicator at the same time" }
       ];
    $http.get('resource/users/events')
    	.success(function(response) {
    		$scope.events = response;
    	})
    	.error(function(response) {
    		$scope.error = response;
    	})
    ;  
    
    setTimeout(function(){ 
    	angular.element('#wizard').smartWizard("goToStep", 1);
	}, 100);
   
    $scope.onMoved = function(items, index) {
    	var item = items[index];
    	
    	$scope.columns = $scope.columns.filter(function(col) {
    		return !(item.name == col.name && item.parent == col.parent && item.type == col.type);
    	});
    	items.splice(index, 1);
    }
    
    $scope.next = function() {
    	var currentStep = angular.element('#wizard').smartWizard("currentStep");
    	console.log(currentStep);
    	
    	if (currentStep == 1) {
    		/*$http.post('resource/surveillance/data-sources', $scope.ds)
    		.success(function(response) {
    			$scope.ds = response;
    			$log.debug($scope.ds);
    			
    			$http.get('resource/surveillance/data-sources/' + $scope.ds.id + '/columns')
    			.success(function(response) {
    				$scope.columns = response;
        			$scope.variables = [{name: "aux", type: "BIGINT", parent: "auxt"}];
        			
        			$scope.models = [
    	                 {name : "columns", items: response, dragging: false},
    	                 {name : "variables", items: [{name: "aux", type: "BIGINT", parent: "auxt"}], dragging: false}
        			];
        			
        			// console.log($scope.models);
        			
        			angular.element('#wizard').smartWizard("goForward");
    			})
    			.error(function(error) {
    				$log.error(error);
    			})
    			
    		})
    		.error(function(error) {
    			$log.error(error);
    		}) */
    		angular.element("#wizard").smartWizard("goForward");
    	} else if (currentStep == 2) {
    		/*angular.forEach($scope.variables, function(v) {
    			v.datasource = $scope.ds;
    		})
    		console.log("current step --- " + currentStep);
    		console.log($scope.variables);
    		
    		$http.post('resource/surveillance/data-sources/variables', $scope.variables)
    		.success(function(response) {
    			$scope.uvars = response;
    			
    			console.log($scope.uvars);
    			angular.element('#wizard').smartWizard("goForward");
    		})
    		.error(function(error) {
    			$log.error(error);
    		});*/
    		angular.element("#wizard").smartWizard("goForward");
    	} else if (currentStep == 3) {
    		console.log("--- Step " + currentStep);
    		
    		var params = [];
    		if (kpi.graphic.name == 'Line') {
    			params.push({
    				name: 'threshold',
    				value: kpi.graphic.parameter.threshold
    			});
    		} else if (kpi.graphic.name == 'Cadran') {
    			params.push({
    				name: 'green',
    				value: kpi.graphic.parameter.green
    			});
    			params.push({
    				name: 'yellow',
    				value: kpi.graphic.parameter.yellow
    			});
    			params.push({
    				name: 'red',
    				value: kpi.graphic.parameter.red
    			});
    		}
    		kpi.graphic.parameters = params;
    		
    		$http.post('resource/surveillance/data-sources/indicators', $scope.variables)
    		.success(function(response) {
    			$scope.uvars = response;
    			
    			console.log($scope.uvars);
    			// angular.element('#wizard').smartWizard("goForward");
    		})
    		.error(function(error) {
    			$log.error(error);
    		});
    	}
    	
    	// angular.element('#wizard').smartWizard("goForward");
    }
    $scope.back = function() {
    	angular.element('#wizard').smartWizard("goBackward");
    }
	
    $scope.collapse = function($event) {
    	var el = jQuery($event.target).parent().closest(".panel").children(".list-group");
    	
		if($($event.target).hasClass("collapses")) {
			$($event.target).addClass("expand").removeClass("collapses");
			el.slideUp(200);
		} else {
			$($event.target).addClass("collapses").removeClass("expand");
			el.slideDown(200);
		}
    }
    
    $scope.submit = function () {
        $uibModalInstance.close($scope.ds);
    };
    
    $scope.test = function() {
    	$http.post('resource/surveillance/data-sources/test-connexion', $scope.ds)
			.success(function(response) {
				$scope.success = true;
				$scope.error = false;
				
				$scope.message = response;
			})
			.error(function(error) {
				// $log.error(error);
				$scope.error = true; 
				$scope.success = false;
				
				$scope.message = error;
			})
    }
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

ds.controller('EditDatasource', function($scope, $http, $uibModalInstance, ds, events) {
    $scope.ds = ds;
    $scope.sources_types = ['MySQL', 'PosGre', 'Oracle'];
    $scope.action = 'Update';
    $scope.events = events;
    
    $scope.submit = function () {
        $uibModalInstance.close($scope.ds);
    };

    $scope.test = function() {
    	$http.post('resource/surveillance/data-sources/test-connexion', $scope.ds)
			.success(function(response) {
				$scope.success = true;
				$scope.error = false;
				
				$scope.message = response;
			})
			.error(function(error) {
				// $log.error(error);
				$scope.error = true; 
				$scope.success = false;
				
				$scope.message = error;
			})
    }
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

ds.controller('DeleteDatasource', function($scope, $uibModalInstance, ds) {
    $scope.ds = ds;

    $scope.delete = function () {
    	
        $uibModalInstance.close($scope.ds);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

ds.controller('QueriesDatasource', function($scope, $uibModalInstance, ds) {
    $scope.ds = ds;

    $scope.change = function () {
        $uibModalInstance.close($scope.ds);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


/*1 Roi 19: 16, 19-21
Dallat 5: 1, 13-18
Lu 9: 51-62*/

