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
        	url: "/datasource/add",
        	templateUrl: "modules/surveillance-data/views/data-sources/wizard.html",
        	controller: 'AddDatasource'
        })
        .state("surveillance.variables", {
        	url: "/datasource/:datasourceId/variables",
        	templateUrl: "modules/surveillance-data/views/variables/list.html",
        	controller: "ListVariables",
        	resolve: {
        		datasourceID: function($stateParams) {
        			return $stateParams.datasourceId;
        		}
        	}
        })
        .state("surveillance.variables-edit", {
        	url: "/datasource/:datasourceId/variables/edit",
        	templateUrl: "modules/surveillance-data/views/variables/add.html",
        	controller: "AddVariables"
        })
        .state("surveillance.indicators", {
        	url: "/datasource/:datasourceId/indicators",
        	templateUrl: "modules/surveillance-data/views/indicators/list.html",
        	controller: "ListIndicators"
        })
    ;
})


;
