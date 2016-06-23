var ds = angular.module('alertcam.surveillance');

ds.controller('DatasourceController', function($scope, $uibModal, $log) {

    $scope.add = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/surveillance-data/views/data-sources/add.html',
                controller: 'AddDatasource',
                /* resolve: {
                    items: function () {
                        return $scope.items;
                    }
                } */
            });

            modalInstance.result.then(function (user) {
                // $scope.selected = selectedItem;
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
                // $scope.selected = selectedItem;
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

            modalInstance.result.then(function (nds) {
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


ds.controller('AddDatasource', function($scope, $uibModalInstance) {
    $scope.sources_types = ['MySQL', 'PosGre', 'Oracle'];
    $scope.events = ['influenza'];
    
    $scope.submit = function () {
        $uibModalInstance.close($scope.ds);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

ds.controller('EditDatasource', function($scope, $uibModalInstance, ds) {
    $scope.ds = ds;

    $scope.change = function () {
        $uibModalInstance.close($scope.ds);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

ds.controller('DeleteDatasource', function($scope, $uibModalInstance, ds) {
    $scope.ds = ds;

    $scope.change = function () {
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
