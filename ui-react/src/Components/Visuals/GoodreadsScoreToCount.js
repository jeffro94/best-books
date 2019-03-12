import { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

class GoodreadsScoreToCount extends Component {
  render() {
    // layout constants
    const w = 700;
    const h = 400;
    const padding = 30;

    const data = this.props.books;

    // create scale functions
    const xScale = d3.scaleLinear()
        .domain([1, 5])
        .range([padding * 2, w - padding]);

    const yScale = d3.scaleSqrt()
        .domain([0, d3.max(data, d => d.gR_RatingCount)])
        .range([h - padding, padding]);

    // define X axis
    const xAxis = d3.axisBottom(xScale);

    // define Y axis
    const yAxis = d3.axisLeft(yScale);

    // define tooltip
    /*
    const tip = d3.tip()
      .attr("class", 'd3-tip')
      .html(d => ( 
        <div className="tooltip">
          <p>Title: { d.title }</p>
          <p>Author: { d.author }</p>
          <p>Rating: { d.gR_Rating}</p>
          <p>Count: { d.gR_RatingCount }</p>
        </div>
      ))
      .direction('se');
    svg.call(tip);
    */

    // create SVG element
    const node = ReactFauxDOM.createElement("svg")
    const svg = d3.select(node)
        .attr("width", w)
        .attr("height", h);

    // create the datapoints as red circles
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.gR_Rating) )
        .attr("cy", d => yScale(d.gR_RatingCount) )
        .attr("r", 3);

    // create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0,${h - padding})`)
        .call(xAxis);
        
    // create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(${padding * 2},0)`)
        .call(yAxis);

    // text label for the x axis
    svg.append("text")             
        .attr("transform", "translate(" + (padding * 2 + 20) + "," + (h - padding - 8) + ")")
        .style("text-anchor", "left")
        .text("Goodreads Average Score");

    // text label for the y axis
    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", padding * 2 + 20)
        .attr("x", 0 - h / 3)
        .style("text-anchor", "middle")
        .text("Goodreads Rating Count");   

    // create the chart title
    svg.append("text")
        .text("Goodreads Average Score vs Rating Count")
        .attr("x", w/2)
        .attr("y", padding/2)
        .attr("text-anchor", "middle")
        .classed("title", true);

    return node.toReact();

  }
}

export default GoodreadsScoreToCount;