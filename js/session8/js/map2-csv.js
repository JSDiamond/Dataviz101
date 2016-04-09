
(function map2(){

  var lookup = {}

  var width = 960,
      height = 500;

  var pro = d3.geo.albersUsa()

  var counties, us;

  var quantize = d3.scale.quantize()
      .domain([0, .15])
      .range( d3.range(9).map(function(i) { return "q" + i + "-9"; }) );

  var path = d3.geo.path()
      .projection(null)

  var svg = d3.select("#map2").append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.json("data/us.json", function(error, usa) {
    if (error) throw error;

    us = usa

    console.log(us)

    counties = topojson.feature(us, us.objects.counties).features;

    d3.csv('data/rent.csv', function(err, rent){
      // console.log(rent)
      
      ////make a lookup table
      rent.forEach(function(d){
        lookup[+d.FIPS] = d
      })
      console.log(lookup['00000'])

      ////adding the values into each county's properties data
      var allRentVals = [] ////and making an array of values to use for domain of quantize 
      counties.forEach(function(d){
        // console.log(d.id)
        // console.log(lookup[d.id])
        d.properties.rent = +d.id in lookup ? +lookup[+d.id].Rent90 : 'n/a'
        if(lookup[+d.id] != undefined) allRentVals.push(d.properties.rent)
        if(!(+d.id in lookup)) console.log(+d.id)
      })
      ////setting quantize domain
      quantize.domain( [d3.quantile(allRentVals, .01), d3.quantile(allRentVals, .99)] )

      renderMap()
      debugger

    })

  })

function renderMap(){
    var svg = d3.select("#map2a").append("svg")
      .attr("width", width)
      .attr("height", height);

    var countypaths1 = svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(counties)
      .enter().append("path")
        .attr("class", function(d){ return quantize(d.properties.rent); })
        .attr("d", path)

    var borders = svg.append("path")
        .datum(topojson.mesh(us, us.objects.counties, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
        .attr("class", "state-borders")
        .attr("d", path);


    /////////////////////////////
    //// Adding a tooltip to map1
    /////////////////////////////
    var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

    countypaths1.on('mouseenter', showToolTip)
      .on('mouseleave', hideToolTip)
    var decimal = d3.format(".1f")
    function showToolTip(d,i){
      tooltip.classed('show', true)
      tooltip.html('ID: '+d.id+' <br> Rent: '+ d.properties.rent+'households' )
      var thisBRC = this.getBoundingClientRect()

      var ttBCR = tooltip.node().getBoundingClientRect()
      var topPosition = ( thisBRC.top - ttBCR.height + pageYOffset )
      var leftPosition = ( thisBRC.left - ttBCR.width*0.5 + thisBRC.width*0.5 )
      
      tooltip
        .style({
          top: topPosition+'px', 
          left: leftPosition+'px'
        })
    }
    function hideToolTip(d,i){
      tooltip.classed('show', false)
    }
    /////////////////////////////


    /////////////////////////////
    ////Alt color scheme setup
    /////////////////////////////

    ////Alt color scheme

    // var rates = counties
    //   .map(function(d){ return d.properties.rate })
    //   .sort(function(a, b){ return a - b; })

    // var color = d3.scale.log()
    //   .range(["hsl(62,100%,90%)", "hsl(228,30%,20%)"])
    //   .interpolate(d3.interpolateHcl)
    // color.domain([d3.quantile(rates, .01), d3.quantile(rates, .99)])

    // console.log(d3.quantile(rates, .01), d3.quantile(rates, .99))


    // var svg = d3.select("#map2b").append("svg")
    //   .attr("width", width)
    //   .attr("height", height);
      
    // var countypaths = svg.append("g")
    //     .attr("class", "counties")
    //   .selectAll("path")
    //     .data(counties)
    //   .enter().append("path")
    //     .style("fill", function(d) { return color(d.properties.rate); })
    //     .attr("d", path)

    // var borders = svg.append("path")
    //     .datum(topojson.mesh(us, us.objects.counties, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
    //     .attr("class", "state-borders")
    //     .attr("d", path);




    /////////////////////////////


    //////////////////////////////////////////////////////////
    //// Remove county fill color and add centroid bubbles
    //////////////////////////////////////////////////////////
    
    // countypaths
    //   .each(function(d){
        
    //     var centroid = path.centroid(d)
    //     // console.log(centroid, pro.invert(centroid))
    //     svg.append('circle').datum(centroid)
    //       .attr({
    //         r:  Math.sqrt( d.properties.rate )*10
    //         , cx: centroid[0]
    //         , cy: centroid[1]
    //         , fill: color(d.properties.rate)
    //         , 'fill-opacity': 0.8
    //       })
    //   })
    //   .style("fill", '#fff')
    //   .style("stroke", '#ddd')
    // borders.remove()

    // var circs = svg.selectAll('circle')
    //   .transition()
    //   .duration(1500)
    //   .delay(function(d,i){return (i+1)*1})
    //   .attr({
    //         cx: function(d,i){ return Math.random()*width }
    //         , cy: function(d,i){ return Math.random()*height }
    //       })
    //   .transition()
    //   .duration(1500)
    //   .delay(function(d,i){return (i+1)*1})
    //   .attr({
    //         cx: function(d,i){ return Math.random()*width }
    //         , cy: function(d,i){ return Math.random()*height }
    //       })

  


    /////////////////////////////


}


})()
