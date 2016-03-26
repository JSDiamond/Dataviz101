var margin = {top: 60, right: 60, bottom: 60, left: 60},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

var svg = d3.select("#circle").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var circle = svg.append('circle').attr({
    r: 0,
    cx: 0,
    cy: 0,
  })

circle
  .transition()
  .duration(1500)
  .attr({
    r: 10,
    cx: 0,
    cy: 0,
    fill: 'coral'
  })
  .transition()
  .duration(1500)
  .attr({
    r: 20,
    cx: width,
    cy: 0,
    fill: 'cyan'
  })
  .transition()
  .duration(1500)
  .attr({
    r: 30,
    cx: width,
    cy: height,
    fill: 'fuchsia'
  })
  .transition()
  .duration(1500)
  .attr({
    r: 40,
    cx: 0,
    cy: height,
    fill: 'orange'
  })
  .transition()
  .duration(1500)
  .attr({
    r: 10,
    cx: 0,
    cy: 0,
    fill: 'coral'
  })