angular.module('hello', [])
	.controller('home', function($http) {
		this.greeting = {id: 'xxx', content: 'Hello World !!!'}
		var self = this;
		$http.get('/resource/').then(function(response) {
			self.greeting = response.data;
		});
	})