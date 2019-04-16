import React, { Component } from "react";
import ToolTipsy from "./ToolTipsy";
import "./Charts.css";
import { bookService } from "../_services";

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
    if (this.props.currentUser) {
      this.getBooks();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && this.props.currentUser !== prevProps.currentUser) {
      this.getBooks();
    }
  }

  getBooks() {
    bookService.getAllByUserId(this.props.currentUser.userId)
      .then(result => {
        this.setState({
          books: result
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