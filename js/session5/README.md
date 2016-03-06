#JS Session 5

##Lines, paths, and timeseries

Run a server and view `index.html` in a browser

Data for this session: [World Bank CO2 emissions (kt)](http://data.worldbank.org/indicator/EN.ATM.CO2E.KT?page=6)

<br>

### Simple Lines

As we saw in Session 3, you can make simple, two point lines using the `svg` [&#60;line&#62; element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line)

	svg.append('line')
	  .attr({
	    x1: 10, // x postion of start point
	    y1: 20, // y postion of start point
	    x2: 50, // x postion of end point
	    y2: 20, // y postion of end point
	    stroke: 'coral', // stroke color
	    'stroke-width': 2 // stroke width
	  })

Which would output this in HTML:

    <line x1="10" y1="20" 
          x2="50" y2="20" 
          stroke="coral" 
          stroke-width="2"/>

This is great for any two point line, but we often need more points, or want to have curves, or just be free to draw any shape.

<br>

### Complex lines, aka paths

----------------
#####[Adam Pearce's intro to paths](http://roadtolarissa.com/blog/2015/02/22/svg-path-strings/)
SVG comes with several shape elements - `rect`, `ellipse`, `line`, `polygon` - that can create basic forms. To create a map, streamgraph or other more complicated shapes, path elements are used. Instead of specifying the size and position of a path element with attributes like `height`, `radius` or `x` as we do with the basic shapes, the geometry of the path element is determined by a single `d` attribute.

This `d` attribute processes a path string that describing the movement of a pen across a sheet of paper. D3 has powerful path generators that are simple to use; this post describes how the path strings are interpreted so you can create your own.

######Straight Line

Each path string starts with an `M` moveto command that moves the pen to a new coordinate defined by a pair of numbers after the `M`. For example, `M 100 200` moves the pen to a start position 100 pixels left and 200 pixels down from the origin (typically the upper left corner of the SVG).

The L lineto command moves the pen from its current position to a new coordinate, tracing a straight line along the way. `M 100,200 L 400,300` traces a line from 100,200 to 400,300.

Multiple L and M commands can be combined to create complex shapes:

----------------


The same line as above in path form:

	<path d="M10,20L50,20"
		stroke="coral" 
    	stroke-width="2"/>
    	
    	

[D3 line generator](https://github.com/mbostock/d3/wiki/SVG-Shapes#_line) is uselful for making paths from data.
	
	var line = d3.svg.line()
	    .x(function(d) { return x(d.x); })
	    .y(function(d) { return y(d.y); })


