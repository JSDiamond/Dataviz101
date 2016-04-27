
function map2(){

  var container = d3.select("#map2")
  var tooltip = d3.select('body').append('div').attr('class', 'tooltip')
  
  ////sizeMap variables
  var geodata, cW, aspect, width, height, mscale, projection, path;
  ////initMap variables
  var counties, countypaths1, borders;
  
  var svg = container.append("svg")
      
  function sizeMap(){
    cW = container.node().getBoundingClientRect().width
    aspect = 0.6
    width = cW
    height = cW*aspect
    mscale = 1100 * (width / 900)
    projection = d3.geo.albersUsa()
      .scale( mscale )
      .translate([ width*0.5, height*0.5])
    path = d3.geo.path()
      .projection(projection)

    svg.attr("width", width)
      .attr("height", height)
  }
  sizeMap()


  d3.json("data/us.json", function(error, us) {
    if (error) throw error;
    geodata = us
    initMap(geodata)
  })

  
  function initMap(geodata){

    states = topojson.feature(geodata, geodata.objects.states).features;

    countypaths1 = svg.append("g")
        .attr("class", "states")
      .selectAll("path")
        .data(states)
      .enter().append("path")
        .attr("class", function(d){ return 'q4-9' }) // quantize(d.properties.rate);
        // .attr("d", path)

    borders = svg.append("path")
        .datum(topojson.mesh(geodata, geodata.objects.states, function(a, b){ return a.id / 1000 ^ b.id / 1000 }))
        .attr("class", "state-borders")
        // .attr("d", path)

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

    renderMap()
  }

  function renderMap(){
    countypaths1.attr("d", path)
    borders.attr("d", path)
  }

  var redrawGraphic = debounce(redrawMap, 250)
  d3.select(window).on('resize.map2', redrawGraphic)

  function redrawMap(){
    sizeMap()
    renderMap()
  }

}
map2()