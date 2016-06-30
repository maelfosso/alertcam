var schedulings = angular.module('alertcam.tasks');

schedulings.controller('SchedulingController', function($scope, $http, $uibModal, $log) {

    /*$scope.schedulings = [
        { name : "Calheat", script: "CalendarHeat", next_fire_time: "22-06-2016 20:01" },
        { name : "CunsumINF", script: "cusum", next_fire_time: "22-06-2016 17:01" },
        { name : "Farrington", script: "Farrington", next_fire_time: "22-06-2016 20:01" }
    ]*/

    $scope.periodicity = ["Once", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"];

    $scope.add = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/schedulings/add.html',
                controller: 'AddSchedule',
                resolve: {
                    periodicity: function() {
                        return $scope.periodicity;
                    },
                    monthly: function() {
                        return new Array(31);
                    }
                }
            });

            modalInstance.result.then(function (scheduled) {
                console.log(scheduled);
            	$http.post('resource/tasks-management/scheduled-tasks', scheduled)
	        		.success(function(response) {
	        			// $log.info(response)
	        			$scope.schedulings = response;
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
        open: function(schedule) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/schedulings/add.html',
                controller: 'EditSchedule',
                resolve: {
                    schedule: function () {
                        return schedule;
                    },
                    periodicity: function() {
                        return $scope.periodicity;
                    },
                    monthly: function() {
                        return new Array(31);
                    }
                }
            });

            modalInstance.result.then(function (nschedule) {
            	$http.put("resource/tasks-management/scheduled-tasks/" + nschedule.id, nschedule)
	        		.success(function(result) {
	        			// console.log(result);
	        			$scope.schedulings = result;
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
        open: function(scheduling) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/schedulings/delete.html',
                controller: 'DeleteSchedule',
                resolve: {
                    schedule: function () {
                        return scheduling;
                    }
                }
            });

            modalInstance.result.then(function (schedule) {
            	$http.delete("resource/tasks-management/scheduled-tasks/" + schedule.id)
	        		.success(function(result) {
	        			$scope.schedulings = result;
	        		})
	        		.error(function(error) {
	        			$scope.error = error;
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
        open: function(scheduling) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/schedulings/queries.html',
                controller: 'QueriesSchedule',
                resolve: {
                    schedulings: function () {
                        return schedulings;
                    }
                }
            });

            modalInstance.result.then(function (nscheduling) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        },
    }
});


schedulings.controller('AddSchedule', function($scope, $http, $uibModalInstance, periodicity, monthly) {
    $scope.periodicity = ["Once", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"];
    $scope.weekly = ['Monday', "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday", "Sunday"];
    $scope.monthly = [] 
    for (var i=1; i <= 31; i++) {
    	$scope.monthly.push('Day ' + i);
    }
    $scope.mailing_list = ['Epidemio', 'Virologie'];
    $scope.action = "Add";
    
    $scope.schedule = {
    		start_date: new Date(),
    		start_time: new Date()
    }
    $scope.month_select = [];
    $http.get('resource/tasks-management/scripts')
    	.success(function(response) {
    		$scope.scripts = response;
    		// console.log($scope.scripts);
    	})
    	.error(function(error) {
    		$scope.error = error;
    	});
    $http.get('resource/surveillance/data-sources')
    	.success(function(response) {
    		$scope.datasources = response;
    		// console.log($scope.datasources);
    	})
    	.error(function(error) {
    		$scope.error = error;
    	});
    
    $scope.date = {
    	popup : false
    }
    
    $scope.open_date = function() {
    	$scope.date.popup = true;
    };
    
    $scope.submit = function () {
    	var sd = $scope.schedule.start_date;
    		st = $scope.schedule.start_time;
    	var d = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate(), st.getHours(), st.getMinutes(), st.getMilliseconds());
    	$scope.schedule.start = d;
    	
    	if ($scope.schedule.periodicity == 'Weekly') {
    		$scope.schedule.repetitionRate = $scope.schedule.repetitionRate.join("-");
    	}
    	console.log($scope.schedule);
        $uibModalInstance.close($scope.schedule);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

schedulings.controller('EditSchedule', function($scope, $http, $uibModalInstance, schedule, monthly) {
    $scope.schedule = schedule;
    var sdt = new Date($scope.schedule.start);
    console.log($scope.schedule);
    
    $scope.periodicity = ["Once", "Hourly", "Daily", "Weekly", "Monthly", "Yearly"];
    $scope.weekly = ['Monday', "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday", "Sunday"];
    $scope.monthly = [] 
    for (var i=1; i <= 31; i++) {
    	$scope.monthly.push('Day ' + i);
    }
    $scope.mailing_list = ['Epidemio', 'Virologie'];
    $scope.action = "Update";
    
    $scope.schedule.start_date = new Date(sdt.getFullYear(), sdt.getMonth(), sdt.getDate());
    $scope.schedule.start_time = sdt;
    if ($scope.schedule.periodicity == 'Weekly') {
    	$scope.schedule.repetitionRate = $scope.schedule.repetitionRate.split('-');
    	console.log($scope.schedule.repetitionRate);
    }
    

    $http.get('resource/tasks-management/scripts')
    	.success(function(response) {
    		$scope.scripts = response;
    		// console.log($scope.scripts);
    	})
    	.error(function(error) {
    		$scope.error = error;
    	});
    $http.get('resource/surveillance/data-sources')
    	.success(function(response) {
    		$scope.datasources = response;
    		// console.log($scope.datasources);
    	})
    	.error(function(error) {
    		$scope.error = error;
    	});
    
    $scope.date = {
    	popup : false
    }
    
    $scope.open_date = function() {
    	$scope.date.popup = true;
    };
    
    $scope.submit = function () {
    	var sd = $scope.schedule.start_date;
    		st = $scope.schedule.start_time;
    	var d = new Date(sd.getFullYear(), sd.getMonth(), sd.getDate(), st.getHours(), st.getMinutes(), st.getMilliseconds());
    	$scope.schedule.start = d;
    	
    	if ($scope.schedule.periodicity == 'Weekly') {
    		$scope.schedule.repetitionRate = $scope.schedule.repetitionRate.join("-");
    	}
    	console.log($scope.schedule);
    	
        $uibModalInstance.close($scope.schedule);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

schedulings.controller('DeleteSchedule', function($scope, $uibModalInstance, schedule) {
    $scope.schedule = schedule;

    $scope.delete = function () {
        $uibModalInstance.close($scope.schedule);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

schedulings.controller('RunSchedule', function($scope, $uibModalInstance, scheduling) {
    $scope.schedulings = schedulings;

    $scope.change = function () {
        $uibModalInstance.close($scope.scheduling);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
