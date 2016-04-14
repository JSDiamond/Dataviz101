d3.csv("data/tasks.csv", function(error, tasks) {
	if (error) throw error;

	console.log(tasks)

	// var nested_data = d3.nest()
	//     .key(function(d){ return d.status })
	//     // .key(function(d){ return d.who })
	//     // .key(function(d){ return d.priority })
	//     // .rollup(function(leaves){ 
	//     // 	return leaves.map(function(d){return d.who})
	//     // })
	//     .entries(tasks)

	var nested_data = d3.nest().key(function(d) {
    return d.status;
}).sortKeys(d3.ascending).key(function(d) {
    return d.priority;
}).sortKeys(d3.descending).rollup(function(leaves) {
    return leaves.length;
}).entries(tasks);

	console.log(nested_data)

})