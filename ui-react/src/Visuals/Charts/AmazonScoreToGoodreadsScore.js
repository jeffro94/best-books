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

class AmazonScoreToGoodreadsScore extends React.Component {

  shouldComponentUpdate(nextProps) {
    return (this.props.books !== nextProps.books);
  }

  render() {
    // layout constants
    const w = 700;
    const h = 400;
    const padding = 30;

    // books must have relavent data fields to be charted
    const data = this.props.books.filter(book => book.amz_Rating && book.gR_Rating);

    // create scale functions
    const xScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.gR_Rating) - 0.5, 4.8])
      .range([padding * 2, w - padding]);

    const yScale = d3.scaleLinear()
      .domain([d3.min(data, d => d.amz_Rating) - 0.5, 5])
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
      .attr("cy", d => yScale(d.amz_Rating) )
      .attr("r", 4)
      .style("fill", d => moment(d.dateCreated) > moment().subtract(3, "hours") ? "red" : "#aaa" )
      .on("mouseover", d => {
        this.props.updateTooltipState({
          left: xScale(d.gR_Rating) + 5,
          top: yScale(d.amz_Rating) + 5,
          fields: [
            `Title: ${ d.title }`,
            `Author: ${ d.author }`,
            `Amazon Score:: ${ d.amz_Rating ? d.amz_Rating.toFixed(1) : "N/A" }`,
            `Goodreads Score: ${ d.gR_Rating ? d.gR_Rating.toFixed(1) : "N/A" }`
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
      .text("Goodreads Score");

    // text label for the y axis
    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", padding * 2 + 20)
      .attr("x", 0 - h / 3 + 20)
      .style("text-anchor", "middle")
      .text("Amazon Score");   

    // create the chart title
    svg.append("text")
      .text("Goodreads Score vs Amazon Score")
      .attr("x", w/2)
      .attr("y", padding/2 + 4)
      .attr("text-anchor", "middle")
      .classed("title", true);

    return svgNode.toReact();
    
  }
}


export default withRouter(AmazonScoreToGoodreadsScore);
