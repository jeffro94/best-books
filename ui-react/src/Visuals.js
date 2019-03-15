import React, { Component } from "react";
// import { Carousel } from 'react-bootstrap';
import GoodreadsScoreToCount from "./Components/Visuals/GoodreadsScoreToCount";
import AmazonScoreToCount from "./Components/Visuals/AmazonScoreToCount";
import YearToGoodreadsScore from "./Components/Visuals/YearToGoodreadsScore";
import AmazonScoreToGoodreadsScore from "./Components/Visuals/AmazonScoreToGoodreadsScore";
import "./Visuals.css";

class Visuals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      itemCount: 4,
      selectedItem: 0
    };
  }

  componentDidMount() {
    fetch("https://localhost:44344/api/books/userId/2")
      .then(response => response.json())
      .then(result => {
        this.setState({
          books: result
        });
      });
  }

  incrementItem() {
    this.setState({ selectedItem: this.state.selectedItem === this.state.itemCount - 1 ? 0 : this.state.selectedItem + 1 });
  }

  decrementItem() {
    this.setState({ selectedItem: this.state.selectedItem === 0 ? this.state.itemCount - 1 : this.state.selectedItem - 1 });
  }

  render() {
    const items = [
      <GoodreadsScoreToCount books={ this.state.books } />,
      <AmazonScoreToCount books={ this.state.books } />,
      <YearToGoodreadsScore books={ this.state.books } />,
      <AmazonScoreToGoodreadsScore books={ this.state.books } />
    ];

    return (
      <div className="row mt-5">
        <div className="col-xs-1 col-lg-2">
          <div className="left-arrow" onClick={ () => this.decrementItem() }>⬅</div>
        </div>
        <div className="col-xs-10 col-lg-8">
          { items[this.state.selectedItem] }
        </div>
        <div className="col-xs-1 col-lg-2">
          <div className="right-arrow" onClick={ () => this.incrementItem() }>➡</div>
        </div>
      </div>
    );

      // <div className="mt-5">
      //   <Carousel interval={ null } slide={ true }>
      //     <Carousel.Item>
      //       <GoodreadsScoreToCount books={ this.state.books } />
      //     </Carousel.Item>
      //     <Carousel.Item>
      //       <div>Hello World.</div>
      //     </Carousel.Item>
      //   </Carousel>
      // </div>
  }
}

export default Visuals;
