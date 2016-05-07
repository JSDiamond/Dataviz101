#JS Session 13


## Using Force
<br>

The [Force Layout](https://github.com/mbostock/d3/wiki/Force-Layout) is a flexible force-directed graph layout implementation using position [Verlet integration](https://en.wikipedia.org/wiki/Verlet_integration) (A numerical method used to integrate Newton's equations of motion —frequently used to calculate trajectories of particles in molecular dynamics simulations and computer graphics.)

Foce has many configurable properties:

	var force = d3.layout.force()
	    .nodes(nodes) //array of points
	    .links(links) //connections between nodes 
	    .size([w, h]) //layout size
	    .linkStrength(0.1) //link elasticity
	    .friction(0.9) //velocity decay
	    .linkDistance(20) //desired link length
	    .charge(-30) //attraction or repulsion of nodes
	    .chargeDistance(Infinity) //max distance over which charge is applied
	    .gravity(0.1) //strength of attraction to center of layout
	    .on('tick', function(){
	    	 	//tick will run for ~3seconds
	    		//and is where you actually apply the force attributes
	    		//to your svg elements
	    	})
	    .start() //kick off the simulation

	//To continue the force simulation after it's 3 second decay
	force.resume()
	
	//To stop the force simulation
	force.stop()

[More documentation](https://github.com/mbostock/d3/wiki/Force-Layout#force)



#####Force drag
Bind a behavior to nodes to allow interactive dragging, either using the mouse or touch.

	var circle = svg.selectAll("circle")
		.data(nodes)
	    .enter()
	    .append("circle")
	      .attr("r", 10)
	      .call(force.drag)

###Classic examples

 * [Collapsible Force Layout](https://bl.ocks.org/mbostock/1062288)
 * [Multi-Foci Force Layout](https://bl.ocks.org/mbostock/1804919)
	
###New (d3.v4.0) force bl.ocks

 * [Collision Detection](https://bl.ocks.org/mbostock/31ce330646fa8bcb7289ff3b97aab3f5)
 * [Force-Directed Graph](https://bl.ocks.org/mbostock/f584aa36df54c451c94a9d0798caed35)
 * [Force-Directed Tree](https://bl.ocks.org/mbostock/95aa92e2f4e8345aaa55a4a94d41ce37)
 * [Force-Directed Lattice](https://bl.ocks.org/mbostock/1b64ec067fcfc51e7471d944f51f1611)
 * [Beeswarm](https://bl.ocks.org/mbostock/6526445e2b44303eebf21da3b6627320)
 