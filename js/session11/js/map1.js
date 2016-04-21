
function map1(){

  var container = d3.select("#map1")
  var tooltip = d3.select('body').append('div').attr('class', 'tooltip')
  var geodata;

  d3.json("data/us.json", function(error, us) {
    if (error) throw error;
    geodata = us
    drawMap(geodata)
  })


  function drawMap(geodata){

    var cW = container.node().getBoundingClientRect().width
    var aspect = 0.6
    var width = cW
    var height = cW*aspect
    var mscale = 1100 * (width / 900)
    var projection = d3.geo.albersUsa()
      .scale( mscale )
      .translate([ width*0.5, height*0.5]);
    var path = d3.geo.path()
      .projection(projection);

    var svg = container.append("svg")
      .attr("width", width)
      .attr("height", height)

    var counties = topojson.feature(geodata, geodata.objects.counties).features;

    var countypaths1 = svg.append("g")
        .attr("class", "counties")
      .selectAll("path")
        .data(counties)
      .enter().append("path")
        .attr("class", function(d){ return 'q6-9' }) // quantize(d.properties.rate);
        .attr("d", path)

    var borders = svg.append("path")
        .datum(topojson.mesh(geodata, geodata.objects.counties, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
        .attr("class", "state-borders")
        .attr("d", path);

    countypaths1.on('mouseenter', showToolTip)
      .on('mouseleave', hideToolTip)

    function showToolTip(d,i){
      tooltip.classed('show', true)
      tooltip.html('ID: '+d.id )
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

  }


  d3.select(window).on('resize.map1', redrawMap)

  function redrawMap(){
    // console.log('redrawMap')
    container.select('svg').remove()
    drawMap(geodata)
  }

}
map1()