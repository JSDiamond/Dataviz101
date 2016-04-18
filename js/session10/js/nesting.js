d3.csv("data/tasks.csv", function(error, tasks) {
	if (error) throw error;

	console.log(tasks)

	var nested_data = d3.nest()
	    .key(function(d){ return d.status })
	    .key(function(d){ return d.who })
	    // .key(function(d){ return d.priority })
	    .rollup(function(leaves){ 
        return leaves.length
	    	// return leaves.map(function(d){return d.who})
	    })
      .sortKeys(d3.descending)
	    .entries(tasks)

	console.log(JSON.stringify(nested_data))
  
  var statuses = d3.select('#nesting').selectAll('ul').data(nested_data)
    .enter().append('ul')
    .attr({

    })
    .html(function(d){ return '<h4>'+d.key+'</h4>' })

  statuses.selectAll('li').data(function(d){ return d.values })
    .enter().append('li')
    .attr({

    })
    .html(function(d){ return d.key+': '+d.values })
})