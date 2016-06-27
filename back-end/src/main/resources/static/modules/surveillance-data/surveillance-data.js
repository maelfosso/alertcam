'use strict';

angular.module('alertcam.surveillance', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("surveillance", {
            url: "/surveillance",
            templateUrl: "modules/surveillance-data/index.html",
            controller: function($rootScope, $http, $scope) {
                $rootScope.state = "surveillance";

                /*$scope.dsl = [
                    { name: "influenza_ds", event: "influenza" },
                    { name: "Surveillance Grippe", event: "influenza" },
                    { name : "test", event: "influenza" }
                ]*/
                
                $http.get('/resource/surveillance/data-sources')
                	.success(function(response) {
                		// console.log(response);
                		
                		$scope.dsl = response;
                	})
                	.error(function(error) {
                		$scope.error = error;
                	});
            } 
        })
    ;
})


;
