d3.csv("data/tasks.csv", function(error, tasks) {
	if (error) throw error;

	console.log(tasks)

	var nested_data = d3.nest()
	    .key(function(d){ return d.status })
	    .key(function(d){ return d.who })
	    .key(function(d){ return d.priority })
      .key(function(d){ return d.time })
	    .rollup(function(leaves){ 
        return leaves.length
	    	// return leaves.map(function(d){return d.name})
	    })
      .sortKeys(d3.descending)
	    .entries(tasks)

	console.log( nested_data )
  

  // function recurse(n){
  //   if(n==0){
  //     console.log('ZERO!!!!!')
  //   } else {
  //     console.log(n)
  //     var n1 = Math.floor(Math.random()*4)
  //     recurse(n1)
  //   }
  // }
  // var n1 = Math.floor(Math.random()*4)
  // recurse(n1)

  function recursiveList(dataset, papa){

    dataset.forEach(function(d){
      if(d.hasOwnProperty('values') && Object.prototype.toString.call( d.values ) == '[object Array]' ){
        // console.log('parent')

        ////Make an unordered list for the values
        ////Give that list an h4 title
        var newpapa = papa.append('li').append('ul').html('<h4>'+d.key+'</h4>')

        ////Call the function again on the children
        recursiveList(d.values, newpapa)
      } else {
        // console.log('child')
        ////Make list items for each child
        papa.append('li').text(d.key+': '+d.values)
        // papa.append('li').text(d.key+': '+d.values)
      }
    })
    // console.log( dataset, '-------------------------')
  }
  recursiveList(nested_data, d3.select('#nesting'))

  
  // var statuses = d3.select('#nesting').selectAll('ul').data(nested_data)
  //   .enter().append('ul')
  //   .html(function(d){ return '<h4>'+d.key+'</h4>' })

  // statuses.selectAll('li').data(function(d){ return d.values })
  //   .enter().append('li')
  //   .html(function(d){ return d.key+': '+d.values })
})



