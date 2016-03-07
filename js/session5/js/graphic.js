////////////////////////////////////////////////
//// Session 5
////////////////////////////////////////////////


function renderSimpleLines(){
  var width = 600
    , height = 400

  var svg = d3.select('#linez').append('svg')
      .attr('width', width)
      .attr('height', height)

  //// A simple line
  svg.append('line')
    .attr({
      x1: 10, // x postion of start point
      y1: 20, // y postion of start point
      x2: 50, // x postion of end point
      y2: 20, // y postion of end point
      stroke: 'coral', // stroke color
      'stroke-width': 2 // stroke width
    })

  //// 20 simple lines 
  svg.selectAll('.newline').data(d3.range(20))
    .enter().append('line')
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



function renderSimplePaths(){
  var width = 600
    , height = 400

  var svg = d3.select('#pathz').append('svg')
      .attr('width', width)
      .attr('height', height)

  //// A simple path
  svg.append('path')
    .attr({
      d: 'M10,20L50,20',
      stroke: 'coral',
      'stroke-width': 2
    })

  //// 20 simple paths
  svg.selectAll('.newpath').data(d3.range(20))
    .enter().append('path')
    .attr({
      d: function(d){ return 'M'+ 10 +','+ (d+3)*10 +'L'+ (width-10) +','+ (d+20)*10 },
      stroke: 'cyan',       
      'stroke-width': 2     
    })
}

renderSimplePaths()




//// Request the data file and run the convert() function on each "row" aka object in the data
d3.csv("data/co2-emissions.csv", convert, function(error, dataset) {
  if (error) throw error
  //// Here we are logging the result of loading the CSV and running convert
  console.log(dataset)
  renderIndividualPaths(dataset)
  renderAllPaths(dataset)
})



////////////////////////////////////////////////
//// Thinking of each object in the array as a "country".
//// Convert is going to take all the years worth of values
//// and save it back into the country's data as an array of objects.
//// This will be a better structure for looping through later.
////////////////////////////////////////////////
function convert(d) {

  //// Make an empty array to fill with years and respective values
  var emissions = [] 
  ////  Then loop through the keys in the country object: "Country", "1961", ... "2011" 
  d3.keys(d).forEach(function(key){
    //// For any key other than "Country"...
    if (key != 'Country'){
      //// ... add an object to emissions that has the year and its value...
      emissions.push( {year: +key, val: +d[key]} )
      //// ... then delete this key and its value from d
      //// because we've already saved it in emissions and don't need it anymore
      delete d[key]
    }

  })

  //// Save emissions into the country data
  d.emissions = emissions//.filter(function(year){ return year.val != 0 })

  //// Save the extent of emissions values into the country data
  d.extent = d3.extent(d.emissions, function(year){ return year.val})

  return d
}






function renderIndividualPaths(dataset){
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.linear()
      .range([0, width])
      .domain( [1961, 2011] )

  var yScale = d3.scale.linear()
      .range([height, 0])  
  //// get the max of all country extents
  var vmax = d3.max(dataset, function(d){ return d.extent[1] })
  console.log('vmax = '+ vmax)
  yScale.domain( [0, vmax] )

  //// D3 line generator function
  var line = d3.svg.line()
    .defined(function(d){ return !isNaN(d.val) })
    .x(function(d) { return xScale(d.year) })
    .y(function(d) { return yScale(d.val) })

  var svg = d3.select('#one-country').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  var USA = dataset.filter(function(d){ return d.Country == 'United States' })
  console.log('USA', USA)

  svg.append('path').datum(USA[0].emissions)
    .attr('d', line)
    .attr('stroke', 'orange')
    .attr('stroke-width', 3)
    .attr('fill-opacity', '0')

  svg.append('text').datum(USA[0].emissions)
    .attr('x', 0)
    .attr('y', 180)
    .text('United States')
    //// attr & styles below could be done with CSS
    .attr('fill', 'orange')
    .style('font-size', '14px')


  var China = dataset.filter(function(d){ return d.Country == "China" })
  console.log('China', China)

  svg.append('path').datum(China[0].emissions)
    .attr('d', line)
    .attr('stroke', 'cadetblue')
    .attr('stroke-width', 3)
    .attr('fill-opacity', '0')

  svg.append('text').datum(USA[0].emissions)
    .attr('x', 0)
    .attr('y', 320)
    .text('China')
    //// attr / styles below could be done with CSS
    .attr('fill', 'cadetblue')
    .style('font-size', '14px')
}




function renderAllPaths(dataset){
  var margin = {top: 20, right: 90, bottom: 30, left: 70},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

  var xScale = d3.scale.linear()
      .range([0, width])
      .domain( [1961, 2011] )

  var yScale = d3.scale.linear()
      .range([height, 0])  
  //// get the max of all country extents
  var vmax = d3.max(dataset, function(d){ return d.extent[1] })
  console.log('vmax = '+ vmax)
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

  var svg = d3.select('#all-country').append('svg')
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

  var lines = groups.append('path').datum(function(d){ 
      //console.log(d); 
      return d.emissions
    })
    .attr('d', line)
    .attr('stroke', 'cadetblue')
    .attr('stroke-width', 2)
    .attr('fill-opacity', '0')
    .attr('opacity', 0.4)

  var outliers = dataset.filter(function(d){ return d.extent[1] > 2000000 })
  console.log(outliers)

  var labels = svg.selectAll('.countrylabel').data(outliers)
    .enter().append('text')
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


}
