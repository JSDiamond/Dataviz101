(function(){

  var margin = {top: 40, right: 10, bottom: 10, left: 10},
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom

  var color = d3.scale.category20c()

  var treemap = d3.layout.treemap()
      .size([width, height])
      .sticky(true)
      .padding(10)
      .value(function(d){ return d.size })

  var div = d3.select("#nested2").append("div")
      .style("position", "relative")
      .style("width", (width + margin.left + margin.right) + "px")
      .style("height", (height + margin.top + margin.bottom) + "px")

  d3.json("data/flare.json", function(error, root){
    if (error) throw error

    // console.log('treemap root', root)

    var node = div.datum(root).selectAll(".node")
        .data(treemap.nodes)
      .enter().append("div")
        .attr("class", function(d){ 
          return d.children ? "node parent" : "node" 
        })
        .call(position)
        .style("background", function(d){
          // if('children' in d) console.log(d)
          return d.children ? null : color(d.parent.name) 
        })
        .text(function(d){ 
          // return d.children ? null : d.name 
          return d.name 
        })

  })

  function position(){
    this.style("left", function(d){ return d.x + "px" })
      .style("top", function(d){ return d.y + "px" })
      .style("width", function(d){ return Math.max(0, d.dx - 1) + "px" })
      .style("height", function(d){ return Math.max(0, d.dy - 1) + "px" })
  }

})()