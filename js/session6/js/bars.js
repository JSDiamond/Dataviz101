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


  var bars = svg.selectAll(".bar").data(dataset)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d,i) { return xScale(i) })
      .attr("width", xScale.rangeBand())
      .attr("y", function(d) { return yScale(d.frequency) })
      .attr("height", function(d) { return height - yScale(d.frequency) })

  

  ////Add an element to the body of your HTML to be used as a tooltip.
  ////This one element can be used for anything you hover over,
  ////instead of having groups with text elements that display on hover.
  var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

  bars.on('mouseenter', showToolTip)
    .on('mouseleave', hideToolTip)

  function showToolTip(d,i){
    //console.log(d)

    tooltip.classed('show', true)
    tooltip.html('Letter: '+d.letter+'<br>'+d.frequency)

    ////getBoundingClientRect() will return an object that has the
    ////width, height, and distance from the top, left, and bottom of the page
    var rectBCR = this.getBoundingClientRect()
    // console.log(rectBCR)
    
    // tooltip
    //   .style({
    //     ////pageYOffset is the pixel distance you've scrolled from the top of the screen.
    //     ////it comes as a global variable, complements of the browser
    //     top: (rectBCR.top + pageYOffset)+'px',
    //     left: rectBCR.left+'px'
    //   })

    ////Now let's center the tooltip above the bar
    var ttBCR = tooltip.node().getBoundingClientRect()
    var topPosition = ( rectBCR.top - ttBCR.height + pageYOffset )
    var leftPosition = ( rectBCR.left - ttBCR.width*0.5 + rectBCR.width*0.5 )
    
    tooltip
      .style({
        top: topPosition+'px', 
        left: leftPosition+'px'
      })
  }

  function hideToolTip(d,i){
    tooltip.classed('show', false)
  }

}
