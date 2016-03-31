
function tween1(){
  var width = 600,
      height = 500

  var svg = d3.select("#tween1").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(60,60)");

  svg.append("circle").datum([1,2,3])
      .attr("r", 10)
      .attr("cx", 2)
      .transition()
      .duration(2000)
      // .attr("cx", 480)
      .attrTween("cx", function(d, i, a){
        //// Where d = data, i = index, a = current attr value when tween starts
        console.log(d,i,a)
        
        // return d3.interpolateString(a, 480)
        return function(t){
          console.log(t*480)
          return t*480//(width-120)//t*Math.random()*100
        }

      })

  svg.append("text").datum([1,2,3])
      .attr({
        "dy": -40
      })
      .text('POSITION')
      .transition()
      .duration(2000)
      .tween("text", function(d,i){
        console.log(d,i,this.textContent)
          return function(t) {
              this.textContent = Math.round(t*480)
          }
      });

}
tween1()
