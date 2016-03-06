////////////////////////////////////////////////
//// Session 5
////////////////////////////////////////////////


function renderSimpleLines(){
  var width = 600
    , height = 400

  var svg = d3.select("#linez").append("svg")
      .attr("width", width)
      .attr("height", height)

  svg.append('line')
    .attr({
      x1: 10, // x postion of start point
      y1: 20, // y postion of start point
      x2: 50, // x postion of end point
      y2: 20, // y postion of end point
      stroke: 'coral', // stroke color
      'stroke-width': 2 // stroke width
    })

  svg.selectAll(".newline").data(d3.range(20))
    .enter().append("line")
    .attr({
      x1: 10,
      y1: function(d){ return (d+3)*10 },
      x2: width-10,
      y2: function(d){ return (d+20)*10 },
      stroke: 'cyan',       
      'stroke-width': 2     
    })
}

renderSimpleLines()




function convert(d) {
  return d
}


//// Request the data file 
d3.csv("data/co2-emissions.csv", convert, function(error, dataset) {
  if (error) throw error

  console.log(dataset)
  // dataset.forEach(function(d){
  //   d.frequency = +d.frequency
  // })

})



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

