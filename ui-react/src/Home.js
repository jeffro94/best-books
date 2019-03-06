import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Best Books!</h1>
        <p className="mt-3">
            <a href="book.html?bookID=0">Add a new book</a>
        </p>
        <BookTable className="mt-3" />
        <ExampleTable className="mt-3" />
      </div>
    );
  }
}

class BookTable extends Component {
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
        })
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
            <th scope="col">Current</th>
            <th scope="col">Want</th>
            <th scope="col">Score</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Year</th>
            <th scope="col">Rating</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

function BookTableRow(props) {
  return (
    <tr>
      <td>{ props.book.flagCurrentlyReading ? "✓" : "" }</td>
      <td>{ props.book.flagWantToRead ? "✓" : "" }</td>
      <td>{ props.book.wantToReadScore }</td>
      <td title={ props.book.title } className="text-truncate" style={ { maxWidth: "450px" } }>{ props.book.title }</td>
      <td title={ props.book.author } className="text-truncate" style={ { maxWidth: "250px" } }>{ props.book.author }</td>
      <td>{ props.book.yearPublished }</td>
      <td className="text-right">{ props.book.gR_Rating }</td>
      <td className="text-right">{ props.book.gR_RatingCount }</td>
    </tr>
  );
}

class ExampleTable extends Component {
  render() {
    return (
      <Table responsive="lg" bordered hover>
        <thead className="thead-light">
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    );
  }
}


export default Home;
