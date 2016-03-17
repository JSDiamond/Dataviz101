////////////////////////////////////////////////
//// Session 5
////////////////////////////////////////////////


d3.csv("data/co2-emissions.csv", convert, function(error, dataset) {
  if (error) throw error
  renderAllPaths(dataset)
})

function convert(d) {

  var emissions = [] 
  d3.keys(d).forEach(function(key){
    if (key != 'Country'){
      emissions.push( {year: +key, val: +d[key]} )
      delete d[key]
    }
  })

  d.emissions = emissions
  d.extent = d3.extent(d.emissions, function(year){ return year.val})

  return d
}





function renderAllPaths(dataset){
  var margin = {top: 20, right: 90, bottom: 30, left: 70},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.linear()
      .range([0, width])
      .domain( [1960, 2011] )

  var yScale = d3.scale.linear()
      .range([height, 0])  
  //// get the max of all country extents
  var vmax = d3.max(dataset, function(d){ return d.extent[1] })
  yScale.domain( [0, vmax] )

  //// D3 line generator function
  var line = d3.svg.line()
    .defined(function(d){ return !isNaN(d.val) }) //if there's no value for the year, don't draw
    .x(function(d) { return xScale(d.year) })
    .y(function(d) { return yScale(d.val) })

  var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(height)
    .tickPadding(6)
    .orient('bottom')
    .outerTickSize(1)
    .tickFormat(function(d){ return d })

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickSize(width)
    .ticks(8)
    .tickPadding(10)
    .outerTickSize(1)
    .orient('left')

  var svg = d3.select('#lines').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + 0 + ')')
      .call(xAxis)

  svg.append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(' + width + ',0)')
      .call(yAxis)

  var groups = svg.selectAll('.countrygroup').data(dataset)
    .enter().append('g')
    .attr('class', 'countrygroup')

    groups.append('text')
        .attr('class', 'countrylabel')
        .attr('x', function(d){
          var last_object_in_emissions = d.emissions[d.emissions.length-1] 
          return xScale(last_object_in_emissions.year)
        })
        .attr('y', function(d){
          var last_object_in_emissions = d.emissions[d.emissions.length-1] 
          return yScale(last_object_in_emissions.val)
        })
        .text(function(d){ return d.Country })

  var lines = groups.append('path').datum(function(d){ 
      // console.log(d); 
      return d.emissions
    })
    .attr('d', line)
    .attr('stroke', 'cadetblue')
    .attr('stroke-width', 3)
    .attr('fill-opacity', '0')
    .attr('opacity', 0.4)


    groups.on('mouseenter', pathEnter)
        .on('mouseleave', pathLeave)
        //.on('mousemove', pathMove)
    

    function pathEnter(d, i){
        d3.select(this).classed('active', true)
    }

    function pathLeave(d, i){
        d3.select(this).classed('active', false)
        //tooltip.classed('show', false)
    }


    ////With a tooltip
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')


    // function pathEnter(d, i){
    //     d3.select(this).classed('active', true)
    //     tooltip.classed('show', true)
    // }

    var years = dataset[0].emissions.map(function(d){ return d.year }) 
    var yearIndex = null
    
    function pathMove(d, i){

        //console.log(d3.event)
        var mx = d3.event.clientX
        var my = d3.event.clientY

        var lineBCR = this.getBoundingClientRect()

        //// An invert on a scale!
        //// this reverses the usual input / output
        //// domain input --to--> range output | to | range input --to--> domain output 
        var year = Math.floor( xScale.invert( mx - lineBCR.left ) )   
        var yearIndex = years.indexOf(year)
        var data = d.emissions[yearIndex]
        
        //console.log( year, yearIndex, data )

        tooltip.html(d.Country +'<br>'+ data.year +': '+ data.val)

        var ttBCR = tooltip.node().getBoundingClientRect()
        var svgBCR = svg.node().getBoundingClientRect()
        var topPosition = ( yScale(data.val) + svgBCR.top + pageYOffset - ttBCR.height )
        var leftPosition = ( xScale(data.year) + svgBCR.left )
        
        tooltip
          .style({
            top: topPosition+'px', 
            left: leftPosition+'px'
          })
    }


}