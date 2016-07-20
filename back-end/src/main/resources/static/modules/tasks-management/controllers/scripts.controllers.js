var scripts = angular.module('alertcam.tasks');

scripts.controller('ScriptController', function($scope, $http, $uibModal, $log, Upload) {

    $scope.types = [
        { id: '1', name: 'Analysis script' },
        { id: '2', name: 'Representation script' }
    ]
    
    $scope.add = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/scripts/add.html',
                controller: 'AddScript',
                resolve: {
                    items: function () {
                        return $scope.items;
                    },
                    types: function() {
                        return $scope.types;
                    }
                }
            });

            modalInstance.result.then(function (data) {
            	
            	$http.get('/resource/tasks-management/scripts')
            	.success(function(response) {
            		$scope.scripts = response            		
            	})
            	.error(function(error) {
            		$scope.error = error;
            	});
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.edit = {
        open: function(script) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/scripts/add.html',
                controller: 'EditScript',
                resolve: {
                    script: function () {
                        return script;
                    }
                }
            });

            modalInstance.result.then(function (nscript) {
            	
            	$http.put("resource/tasks-management/scripts/" + nscript.id, nscript)
	        		.success(function(result) {	        			
	        			$scope.scripts = result;
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
        open: function(script) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/scripts/delete.html',
                controller: 'DeleteScript',
                resolve: {
                    script: function () {
                        return script;
                    }
                }
            });

            modalInstance.result.then(function (script) {
            	console.log(script);
            	
            	$http.delete("resource/tasks-management/scripts/" + script.id)
	        		.success(function(result) {
	        	
	        		})
	        		.error(function(error) {
	        	
	        		});
            }, function () {
                
            });
        }
    }

});


scripts.controller('AddScript', function($scope, $uibModalInstance, $http, $log, Upload) {
	$scope.scrypt_types = ['R', 'Python'];
    $http.get("resource/users/events")
		.success(function(result) {        			
			$scope.events = result;
		})
		.error(function(error) {
			console.log(error);
		});
    $scope.action = 'Add';
    
    $scope.submit = function () {
    	
    	$scope.script.fileName = $scope.file.name;
    	
    	var params = $scope.script;
    	params.file = $scope.file;
    	
    	console.log($scope.script);
    	Upload.upload({
    		url: 'resource/tasks-management/scripts',
    		data: params 
    	})
    	.then(function(response) {
    		$log.info(response);
    		$log.info($scope.scripts);
    		$log.info('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.data);
    		
    		$uibModalInstance.close({
            	file: $scope.file, 
            	script: $scope.script
            });
    	}, function(response) {
    		$scope.error = true;
    		$scope.message = response;
    		
    		$log.error(response);
    		$log.error('Error status: ' + response.status)
    	}, function(evt) {
    		$log.info(evt);
    		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    	});
    	
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

scripts.controller('EditScript', function($scope, $uibModalInstance, $http, script) {
	$scope.scrypt_types = ['R', 'Python'];
    $http.get("resource/users/events")
		.success(function(result) {        			
			$scope.events = result;
		})
		.error(function(error) {
			console.log(error);
		});
    $scope.action = 'Update';
    
    $scope.script = script;

    $scope.submit = function () {
    	$scope.script.fileName = $scope.file.name;
    	
    	var params = $scope.script;
    	params.file = $scope.file;
    	
    	Upload.upload({
    		url: 'resource/tasks-management/scripts',
    		data: params,
    		method: 'PUT'
    	})
    	.then(function(response) {
    		$log.info(response);
    		$log.info($scope.scripts);
    		$log.info('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.data);
    		
    		$uibModalInstance.close({
            	file: $scope.file, 
            	script: $scope.script
            });
    	}, function(response) {
    		$scope.error = true;
    		$scope.message = response;
    		
    		$log.error(response);
    		$log.error('Error status: ' + response.status)
    	}, function(evt) {
    		$log.info(evt);
    		var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    	});
    	
    	
        $uibModalInstance.close($scope.script);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

scripts.controller('DeleteScript', function($scope, $uibModalInstance, script) {
    $scope.script = script;

    $scope.delete = function () {
        $uibModalInstance.close($scope.script);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

scripts.controller('QueriesScript', function($scope, $uibModalInstance, script) {
    $scope.scripts = scripts;

    $scope.change = function () {
        $uibModalInstance.close($scope.script);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
