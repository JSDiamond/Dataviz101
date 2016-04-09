 //BarReasonsChart

 function firstChart() {
     var reasons = [{
         value: 30,
         explanation: "One of us snores",
         color: "rgb(187,181,0)"
     }, {
         value: 17,
         explanation: "One of us is sick",
         color: "rgb(203,144,32)"
     }, {
         value: 11,
         explanation: "Night shifts, different sleeping times",
         color: "rgb(28,173,33)"
     }, {
         value: 10,
         explanation: "Had an argument or fight",
         color: "rgb(255,0,129)"
     }, {
         value: 8,
         explanation: "Frequent trips to bathroom",
         color: "rgb(23,131,112)"
     }, {
         value: 8,
         explanation: "Need to sleep with child",
         color: "rgb(0,29,253)"
     }, {
         value: 7,
         explanation: "Different temperature preferences",
         color: "rgb(255,165,0)"
     }, {
         value: 4,
         explanation: "No longer physically intimate",
         color: "rgb(158,74,4)"
     }, {
         value: 3,
         explanation: "Not enough space",
         color: "rgb(85,40,1)"
     }, {
         value: 2,
         explanation: "Do not want to share covers",
         color: "rgb(57,48,69)"
     }];

     var dbsel = d3.select("#reason-bar")

     var total = d3.sum(reasons, function(d) {
         return d.value
     })

     var dbScale = d3.scale.linear().range([0, 100]).domain([0, total])

     var items = dbsel.selectAll('li').data(reasons)
         .enter().append('li')
         .style({
             width: function(d) {
                 return dbScale(d.value) + '%'
             },
             "background-color": function(d) {
                 return d.color
             }
         })
         .text(function(d) {
             return d.value + '%';
         })


     var tooltip = d3.select('body').append('div').attr('class', 'tooltip')

     items.on('mouseenter', showToolTip)
         .on('mouseleave', hideToolTip)

     function showToolTip(d, i) {
         tooltip.classed('show', true)
         tooltip.text(d.explanation)

         var brc = this.getBoundingClientRect()
         var ttbrc = tooltip.node().getBoundingClientRect()


         tooltip
             .style({
                 top: (brc.top + pageYOffset - ttbrc.height) + 'px',
                 left: brc.left + 'px'
             })
     }

     function hideToolTip(d, i) {
         tooltip.classed('show', false)
     }

 }







 //Agree-disagree chart

 var agreebar = d3.select("#agree-bar")

 var margin = {
         top: 40,
         right: 30,
         bottom: 20,
         left: 30
     },
     width = 640 - margin.left - margin.right,
     height = 250 - margin.top - margin.bottom;

 var x = d3.scale.linear()
     .range([0, width])

 var y = d3.scale.ordinal()
     .rangeRoundBands([0, height], 0.1);

 // var xAxis = d3.svg.axis()
 //     .scale(x)
 //     // .tickFormat()
 //     .orient("bottom");

 var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left")
     .tickSize(0)
     .tickPadding(6);

 var xAxis = d3.svg.axis()
     .scale(x)
     // .tickFormat(function(d) {return d.value + "%"})
     .orient("bottom");


 var svg = d3.select("#agree-bar").append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + margin.top + margin.bottom)
     .append("g")
     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var axisX = null
var tickNegative = null
var firstcall = true

 datasets = ["Set1.tsv", "Set2.tsv", "Set3.tsv"];

 var agreeDisagree = function(tsvFile) { 

    d3.tsv(tsvFile, type, function(error, data) {
     x.domain(d3.extent(data, function(d) {
         return d.value;
         // console.log(d.value);
     })).nice();
     y.domain(data.map(function(d) {
         return d.name;
     }));

     console.log(data);

     // svg.append("rect")
     //    .attr("width", "100%")
     //    .attr("height", "100%")
     //    .attr("fill", "yellow")

     var rects = svg.selectAll(".bar").data(data)

    var enters = rects.enter().append("rect")
    // console.log("enters", enters)
        
    rects.attr("class", function(d) {
             return "bar bar--" + (d.value < 0 ? "negative" : "positive");
         })
        .transition()
        .duration(1000)
        .attr("x", function(d) {
             return x(Math.min(0, d.value));
         })
         .attr("y", function(d) {
             return y(d.name);
         })
         .attr("width", function(d) {
             return Math.abs(x(d.value) - x(0));
         })
         .attr("height", y.rangeBand());

    // bar.remove();


if(firstcall){
    axisX = svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

    tickNegative = svg.append("g")
         .attr("class", "y axis")
         .attr("transform", "translate(" + x(0) + ",0)")
         .call(yAxis)
         
    var tickfiltered = tickNegative.selectAll(".tick")
         .filter(function(d, i) {
             return data[i].value < 0;
         });

     tickfiltered.selectAll("line")
         .attr("x2", -6);

     tickfiltered.selectAll("text")
         .attr("x", 9)
         .style("text-anchor", "start");

} else {
    axisX
    .transition()
    .duration(1000)
    .call(xAxis)

    tickNegative
        .transition()
        .duration(1000)
        .attr("transform", "translate(" + x(0) + ",0)")
        .call(yAxis)

    tickNegative.selectAll("text")
         .attr("x", 19)

    var tickfiltered = tickNegative.selectAll(".tick")
         .filter(function(d, i) {
             return data[i].value < 0;
         });

    tickfiltered.selectAll("line")
         .attr("x2", 6);

     tickfiltered.selectAll("text")
         .attr("x", 9)
         .style("text-anchor", "start");
}
     
    // d3.select(xAxis).tickFormat("test");

     

    

    // svg.remove();
    // document.getElementById("agree-bar").innerHTML = "";
    firstcall = false
 });
 }

  agreeDisagree(datasets[0]);

 var clickBoxes = d3.select("#clickBoxes").selectAll(".dataset-button")
    .data(datasets);

    clickBoxes.enter()
    .append("input")
    .attr("value", function(d){
        switch(d) {
            case "Set1.tsv" : return "Sleeping in separate beds helps us stay together"; break;
            case "Set2.tsv" : return "We sleep better when we sleep in separate beds"; break;
            case "Set3.tsv" : return "Our sex life has improved as a result of sleeping alone"; break;
            default : return "Dataset " + d;
        }
    })
    .attr("type", "button")
    .attr("class", "dataset-button")
    .on("click", function(d) {
        agreeDisagree(d);
    });
    

 function type(d) {
     d.value = +d.value;
     return d;
 }


 // First Sankey diagram
 function sankeyfct() {

     var margin2 = {
             top: 40,
             right: 30,
             bottom: 40,
             left: 30
         },
         width = 1000 - margin2.left - margin2.right,
         height = 500 - margin2.top - margin2.bottom;

     var formatNumber = d3.format(",.0f"),
         format = function(d) {
             return formatNumber(d) + " respondents";
         },
         color = d3.scale.category20c();

     var svg = d3.select("#chart").append("svg")
         .attr("width", width + margin2.left + margin2.right)
         .attr("height", height + margin2.top + margin2.bottom)
         .append("g")
         .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
     //////////////////////////////////////////////
     var sankey = d3.sankey()
         .nodeWidth(15)
         .nodePadding(10)
         .size([width, height]);

     var path = sankey.link();
     d3.json("sleepingalone.json", function(sleeping) {
         sankey
             .nodes(sleeping.nodes)
             .links(sleeping.links)
             .layout(32);

         var link = svg.append("g").selectAll(".link")
             .data(sleeping.links)
             .enter().append("path")
             .attr("class", "link")
             .attr("d", path)
             .style("stroke-width", function(d) {
                 return Math.max(1, d.dy);
             })
             .sort(function(a, b) {
                 return b.dy - a.dy;
             });

         link.append("title")
             .text(function(d) {
                 return d.source.name + " → " + d.target.name + "\n" + format(d.value);
             });

         var node = svg.append("g").selectAll(".node")
             .data(sleeping.nodes)
             .enter().append("g")
             .attr("class", "node")
             .attr("transform", function(d) {
                 return "translate(" + d.x + "," + d.y + ")";
             });

         node.append("rect")
             .attr("height", function(d) {
                 return d.dy;
             })
             .attr("width", sankey.nodeWidth())
             .style("fill", function(d) {
                 return d.color = color(d.name.replace(/ .*/, ""));
             })
             .style("stroke", function(d) {
                 return d3.rgb(d.color).darker(2);
             })
             .append("title")
             .text(function(d) {
                 return d.name + "\n" + format(d.value);
             });

         node.append("text")
             .attr("x", -6)
             .attr("y", function(d) {
                 return d.dy / 2;
             })
             .attr("dy", ".35em")
             .attr("text-anchor", "end")
             .attr("transform", null)
             .text(function(d) {
                 return d.name;
             })
             .filter(function(d) {
                 return d.x < width / 2;
             })
             .attr("x", 6 + sankey.nodeWidth())
             .attr("text-anchor", "start");
     });
 };


 // Second Sankey diagram for education and income
 function sankeyfct2() {

     var margin3 = {
             top: 20,
             right: 30,
             bottom: 20,
             left: 30
         },
         width = 800 - margin3.left - margin3.right,
         height = 500 - margin3.top - margin3.bottom;

     var formatNumber = d3.format(",.0f"),
         format = function(d) {
             return formatNumber(d) + " respondents";
         },
         color = d3.scale.category10();

     var svg = d3.select("#chart2").append("svg")
         .attr("width", width + margin3.left + margin3.right)
         .attr("height", height + margin3.top + margin3.bottom)
         .append("g")
         .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");
     //////////////////////////////////////////////
     var sankey = d3.sankey()
         .nodeWidth(15)
         .nodePadding(10)
         .size([width, height]);

     var path = sankey.link();
     d3.json("sleepingalone2.json", function(sleeping2) {
         sankey
             .nodes(sleeping2.nodes)
             .links(sleeping2.links)
             .layout(32);

         var link = svg.append("g").selectAll(".link")
             .data(sleeping2.links)
             .enter().append("path")
             .attr("class", "link")
             .attr("d", path)
             .style("stroke-width", function(d) {
                 return Math.max(1, d.dy);
             })
             .sort(function(a, b) {
                 return b.dy - a.dy;
             });

         link.append("title")
             .text(function(d) {
                 return d.source.name + " → " + d.target.name + "\n" + format(d.value);
             });

         var node = svg.append("g").selectAll(".node")
             .data(sleeping2.nodes)
             .enter().append("g")
             .attr("class", "node")
             .attr("transform", function(d) {
                 return "translate(" + d.x + "," + d.y + ")";
             });

         node.append("rect")
             .attr("height", function(d) {
                 return d.dy;
             })
             .attr("width", sankey.nodeWidth())
             .style("fill", function(d) {
                 return d.color = color(d.name.replace(/ .*/, ""));
             })
             .style("stroke", function(d) {
                 return d3.rgb(d.color).darker(2);
             })
             .append("title")
             .text(function(d) {
                 return d.name + "\n" + format(d.value);
             });

         node.append("text")
             .attr("x", -6)
             .attr("y", function(d) {
                 return d.dy / 2;
             })
             .attr("dy", ".35em")
             .attr("text-anchor", "end")
             .attr("transform", null)
             .text(function(d) {
                 return d.name;
             })
             .filter(function(d) {
                 return d.x < width / 2;
             })
             .attr("x", 6 + sankey.nodeWidth())
             .attr("text-anchor", "start");
     });
 };

 firstChart();
 sankeyfct();
 sankeyfct2();