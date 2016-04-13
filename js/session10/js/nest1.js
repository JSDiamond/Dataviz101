var treeData = {
    "name": "Top Level",
    "parent": "null",
    "value": 10,
    "type": "black",
    "level": "red",
    "children": [
      {
        "name": "Level 2: A",
        "parent": "Top Level",
        "value": 15,
        "type": "grey",
        "level": "red",
        "children": [
          {
            "name": "Son of A",
            "parent": "Level 2: A",
            "value": 5,
            "type": "steelblue",
            "level": "orange"
          },
          {
            "name": "Daughter of A",
            "parent": "Level 2: A",
            "value": 8,
            "type": "steelblue",
            "level": "red"
          }
        ]
      },
      {
        "name": "Level 2: B",
        "parent": "Top Level",
        "value": 10,
        "type": "grey",
        "level": "green"
      }
    ]
  }


// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 960 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom
	
var i = 0

var tree = d3.layout.tree()
	.size([height, width])

var diagonal = d3.svg.diagonal()
	.projection(function(d){ return [d.y, d.x] })

var svg = d3.select("#nested1").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

root = treeData


// Compute the new tree layout.
var nodes = tree.nodes(root).reverse()
var links = tree.links(nodes)

// Normalize for fixed-depth.
nodes.forEach(function(d){ d.y = d.depth * 180 })

console.log('tree diagram nodes', nodes)
console.log('tree diagram links', links)

// Declare the nodes…
var node = svg.selectAll("g.node")
  .data(nodes, function(d){ return d.id || (d.id = ++i) })

// Enter the nodes.
var nodeEnter = node.enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d){ 
	  return "translate(" + d.y + "," + d.x + ")" })

nodeEnter.append("circle")
  .attr("r", function(d){ return d.value })
  .style("stroke", function(d){ return d.type })
  .style("fill", function(d){ return d.level })

nodeEnter.append("text")
  .attr("x", function(d){ 
	  return d.children || d._children ? 
	  (d.value + 4) * -1 : d.value + 4 })
  .attr("dy", ".35em")
  .attr("text-anchor", function(d){ 
	  return d.children || d._children ? "end" : "start" })
  .text(function(d){ return d.name })
  .style("fill-opacity", 1)

// Declare the links…
var link = svg.selectAll("path.link")
  .data(links, function(d){ return d.target.id })

// Enter the links.
link.enter().insert("path", "g")
  .attr("class", "link")
	  .style("stroke", function(d){ return d.target.level })
    // .style("stroke-width", function(d){ return d.target.value })
  .attr("d", diagonal)

