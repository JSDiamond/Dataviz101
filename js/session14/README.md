#JS Session 14


## D3 Helpers
<br>

D3 is great, but can be kinda verbose and repetative. Thankfully there are some helpful tools to work around some of it's rougher edges and add functionality.

#### [d3-jetpack](https://github.com/gka/d3-jetpack)
"d3-jetpack is a set of nifty convenience wrappers that speed up your daily work with d3.js"

Feautres:

 * tspans, for multi-line SVG text
 * wordwrap based on character count
 * lets you set the same listener for multiple events at once
 * translate as array `[x, y]` instead of string `translate(x,y)`
 * sort ascending / descending by key
 * simple accessor functions for returning a property
 
#### [d3-starterkit](https://github.com/1wheel/d3-starterkit)
"Snippets and conventions for starting a new d3 project without a fuss. Includes d3, lodash, d3-jetpack, some handy css and a few convenience functions."
Feautres:

 * dataAppend, combines `data().enter().append()`
 * attachTooltip, a light weight tooltip (prints out all properties by default)
 * conventions, a set of default elements and variables used to make (almost) any given chart
 

#### [stack](http://mbostock.github.io/stack/)
"A presentation library with intuitive, scroll-based navigation." [Demo](https://mbostock.github.io/stack/)
 
 
#### [graph-scroll](https://github.com/1wheel/graph-scroll)

Simple scrolling events for d3 graphs. graph-scroll takes a selection of explanatory text sections and dispatches active events as different sections are scrolled into to view. These active events can be used to update a chart's state.


Non-D3 Scroll Library
[scroll-watcher](https://github.com/WSJ/scroll-watcher)

#### [swwopyDrag](http://1wheel.github.io/swoopy-drag/)
Annotations!!!

<br>

####Other Libraries Built on D3
[A good list](http://mikemcdearmon.com/portfolio/techposts/charting-libraries-using-d3)