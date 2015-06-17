$(function() {
	var data = [4, 8, 15, 16, 23, 42];

	// d3 demo2a
	// using hard coded multiplier
		// d3.select(".chart")
		//   .selectAll("div")
		//     .data(data)
		//   .enter().append("div")
		//     .style("width", function(d) { return d * 10 + "px"; })
		//     .text(function(d) { return d; });

	// d3 demo2b
	// using linear scale multiplier
	var x = d3.scale.linear()
	    .domain([0, d3.max(data)])
	    .range([0, 420]);

	d3.select(".chart")
	  .selectAll("div")
	    .data(data)
	  .enter().append("div")
	    .style("width", function(d) { return x(d) + "px"; })
	    .text(function(d) { return d; });
});