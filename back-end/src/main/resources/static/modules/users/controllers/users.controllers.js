var users = angular.module('alertcam.users');

users.controller('UsersController', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {

    $scope.users = [
        {
            "id": 1,
            "name": "Nsaibirini Robert",
            "occupation": "Site Administrator",
            "email": "robert.nsaibirni@example.com",
            "group": "Administrator",
            "status": "active",
            "rights": [
                {"name": "View results",            "value": true},
                {"name": "Schedule scripts",        "value": false},
                {"name": "Download scripts",        "value": true},
                {"name": "Add new scripts",         "value": true},
                {"name": "Manage users",            "value": true},
                {"name": "View surveillance data",  "value": true},
                {"name": "View analysis scripts (Full rights)",     "value": true,  "help": "Can DELETE scripts"},
                {"name": "View analysis scripts (Limited)",         "value": true},
                {"name": "View scheduled tasks (Full rights)",      "value": true,  "help": "Can RUN and DELETE tasks"},
                {"name": "View scheduled tasks (Limited)",          "value": true},
                {"name": "Setup indicators",        "value": true,  "help": "Choose which fields in the data source will be displayed in the surveillance data list"},
                {"name": "Add new data source",     "value": true},
                {"name": "Change user's application rights",        "value": true},
                {"name": "Manage events under surveillance/diseases",   "value": true},
                {"name": "Manage mailling lists",   "value": true},
                {"name": "Change the group user",   "value": true},
                {"name": "Suspend and/or activate a user account",  "value": false},
                {"name": "And and remove users",    "value": true},
                {"name": "Manage data source(s)",   "value": true,  "help": "Create, Modify, Delete data source. Defile time-place-population fields for data source"},
                {"name": "Query data source(s)",    "value": true,  "help": "Define and execute queries against a data source"},
                {"name": "Create new listing",      "value": true,  "help": "Create new listing query to be exeCuted against data sources to his/her group"}
            ]
        },
        {
            "id": 2,
            "name": "Tchendjou Patrice",
            "occupation": "IMMI Epidemio",
            "email": "tchendjou@pasteur-yaounde.org",
            "group": "Epidemiologist",
            "status": "inactive",
            "rights": [
                {"name": "View results",            "value": true},
                {"name": "Schedule scripts",        "value": false},
                {"name": "Download scripts",        "value": false},
                {"name": "Add new scripts",         "value": true},
                {"name": "Manage users",            "value": true},
                {"name": "View surveillance data",  "value": true},
                {"name": "View analysis scripts (Full rights)",     "value": true,  "help": "Can DELETE scripts"},
                {"name": "View analysis scripts (Limited)",         "value": true},
                {"name": "View scheduled tasks (Full rights)",      "value": true,  "help": "Can RUN and DELETE tasks"},
                {"name": "View scheduled tasks (Limited)",          "value": true},
                {"name": "Setup indicators",        "value": true,  "help": "Choose which fields in the data source will be displayed in the surveillance data list"},
                {"name": "Add new data source",     "value": true},
                {"name": "Change user's application rights",        "value": true},
                {"name": "Manage events under surveillance/diseases",   "value": true},
                {"name": "Manage mailling lists",   "value": false},
                {"name": "Change the group user",   "value": true},
                {"name": "Suspend and/or activate a user account",  "value": false},
                {"name": "And and remove users",    "value": true},
                {"name": "Manage data source(s)",   "value": false,  "help": "Create, Modify, Delete data source. Defile time-place-population fields for data source"},
                {"name": "Query data source(s)",    "value": true,  "help": "Define and execute queries against a data source"},
                {"name": "Create new listing",      "value": false,  "help": "Create new listing query to be exeCuted against data sources to his/her group"}
            ]
        },
        {
            "id": 3,
            "name": "NJouom Richard",
            "occupation": "Service Virologie",
            "email": "njouom@pasteur-yaounde.org",
            "group": "Virologist",
            "status": "active",
            "rights": [
                {"name": "View results",            "value": false},
                {"name": "Schedule scripts",        "value": false},
                {"name": "Download scripts",        "value": true},
                {"name": "Add new scripts",         "value": false},
                {"name": "Manage users",            "value": true},
                {"name": "View surveillance data",  "value": true},
                {"name": "View analysis scripts (Full rights)",     "value": false,  "help": "Can DELETE scripts"},
                {"name": "View analysis scripts (Limited)",         "value": false},
                {"name": "View scheduled tasks (Full rights)",      "value": true,  "help": "Can RUN and DELETE tasks"},
                {"name": "View scheduled tasks (Limited)",          "value": true},
                {"name": "Setup indicators",        "value": true,  "help": "Choose which fields in the data source will be displayed in the surveillance data list"},
                {"name": "Add new data source",     "value": true},
                {"name": "Change user's application rights",        "value": true},
                {"name": "Manage events under surveillance/diseases",   "value": true},
                {"name": "Manage mailling lists",   "value": false},
                {"name": "Change the group user",   "value": true},
                {"name": "Suspend and/or activate a user account",  "value": false},
                {"name": "And and remove users",    "value": false},
                {"name": "Manage data source(s)",   "value": true,  "help": "Create, Modify, Delete data source. Defile time-place-population fields for data source"},
                {"name": "Query data source(s)",    "value": false,  "help": "Define and execute queries against a data source"},
                {"name": "Create new listing",      "value": true,  "help": "Create new listing query to be exeCuted against data sources to his/her group"}
            ]
        }
    ]

    $scope.login = function() {
    	
    }
    
    $scope.logout = function() {
    	
    }
    
    $scope.add = {
        open: function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/users/user_add.html',
                controller: 'AddUser',
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

    $scope.changeGroup = {
        open: function(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/users/change_user_group.html',
                controller: 'ChangeUserGroup',
                resolve: {
                    user: function() {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function (newUserGroup) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.manageUserRights = {
        open: function(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/users/manage_user_rights.html',
                controller: 'ManageUserRights',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function (newUserGroup) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

    $scope.removeUser = {
        open: function(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modules/users/views/users/remove_user.html',
                controller: 'RemoveUser',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function (newUserGroup) {
                // $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }

}]);

users.controller('AddUser', function($scope, $uibModalInstance) {
    $scope.submit = function () {
        $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

users.controller('ChangeUserGroup', function($scope, $uibModalInstance, user) {
    $scope.user = user;

    $scope.change = function () {
        $uibModalInstance.close($scope.new_user_group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

users.controller('ManageUserRights', function($scope, $uibModalInstance, user) {
    $scope.user = user;

    $scope.change = function () {
        $uibModalInstance.close($scope.new_user_group);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});

users.controller('RemoveUser', function($scope, $uibModalInstance, user) {
    $scope.user = user;

    $scope.change = function () {
        $uibModalInstance.close($scope.user);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
