import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
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

  componentDidMount() {
    document.title = "Best Books! - Visualizations";
  }

  incrementItem() {
    this.setState({ selectedItem: this.state.selectedItem === this.charts.length - 1 ? 0 : this.state.selectedItem + 1 });
  }

  decrementItem() {
    this.setState({ selectedItem: this.state.selectedItem === 0 ? this.charts.length - 1 : this.state.selectedItem - 1 });
  }

  render() {
    return (
      <div className="mt-5">
        <div className="d-flex justify-content-around align-items-center">
          <div className="d-none d-lg-block left-arrow" onClick={ () => this.decrementItem() }><FontAwesomeIcon icon={ faChevronLeft } /></div>
          <ChartWrapper chart={ this.charts[this.state.selectedItem] } currentUser={ this.props.currentUser } />
          <div className="d-none d-lg-block right-arrow" onClick={ () => this.incrementItem() }><FontAwesomeIcon icon={ faChevronRight } /></div>
        </div>
        <div className="d-flex d-lg-none justify-content-around">
          <div className="left-arrow" onClick={ () => this.decrementItem() }><FontAwesomeIcon icon={ faChevronLeft } /></div>
          <div className="right-arrow" onClick={ () => this.incrementItem() }><FontAwesomeIcon icon={ faChevronRight } /></div>
        </div>
      </div>
    );
  }
}

export default Visuals;
