import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Table, Collapse } from "react-bootstrap";
import "./Home.css";

class Home extends Component {
  render() {
    return (
      <BookTable />
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
    fetch("https://localhost:44344/api/books/userId/2")
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

  handleColumnSelectChange(e) {
    let updatedColumns = [];
    Object.assign(updatedColumns, this.state.columns);

    // toggle the selected value
    updatedColumns.find(c => c.key === e.target.id).selected = !updatedColumns.find(c => c.key === e.target.id).selected;
    
    this.setState({ columns: updatedColumns });
  }

  render() {
    const tableHeaders = this.state.columns.filter(c => c.selected).map(col =>
      <th 
        scope="col" key={ col.key } 
        onClick={ () => this.sortColumns(col.key) } 
        {...col.headerAttributes} title={ col.headerTitle ? col.headerTitle : undefined }
      >
        { col.headerAbbreviation ? col.headerAbbreviation : col.name }
      </th>
    );

    const tableRows = this.state.books.map(book => 
      <BookTableRow key={ book.bookId } book={ book } columns={ this.state.columns } />
    );

    return (
      <div>
        <ColumnSelectorTable columns={ this.state.columns } onChange={ (e) => this.handleColumnSelectChange(e) } />
        <Table bordered hover>
          <thead className="thead-light">
            <tr>
              { tableHeaders }
            </tr>
          </thead>
          <tbody>
            { tableRows }
          </tbody>
        </Table>
      </div>
    );
  }
}

const BookTableRow = withRouter(props => {
  const cols = props.columns.filter(c => c.selected).map(c => (
    <td 
      key ={ c.key } {...c.attributes}
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

class ColumnSelectorTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;

    const inputs =  this.props.columns.map(col => (
      <div className="form-check" key={ col.key }>
        <input className="form-check-input" type="checkbox" id={ col.key } 
          checked={ col.selected } onChange={ (e) => this.props.onChange(e) } />
        <label className="form-check-label" htmlFor={ col.key }>{ `${ col.headerAbbreviation ? col.headerAbbreviation + ' ' : '' }${col.name}` }</label>
      </div>
    ));

    /*
    const inputs = [];

    const checkboxColumns = Array(4).fill(null).map(() => [] );
    
    for (let i = 0; i < this.props.columns.length; i++) {
      const currentColumn = this.props.columns[i];
      checkboxColumns[Math.floor(i * 4 / this.props.columns.length)].push(
        <div className="form-check" key={ currentColumn.key }>
          <input className="form-check-input" type="checkbox" id={ currentColumn.key } 
            checked={ currentColumn.selected } onChange={ (e) => this.props.onChange(e) } />
          <label className="form-check-label" htmlFor={ currentColumn.key }>{ currentColumn.name }</label>
        </div>
      );
    }

    inputs.push(...checkboxColumns.map((item, index) => (
      <div className="form-group col-lg-3" key={ index }>{ item }</div>
    ))); 
    */

    return (
      <div>
        <div className="card">
          <div className="card-header">
            <div
              onClick={() => this.setState({ open: !open })}
              aria-controls="example-collapse-text2"
              aria-expanded={open}
            >
              <span role="img" title="Open Settings" aria-label="Open Settings">⚙️</span>
            </div>
          </div>
          <Collapse in={this.state.open}>
            <div id="example-collapse-text2">
              <div className="card-body">
                <div className="form-group">
                  { inputs }
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

function getTableColumns() {
  return ([
      {
        key: "flagRead",
        name: "Completed",
        selected: true,
        transform: val => val ? "✓" : "",
        attributes: { className: "d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" },
        headerTitle: "Completed",
        headerAbbreviation: "📗"
      },
      {
        key: "flagCurrentlyReading",
        name: "Currently Reading",
        selected: true,
        transform: val => val ? "✓" : "",
        attributes: { className: "d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" },
        headerTitle: "Currently Reading",
        headerAbbreviation: "🕮"
      },
      {
        key: "flagWantToRead",
        name: "Want to Read",
        selected: true,
        transform: val => val ? "✓" : "",
        attributes: { className: "d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" },
        headerTitle: "Want to Read",
        headerAbbreviation: "🛒"
      },
      {
        key: "wantToReadScore",
        name: "Want to Read Score",
        selected: false,
        attributes: { className: "d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" },
        headerTitle: "Want to Read Score",
        headerAbbreviation: "💯"
      },
      {
        key: "title",
        name: "Title",
        selected: true,
        showTitle: true,
        attributes: {
          className: "text-truncate",
          style: { maxWidth: "450px" },
        }
      },
      {
        key: "author",
        name: "Author",
        selected: true,
        showTitle: true,
        attributes: {
          className: "text-truncate d-none d-md-table-cell",
          style: { maxWidth: "240px" }
        },
        headerAttributes: { className: "d-none d-md-table-cell" }
        
      },
      {
        key: "yearPublished",
        name: "Year",
        selected: true,
        attributes: { className: "d-none d-lg-table-cell" },
        headerAttributes: { className: "d-none d-lg-table-cell" }

      },
      {
        key: "gR_Rating",
        name: "Goodreads\nRating",
        selected: false,
        attributes: { className: "text-right d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" }
      },
      {
        key: "gR_RatingCount",
        name: "Goodreads\nCount",
        selected: false,
        attributes: { className: "text-right d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" }
      },
      {
        key: "amz_Rating",
        name: "Amazon\nRating",
        selected: false,
        attributes: { className: "text-right d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" }
      },
      {
        key: "amz_ReviewCount",
        name: "Amazon\nCount",
        selected: false,
        attributes: { className: "text-right d-none d-xl-table-cell" },
        headerAttributes: { className: "d-none d-xl-table-cell" }
      }
    ]);
}


export default Home;
