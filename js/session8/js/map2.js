
(function map2(){

  var width = 960,
      height = 500;

  var quantize = d3.scale.quantize()
      .domain([0, .15])
      .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

  ////Alt color scheme
  var color = d3.scale.log()
    .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
    .interpolate(d3.interpolateHcl);

  var path = d3.geo.path()
      .projection(null);

  var svg = d3.select("#map2").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.json("data/us.json", function(error, us) {
    if (error) throw error;

    var counties = topojson.feature(us, us.objects.counties).features;

    var svg = d3.select("#map2a").append("svg")
      .attr("width", width)
      .attr("height", height);

    svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(counties)
      .enter().append("path")
        .attr("class", function(d){ return quantize(d.properties.rate); })
        .attr("d", path)

    var borders = svg.append("path")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
        .attr("class", "state-borders")
        .attr("d", path);


    ////Alt color scheme setup
    var rates = counties
      .map(function(d){ return d.properties.rate })
      .sort(function(a, b){ return a - b; })
    color.domain([d3.quantile(rates, .01), d3.quantile(rates, .99)]);


    var svg = d3.select("#map2b").append("svg")
      .attr("width", width)
      .attr("height", height);
      
    var countypaths = svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(counties)
      .enter().append("path")
        .style("fill", function(d) { return color(d.properties.rate); })
        .attr("d", path)

    var borders = svg.append("path")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
        .attr("class", "state-borders")
        .attr("d", path);

    //// Remove county fill color and add bubbles
    // countypaths
    //   .each(function(d){
    //     // console.log(d)
    //     var centroid = path.centroid(d)
    //     svg.append('circle')
    //       .attr({
    //         r:  Math.sqrt( d.properties.rate )*10
    //         , cx: centroid[0]
    //         , cy: centroid[1]
    //         , fill: color(d.properties.rate)
    //         , 'fill-opacity': 0.8
    //       })
    //   })
    //   .style("fill", '#fff')
    // borders.remove()

  })

})()