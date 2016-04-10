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
    console.log('ages', ages)
    color.domain(ages)

    ////Loop through the data...
    data.forEach(function(d) {
      ////...with y0 as the base... 
      var y0 = 0
      ////...make an arrray of data with one object for each age group
      d.ages = ages.map(function(age){
        // console.log('y0', y0) 
        ////... assign y0 and then add the data value to it to make y1
        return { 'name':age, 'y0':y0, 'y1':(y0 += +d[age]), 'val':+d[age] } 
      })
      ///save the final y1 into the data as d.total
      d.total = d.ages[d.ages.length - 1].y1
    })
    // console.log('data after ages loop', data)

    ///Sort all states descending by total
    data.sort(function(a, b) { return b.total - a.total })

    ////Set x scale domain as an array of state initials
    x.domain(data.map(function(d){ return d.State }))
    ////Set y scale domain as the max total
    y.domain([0, d3.max(data, function(d){ return d.total })])

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
    var state = svg.selectAll(".state").data(data)
      .enter().append("g")
        .attr("class", "g")
        .attr("transform", function(d) { return "translate(" + x(d.State) + ",0)" })

    state.selectAll("rect").data(function(d) { return d.ages })
      .enter().append("rect")
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.y1) })
        .attr("height", function(d) { return y(d.y0) - y(d.y1) })
        .style("fill", function(d) { return color(d.name) })

    
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
    var chartspace = svg.append('rect')
      .datum(data)////bind the data so you dont have to rely on a global variable
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
    }
    function moveTooltip(d,i){
      ////Get the position of the rect.chartspace
      var rectBRC = this.getBoundingClientRect()
      ////Get the mouse X position minus the left offset of rect.chartspace
      var mouseX = d3.event.clientX - rectBRC.left - x.rangeBand() 
      ////Get the ordinal scale range array of left edged
      var leftEdges = x.range()
      ////Look for the index of the closest value in in leftEdges to mouseX
      var dataindex = d3.bisectLeft(leftEdges, mouseX)
      ////Make sure we don't get a dataindex greater than the data array length
      dataindex = d3.min([d.length-1, dataindex])
      
      // console.log( mouseX,  d[dataindex] )

      ////Get the data and then the height of the last bar in the stack 
      var data = d[dataindex]
      var lastage = d[dataindex].ages[d[dataindex].ages.length-1]
      var lastheight = y(lastage.y1)
      
      ////Put the state initial and all age group data in the tooltip HTML
      tooltip.html('').html('<h4>'+data.State+'</h4>')
      var reversed = d[dataindex].ages.slice().reverse()
      reversed.forEach(function(group){
        tooltip.append('p').html(
          '<span class="color_'+color(group.name).replace(/[#]/g,'')+'">'+group.name+'</span>: '+comma(group.val)
          )
      })

      ////Calculate positioning and move tooltip
      var ttBCR = tooltip.node().getBoundingClientRect()
      var topPosition = rectBRC.top + lastheight - ttBCR.height + pageYOffset - 7
      var leftPosition = ( x(data.State) + rectBRC.left + x.rangeBand()*0.5 - ttBCR.width*0.5 ) + pageXOffset
      
      tooltip
        .style({
          top: topPosition+'px', 
          left: leftPosition+'px'
        })
    }
    function hideToolTip(d,i){
      tooltip.classed('show', false)
    }
    //////////////////////////////////////////////////////////


  })

})()