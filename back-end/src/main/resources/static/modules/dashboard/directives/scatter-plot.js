var dashboards = angular.module("alertcam.dashboard");

dashboards.directive("scatterPlot", function($window) {
	return {
		restrict: "EA",
		template: "<svg></svg>",
		link: function(scope, elem, attrs) {
			var data = [
		            {
					    "name": "Dairy Milk",
				        "manufacturer": "cadbury",
				        "price": 45,
				        "rating": 2
					}, 
					{
					    "name": "Galaxy",
				        "manufacturer": "Nestle",
				        "price": 42,
				        "rating": 3
					}, 
					{
					    "name": "Lindt",
				        "manufacturer": "Lindt",
				        "price": 80,
				        "rating": 4
					}, 
					{
					    "name": "Hershey",
				        "manufacturer": "Hershey",
				        "price": 40,
				        "rating": 1
					}, 
					{
					    "name": "Dolfin",
				        "manufacturer": "Lindt",
				        "price": 90,
				        "rating": 5
					}, 
					{
						"name": "Bournville",
				        "manufacturer": "cadbury",
				        "price": 70,
				        "rating": 2
					}
			];
			
			var margins = {
					left: 40,
					right: 40,
					top: 30,
					bottom: 30
				},
				width = -2 + angular.element(elem).parent().width()/2,
				height = width;
			
			width = width - margins.left - margins.right,
			height = height - margins.top - margins.bottom;
			
			var d3 = $window.d3;
			
			var xScale = d3.scale.linear()
							.domain(d3.extent(data, function(d) {
								return d.price;
							}))
							.range([0, width]),
				xValue = function(d) {
					return d.price;
				},
				xMap = function(d) {
					return xScale(xValue(d));
				},
				xAxis = d3.svg.axis()
							.scale(xScale)
							.orient("bottom")
			;
			
			var yScale = d3.scale.linear()
							.domain(d3.extent(data, function(d) {
								return d.rating;
							}))
							.range([height, 0]),
				yValue = function(d) {
					return d.rating;
				},
				yMap = function(d) {
					return yScale(yValue(d));
				},
				yAxis = d3.svg.axis()
							.scale(yScale)
							.orient("left")
			;
				
			// setup fill color
			var cValue = function(d) {
					return d.manufacturer;
				},
				color = d3.scale.category10();
				
			var svg = d3.select(elem.find('svg')[0])
						.attr('width', width + margins.left + margins.right)
						.attr('height', height + margins.top + margins.bottom)
						.append('g')
						.attr('transform', 'translate(' + margins.left + ',' + margins.top + ')');
			
			var tooltip = d3.select(elem[0]).append('div')
						.attr('class', 'tooltip')
						.style('opacity', 0)
					;
			// x axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0, " + height + ")")
				.call(xAxis)
				.append('text')
					.attr('class', 'label')
					.attr('x', width)
					.attr('y', -6)
					.style('text-anchor', 'end')
					.text('Price')
			;
			
			svg.append("g")
				.attr("class", "y axis")
				.call(yAxis)
				.append('text')
					.attr('class', 'label')
					.attr('transform', 'rotate(-90)')
					.attr('y', 6)
					.attr('dy', '.71em')
					.style('text-anchor', 'end')
					.text('Rating')
			;
			
			svg.selectAll('.dot')
				.data(data)
				.enter()
				.append('circle')
				.attr('class', 'dot')
				.attr('r', 3.5)
				.attr('cx', xMap)
				.attr('cy', yMap)
				.style('fill', function(d) {
					return color(cValue(d));
				})
				.on('mouseover', function(d) {
					tooltip.transition()
							.duration(200)
							.style('opacity', .9);
					tooltip.html("Value - " + xValue(d) + "," + yValue(d))
							.style("left", (d3.event.pageX + 5) + "px")
							.style("top", (d3.event.pageY - 28) + "px")
							
				})
				.on('mouseout', function(d) {
					toolpit.transition()
							.duration(500)
							.style('opacity', 0);
				})
			
		}
	}
});
