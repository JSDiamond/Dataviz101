(function(){

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 860 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1)

  var y = d3.scale.linear()
  .rangeRound([height, 0])

  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
  ////the domain for the color scale will be defined after the data is loaded

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"));

  var svg = d3.select("#stack1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.csv("data/population.csv", function(error, data) {
    if (error) throw error;

    ////Get an array of the keys from the first obect and ommit "State", leaving only age ranges
    var ages = d3.keys(data[0]).filter(function(key) { return key !== "State" })
    color.domain(ages)

    
    var age_arrays = ages.map(function(age) {
      var all_states = data.map(function(state){ return {'x':state.State, 'y':+state[age]} })
      return {'group':age, 'values':all_states}
    })

    var stack = d3.layout.stack()
              // .offset("zero")
              .values(function(d){ return d.values })
              .x(function(d){ return d.x })
              .y(function(d){ return d.y })

    var layers = stack(age_arrays)

    console.log(age_arrays)
    console.log(layers)

    // ///Sort all states descending by total
    // data.sort(function(a, b) { return b.total - a.total })

    ////Get the max (d.y0+d.y) from the last values in the last age group, because it's the top layer
    var hMax = d3.max(layers[layers.length-1].values, function(d){ return d.y0+d.y })
    y.domain([0, hMax])
    console.log(hMax)

    ////Set x scale domain as an array of state initials
    x.domain(data.map(function(d){ return d.State }))

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
      .text("Population")

    ////Make group element for each state
    var state = svg.selectAll(".state").data(layers)
      .enter().append("g")
        .attr("class", function(d){console.log(color(d.group).replace(/[#]/g,'')); return "gage color_"+color(d.group).replace(/[#]/g,'') })
        .attr("transform", function(d) { return "translate(" + 0 + ",0)" })

    state.selectAll("rect").data(function(d) { return d.values })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("x", function(d) { return x(d.x) })
        .attr("y", function(d) { return y(d.y) })
        .attr("height", function(d) { return  y(d.y0) - y(d.y) }) //y(d.y) - y(d.y0)

    
    ////Make an legend
    var legend = svg.selectAll(".legend").data( ages.reverse() ) ////reverse the ages to draw top to bottom
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) { return "translate(-20," + i * 20 + ")" })

    legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color)

    legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d })


  })

})()