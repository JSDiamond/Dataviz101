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

###CSS before & after