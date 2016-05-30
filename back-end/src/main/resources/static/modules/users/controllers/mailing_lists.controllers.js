var mailing_lists = angular.module('alertcam.users')

mailing_lists.controller('MailingListsController', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {

    $scope.mailing_lists = [
        {
            "id": 1, "name": "ML 1", "description": "DI 1"
        },
        {
            "id": 2, "name": "ML 2", "description": "DI 2"
        }
    ];

    $scope.addMailingList = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/mailing_lists/mailing_list_add.html',
                controller: 'AddMailingList',
                /* resolve: {
                    items: function () {
                        return $scope.items;
                    }
                } */
            });

            modalInstance.result.then(function (mailing_list) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.editMailingList = {
        open: function(mailing_list) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/mailing_lists/mailing_list_add.html',
                controller: 'EditMailingList',
                resolve: {
                    mailing_list: function () {
                        return mailing_list;
                    }
                }
            });

            modalInstance.result.then(function (mailing_list) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.deleteMailingList = {
        open: function(mailing_list) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/mailing_lists/mailing_list_delete.html',
                controller: 'DeleteMailingList',
                resolve: {
                    mailing_list: function () {
                        return mailing_list;
                    }
                }
            });

            modalInstance.result.then(function (mailing_list) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

}]);

mailing_lists.controller('AddMailingList', function($scope, $uibModalInstance) {
    $scope.mailing_list = {}

    $scope.submit = function () {
        $uibModalInstance.close($scope.mailing_list);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

mailing_lists.controller('EditMailingList', function($scope, $uibModalInstance, mailing_list) {
    $scope.mailing_list = mailing_list;

    $scope.submit = function () {
        $uibModalInstance.close($scope.mailing_list);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

mailing_lists.controller('DeleteMailingList', function($scope, $uibModalInstance, mailing_list) {
    $scope.mailing_list = mailing_list;

    $scope.submit = function () {
        $uibModalInstance.close($scope.mailing_list);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
