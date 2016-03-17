////////////////////////////////////////////////
//// Session 3 scatter plot
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

var xScale = d3.scale.linear()
    .range([0, width])
    .domain([3, 16])

var yScale = d3.scale.linear()
    .range([height, 0])
    .domain([2, 10])

var xAxis = d3.svg.axis()
    .scale(xScale)
    .tickSize(10)
    .tickPadding(6)
    .orient('bottom')
    .outerTickSize(1)

var yAxis = d3.svg.axis()
    .scale(yScale)
    .tickSize(width)
    .ticks(8)
    .tickPadding(10)
    .outerTickSize(1)
    .orient('left')
    .tickFormat(function(d,i){ return '$'+d+'M' })

var svg3 = d3.select('#scatter').append('svg')
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

var circleGroup = marginedgroup.selectAll('.circlegroup').data(dataset)
    .enter().append('g')
    .attr('class', function(d){ return 'circlegroup cat'+d.cat })
    .attr('transform', function(d){ return 'translate('+ xScale(d.x) +','+ yScale(d.y) +')'; })


circleGroup.append('circle')
  .attr({
    r: function(d){ return d.z*1.5 }
  }) 

circleGroup.append('text')
    .text(function(d){ return d.cat; })
    .attr('dx', function(d){ return d.z*1.5 })


circleGroup.on('mouseenter', function(d,i){
        d3.select(this).classed('active', true)
        console.log('mouseenter', d, i, this, d3.event)
    })

circleGroup.on('mouseleave', function(d){
        d3.select(this).classed('active', false)
        //console.log('mouseleave', this)
    })




