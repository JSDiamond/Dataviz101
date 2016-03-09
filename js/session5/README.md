#JS Session 5

##Lines, paths, and time series

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
    	
    	

######[D3 line generator](https://github.com/mbostock/d3/wiki/SVG-Shapes#_line) 
Uselful for making paths from data.
	
	var line = d3.svg.line()
	    .x(function(d) { return scaleX(d.x) })
	    .y(function(d) { return scaleY(d.y) })

You can define it as a variable (like above) and then use it as an accessor function to construct a path string from specific values in your data.

	svg.append('path').datum([{x: 10, y: 20}, {x: 50, y: 20}])
    	.attr('d', line)
    	
[datum() vs data()](https://github.com/mbostock/d3/wiki/Selections#datum) Used after `append()`, as opposed to `selectAll()`, binding an array of data to a single element.

######Line defined [docs](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined)
Pass in an accessor function set where the line is defined and undefined, which is typically useful in conjunction with missing data; the generated path data will automatically be broken into multiple distinct subpaths, skipping undefined data.

		var line = d3.svg.line()
	    	.x(function(d) { return scaleX(d.x) })
	    	.y(function(d) { return scaleY(d.y) })
	    	.defined(function(d){ return !isNaN(d.y) })
	    	
The accessor function should return `true` if the data is not `NaN` and `false` if it is. Any false returns or `NaN` data will not display — will not have a connection to the rest of the line.

### Time series
A time series is a sequence of data points made: 1) over a continuous time interval. 2) out of successive measurements across that interval. 3) using equal spacing between every two consecutive measurements. 4) with each time unit within the time interval having at most one data point. [via Wikipedia](https://en.wikipedia.org/wiki/Time_series)

----------------
Some of the World Bank portion of this session is based on a Lynn Cherny example. She wisely recommends selectively labeling the lines at the ends to highlight outliers. And provides these examples:

[The David Bowie Song That Fans Are Listening to Most](http://www.nytimes.com/interactive/2016/01/12/upshot/david-bowie-songs-that-fans-are-listening-most-heroes-starman-major-tom.html)

[A reference version by Mike Bostock](http://bl.ocks.org/mbostock/3884955)

[Simpler version (be sure to read what he says at the top; your data will not be in reverse order!)](http://bl.ocks.org/d3noob/8603837)

----------------

### Dates and time in javascript

Using the [javascript Date function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) creates an object that represents a single moment in time. That object has many methods for getting either calendar date components (day of the week, day of the month, month of the year, etc.), or time components (minute of the day, hour of the day, seconds since 1/1/1970, etc.). Date objects are based on a time value that is the number of milliseconds since 1 January, 1970 UTC.

	////Default, if no argument is passed in, is create a Date object for the moment it's called
	var now = new Date()
	
	////Otherwise, based on the date passed in as a string
	var bday = new Date('10/23/2003')
	
	////Same date passed in as value arguments
	////new Date(year, month, day, hour, minutes, seconds, milliseconds)
	var bday = new Date(2003, 9, 23)
	
	////Some built-in Date methods and their output
	
	bday.toDateString()
	//"Thu Oct 23 2003"
	
	bday.toUTCString()
	//"Thu, 23 Oct 2003 04:00:00 GMT"
	
	bday.toString()
	//"Thu Oct 23 2003 00:00:00 GMT-0400 (EDT)"
	
	bday.getDay() //Get day of the week
	//4

	bday.getDate() //Get day of the month
	//23
	
	bday.getTime() //Get number of milliseconds since January 1, 1970
	//1066881600000
	
	////... and many more ...

####Formating dates with D3


D3 includes a [helper module](https://github.com/mbostock/d3/wiki/Time-Formatting) `d3.time.format`, for parsing and formatting dates modeled after standards used in C, Python and other programing languages. `d3.time.format` constructs a new local time formatter function using the given specifier, which is a string that can contain plain text characters (/,-:the), and specifiers that look like `%Y` which translates into the four digit year. Invoking that function on a Date object will return the corresponding string.

	var date = new Date(1986,0,2,11,39,13)
	
	var format1 = d3.time.format("%Y-%m-%d") //create a new formatter function and save it as a variable
	
	format1(date)//call the formatter function on your Date object and see output below
	
	//1986-01-28
	
	var format2 = d3.time.format("%m/%d/%Y")
	format2(date)
	//01/28/1986
	
	var format3 = d3.time.format("%A %B %d, %Y %H:%M %p")
	format2(date)
	//Monday January 28, 1986 11:39 AM
	
Check out [this bl.ock](http://bl.ocks.org/zanarmstrong/ca0adb7e426c12c06a95) to see more formats and try them out.

This can be used in tick formating or labels or any other place you need to keep you dates/times neat and organized.