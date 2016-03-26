#JS Session 7


## Transitions & updates
### Transitions
CSS has the affordance to specify styles [when there is mouse is over](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover) the designated element.

	<div class="button">
		Do something on hover, <span>even on child elements</span>
	</div>
	
	div.button:hover{
		background-color: red;
	}
	
	div.button:hover span{
		color: #fff;
	}
	
### CSS :active
	
Far less used is the [:active pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:active) which is activated during the holding depression of a click event.

<br>

## D3 Mouse Events

Run a server and view `index.html` in a browser


### selection.on()

[D3 selecttion.on()](https://github.com/mbostock/d3/wiki/Selections#on) adds or removes an event listener to each element in the current selection, for the specified type. The type is a string event type name, such as "click", "mouseover", "keydown", or "submit" (which is only for form submitions). [Any DOM event type](https://developer.mozilla.org/en-US/docs/Web/Events) supported by your browser may be used.

The most common events you'll need for graphics are:

	var circle = d3.select('circle')
	
	//When the mouse enters the element bounds
	circle.on("mouseenter", function(){})
	
	//When the mouse leaves the element bounds
	circle.on("mouseleave", function(){})
	
	//When the mouse moves within the element bounds
	circle.on("mousemove", function(){})
	
	//When the mouse clicks within the element bounds
	circle.on("click", function(){})

The specified listener (i.e. `"click"`) is invoked in the same manner as other operator functions, being passed the current datum `d` and index `i`. You also get `this`, [the nebulius javascript object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) that seems to be something different everytime you look. In this case, it's the DOM element (not the D3 selection of the DOM element).

### Simple class toggling
[D3 function](https://github.com/mbostock/d3/wiki/Selections#classed) for adding or removing a "class" from the class attribute. The function takes a class string, and a boolean value to determine add (true), or remove (false).

	var circle = d3.select('circle')
	
	//Add the class "active"
	circle.classed("active", true)
	
	//Remove the class "active"
	circle.classed("active", true)


This is diffeent from the using the `attr()` function to assign classes, which clears all classes and adds those passed in — `classed` will add or remove without affecting any other classes on the element.

If no second argument is given, it will return whether or not the element currently has the class in question.

	var circle = d3.select('circle')
	
	circle.classed("active")
	//Returns true if cirlce has the class "active" or false if it doesn't
	


### To access the current event within a listener, use the global d3.event.

[The d3.event object](https://github.com/mbostock/d3/wiki/Selections#d3_event) is a DOM event and implements the standard event fields like timeStamp and keyCode as well as methods like preventDefault() and stopPropagation().
	
	d3.select('circle').on("click", function(){
		d3.event.clientX //mouse x position within the svg
		d3.event.clientY //mouse y position within the svg
	})


### Linear scale invert

[A function of the](https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_invert) `d3.scale.linear`, `d3.scale.linear.invert(val)` returns the value in the input domain x for the corresponding value in the output range y. This represents the inverse mapping from range to domain.


