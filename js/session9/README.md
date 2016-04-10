#JS Session 9


## Stacking charts
<br>

### The stack layout

[The stack layout](https://github.com/mbostock/d3/wiki/Stack-Layout) takes an array of layer objects, each having a series (array) of point objects as a member. The point objects contain a pair of ordinates (as a minimum) that map the horizontal position of each point and its vertical thickness. The output from the stack layout is the same array of layers, but with state added onto the point objects to facilitate the selected stacking strategy.

The layout computes a baseline for the first layer which it then propagates to the above layers, so as to produce a stacked data set.
Several baseline algorithms are supported, along with sorting heuristics to improve perception, as described in [“Stacked Graphs—Geometry & Aesthetics” by Byron & Wattenberg](http://www.leebyron.com/else/streamgraph/download.php?file=stackedgraphs_byron_wattenberg.pdf).

	////Define
	var stack = d3.layout.stack()
      .values(function(d){ return d.values })
      .x(function(d){ return d.x })
      .y(function(d){ return d.y })

	////Call on a dataset and return the output to a variable
    var layers = stack(dataset)
    
    
###Bisect
To search a simple array for the index of a specific metric value, assuming that the array is already sorted on that metric, use [d3.bisecLeft or d3.bisectRight](https://github.com/mbostock/d3/wiki/Arrays#d3_bisectLeft)

	d3.bisectLeft([10,20,30], 1) //returns 0
	d3.bisectLeft([10,20,30], 22) //returns 2
	d3.bisectLeft([10,20,30], 40) //returns 3
	
To search a more complex array for the index of a specific metric value, assuming that the array is already sorted on that metric, use [d3.bisector](https://github.com/mbostock/d3/wiki/Arrays#d3_bisector) to define the accessor or comparator function to be used in the search.
	
	dataset = [{a:7, b:100}, {a:-30, b:200}, {a:'foo', b:300}]
	var bisector = d3.bisector(function(d){return d.b}).left
	bisector(dataset, 222) //returns 2
	
[The bisection method](https://en.wikipedia.org/wiki/Bisection_method) in mathematics is a root-finding method that repeatedly bisects an interval and then selects a subinterval in which a root must lie for further processing. It is a very simple and robust method, but it is also relatively slow. Because of this, it is often used to obtain a rough approximation to a solution which is then used as a starting point for more rapidly converging methods.[1] The method is also called the interval halving method,[2] the binary search method,[3] or the dichotomy method.

![Bisection_method.png](assets/250px-Bisection_method.png "Bisection_method.png")

###CSS ::before and ::after
In CSS [::before and ::after](https://css-tricks.com/almanac/selectors/a/after-and-before/)is a pseudo element which allows you to insert content onto a page from CSS (without it needing to be in the HTML). While the end result is not actually in the DOM, it appears on the page as if it is. This is being used to make the pointer at the bottom center of the tooltip.