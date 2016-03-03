////////////////////////////////////////////////
//// Session 4
////////////////////////////////////////////////


//// Here is an accessor function you can pass into the data request
//// that will called for each "row", aka object, in the data.
//// We use it here, to convert the frequency data from a String to a Float
function convert(d) {
  //// Append the data to the unordered list as a String
  d3.select('#stringdata').append('li').text( d.frequency )
  
  //// Easy syntax for turning a javascript String to a Float
  d.frequency = +d.frequency
  //// Alternately, you could use 
  //d.frequency = parseFloat(d.frequency)

  //// Append the data to the other unordered list as the now converted Float
  d3.select('#numdata').append('li').text( d.frequency )
  
  return d //// Make sure you return the data that you altered
}


//// Request the data file 
d3.tsv("data/alpha.tsv", convert, function(error, dataset) {
  if (error) throw error

  // dataset.forEach(function(d){
  //   d.frequency = +d.frequency
  // })

  renderRangeBands()
  renderChart(dataset)
})





function renderRangeBands(){
  var width = 600
  var height = 400
  var data = ['A', 'B', 'C', 'D', 'E']

  var rb_scale = d3.scale.ordinal()
  
  //// For rangeBands, the domain of the data is the array, not the extent
  rb_scale.domain(d3.range(5))

  //// For rangeBands, the range is the extent and a decimal for padding
  rb_scale.rangeRoundBands([0, width], 0.3)

  console.log( 'rb_scale.domain() = '+rb_scale.domain() )
  console.log( 'rb_scale.range() = '+rb_scale.range() )
  console.log( 'rb_scale.rangeBand() = '+rb_scale.rangeBand() )

  var svg = d3.select("#rangebands").append("svg")
    .attr("width", 600)
    .attr("height", 400)

  d3.shuffle(data)

  var rects = svg.selectAll(".bar").data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return rb_scale(i) })
      .attr("width", rb_scale.rangeBand()) ////This returns the width between each section of padding
      .attr("y", 100)
      .attr("height", height*0.5)

  var text = svg.selectAll("text").data(data)
    .enter().append("text")
      .attr("class", "barlabel")
      .attr("x", function(d,i){ return rb_scale(i)+(rb_scale.rangeBand()*0.5) }) ////Centered text
      .attr("y", 200)
      .text(function(d,i){ return d+": "+rb_scale(i) })
}




function renderChart(dataset){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1)

  var yScale = d3.scale.linear()
      .range([height, 0])

  var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient("bottom")

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10, "%")

  var svg = d3.select("#barchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  //xScale.domain( dataset.map(function(d) { return d.letter }) )
  xScale.domain( d3.range(dataset.length) )
  yScale.domain([0, d3.max(dataset, function(d) { return d.frequency })])

  console.log('DOMAIN == '+xScale.domain())

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency")


  svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.frequency) })
      .attr("height", function(d) { return height - yScale(d.frequency) })
}

