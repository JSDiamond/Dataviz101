var languages;

d3.csv('data/language-distribution-by-origin.csv', function(error, loaded_data) {

    if (error) {
        console.log("Error on load:", error);
    }

    console.log(loaded_data)
    
    loaded_data.forEach(function(d, i){
      console.log('array index:', i, 'array object:', d)
      d.speakers_millions = d.speakers_count*.000001
    })

    languages = loaded_data
    afterLoad(loaded_data)

})


function afterLoad(data){
  var li = d3.select('#initload').selectAll('li')
      .data(data)
      .enter()
      .append('li')
      .text(function(d, i){
        return d3.values(d)
      })

  sort1(data)
  sort2(data)
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

  console.log(languages)

    var li = d3.select('#sort1').selectAll('li')
      .data(languages)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area +': '+ d.lang_count 
      })
}



function sort2(){
  
  //// Sorting the traditional way
  languages.sort(function(a,b){
    return b.speakers_count - a.speakers_count;
  })

    var li = d3.select('#sort2').selectAll('li')
      .data(languages)
      .enter()
      .append('li')
      .text(function(d, i){
        return d.area +': '+ d.speakers_count 
      })
}


