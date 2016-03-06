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

var points = generateRandomPoints(10)
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
  //// Write code in this function to draw lines connecting the dots.
  //// Based on what we've learned about lines and paths,
  //// you can do this any way you want, as long as it works.

  //// Hint: You will need to pair-up points in order to make a line

}

connectTheDots(svg, points)






