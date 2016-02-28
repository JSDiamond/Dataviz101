////////////////////////////////////////////////
//// The <svg> element
////////////////////////////////////////////////

var width = 600
  , height = 400

//// Making an SVG element
var svg1 = d3.select('#svg-wrapper-1').append('svg')
//// Adding attributes
svg1.attr('id', 'svg1')
  .attr('width', width)
  .attr('height', height)

//// Rectangle
svg1.append('rect')
  .attr({
    width: width*0.2,
    height: width*0.2,
    x: (width*0.5 - (width*0.2)*0.5),
    y: (height*0.5 - (width*0.2)*0.5),
    fill: 'coral'
  })

//// Circle
svg1.append('circle')
  .attr({
    r: width*0.1,
    cx: width*0.5,
    cy: height*0.5,
    fill: 'lightpink'
  })

//// Line
svg1.append('line')
  .attr({
    x1: (width*0.5 - (width*0.2)*0.5),
    y1: height*0.5,
    x2: (width*0.5 + (width*0.2)*0.5),
    y2: height*0.5,
    stroke: '#fff',
    'stroke-width': 30
  })



var group1 = svg1.append('g')
  .attr('id', 'group1')
  .attr('transform', 'translate('+ width*0.75 +','+ height*0.5 +') rotate(90)')

group1.append('rect')
  .attr({
    width: width*0.2,
    height: width*0.2,
    x: (width*0.2)*-0.5,
    y: (width*0.2)*-0.5,
    fill: 'teal'
  })

group1.append('circle')
  .attr({
    r: width*0.1,
    cx: 0,
    cy: 0,
    fill: 'cyan'
  })

group1.append('line')
  .attr({
    x1: (width*0.2)*-0.5,
    y1: 0,
    x2: (width*0.2)*0.5,
    y2: 0,
    stroke: '#fff',
    'stroke-width': 30
  })




////////////////////////////////////////////////
//// Drawing with data
////////////////////////////////////////////////

var dataset = [
  {'cat': 'A', 'x':10, 'y': 9.14, z:3},
  {'cat': 'A', 'x':8, 'y': 8.14, z:8},
  {'cat': 'B', 'x':13, 'y': 8.74, z:7},
  {'cat': 'B', 'x':9, 'y': 8.77, z:3},
  {'cat': 'C', 'x':11, 'y': 9.26, z:4},
  {'cat': 'C', 'x':14, 'y': 8.1, z:7},
  {'cat': 'D', 'x':6, 'y': 6.13, z:8},
  {'cat': 'D', 'x':4, 'y': 3.1, z:9},
  {'cat': 'E', 'x':12, 'y': 9.13, z:4},
  {'cat': 'E', 'x':7, 'y': 7.26, z:5},
];

var margin = {top: 20, right: 30, bottom: 40, left: 40};

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom

var scale_x = d3.scale.linear()
    .range([0, width])
    .domain([3, 16])

var scale_y = d3.scale.linear()
    .range([height, 0])
    .domain([2, 10])


var marginedgroup = d3.select('#svg-wrapper-2').append('svg')
  .attr('id', 'svg2')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


var circles = marginedgroup.selectAll('circle').data(dataset)
  .enter().append('circle')
  .attr({
    fill: 'lightblue'
    , r: function(d){ return d.z }
    , cx: function(d){ return scale_x(d.x) }
    , cy: function(d){ return scale_y(d.y) }
  })



////////////////////////////////////////////////
//// Drawing a chart
////////////////////////////////////////////////

var xAxis = d3.svg.axis()
    .scale(scale_x)
    .tickSize(10)
    .tickPadding(6)
    .orient('bottom')
    .outerTickSize(1)

var yAxis = d3.svg.axis()
    .scale(scale_y)
    .tickSize(width)
    .ticks(8)
    .tickPadding(10)
    .outerTickSize(1)
    .orient('left')

var svg3 = d3.select('#svg-wrapper-3').append('svg')
  .attr('id', 'svg3')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)

var marginedgroup = svg3.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


marginedgroup.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + (height) + ')')
    .call(xAxis)

marginedgroup.append('g')
    .attr('class', 'y axis')
    .attr('transform', 'translate(' +  width + ',0)')
    .call(yAxis)

var circles = marginedgroup.selectAll('circle').data(dataset)
  .enter().append('circle')
  .attr({
    fill: 'lightblue'
    , r: function(d){ return d.z }
    , cx: function(d){ return scale_x(d.x) }
    , cy: function(d){ return scale_y(d.y) }
  }) 


//// Easier to add other elements when you use groups
var circleGroup = marginedgroup.selectAll('.circlegroup').data(dataset)
    .enter().append('g')
    .attr('class', function(d){ return 'circlegroup cat'+d.cat })
    .attr('transform', function(d){ return 'translate('+ scale_x(d.x) +','+ scale_y(d.y) +')'; })

circleGroup.append('circle')
  .attr({
    r: function(d){ return d.z }
  }) 

circleGroup.append('text')
    .text(function(d){ return '('+ d.x +', '+ d.y +')'; })
    .attr('dx', function(d){ return d.z })


