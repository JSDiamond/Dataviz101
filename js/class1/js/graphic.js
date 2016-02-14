////////////////////////////////////////// 
// Plain old javascript DOM manipulation
////////////////////////////////////////// 

var n1 = document.querySelectorAll("#fruits");
var n2 = document.getElementById("fruits");

console.log(n1, n2)

var li = document.createElement("li");
var text = document.createTextNode("guava");
li.appendChild(text)
n2.appendChild(li)

////////////////////////////////////////// 
// D3 style DOM manipulation
////////////////////////////////////////// 

var banana = d3.select("#fruits").append('li').text('banana')

var days = [
            "Sunday"
            , "Monday"
            , "Tuesday"
            , "Wednesday"
            , "Thursday"
            , "Friday"
            , "Saturday"
      ]

// d3.select('#days').selectAll('li').data(days)
//       .enter().append('li')
//       .text(function(d){ return d })