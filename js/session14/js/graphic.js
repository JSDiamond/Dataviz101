graphScroll()
    .graph(d3.selectAll('#graph'))
    .container(d3.select('#container'))
  .sections(d3.selectAll('.gs_section'))
  .on('active', function(i){ 
  	d3.select('#fstate').text(i)
  	console.log(i + 'th section active') 
  })
