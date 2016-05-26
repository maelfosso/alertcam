var events = angular.module('alertcam.users')

events.controller('EventsController', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {

    $scope.events = [
        {
            "id": 1, "name": "Yellow Fever", "description": "It's...."
        },
        {
            "id": 2, "name": "Influenza", "description": "It's...."
        }
    ];

    $scope.addEvent = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/events/event_add.html',
                controller: 'AddEvent',
                /* resolve: {
                    items: function () {
                        return $scope.items;
                    }
                } */
            });

            modalInstance.result.then(function (event) {
                // $scope.selected = selectedItem;
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

            modalInstance.result.then(function (event) {
                // $scope.selected = selectedItem;
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
                // $scope.selected = selectedItem;
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
