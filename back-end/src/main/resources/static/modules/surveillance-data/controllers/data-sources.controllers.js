var ds = angular.module('alertcam.surveillance');

ds.controller('DatasourceController', function($scope, $http, $uibModal, $log) {

    $scope.add = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/surveillance-data/views/data-sources/add.html',
                controller: 'AddDatasource'
            });

            modalInstance.result.then(function (ds) {            	
            	$http.post('resource/surveillance/data-sources', ds)
            		.success(function(response) {
            			// $log.info(response)
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

    $scope.queries = {
        form: {
            sites: [
                { id: '1', name: 'Site hors reseau (inclusion)' }
            ],
            count: [
                { id: '1', name: 'Unknown' }
            ],
            date: [
                { id: '1', name: 'Date Reception CPC' }
            ]
        },
        open: function(ds) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/surveillance-data/views/data-sources/queries.html',
                controller: 'QueriesDatasource',
                resolve: {
                    ds: function () {
                        return ds;
                    }
                }
            });

            modalInstance.result.then(function (nds) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        },
    }
});


ds.controller('AddDatasource', function($scope, $http, $uibModalInstance, $log) {
    $scope.sources_types = ['MySQL', 'PosGre', 'Oracle'];
    $scope.events = ['influenza'];
    $scope.action = 'Add';
    
    $scope.submit = function () {
    	
        $uibModalInstance.close($scope.ds);
    };
    
    $scope.test = function() {
    	$http.post('resource/surveillance/test-connexion', $scope.ds)
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

ds.controller('EditDatasource', function($scope, $http, $uibModalInstance, ds) {
    $scope.ds = ds;
    $scope.sources_types = ['MySQL', 'PosGre', 'Oracle'];
    $scope.events = ['influenza'];
    $scope.action = 'Update';
    
    $scope.submit = function () {
        $uibModalInstance.close($scope.ds);
    };

    $scope.test = function() {
    	$http.post('resource/surveillance/test-connexion', $scope.ds)
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

