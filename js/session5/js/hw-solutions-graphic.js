////////////////////////////////////////////////
//// Session 5 Homework
////////////////////////////////////////////////

var margin = {top: 20, right: 20, bottom: 20, left: 20},
    width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom


//// Why keep typing the code to generate an svg?
//// We can make a function that takes a d3 selction as an argument,
//// creates an svg in that selection,
//// then return the d3 selection of that svg.
function renderSVG(sel){
  var svg = sel.append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

  return svg
}

var svg = renderSVG( d3.select('#randots') )


//// A function to generate some an array of random points
function generateRandomPoints(n){
  var range = d3.range(n)

  var data = range.map(function(d){
    d = {}
    d.x = Math.floor(Math.random()*width)
    d.y = Math.floor(Math.random()*height)
    return d
  })

  return data
}

var points = generateRandomPoints(20)
console.log('points', points)


function drawDots(svg, data){

  svg.selectAll('circle').data(data)
    .enter().append('circle')
    .attr({
      r: 5,
      cx: function(d){ return d.x },
      cy: function(d){ return d.y },
      fill: 'coral'
    })

}

drawDots(svg, points)



function connectTheDots(svg, data){
  //// Write code to draw lines connecting the dots.
  //// Based on what we've learned about lines and paths,
  //// you can do this any way you want, as long as it works.

  //// Hint: You will need to pair-up points in order to make a line

  var pairs = []
  data.forEach(function(d,i){

    if( i % 2 == 1 ){

      var prev = data[i-1]
      var current = d

      pairs.push({
        x1: prev.x,
        y1: prev.y,
        x2: current.x,
        y2: current.y
      })
      
    }

  })

  console.log(pairs)

  svg.selectAll('line').data(pairs)
    .enter().append('line')
    .attr({
      x1: function(d){ return d.x1 },
      y1: function(d){ return d.y1 },
      x2: function(d){ return d.x2 },
      y2: function(d){ return d.y2 },
      stroke: 'cyan',       
      'stroke-width': 2,
      'opacity': 0.5   
    })

}

connectTheDots(svg, points)






var svg2 = renderSVG( d3.select('#randots2') )
drawDots(svg2, points)

function connectTheDots2(svg, data){
  var pairs = []
  data.forEach(function(d,i){
    var a = data[0]
    var b = data[i]

    pairs.push({
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y
    })
  })

  svg.selectAll('line').data(pairs)
    .enter().append('line')
    .attr({
      x1: function(d){ return d.x1 },
      y1: function(d){ return d.y1 },
      x2: function(d){ return d.x2 },
      y2: function(d){ return d.y2 },
      stroke: 'cyan',       
      'stroke-width': 2,
      'opacity': 0.5   
    })

}

connectTheDots2(svg2, points)







var svg3 = renderSVG( d3.select('#randots3') )
drawDots(svg3, points)

function connectTheDots3(svg, data){
  
  var pathstring = ''
  data.forEach(function(d,i){

    if(i == 0){

      pathstring += 'M'+ d.x +','+ d.y

    } else {

      pathstring += 'L'+ d.x +','+ d.y

    }

  })

  console.log(pathstring)

  svg.append('path')
    .attr({
      d: pathstring,
      stroke: 'cyan',       
      'stroke-width': 2,
      'opacity': 0.5,
      'fill': 'none'  
    })

}

connectTheDots3(svg3, points)





