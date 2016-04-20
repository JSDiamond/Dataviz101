#JS Session 10


## Nested Data
<br>


### Tree diagrams
[The tree layout](https://github.com/mbostock/d3/wiki/Tree-Layout#tree) produces tidy node-link diagrams of trees using the Reingold–Tilford “tidy” algorithm. Like most other layouts, the object returned by d3.layout.tree is both an object and a function. That is: you can call the layout like any other function, and the layout has additional methods that change its behavior. Like other classes in D3, layouts follow the method chaining pattern where setter methods return the layout itself, allowing multiple setters to be invoked in a concise statement.

**Examples**

* [Interactive Tree](http://bl.ocks.org/d3noob/8375092)
* [Collapsible Tree](https://bl.ocks.org/mbostock/4339083)
* [d3.4 Tidy Tree vs. Dendrogram](https://bl.ocks.org/mbostock/e9ba78a2c1070980d1b530800ce7fa2b)
* [d3.4 Radial Tidy Tree](https://bl.ocks.org/mbostock/2e12b0bd732e7fe4000e2d11ecab0268)
* [d3.4 Circle-Packing](https://bl.ocks.org/mbostock/ca5b03a33affa4160321)

### Treemaps
Introduced by Ben Shneiderman in 1991, a [treemap](https://github.com/mbostock/d3/wiki/Treemap-Layout) recursively subdivides area into rectangles. As with adjacency diagrams, the size of any node in the tree is quickly revealed. “Squarified” treemaps use approximately-square rectangles, which offer better readability and size estimation than naïve “slice-and-dice” subdivision. [d3.layout.treemap functions](https://github.com/mbostock/d3/wiki/API-Reference#treemap)

**Examples**

* [Old updating treemap](https://bl.ocks.org/mbostock/4063582)
* [d3.4 d3.stratify treemap](http://bl.ocks.org/mbostock/e6962a152275373f8504)
* [d3.4 tree map with parent names and numbers](http://bl.ocks.org/mbostock/911ad09bdead40ec0061)
* Alt Treemaps
	* [Sunburst Partition](https://bl.ocks.org/mbostock/4063423)
	* [Zoomable Sunburst](https://bl.ocks.org/mbostock/4348373)
	* [Zoomable Icicle](https://bl.ocks.org/mbostock/1005873)
	

### Also made from flare.json nested data

* [Collapsible Force Layout](https://bl.ocks.org/mbostock/1062288)
* [Hierarchical Edge Bundling](https://bl.ocks.org/mbostock/7607999)
* [Chord Diagram](http://bl.ocks.org/mbostock/1046712)



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