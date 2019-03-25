import React, { Component } from "react";
import ChartWrapper from "./ChartWrapper";
import GoodreadsScoreToCount from "./Charts/GoodreadsScoreToCount";
import AmazonScoreToCount from "./Charts/AmazonScoreToCount";
import YearToGoodreadsScore from "./Charts/YearToGoodreadsScore";
import AmazonScoreToGoodreadsScore from "./Charts/AmazonScoreToGoodreadsScore";
import "./Visuals.css";

class Visuals extends Component {
  constructor(props) {
    super(props);

    this.charts = [
      GoodreadsScoreToCount,
      AmazonScoreToCount,
      YearToGoodreadsScore,
      AmazonScoreToGoodreadsScore
    ];

    this.state = {
      selectedItem: 0
    };
  }

  incrementItem() {
    this.setState({ selectedItem: this.state.selectedItem === this.charts.length - 1 ? 0 : this.state.selectedItem + 1 });
  }

  decrementItem() {
    this.setState({ selectedItem: this.state.selectedItem === 0 ? this.charts.length - 1 : this.state.selectedItem - 1 });
  }

  render() {
    return (
      <div className="row mt-5">
        <div className="col-xs-1 col-lg-2">
          <div className="left-arrow" onClick={ () => this.decrementItem() }>⬅</div>
        </div>
        <div className="col-xs-10 col-lg-8">
          <ChartWrapper chart={ this.charts[this.state.selectedItem] } />
        </div>
        <div className="col-xs-1 col-lg-2">
          <div className="right-arrow" onClick={ () => this.incrementItem() }>➡</div>
        </div>
      </div>
    );
  }
}

export default Visuals;
