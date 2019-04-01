import React, { Component } from "react";
import ToolTipsy from "./ToolTipsy";
import "./Charts.css";
import { USER_ID, PRIVATE_MODE } from "../Constants";

class ChartWrapper extends Component {
  // State can also be initialized using a class property
  // ref: https://daveceddia.com/where-initialize-state-react/
  //      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Field_declarations
  //
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      tooltipState: { fields: [] }
    }

    this.updateTooltipState = this.updateTooltipState.bind(this);
  }

  componentDidMount() {
    fetch(`https://localhost:44344/api/books/userId/${ USER_ID }`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          books: result.filter(book => !PRIVATE_MODE || !book.private)
        });
      });
  }

  updateTooltipState(tooltipState) {
    this.setState({
      tooltipState
    });
  }
  
  render() {
    const Chart = this.props.chart; // we get passed the constructor fuction of the desired chart

    return (
      <div className="chart">
        <Chart books={ this.state.books } updateTooltipState={ this.updateTooltipState } />
        <ToolTipsy 
          left={ this.state.tooltipState.left }
          top={ this.state.tooltipState.top }
          fields={ this.state.tooltipState.fields } />
      </div>
    );
  }
}

export default ChartWrapper;