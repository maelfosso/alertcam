var variables = angular.module('alertcam.surveillance');

variables.factory('Variable', function($log) {
	
	function Variable(name, type, parent, axis) {
		this.name = name;
		this.type = type;
		this.parent = parent;
		this.axis = axis;
		
		this.options = [];
		if (axis == 'Time') {
			this.options.push({
				name: 'formatDate',
				value: 'YYYY-MM-dd'
			});
		}
	}
	
	Variable.prototype = {
			
			formatDate: function(value) {
				if (angular.isDefined(value)) {
					for(i = 0; i < this.options.length; i++) {
						if (this.options[i].name == 'formatDate') {
							this.options[i].value = value;
						}
					}
					
					$log.debug(this);
				} else {
					for(i = 0; i < this.options.length; i++) {
						if (this.options[i].name == 'formatDate') {
							return this.options[i].value;
						}
					}
				}				
			}
	}
	
	return (Variable);
});