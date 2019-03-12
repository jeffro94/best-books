import React, { Component } from 'react';
import GoodreadsScoreToCount from './Components/Visuals/GoodreadsScoreToCount.js';
import './Visuals.css';

class Visuals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  componentDidMount() {
    fetch("https://localhost:44344/api/books/userId/1")
      .then(response => response.json())
      .then(result => {
        this.setState({
          books: result
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Visuals!</h3>
        <GoodreadsScoreToCount books={ this.state.books } />
      </div>
    );
  }
  
}

export default Visuals;
