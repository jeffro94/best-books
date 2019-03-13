import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

class GoodreadsScoreToCount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("rendering chart...");

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

    // create SVG element
    const svgNode = ReactFauxDOM.createElement("svg");
    const svg = d3.select(svgNode)
        .attr("width", w)
        .attr("height", h);

    // create the datapoints as red circles
    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.gR_Rating) )
        .attr("cy", d => yScale(d.gR_RatingCount) )
        .attr("r", 4)
        .on('mouseover', d => {
          this.setState({
            tooltipLeft: xScale(d.gR_Rating),
            tooltipTop: yScale(d.gR_RatingCount),
            tooltipOpacity: 0.8,
            tooltipData: d
          });
        })
        .on('mouseout', () => {
          this.setState({
            tooltipData: null
          });
        });

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

    const rootNode = ReactFauxDOM.createElement("div");
    
    d3.select(rootNode).attr("class", "chart");

    rootNode.appendChild(svgNode);
    rootNode.appendChild(
      <ToolTipsy 
        left={ this.state.tooltipLeft + 3 }
        top={ this.state.tooltipTop + 4 }
        opacity={ this.state.tooltipOpacity }
        data={ this.state.tooltipData }
        key="chart-tooltip" />
      );

    return rootNode.toReact();

  }
}

class ToolTipsy extends Component {
  render() {
    return (
      <div 
        className="tooltip"
        style={ { 
          display: this.props.data ? "block" : "none",
          position: "absolute",
          top: `${this.props.top}px`,
          left: `${this.props.left}px`
        } }
      >
        <p>Title: { this.props.data ? this.props.data.title : "" }</p>
        <p>Author: {  this.props.data ? this.props.data.author : "" }</p>
        <p>Rating: {  this.props.data ? this.props.data.gR_Rating : "" }</p>
        <p>Count: {  this.props.data ? this.props.data.gR_RatingCount : "" }</p>
      </div>
    );
  }
}

export default GoodreadsScoreToCount;