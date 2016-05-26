var user_groups = angular.module('alertcam.users')

user_groups.controller('UserGroupsController', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {

    $scope.user_groups = [
        {
            "id": 1, "name": "Epidemiologist", "description": "Users in this category are epidemiologists"
        },
        {
            "id": 2, "name": "Virologist", "description": "Users in this category are virologist"
        },
        {
            "id": 3, "name": "Administrator", "description": "System administrator"
        }
    ];

    $scope.addUserGroup = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/user_groups/user_group_add.html',
                controller: 'AddUserGroup',
                /* resolve: {
                    items: function () {
                        return $scope.items;
                    }
                } */
            });

            modalInstance.result.then(function (user_group) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.editUserGroup = {
        open: function(user_group) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/user_groups/user_group_add.html',
                controller: 'EditUserGroup',
                resolve: {
                    user_group: function () {
                        return user_group;
                    }
                }
            });

            modalInstance.result.then(function (user_group) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.deleteUserGroup = {
        open: function(user_group) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/user_groups/user_group_delete.html',
                controller: 'DeleteUserGroup',
                resolve: {
                    user_group: function () {
                        return user_group;
                    }
                }
            });

            modalInstance.result.then(function (user_group) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

}]);

user_groups.controller('AddUserGroup', function($scope, $uibModalInstance) {
    $scope.user_group = {}

    $scope.submit = function () {
        $uibModalInstance.close($scope.user_group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

user_groups.controller('EditUserGroup', function($scope, $uibModalInstance, user_group) {
    $scope.user_group = user_group;

    $scope.submit = function () {
        $uibModalInstance.close($scope.user_group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

user_groups.controller('DeleteUserGroup', function($scope, $uibModalInstance, user_group) {
    $scope.user_group = user_group;

    $scope.submit = function () {
        $uibModalInstance.close($scope.user_group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
