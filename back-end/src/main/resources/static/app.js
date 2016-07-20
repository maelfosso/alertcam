'use strict';

// Declare app level module which depends on views, and components
angular.module('alertcam', [
  // 'ngRoute',
  'ui.router',
  'ui.bootstrap',
  'checklist-model',
  'ngFileUpload',
  'dndLists',
  'angular.filter',
  
  'alertcam.users',
  'alertcam.surveillance',
  'alertcam.tasks',
  'alertcam.dashboard'


])
.run(function($rootScope) {
    $rootScope.authenticated = true;
})
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

	$urlRouterProvider.otherwise("dashboard"); // welcome: non connecte; home: connecte

	$stateProvider
		.state("welcome", {
			url: "/welcome",
			templateUrl: "modules/welcome/welcome.html",
			controller: function($http) {
				var self = this;

				/*$http.get('resource/').then(function(response) {
					self.name = response.data.content;
				});*/
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
			/*controller: "LoginController",
			controllerAs: "login"*/
		})
		.state("home", {
			url: "/",
			templateUrl: "modules/home.html",
			controller: "HomeController"
		})
        ;


	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
})

.controller('HomeController', function($rootScope, $state, $http, $location) {
	var self = this;
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


;
