////////////////////////////////////////////////
//// Session 4 bar chart
////////////////////////////////////////////////


function convert(d) {
  d.frequency = +d.frequency
  return d 
}


d3.tsv("data/alpha.tsv", convert, function(error, dataset) {
  if (error) throw error
  renderChart(dataset)
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
      .tickFormat(function(d){ return dataset[d].letter })

  var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient("left")
      .ticks(10, "%")

  var svg = d3.select("#bars").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  xScale.domain( d3.range(dataset.length) )
  yScale.domain([0, d3.max(dataset, function(d) { return d.frequency })])


  var g_xaxis = svg.append("g")
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


  var bars = svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())

      //// Normally we would just set the y and height values properly...
      // .attr("y", function(d) { return yScale(d.frequency) })
      // .attr("height", function(d) { return height - yScale(d.frequency) })

      //// ...but this time we'll start at 0 height on the baseline, so we can animate in...
      .attr("y", yScale( yScale.domain()[0] ))
      .attr("height", 0)

  //// ...here
  bars
    //// Everything after this will animate over a period of time
    .transition()
    //// And here's that period of time
    .duration(1000) 
    // .delay(function(d,i){ console.log(i*100); return i*100 })
      .attr("y", function(d) { return yScale(d.frequency) })
      .attr("height", function(d) { return height - yScale(d.frequency) }) 


  
  //// Set an interval to automatically run the updateBars function 
  // setInterval(updateBars, 4000) 

  function updateBars(){
    //// Set all bars back to 0 height on the baseline
    bars
      .transition()
      .duration(100)
        .attr("y", yScale(0))
        .attr("height", 0)

    //// Shuffle the data
    d3.shuffle(dataset)

    //// Update the data bound to each bar
    bars.data(dataset)

    //// Call the xAxis function to update with the newly shuffled data
    g_xaxis.call(xAxis)

    //// Make an animation to hide and show the shuffled tick marks
    g_xaxis.selectAll('text')
      .style('fill', '#fff')
      .transition()
      .duration(1000)
        .style('fill', '#aaa')

    //// Animate the bars with their new height value
    bars
      .transition()
      .duration(1000)
      .delay(function(d,i){ return (i+10)*60 })
        .attr("y", function(d) { return yScale(d.frequency) })
        .attr("height", function(d) { return height - yScale(d.frequency) })
  }

}
