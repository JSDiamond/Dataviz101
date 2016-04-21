
////Let's make a global object to store everything 
////that needs to be used throughout the project
var db = {}

////That global object will also keep track of out window proportions,
////and other media decisions, like mobile or desktop
db.media = { type:"desktop", width: window.innerWidth, height: window.innerHeight}
db.mediaTest = function(){
  db.media.width = window.innerWidth
  db.media.height = window.innerHeight
  db.media.type = db.media.width<768 || db.media.height<600 ? "mobile" : "desktop"
  d3.select('body').classed("mobile", db.media.type=="mobile")
}


queue()
  .defer(d3.json, "data/us.json")
  .defer(d3.csv, "data/countynames.csv")
  .await(initGraphic)

function initGraphic(err, geo_us, names){
  // console.log(geo_us, names)
  
  var lookup = {}
  
  names.forEach(function(d){
    lookup[+d.code] = d
  })

  var counties = topojson.feature(geo_us, geo_us.objects.counties).features;
  
  counties.forEach(function(d){
    d.properties.name = +d.id in lookup ? lookup[+d.id].name : 'n/a'
  })

  console.log(counties)
}
  

function debounce(func, wait){
  wait = wait || 0
  var timeout
  console.log(arguments)
  return function() {
    // var context = this
    // var args = arguments
    var later = function(){
      timeout = null
      // func.apply(context, args)
      func(arguments)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

var redrawGraphic = debounce(function(){
  db.mediaTest
}, 1000)
var redrawGraphic2 = debounce(function(){
  console.log('2222222222')
})


// d3.select(window).on('resize.graphic', redrawGraphic)
// d3.select(window).on('resize.graphic.two', redrawGraphic2)




