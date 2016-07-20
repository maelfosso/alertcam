angular.module('alertcam.surveillance', [])

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("surveillance", {
        	abstract: true,
            url: "/surveillance",
            templateUrl: "modules/surveillance-data/index.html",
            controller: function($rootScope, $http, $scope) {
                $rootScope.state = "surveillance";
                
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
        .state("surveillance.list", {
        	url: "",
        	templateUrl: "modules/surveillance-data/views/data-sources/list.html"
        })
        .state("surveillance.add", {
        	url: "/add",
        	templateUrl: "modules/surveillance-data/views/data-sources/wizard.html",
        	controller: 'AddDatasource'
        })
    ;
})


;
