'use strict';

// Declare app level module which depends on views, and components
angular.module('alertcam', [
  // 'ngRoute',
  'ui.router',
  'ui.bootstrap',

  // 'alertcam.users'

])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	
	// $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	
	$urlRouterProvider.otherwise("welcome"); // welcome: non connecte; home: connecte
	
	$stateProvider
		/*.state("root", {
			url: "",
			template: "<div ui-view></div>",
			controller: function($state, user) {
				if ($state.is("root")) {
					$state.go(user.logged ? "home" : "welcome")
				}
			}
		})*/
		
		.state("welcome", {
			url: "/welcome",
			templateUrl: "modules/welcome/welcome.html",
			controller: function($http) {
				var self = this;
				
				$http.get('resource/').then(function(response) {
					self.name = response.data.content;
				});
			},
			controllerAs: 'well'
		})
		.state("about", {
			url: "/about",
			templateUrl: "modules/welcome/about.html",
			controller: function($scope) {}
		})
		.state("contact", {
			url: "/contact",
			templateUrl: "modules/welcome/contact.html",
			controller: function($scope) {}
		})
		.state("login", {
			url: "/login",
			templateUrl: "modules/welcome/login.html",
			controller: "LoginController",
			controllerAs: "login"
		})
		.state("home", {
			url: "/",
			templateUrl: "modules/home.html",
			controller: "HomeController"
		});
	
	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
})

.controller('HomeController', function($rootScope, $state, $http, $location) {
	var self = this;


	self.logout = function() {
		console.log("Louggggoooooouuttt....");
		
		$http.post('logout', {}).finally(function() {
			$rootScope.authenticated = false;
			$state.go("welcome");
		});
	}	
})
.controller('LoginController', function($rootScope, $state, $http, $location) {
	$rootScope.login = true;
	var self = this;
	
	var authenticate = function(credentials, callback) {
		var headers = credentials 
			? {
				authorization : "Basic " + btoa(credentials.username + ":" + credentials.password)
			} : {};
			
		$http.get('user', {headers : headers}).then(function(response) {
			if (response.data.name) {
				$rootScope.authenticated = true;
			} else {
				$rootScope.authenticated = false;
			}
			
			callback && callback();
		}, function() {
			$rootScope.authenticated = false;
			
			callback && callback();
		})
	}
	
	authenticate();
	self.credentials = {};
	self.login = function() {
		
		authenticate(self.credentials, function() {
			if ($rootScope.authenticated) {
				$state.go("home");
				$state.error = false;
			} else {
				$state.go("login");
				$state.error = true;
			}
		});
	}
	
	
})

.controller("navigation", function($rootScope, $state) {
	var self = this;
})

;
