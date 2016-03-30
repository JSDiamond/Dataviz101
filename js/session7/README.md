#JS Session 7


## Transitions & updates
### Transitions

A [transition](https://github.com/mbostock/d3/wiki/Transitions) is a special type of selection where the operators apply smoothly over time rather than instantaneously. You derive a transition from a selection using the transition operator. While transitions generally support the same operators as selections (such as attr and style), not all operators are supported; for example, you must append elements before a transition starts. The [duration](https://github.com/mbostock/d3/wiki/Transitions#duration) specifies per-element duration in milliseconds.
	
	d3.select('circle')
		.transition()
		.duration(1000) //one second
		.attr('r', 500)

<br>

### transition().attrTween() & transition().tween()

[attrTween](https://github.com/mbostock/d3/wiki/Transitions#attrTween) transitions the value of the attribute with the specified name according to the specified tween function. The starting and ending value of the transition are determined by tween; the tween function is invoked when the transition starts on each element, being passed the current datum d, the current index i and the current attribute value a, with the this context as the current DOM element. The return value of tween must be an interpolator: a function that maps a parametric value t in the domain [0,1] to a color, number or arbitrary value.

	selection.transition().duration(2000)
	    .attrTween("cx", function(d, i, a){
			return d3.interpolateRound(0, 100)
	    })

[tween](https://github.com/mbostock/d3/wiki/Transitions#tween) is a lot like attrTween; it registers a custom tween for the specified name.

	selection.transition().duration(2000)
		.tween("text", function() {
		  var i = d3.interpolateRound(0, 100)
		  	return function(t) {
		    	this.textContent = i(t)
		  	}
		})

### Interpolation

[D3 has many built-in interpolators](https://github.com/mbostock/d3/wiki/Transitions#interpolation) to simplify the transitioning of arbitrary values; an interpolator is a function that maps a parametric value t in the domain [0,1] to a color, number or arbitrary value.
		
		
Examples:
	
* [Arc Tween](http://bl.ocks.org/mbostock/5100636)
* [Path Tween](https://bl.ocks.org/mbostock/3916621)
* [Transform Interpolation](http://bl.ocks.org/mbostock/3173784)
	
### HTML &#60;select&#62; dropdowns

[The HTML select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) represents a control that presents a menu of options. The options within the menu are represented by <option> elements.

You listen for the `change` event to know when an option is selected. Selects have a [function to find the index of the selected option](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Property/selectedIndex).

	<select name="select">
	  <option value="value1">Value 1</option> 
	  <option value="value2" selected>Value 2</option>
	  <option value="value3">Value 3</option>
	</select>

<br>

