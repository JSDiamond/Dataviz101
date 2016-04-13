#JS Session 10


## Nested Data
<br>


### Tree diagram layout
[The tree layout](https://github.com/mbostock/d3/wiki/Tree-Layout#tree) produces tidy node-link diagrams of trees using the Reingold–Tilford “tidy” algorithm. Like most other layouts, the object returned by d3.layout.tree is both an object and a function. That is: you can call the layout like any other function, and the layout has additional methods that change its behavior. Like other classes in D3, layouts follow the method chaining pattern where setter methods return the layout itself, allowing multiple setters to be invoked in a concise statement.

[Interactive tree](http://bl.ocks.org/d3noob/8375092)


### Treemap layout
Introduced by Ben Shneiderman in 1991, a [treemap](https://github.com/mbostock/d3/wiki/Treemap-Layout) recursively subdivides area into rectangles. As with adjacency diagrams, the size of any node in the tree is quickly revealed. “Squarified” treemaps use approximately-square rectangles, which offer better readability and size estimation than naïve “slice-and-dice” subdivision. [d3.layout.treemap functions](https://github.com/mbostock/d3/wiki/API-Reference#treemap)

https://github.com/mbostock/d3/wiki/API-Reference#treemap


[New d3.stratify treemap](http://bl.ocks.org/mbostock/e6962a152275373f8504)

[New tree map with parent names and numbers](http://bl.ocks.org/mbostock/911ad09bdead40ec0061)


### Nesting data
The [d3.nest function](https://github.com/mbostock/d3/wiki/Arrays#d3_nest) takes an array of objects and groups them by a given key and/or other sub-keys

	var nested_data = d3.nest()
		.key(function(d){ return d.status; })
		.rollup(function(leaves){ return leaves.length; })
		.entries(tasks);
	    
`.entries()` is where you pass in your array.
`.key()` is where you specify a key in your array to group or nest by.
`.rollup()` specifies a rollup function to be applied on each group of leaf elements.
	  
Some [basic nesting examples](http://bl.ocks.org/hubgit/raw/9133448/)