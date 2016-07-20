var dashboards = angular.module("alertcam.dashboard");

dashboards.directive("barChart", function($window) {
	return {
		restrict: "EA",
		template: "<svg></svg>",
		link: function(scope, elem, attrs) {
			var data = [{
			    'x': 1,
			    'y': 5
			  }, {
			    'x': 20,
			    'y': 20
			  }, {
			    'x': 40,
			    'y': 10
			  }, {
			    'x': 60,
			    'y': 40
			  }, {
			    'x': 80,
			    'y': 5
			  }, {
			    'x': 100,
			    'y': 60
			  }];

			var margins = {
					left: 40,
					right: 40,
					top: 30,
					bottom: 30,
				},
				width = -2 + angular.element(elem).parent().width()/2,
				height = width; // angular.element(elem).height();

			width = width - margins.left - margins.right,
			height = height - margins.top - margins.bottom;
			
			var d3 = $window.d3;
			
			var xRange = d3.scale.ordinal()
							.rangeRoundBands([0, width], .05)
							.domain(data.map(function(d) { return d.x; })),
					        
			    yRange = d3.scale.linear()
			    			.range([height, 0])
			    			.domain([0, d3.max(data, function(d) { return d.x; }) ]),
	    			        
		        xAxis = d3.svg.axis()
		        			.scale(xRange)
		        			.orient("bottom")
		        			// .tickSize(5)
		        			// .tickSubdivide(true),
	        			;
		        yAxis = d3.svg.axis()
		        			.scale(yRange)
		        			.orient("left")
		        			.ticks(10)
		        			// .tickSize(5)
		        			// .tickSubdivide(true)
	        			;
			
			var svg = d3.select(elem.find('svg')[0])
						.attr("width", width + margins.left + margins.right)
						.attr("height", height + margins.top + margins.bottom)
						.append("g")
						.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
					;
			
			svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0, ' + height + ')')	
				.call(xAxis)
				.selectAll("text")
					.style("text-anchor", "end")
					.attr("dx", "-.8em")
					.attr("dy", "-.55em")
					.attr("transform", "rotate(-90)")
			;
			
			svg.append('g')
				.attr('class', 'y axis')
				.call(yAxis)
				.append('text')
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Y axis")
			;
				
		    svg.selectAll('bar')
		    	.data(data)
		    	.enter()
		    	.append('rect')
		    	.style("fill", "steelblue")
		    	.attr('x', function(d) {
		    		return xRange(d.x);
		    	})
		    	.attr('y', function(d) {
		    		return yRange(d.y);
		    	})
		    	.attr('width', xRange.rangeBand())
		    	.attr('height', function(d) {
		    		return height - yRange(d.y);
		    	})
		    ;
		}
	}
});