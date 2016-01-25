
$(function() {

  // Grab live swellinfo data
  $.ajax({
    url: '/main/data',
    dataType: 'json',
    success: function(data) {
      swellData = data;
      console.log('data loaded!');
    },
    error: function() { 
      console.log('error');
    },
    complete: function() {
      drawChart();
    }
  });

});


function drawChart() {

  // Set margins
  var margin = {top: 20, right: 20, bottom: 30, left: 70},
      width = 1300 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Create SVG
  var svg = d3.select("#chart_container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Tool tip
  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return d.day_name + ", " + d.hour + "<br>Wind: " + d.wind + "<br>Swell 1: " + d.swell1 + "<br>Swell 2: " + d.swell2;
    })

  // SET AXIS (min and max values)

  var x = d3.time.scale()
      // sets x range to first date -> last date
      .domain([new Date(swellData[0].datetime), new Date(swellData[swellData.length - 1].datetime)])
      // sets actual width of graph corresponding to domain
      .range([2, width - margin.left - margin.right]);

  // y axis scale (linear) 0-500
  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, d3.max(swellData, function(d) { return d.surf; })]);



  // x axis
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .ticks(d3.time.day, 1);

  // y axis
  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(5, "")
      .tickValues([0, 10, 20, 30, 40, 50, 60, 70, 80])
      .tickFormat(function(d, i) {
        var heightNames = ["Flat", "Knee", "Waist", "Chest", "Shoulder", "Head", "Overhead", "D-Overhead"]
        return heightNames[i]
      })

  svg.call(tip);

  //x.domain(data.map(function(d) { return d.datetime; }));

  // draw x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // draw y axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("");


  // draw bars
  var bar = svg.selectAll(".bar")
      .data(swellData)
    .enter().append("rect")
      .attr("class", "bar")
      .attr('x', function(d) { return x(new Date(d.datetime)); })
      .attr("width", ((width - margin.left - margin.right))/swellData.length)
      .attr("y", function(d) { return y(d.surf); })
      .attr("height", function(d) { return height - y(d.surf); })
      .attr("fill", function(d) { 
        var regexDay = /(?:^[6-9]am|^[1][0-1]am)|(?:^[1-8]pm|^12pm)/g
        // Test for Day
        if ( regexDay.test(d.hour) ) {
          if (d.cond == 1) {
            return "#49A636" // green
          } else if (d.cond == 2) {
            return "#588DC0" // blue
          } else {
            return "#D16158" // red
          }
        // Night
        } else {
          if (d.cond == 1) {
            return "#25551B" // green
          } else if (d.cond == 2) {
            return "#2F4D6C" // blue
          } else {
            return "#783833" // red
          }
        }
      })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)



      // // Draw Line
      // var lineFunc = d3.svg.line()
      //   .x(function(d) { return x(new Date(d.datetime)); })
      //   .y(function(d) { return y(d.surf); })
      //   .interpolate('basis');

      //   svg.append('svg:path')
      //     .attr('d', lineFunc(swellData))
      //     .attr('stroke', '#fff')
      //     .attr('stroke-width', 4)
      //     .attr('fill', 'none');
}