import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";

class GoodreadsScoreToCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipState: {}
    }
  }

  updateTooltipState(tooltipState) {
    this.setState({
      tooltipState
    });
  }

  render() {
    console.log("rendering parent...");

    return (
      <div className="chart">
        <TheChart 
          books={ this.props.books }
          updateTooltipState={ newState => this.updateTooltipState(newState) } />
        <ToolTipsy 
          tooltipState={ this.state.tooltipState }
          key="chart-tooltip" />
      </div>
    );
  }
}

class TheChart extends Component {
  shouldComponentUpdate(nextProps) {
    return (this.props.books !== nextProps.books);
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
          this.props.updateTooltipState({
            left: xScale(d.gR_Rating) + 5,
            top: yScale(d.gR_RatingCount) + 5,
            opacity: 0.8,
            data: d
          });
        })
        .on('mouseout', () => {
          this.props.updateTooltipState({
            data: null
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

    return svgNode.toReact();

  }
}

class ToolTipsy extends Component {
  render() {
    console.log("rendering tooltip...");

    return (
      <div 
        className="tooltip"
        style={ { 
          display: this.props.tooltipState.data ? "block" : "none",
          position: "absolute",
          top: `${this.props.tooltipState.top}px`,
          left: `${this.props.tooltipState.left}px`
        } }
      >
        <p>Title: { this.props.tooltipState.data ? this.props.tooltipState.data.title : "" }</p>
        <p>Author: {  this.props.tooltipState.data ? this.props.tooltipState.data.author : "" }</p>
        <p>Rating: {  this.props.tooltipState.data ? this.props.tooltipState.data.gR_Rating : "" }</p>
        <p>Count: {  this.props.tooltipState.data ? this.props.tooltipState.data.gR_RatingCount : "" }</p>
      </div>
    );
  }
}

export default GoodreadsScoreToCount;