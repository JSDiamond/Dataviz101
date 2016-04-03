var width = 960
    , height = 500
    , speed = 1e-2
    , start = Date.now()

var projection = d3.geo.orthographic()
    .scale(250)
    .translate([width / 2, height / 2])
    .clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var graticule = d3.geo.graticule();


var svg = d3.select("#map3").append("svg")
    .attr("width", width)
    .attr("height", height);


svg.append("defs").append("path")
    .datum({type: "Sphere"})
    .attr("id", "sphere")
    .attr("d", path);

svg.append("use")
    .attr("class", "stroke")
    .attr("xlink:href", "#sphere");

// svg.append("use")
//     .attr("class", "fill")
//     .attr("xlink:href", "#sphere");

// var λ = d3.scale.linear()
//     .domain([0, width])
//     .range([-180, 180]);

// var φ = d3.scale.linear()
//     .domain([0, height])
//     .range([90, -90]);
// svg.on("mousemove", function() {
//   var p = d3.mouse(this);
//   projection.rotate([λ(p[0]), φ(p[1])]);
//   svg.selectAll("path").attr("d", path);
// });

d3.json("data/world-110m.json", function(error, world) {
  if (error) throw error;

  var land = svg.append("path")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

  var grat = svg.append("path")
    .datum(graticule)
    .attr("class", "graticule")
    .attr("d", path);


  // d3.timer(function() {
  //   projection.rotate([speed * (Date.now() - start), -15])
  //   land.attr("d", path)
  //   grat.attr("d", path)
  // })
});