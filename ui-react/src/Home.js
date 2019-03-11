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
      sortOrder: "",
      columns: getTableColumns()
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
    const tableHeaders = this.state.columns.map(col =>
      <th scope="col" onClick={ () => this.sortColumns(col.key) }>{ col.name }</th>
    );

    const tableRows = this.state.books.map(book => 
      <BookTableRow key={ book.bookId } book={ book } columns={ this.state.columns } />
    );

    return (
      <Table responsive="lg" bordered hover>
        <thead className="thead-light">
          <tr>
            { tableHeaders }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

const BookTableRow = withRouter(props => {
  const cols = props.columns.filter(c => c.selected).map(c => (
    <td 
      {...c.attributes}
      title={ c.showTitle ? props.book[c.key] : undefined }
    >
      { c.transform ? c.transform(props.book[c.key]) : props.book[c.key] }
    </td>
  ));

  return (
    <tr onClick={() => { props.history.push(`/edit/${props.book.bookId}`) }}>
      { cols }
    </tr>
  );
});

class ColumnsSelector extends Component {

}

function getTableColumns() {
  return ([
      {
        key: "flagCurrentlyReading",
        name: "Current",
        selected: true,
        transform: val => val ? "✓" : ""
      },
      {
        key: "flagWantToRead",
        name: "Want",
        selected: true,
        transform: val => val ? "✓" : ""
      },
      {
        key: "wantToReadScore",
        name: "Score",
        selected: true
      },
      {
        key: "title",
        name: "Title",
        selected: true,
        attributes: {
          className: "text-truncate",
          style: { maxWidth: "450px" },
        },
        showTitle: true
      },
      {
        key: "author",
        name: "Author",
        selected: true,
        attributes: {
          className: "text-truncate",
          style: { maxWidth: "250px" }
        },
        showTitle: true
      },
      {
        key: "yearPublished",
        name: "Year",
        selected: true
      },
      {
        key: "gR_Rating",
        name: "Rating",
        selected: true,
        attributes: { className: "text-right" }
      },
      {
        key: "gR_RatingCount",
        name: "Count",
        selected: true,
        attributes: { className: "text-right" }
      }
    ]);
}


export default Home;
