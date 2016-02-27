var languages;

d3.csv('data/language-distribution-by-origin.csv', dataResponse)

function dataResponse(error, loaded_data) {

      if (error) {
            console.log("Error on load:", error);
      } else {

            console.log(loaded_data)
            
            loaded_data.forEach(function(d, i){
              console.log('array index:', i, 'array object:', d)
              d.speakers_millions = d.speakers_count*.000001
            })

            languages = loaded_data
            afterLoad(loaded_data)
            sort1()
            sort2()
            map1()
            filter1()

      }
  }//end callback function



function doStuff(value, callback){
  var multiple = value * 1000000
  if(typeof callback == 'function') callback(multiple)
}

function doTheCallback(x){
  console.log('hey our function passed in '+x)
}
//doTheCallback('this is x')

doStuff(333, doTheCallback)



function afterLoad(data, whatever){

  //// Get the first item in our data array and extract the keys as an array
  //// then join the array as a string delimited by ' | '
  d3.select('#initload').append('p').text( d3.keys(data[0]).join(' | ') )

  //// Bind our data to a list items, append them to the DOM, and add text
  var li = d3.select('#initload').selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area
      })
      .style('font-size', function(d, i){
        return (i+1)*10+"px"
      })

}


function sort1(){
  
  //// Sorting the traditional way
  languages.sort(function(a,b){
    return b.lang_count - a.lang_count;
  })
  
  //// Sorting the D3 way checks for data type
  // languages.sort(function(a,b){
  //   return d3.descending( parseInt(a.lang_count), parseInt(b.lang_count)) 
  // })

  //console.log(languages)

    var li = d3.select('#sort1').selectAll('li')
      .data(languages)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area +': '+ d.lang_count 
      })
}



function sort2(){
  
  languages.sort(function(a,b){
    return a.speakers_count - b.speakers_count;
  })

    var li = d3.select('#sort2').selectAll('li')
      .data(languages)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area +': '+ d.speakers_count 
      })
}


function map1(){
  
  //// Use array.map to return a new array of objects that contain rounded values
  var rounded = languages.map(function(d){
    return {area: d.area, speakers: Math.round(d.speakers_millions * 100) / 100 }
  })

  console.log(rounded)

    var li = d3.select('#map1').selectAll('li')
      .data(rounded)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area +': '+ d.speakers +'M'
      })
}


function filter1(){
  
  //// Use array.reduce to get the total number of speakers
  var total_speakers = languages.reduce(function(a, b){
    return {speakers_count: (+a.speakers_count) + (+b.speakers_count) }
  })
  

  //// Divide the total by the array.length to get the average
  var average = (total_speakers.speakers_count / languages.length)

  //// Use array.filter to return an array that has values above average
  var filtered = languages.filter(function(d){

    //// array.filter checks the returned value to be true or false
    //// keeping the true, and removing the false
    return d.speakers_count > average
  })

  console.log(filtered)

    var li = d3.select('#filter1').selectAll('li')
      .data(filtered)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area +': '+ d.speakers_count
      })
}


