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