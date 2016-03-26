#JS Session 7


## Transitions & updates
### Transitions

A [transition](https://github.com/mbostock/d3/wiki/Transitions) is a special type of selection where the operators apply smoothly over time rather than instantaneously. You derive a transition from a selection using the transition operator. While transitions generally support the same operators as selections (such as attr and style), not all operators are supported; for example, you must append elements before a transition starts. The [duration](https://github.com/mbostock/d3/wiki/Transitions#duration) specifies per-element duration in milliseconds.
	
	d3.select('circle')
		.transition()
		.duration(1000) //one second
		.attr('r', 500)

<br>
	
### HTML &#60;select&#62; dropdowns

[The HTML select element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) represents a control that presents a menu of options. The options within the menu are represented by <option> elements.

You listen for the `change` event to know when an option is selected. Selects have a [function to find the index of the selected option](https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XUL/Property/selectedIndex).

	<select name="select">
	  <option value="value1">Value 1</option> 
	  <option value="value2" selected>Value 2</option>
	  <option value="value3">Value 3</option>
	</select>

<br>

