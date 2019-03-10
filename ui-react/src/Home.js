import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Best Books!</h1>
        <p className="mt-3">
          <a href="/add">Add a new book</a>
        </p>
        <BookTable className="mt-3" />
      </div>
    );
  }
}

class BookTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      sortOrder: ""
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

  sortColumns(bookPropertyName) {
    const books = this.state.books.slice();

    const sortOrder = (this.state.sortOrder === "Ascending") ? "Descending" : "Ascending";

    books.sort((a,b) => {
      if (sortOrder === "Ascending") {
        return (a[bookPropertyName] > b[bookPropertyName]) ? 1 : -1;
      }
      else {
        return (a[bookPropertyName] > b[bookPropertyName]) ? -1 : 1;
      }
    });

    this.setState({
      books,
      sortOrder
    });
  }

  render() {
    const tableRows = [];

    this.state.books.forEach(book => {
      tableRows.push(<BookTableRow book={ book } key={ book.bookId } />);
    });

    return (
      <Table responsive="lg" bordered hover>
        <thead className="thead-light">
          <tr>
            <th scope="col" onClick={ () => this.sortColumns("flagCurrentlyReading") }>Current</th>
            <th scope="col" onClick={ () => this.sortColumns("flagWantToRead") }>Want</th>
            <th scope="col" onClick={ () => this.sortColumns("wantToReadScore") }>Score</th>
            <th scope="col" onClick={ () => this.sortColumns("title") }>Title</th>
            <th scope="col" onClick={ () => this.sortColumns("author") }>Author</th>
            <th scope="col" onClick={ () => this.sortColumns("yearPublished") }>Year</th>
            <th scope="col" onClick={ () => this.sortColumns("gR_Rating") }>Rating</th>
            <th scope="col" onClick={ () => this.sortColumns("gR_RatingCount") }>Count</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

const BookTableRow = withRouter((props) => (
  <tr onClick={() => { props.history.push(`/edit/${props.book.bookId}`) }}>
    <td>{ props.book.flagCurrentlyReading ? "✓" : "" }</td>
    <td>{ props.book.flagWantToRead ? "✓" : "" }</td>
    <td>{ props.book.wantToReadScore }</td>
    <td title={ props.book.title } className="text-truncate" style={ { maxWidth: "450px" } }>{ props.book.title }</td>
    <td title={ props.book.author } className="text-truncate" style={ { maxWidth: "250px" } }>{ props.book.author }</td>
    <td>{ props.book.yearPublished }</td>
    <td className="text-right">{ props.book.gR_Rating }</td>
    <td className="text-right">{ props.book.gR_RatingCount }</td>
  </tr>
));


export default Home;
