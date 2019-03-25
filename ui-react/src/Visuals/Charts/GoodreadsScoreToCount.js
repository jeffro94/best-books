/*
 * This component uses react-faux-dom to allow D3 to create charts as usual,
 * then render to a React element - https://github.com/Olical/react-faux-dom.
 *  - https://www.smashingmagazine.com/2018/02/react-d3-ecosystem/
 *
 * The following two issues helped me immensely with configuring the tooltip
 * most effectively:
 *  - https://github.com/Olical/react-faux-dom/issues/31
 *  - https://github.com/Olical/react-faux-dom/issues/44
 * 
 * Because the chart and tooltip are seperate child elements, the chart only
 * needs to render once, and the tooltip can re-render as needed as the hover
 * position changes.
 * 
 */

import React from "react";
import { withRouter } from "react-router-dom";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import moment from "moment";

class GoodreadsScoreToCount extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.books !== nextProps.books);
  }

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

    // create SVG element
    const svgNode = ReactFauxDOM.createElement("svg");
    const svg = d3.select(svgNode)
      .attr("width", w)
      .attr("height", h);

    // create the datapoints as circles
    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("a").attr("href", d => `/edit/${d.bookId}`)
      .append("circle")
      .attr("cx", d => xScale(d.gR_Rating) )
      .attr("cy", d => yScale(d.gR_RatingCount) )
      .attr("r", 4)
      .style("fill", d => moment(d.dateCreated) > moment().subtract(3, "hours") ? "red" : "lightblue" )
      .on("mouseover", d => {
        this.props.updateTooltipState({
          left: xScale(d.gR_Rating) + 5,
          top: yScale(d.gR_RatingCount) + 5,
          fields: [
            `Title: ${ d.title }`,
            `Author: ${ d.author }`,
            `Year: ${ d.yearPublished }`,
            `Rating: ${ d.gR_Rating ? d.gR_Rating.toFixed(1) : "N/A" }`,
            `Count: ${ d.gR_RatingCount ? d.gR_RatingCount.toLocaleString() : "N/A" }`
          ]
        });
      })
      .on("mouseout", () => {
        this.props.updateTooltipState({
          fields: []
        });
      });
      //.on("click", d => this.props.history.push(`/edit/${d.bookId}`));

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
      .attr("y", padding/2 + 4)
      .attr("text-anchor", "middle")
      .classed("title", true);

    return svgNode.toReact();
    
  }
}


export default withRouter(GoodreadsScoreToCount);
