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

// queue()
//   .defer(d3.json, "us.json")
//   .await(initGraphic)

// function initGraphic(err, geo_us){
//   console.log(geo_us)
//   // map2()
// }
  


// var debounce = null;
// function resize(){
//   if (debounce) clearTimeout(debounce)
//   debounce = setTimeout(function(){
//       console.log('you stopped moving, so redraw graphics')
//       ////Put graphic redraw code in here
//   }, 300)
// }
// d3.select(window).on('resize.graphic', resize)