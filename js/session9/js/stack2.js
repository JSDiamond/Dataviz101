(function(){

  var margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = 860 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom

  var x = d3.scale.ordinal()
  .rangeRoundBands([0, width], .1)

  var y = d3.scale.linear()
  .rangeRound([height, 0])

  var color = d3.scale.ordinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"])
  ////the domain for the color scale will be defined after the data is loaded

  var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom")

  var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .tickFormat(d3.format(".2s"))

  var area = d3.svg.area()
    .interpolate('monotone')
    .x(function(d){ return x(d.x)+x.rangeBand()*0.5 })
    .y0(function(d){ return y(d.y0) })
    .y1(function(d){ return y(d.y0 + d.y) });

  var svg = d3.select("#stack2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  d3.csv("data/population.csv", function(error, data) {
    if (error) throw error;

    ////Get an array of the keys from the first obect and ommit "State", leaving only age ranges
    var ages = d3.keys(data[0]).filter(function(key) { return key !== "State" })
    color.domain(ages)

    data.forEach(function(d) {
      var t = 0
      ages.forEach(function(age){
        t += +d[age]
      })
      d.total = t
    })
    ////Sort all states descending by total
    data.sort(function(a,b){ return b.total - a.total})
    
    var age_arrays = ages.map(function(age) {
      
      var all_states = data.map(function(state){ return {'x':state.State, 'y':+state[age]} })
      
      return {'group':age, 'values':all_states}
    })

    var stack = d3.layout.stack()
      .values(function(d){ return d.values })
      .x(function(d){ return d.x })
      .y(function(d){ return d.y })

    var layers = stack(age_arrays)

    console.log(age_arrays)
    console.log(layers)

    ////Get the max (d.y0+d.y) from the last values in the last age group, because it's the top layer
    var hMax = d3.max(layers[layers.length-1].values, function(d){ return d.y0+d.y })
    y.domain([0, hMax])
    // console.log(hMax)

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

    ////Make group element for each age group
    var agegroups = svg.selectAll(".state").data(layers)
      .enter().append("g")
        .attr("class", function(d){
          // console.log(color(d.group).replace(/[#]/g,'')); 
          return "gage color_"+color(d.group).replace(/[#]/g,'') 
        })
        .attr("transform", function(d) { return "translate(" + 0 + ",0)" })

    agegroups.append("path")
      .attr("class", "area")
      .attr("d", function(d){ return area(d.values); })

    
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



    //////////////////////////////////////////////////////////
    //// Adding a tooltip to map1
    //////////////////////////////////////////////////////////
    var guideline = svg.append('line')
      .attr({
        'x1': 0
        , 'y1': 0
        , 'x2': 0
        , 'y2': height
        , 'class': 'guideline'
      })
    var chartspace = svg.append('rect').datum(layers)
      .attr({
        'x': 0
        , 'y': 0
        , 'width': width
        , 'height': height
        , 'class': 'chartspace'
      })
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')
    var comma = d3.format('0,000')

    chartspace.on('mouseenter', showToolTip)
              .on('mousemove', moveTooltip)
              .on('mouseleave', hideToolTip)

    var decimal = d3.format(".1f")
    function showToolTip(d,i){
      tooltip.classed('show', true)
      guideline.classed('show', true)
    }
    function moveTooltip(d,i){
      var rectBRC = this.getBoundingClientRect()
      var mouseX = d3.event.clientX - rectBRC.left - x.rangeBand() 
      var leftEdges = x.range()
      var dataindex = d3.bisectLeft(leftEdges, mouseX)
      ////Isolate the top layer in the stack
      var toplayer = d[d.length-1].values
      dataindex = d3.min([toplayer.length-1, dataindex])

      ////Get the data and then the height of the last bar in the stack 
      var data = toplayer[dataindex]
      var lastheight = y(data.y0 + data.y)//y(data.y)

      // console.log( mouseX, data )
      
      ////Put the state initial and all age group data in the tooltip HTML
      ////data.x instead of data.State
      tooltip.html('').html('<h4>'+data.x+'</h4>')
      var reversed = d.slice().reverse()
      reversed.forEach(function(group){
        tooltip.append('p').html(
          '<span class="color_'+color(group.group).replace(/[#]/g,'')+'">'+group.group+'</span>: '+comma(group.values[dataindex].y)
          )
      })

      // ////Calculate positioning and move tooltip
      var ttBCR = tooltip.node().getBoundingClientRect()
      var topPosition = rectBRC.top + lastheight - ttBCR.height + pageYOffset - 7
      ////data.x instead of data.State
      var leftPosition = ( x(data.x) + rectBRC.left + x.rangeBand()*0.5 - ttBCR.width*0.5 ) + pageXOffset
      
      tooltip
        .style({
          top: topPosition+'px', 
          left: leftPosition+'px'
        })

      guideline
        .attr({
          'x1': x(data.x) + x.rangeBand()*0.5
          , 'x2': x(data.x) + x.rangeBand()*0.5
        })
    }
    function hideToolTip(d,i){
      tooltip.classed('show', false)
      guideline.classed('show', false)
    }
    //////////////////////////////////////////////////////////


  })

})()