angular.module("alertcam.dashboard", [])

.config(function($stateProvider, $urlRouterProvider) {
	
	$stateProvider
	    .state("dashboard", {
	    	abstract: true,
	    	url: "/dashboard",
	        templateUrl: "modules/dashboard/index.html",
	        controller: function($rootScope, $http, $scope, $uibModal) {
	            $rootScope.state = "dashboard";
	            
	            $http.get('/resource/dashboards')
	            	.success(function(response) {
	            		$scope.dashboards = response;
	            	})
	            	.error(function(error) {
	            		$scope.error = error;
	            	});
	            
	            $http.get('/resource/users/events')
	        	.success(function(response) {
	        		$rootScope.events = response;
	        	})
	        	.error(function(error) {
	        		$scope.error = error;
	        	});
	            
	            
	            $scope.collapse = function($event) {
	            	var el = jQuery($event.target).parent().closest(".panel").children(".panel-body");
	            	
	        		if($($event.target).hasClass("collapses")) {
	        			$($event.target).addClass("expand").removeClass("collapses");
	        			el.slideUp(200);
	        		} else {
	        			$($event.target).addClass("collapses").removeClass("expand");
	        			el.slideDown(200);
	        		}
	            }
	            
	            $scope.config = function(dashboard) {
	            	
	            	var modalInstance = $uibModal.open({
	            		 	animation: $scope.animationsEnabled,
	            		 	templateUrl: '/modules/dashboard/views/config.html',
	            		 	controller: function($scope, $uibModalInstance, dashboard) {
	            		 		
	            		 	},
	            		 	resolve: {
	            		 		dashboard: function () {
	            		 			return dashboard;
		            	        }
	            		 	}
            	 	});
	            	modalInstance.result.then(function (dashboard) {
	            		$scope.ds = dashboard;
            	    }, function () {
            	    	
            	    });
	            }
	        } 
	    })
	    .state("dashboard.list", {
	    	url: "",
	    	templateUrl: "modules/dashboard/views/list.html"
	    })
	    .state("dashboard.add", {
	    	url: "/add/:eventId",
	    	templateUrl: "modules/dashboard/views/add.html",
	    	controller: "AddDashboard"
	    })
	;
})
;

