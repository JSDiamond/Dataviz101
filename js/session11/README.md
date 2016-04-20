#JS Session 11


## Responsive Web
<br>


### CSS Media Queries
A [media query](https://css-tricks.com/css-media-queries/) consists of a media type and at least one expression that limits the style sheets' scope by using media features, such as width, height, and color. Media queries, added in CSS3, let the presentation of content be tailored to a specific range of output devices without having to change the content itself.

	@media screen and (max-width: 699px) and (min-width: 520px){
	  body {
	    background: #ccc;
	  }
	}
	
### D3 on resize

https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onresize

	d3.select(window).on('resize', redrawGraphic)
	
Because this event is attached to the `window`, you can only define it once. But, event types like `resize` can act as namespaces by using a dot syntax to make a more specific event. This allows you to define multiple function calls on `resize` without overwriting anything.  

	d3.select(window).on('resize.chart1', redrawChart1)
	d3.select(window).on('resize.chart1.key', redrawChart1Key)
	d3.select(window).on('resize.chart2', redrawChart2)
	
	
### Debounce

	var debounce = null;
	function resize(){
	  if (debounce) clearTimeout(debounce)
	  debounce = setTimeout(function(){
	      console.log('you stopped moving, so redraw graphics')
	      ////Put graphic redraw code in here
	  }, 300)
	}
	d3.select(window).on('resize.graphic', resize)
	

### Queue.js

A [queue](https://github.com/d3/d3-queue) evaluates zero or more deferred asynchronous tasks with configurable concurrency: you control how many tasks run at the same time. When all the tasks complete, or an error occurs, the queue passes the results to your await callback. 

	queue()
	  .defer(d3.json, "us.json")
	  .defer(d3.csv, "county-data.csv")
	  .await(initGraphic)
	  
	initGraphic(err, geodata, countydata){
		//Now bind the countydata to each county in the geodata and draw your map
	}