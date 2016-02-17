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

// var daylist = d3.select('#days').selectAll('li').data(days)
//       .enter().append('li')
//       .text(function(d){ return d })

//// New data
// var altdays = [
//             "Sunday"
//             , "Monday"
//             , "Every other day"
//       ]

//// Update daylist with the new data
// daylist.data(altdays)

//// Enter any new elements...
// var day_enters = daylist.data(altdays).enter()

//// ...and append them to the DOM
// day_enters.append(li)

//// Add text to only the new elements
// day_enters.text(function(d){ return d })

//// Get all the old elements...
// var day_exits = daylist.exit()

//// ...and remove them
// day_exits.remove()



