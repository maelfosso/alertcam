var events = angular.module('alertcam.users')

events.controller('EventsController', ['$scope', '$uibModal', '$log', '$http', function($scope, $uibModal, $log, $http) {

    $scope.addEvent = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/events/event_add.html',
                controller: 'AddEvent'
            });

            modalInstance.result.then(function (event) {
            	$http.post('/resource/users/events', event)
            	.success(function(response) {
            		$scope.events = response            		
            	})
            	.error(function(error) {
            		$scope.error = error;
            	});
            	
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.editEvent = {
        open: function(event) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/events/event_add.html',
                controller: 'EditEvent',
                resolve: {
                    event: function () {
                        return event;
                    }
                }
            });

            modalInstance.result.then(function (nevent) {
            	console.log(nevent);
            	
            	$http.put("resource/users/events/" + nevent.id, nevent)
        		.success(function(result) {        			
        			$scope.events = result;
        		})
        		.error(function(error) {
        			console.log(error);
        		})
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.deleteEvent = {
        open: function(event) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/events/event_delete.html',
                controller: 'DeleteEvent',
                resolve: {
                    event: function () {
                        return event;
                    }
                }
            });

            modalInstance.result.then(function (event) {
            	$http.delete("resource/users/events/" + event.id)
        		.success(function(result) {
        			$scope.events = result;
        		})
        		.error(function(error) {
        			$scope.error = error;
        		});
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

}]);

events.controller('AddEvent', function($scope, $uibModalInstance) {
    $scope.event = {}

    $scope.submit = function () {
        $uibModalInstance.close($scope.event);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

events.controller('EditEvent', function($scope, $uibModalInstance, event) {
    $scope.event = event;

    $scope.submit = function () {
        $uibModalInstance.close($scope.event);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

events.controller('DeleteEvent', function($scope, $uibModalInstance, event) {
    $scope.event = event;

    $scope.submit = function () {
        $uibModalInstance.close($scope.event);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
