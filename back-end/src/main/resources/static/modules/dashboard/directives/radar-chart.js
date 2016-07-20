var dashboards = angular.module("alertcam.dashboard");

dashboards.directive("radarChart", function($window) {
	return {
		restrict: "EA",
		template: "<svg></svg>",
		scope: {
			data: "=data",
			test: "=test"				
		},
		link: function() {
			
			var data = scope.data,
				xtype = scope.xtype,
				ytype = scope.ytype,
				test = scope.test;
			
			var d3 = $window.d3;
			var margins = {
					left: 40,
					right: 40,
					top: 	30,
					bottom:	30
				},
				width,
				height;
			
			if (test) {
				width = angular.element(elem).width(),
				height = width;
			} else {
				width = -2 + angular.element(elem).parent().width()/2,
				height = width;
			}
			width = width - margins.left - margins.right,
			height = height - margins.top - margins.bottom;

		
		}
	}
});