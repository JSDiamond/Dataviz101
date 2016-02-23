////////////////////////////////////////// 
// Plain old javascript DOM manipulation
////////////////////////////////////////// 

// var n1 = document.querySelectorAll("#fruits");
// var n2 = document.getElementById("fruits");

// console.log(n2)

// var li = document.createElement("li");
// var text = document.createTextNode("guava");
// li.appendChild(text)
// n2.appendChild(li)

////////////////////////////////////////// 
// D3 style DOM manipulation
////////////////////////////////////////// 

var banana = d3.select("#fruits").append('li').text('banana')
console.log(banana)

var days = [
            "Sunday"
            , "Monday"
            , "Tuesday"
            , "Wednesday"
            , "Thursday"
            , "Friday"
            , "Saturday"
      ]

console.log(days)

var daylist = d3.select('#days').selectAll('li').data(days)
      .enter().append('li')
      .text(function(d, i){ 
        //console.log(i)
        return d 
      })

daylist.style('color', function(d){ return 'coral' })


//// New data
var altdays = [
            "Sunday"
            , "Monday"
            , "Every other day"
      ]

//// Update daylist with the new data
var newdaylist = daylist.data(altdays, function(d){ return d })

//// Enter any new elements and append them to the DOM
var enters = newdaylist.enter().append('li')

//// Add text to only the new elements
enters.text(function(d){ return d })

//// Get all the old elements...
var exits = newdaylist.exit()

//// ...and remove them
exits.remove()
