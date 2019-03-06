import React, { Component } from 'react';
import './Home.css';

class Book extends Component {
  render() {
    return (
      <div>
        <h3>This is the book detail page.</h3>
        <h3>The book ID is { this.props.match.params.bookId }!</h3>
      </div>
    );
  }
}

export default Book;
