(function map2(){

	var projection = d3.geo.mercator();

	var path = d3.geo.path()
	    .projection(projection);

	var svg = d3.select("#map1").append('svg')
		.attr({
			width: 900,
			height: 600
		})

	d3.json("data/countries.json", function(error, collection) {
	  if (error) throw error;

	  svg.selectAll("path")
	      .data(collection.features)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("stroke", "#fff")
	})

})()