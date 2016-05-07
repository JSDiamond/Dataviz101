function graph2(){

  var width = 800,
      height = 500,
      padding = 6, // separation between nodes
      maxRadius = 12;

  var n = 100, // total number of nodes
      m = 5; // number of distinct clusters

  var color = d3.scale.category10()
      .domain(d3.range(m));

  var x = d3.scale.ordinal()
      .domain(d3.range(m))
      .rangePoints([0, width], 1);

  var nodes = d3.range(n).map(function() {
    var i = Math.floor(Math.random() * m),
        v = (i + 1) / m * -Math.log(Math.random());
    return {
      radius: Math.sqrt(v) * maxRadius,
      color: color(i),
      cx: x(i),
      cy: height / 2
    };
  });

  var force = d3.layout.force()
      .nodes(nodes)
      .size([width, height])
      .gravity(0)
      .charge(0)
      .on("tick", tick)
      .start();

  var svg = d3.select("#graph2").append("svg")
      .attr("width", width)
      .attr("height", height);

  var circle = svg.selectAll("circle")
      .data(nodes)
    .enter().append("circle")
      .attr("r", function(d) { return d.radius; })
      .style("fill", function(d) { return d.color; })
      .call(force.drag);

  function tick(e) {
    circle
        .each(gravity(.2 * e.alpha))
        .each(collide(.5))
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

  // Move nodes toward cluster focus.
  function gravity(alpha) {
    return function(d) {
      d.y += (d.cy - d.y) * alpha;
      d.x += (d.cx - d.x) * alpha;
    };
  }

  // Resolve collisions between nodes.
  function collide(alpha) {
    var quadtree = d3.geom.quadtree(nodes);
    return function(d) {
      var r = d.radius + maxRadius + padding,
          nx1 = d.x - r,
          nx2 = d.x + r,
          ny1 = d.y - r,
          ny2 = d.y + r;
      quadtree.visit(function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== d)) {
          var x = d.x - quad.point.x,
              y = d.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding;
          if (l < r) {
            l = (l - r) / l * alpha;
            d.x -= x *= l;
            d.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    };
  }

} graph2()