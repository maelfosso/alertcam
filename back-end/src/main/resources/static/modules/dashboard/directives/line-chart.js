var dashboards = angular.module("alertcam.dashboard");

dashboards.directive("lineChart", function($window) {
	return {
		restrict: "EA",
		template: "<svg></svg>",
		scope: {
			data: '=data',
			x: '=x',
			y: '=y',
			z: '=z',
				
			test: '=test',
			threshold: '=threshold'
		},
		link: function(scope, elem, attrs) {
			
			var data = scope.data,
				x = scope.x,
				y = scope.y,
				z = scope.z,
				
				test = false, //scope.test,
				threshold = scope.threshold;
			var d3 = $window.d3;
			var margins = {
					left: 40,
					right: 40,
					top: 	30,
					bottom:	30
				},
				width = 500,
				height = 350;
			
			width = width - margins.left - margins.right,
			height = height - margins.top - margins.bottom;
			
			if (x.variable.axis == 'Time') {
				
				var formatDate,
					options = x.variable.options;
				for (i = 0; i < options.length; i++) {
					if (options[i].name == 'formatDate') {
						formatDate = d3.time.format(options[i].value);
						
						break;
					}
				} 					
				
				data.forEach(function(d, i, data) {
					if (d.x) {
						d.x = formatDate.parse(d.x.toString());
					} else {
						data.splice(i, 1);
					}
					
					d.y = +d.y;
				});
			}
			data.sort(function(a, b) {
				return d3.ascending(a.x, b.x);
			});
			
			var xScale /*= d3.time.scale()
						.range([0, width])
						.domain(d3.extent(data, function(d) { return d.x; }))*/
				;
			if (x.variable.axis == 'Time') {
				xScale = d3.time.scale()
							.range([0, width])
							.domain(d3.extent(data, function(d) { return d.x; }));
			} else {// if (xAxis.variable.axis == 'INT') {
				xScale = d3.scale.linear()
							.range([0, width])
							.domain(d3.extent(data, function(d) { return d.x; }));
			}
			
			
			
			var yScale = d3.scale.linear()
						.domain(d3.extent(data, function(d) { return d.y; }))
						.range([height, 0])
					;
			
			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient("bottom")
						// .ticks(data.length - 1)
					;
			
			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient("left")
						// .ticks(5)
					;
			
			var line = d3.svg.line()
						.x(function(d) {
							return xScale(d.x);
						})
						.y(function(d) {
							return yScale(d.y);
						})
					;
			
			var svg = d3.select(elem.find("svg")[0])
						.attr("width", width + margins.left + margins.right)
						.attr("height", height + margins.top + margins.bottom)
						.append("g")
						.attr("transform", "translate(" + margins.left + "," + margins.top + ")");
			
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + height + ")")
				.call(xAxis);
			
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
				
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", -30)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text(y.display)
			;
			
			svg.append("path")
				.datum(data)
				.attr("class", "line")
				.attr("d", line)
			;

			if (threshold) {
				// On ajoute une ligne horizontal
			}
		}
	}
}) 