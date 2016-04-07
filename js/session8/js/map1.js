(function map1(){

	var width = 900
		, height = 600

	var projection = d3.geo.mercator()
		.scale(100)
		// .center([-73.9884189, 40.7313029])
		// .rotate([-100, 0])
		// .translate([width / 2, height / 2])

	console.log( projection.scale() )

	var path = d3.geo.path()
	    .projection(projection)
	    

	var svg = d3.select("#map1").append('svg')
		.attr({
			width: width,
			height: height
		})

	d3.json("data/countries.json", function(error, collection) {
	  if (error) throw error;

	  console.log(collection)

	  var land = svg.selectAll("path")
	      .data(collection.features)
	    .enter().append("path")
	      .attr("d", path)
	      .attr("fill", "#bbb")
	      .attr("stroke", "#fff")
	      .attr("stroke-width", 0.5)

		// d3.timer(function() {
		//   projection.rotate([0, 0.005 * (Date.now() - start)])
		//   land.attr("d", path)
		// })
	})

})()