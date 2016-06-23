var scripts = angular.module('alertcam.tasks');

scripts.controller('ScriptController', function($scope, $uibModal, $log) {

    $scope.scripts = [
        { name : "Farrington", scheduled: true, last_updated: "2015-05-19", associated_disease: "Influenza", type: "Analysis script" },
        { name : "CalendarHeat", scheduled: true, last_updated: "2015-05-19", associated_disease: "Influenza", type: "Representation script" },
        { name : "ewma", last_updated: "2015-05-19", associated_disease: "Influenza", type: "Analysis script" },
        { name : "cusum", scheduled: true, last_updated: "2015-11-24", associated_disease: "Influenza", type: "Analysis script" }
    ]


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

            modalInstance.result.then(function (user) {
                // $scope.selected = selectedItem;
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

            modalInstance.result.then(function (script) {
                // $scope.selected = selectedItem;
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

            modalInstance.result.then(function (nscript) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

});


scripts.controller('AddScript', function($scope, $uibModalInstance) {
    $scope.submit = function () {
        $uibModalInstance.close($scope.script);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

scripts.controller('EditScript', function($scope, $uibModalInstance, script) {
    $scope.scripts = scripts;

    $scope.change = function () {
        $uibModalInstance.close($scope.script);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

scripts.controller('DeleteScript', function($scope, $uibModalInstance, script) {
    $scope.scripts = scripts;

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
