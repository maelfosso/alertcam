var schedulings = angular.module('alertcam.tasks');

schedulings.controller('SchedulingController', function($scope, $uibModal, $log) {

    $scope.schedulings = [
        { name : "Calheat", script: "CalendarHeat", next_fire_time: "22-06-2016 20:01" },
        { name : "CunsumINF", script: "cusum", next_fire_time: "22-06-2016 17:01" },
        { name : "Farrington", script: "Farrington", next_fire_time: "22-06-2016 20:01" }
    ]

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

            modalInstance.result.then(function (user) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.edit = {
        open: function(scheduling) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/tasks-management/views/schedulings/add.html',
                controller: 'EditSchedule',
                resolve: {
                    schedulings: function () {
                        return schedulings;
                    },
                    periodicity: function() {
                        return $scope.periodicity;
                    }
                }
            });

            modalInstance.result.then(function (nscheduling) {
                // $scope.selected = selectedItem;
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
                        return schedule;
                    }
                }
            });

            modalInstance.result.then(function (nscheduling) {
                // $scope.selected = selectedItem;
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


schedulings.controller('AddSchedule', function($scope, $uibModalInstance, periodicity, monthly) {
    $scope.periodicity = periodicity;
    $scope.weekly = ['Monday', "Tuesday", "Wenesday", "Thursday", "Friday", "Saturday", "Sunday"];
    $scope.monthly = monthly

    $scope.submit = function () {
        $uibModalInstance.close($scope.scheduling);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

schedulings.controller('EditSchedule', function($scope, $uibModalInstance, scheduling) {
    $scope.schedulings = schedulings;

    $scope.change = function () {
        $uibModalInstance.close($scope.scheduling);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

schedulings.controller('DeleteSchedule', function($scope, $uibModalInstance, scheduling) {
    $scope.schedulings = schedulings;

    $scope.change = function () {
        $uibModalInstance.close($scope.scheduling);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

schedulings.controller('QueriesSchedule', function($scope, $uibModalInstance, scheduling) {
    $scope.schedulings = schedulings;

    $scope.change = function () {
        $uibModalInstance.close($scope.scheduling);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
