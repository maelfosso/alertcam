'use strict';

angular.module('alertcam.tasks', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("tasks", {
            url: "/tasks",
            templateUrl: "modules/tasks-management/index.html",
            controller: function($rootScope, $scope) {
                $rootScope.state = "tasks";

                $scope.dsl = [
                    { name: "influenza_ds", event: "influenza" },
                    { name: "Surveillance Grippe", event: "influenza" },
                    { name : "test", event: "influenza" }
                ]
            } //"SurveillanceController",
        })
    ;
})


;
