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
      columns: tableColumns,
      filters: [
        {
          category: "Status",
          options: statusFilters,
          enabled: false
        },
        {
          category: "Ownership",
          options: ownershipFilters,
          enabled: false
        }
      ]
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

  handleColumnChange(e) {
    let updatedColumns = [];
    Object.assign(updatedColumns, this.state.columns);

    // toggle the selected value
    updatedColumns.find(c => c.key === e.target.id).selected = e.target.checked;
    
    this.setState({ columns: updatedColumns });
  }

  handleFilterChange(e) {
    let updatedFilters = [];
    Object.assign(updatedFilters, this.state.filters);

    const filterType = e.target.attributes["data-filter-type"].value;
    const filterKey = e.target.attributes["data-filter-key"].value;
    const filterValue = e.target.checked;

    // toggle the selected value
    updatedFilters.find(f => f.category === filterType).options.find(f => f.key === filterKey).selected = filterValue;

    // enable the filter if any options are selected. otherwise disable
    updatedFilters.find(f => f.category === filterType).enabled = 
      updatedFilters.find(f => f.category === filterType).options.filter(f => f.selected).length > 0;
    
    this.setState({ filters: updatedFilters });
  }

  setFilterEnabledStatus(filterCategory, value) {
    let updatedFilters = [];
    Object.assign(updatedFilters, this.state.filters);

    updatedFilters.find(f => f.category === filterCategory).enabled = value;

    if (value === false) {
      updatedFilters.find(f => f.category === filterCategory).options.forEach(option =>
        option.selected = false
      );
    }
    
    this.setState({ filters: updatedFilters });
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

    let filteredBooks = [];
    Object.assign(filteredBooks, this.state.books);

    const statusFilter = this.state.filters.find(f => f.category === "Status");
    const ownershipFilter = this.state.filters.find(f => f.category === "Ownership");

    if (statusFilter.enabled) {
      filteredBooks = filteredBooks.filter(book =>
        statusFilter.options.reduce((acc, option) => option.selected ? acc || book[option.key] : acc, false)
      );
    }

    if (ownershipFilter.enabled) {
      filteredBooks = filteredBooks.filter(book =>
        ownershipFilter.options.reduce((acc, option) => option.selected ? acc || book[option.key] : acc, false)
      );
    }

    const tableRows = filteredBooks.map(book => 
      <BookTableRow key={ book.bookId } book={ book } columns={ this.state.columns } />
    );

    return (
      <div>
        <SettingsComponent 
          columns={ this.state.columns } onColumnChange={ e => this.handleColumnChange(e) } 
          filters={ this.state.filters } onFilterChange={ e => this.handleFilterChange(e) } 
          setFilterEnabledStatus={ (filterCategory, value) => this.setFilterEnabledStatus(filterCategory, value) } />
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

class SettingsComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;

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
        <div className="settings-card card">
          <div className="card-header">
            <div
              onClick={() => this.setState({ open: !open })}
              aria-controls="example-collapse-text2"
              aria-expanded={ open }
            >
              <span role="img" title="Open Settings" aria-label="Open Settings">⚙️</span>
            </div>
          </div>
          <Collapse in={ open }>
            <div id="example-collapse-text2">
              <div className="card-body row">
                <div className="col-lg-6">
                  <ColumnSettingsComponent columns={ this.props.columns } onColumnChange={ this.props.onColumnChange }/>
                </div>
                <div className="col-lg-6">
                  <h4>Filter</h4>
                  <FilterSettingComponent 
                    categoryName="Status" options={ this.props.filters.find(f => f.category === "Status").options } 
                    enabled={ this.props.filters.find(f => f.category === "Status").enabled } 
                    setFilterEnabledStatus={ this.props.setFilterEnabledStatus } onFilterChange={ this.props.onFilterChange } />
                  <FilterSettingComponent 
                    categoryName="Ownership" options={ this.props.filters.find(f => f.category === "Ownership").options } 
                    enabled={ this.props.filters.find(f => f.category === "Ownership").enabled } 
                    setFilterEnabledStatus={ this.props.setFilterEnabledStatus } onFilterChange={ this.props.onFilterChange } />
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}

class ColumnSettingsComponent extends Component {
  render() {
    const inputs =  this.props.columns.map(col => (
      <div className="form-check" key={ col.key }>
        <input className="form-check-input" type="checkbox" id={ col.key } 
          checked={ col.selected } onChange={ this.props.onColumnChange } />
        <label className="form-check-label" htmlFor={ col.key }>{ `${ col.headerAbbreviation ? col.headerAbbreviation + ' ' : '' }${col.name}` }</label>
      </div>
    ));

    return (
      <div>
        <h4>Columns</h4>
        <div className="form-group">
          { inputs }
        </div>
      </div>
    );
  }
}

class FilterSettingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  render() {
    const { expanded } = this.state;

    const anyOptionSelected = this.props.options.filter(option => option.selected).length !== 0;

    return (
      <div className={ `card filter-card ${ this.props.enabled ? "active-filter" : ""}` }>
        <div
          onClick={() => this.setState({ expanded: !expanded })}
          aria-controls="filter-options"
          aria-expanded={ expanded }
        >
          <div className="card-header"
            onClick={ () => this.setState( { expanded: !this.state.expanded } )}>{ this.props.categoryName }</div>
        </div>
        <Collapse in={ expanded }>
          <div id="filter-options">
            <div className="card-body">
              <div>
                <div className="form-group">
                  { 
                    this.props.options.map(option => (
                      <div className="form-check" key={ option.key }>
                        <input className="form-check-input" type="checkbox" id={ "filter-option-" + option.key } 
                          data-filter-type={ this.props.categoryName } data-filter-key={ option.key }
                           checked={ option.selected } onChange={ this.props.onFilterChange } />
                        <label className="form-check-label" htmlFor={ "filter-option-" + option.key }>{ option.name }</label>
                      </div>
                    ))
                  }
                </div>
                <div className="filter-options">
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={ () => this.props.setFilterEnabledStatus(this.props.categoryName, false) }
                    disabled={ !anyOptionSelected ? "disabled" : false }
                    aria-disabled={ !anyOptionSelected ? "true" : false }
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

const tableColumns = [
  {
    key: "flagRead",
    name: "Completed",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "5%" }
    },
    headerTitle: "Completed",
    headerAbbreviation: "📗"
  },
  {
    key: "flagCurrentlyReading",
    name: "Currently Reading",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "5%" }
    },
    headerTitle: "Currently Reading",
    headerAbbreviation: "🕮"
  },
  {
    key: "flagWantToRead",
    name: "Want to Read",
    selected: true,
    transform: val => val ? "✓" : "",
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "5%" }
    },
    headerTitle: "Want to Read",
    headerAbbreviation: "🛒"
  },
  {
    key: "wantToReadScore",
    name: "Want to Read Score",
    selected: false,
    attributes: { className: "d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "5%" }
    },
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
    },
    headerAttributes: { 
      style: { width: "45%" }
    }
  },
  {
    key: "author",
    name: "Author",
    selected: true,
    showTitle: true,
    attributes: {
      className: "text-truncate d-none d-md-table-cell",
    },
    headerAttributes: { 
      className: "d-none d-md-table-cell",
      style: { width: "20%" }
    }
  },
  {
    key: "yearPublished",
    name: "Year",
    selected: true,
    attributes: {
      className: "d-none d-lg-table-cell"
    },
    headerAttributes: { 
      className: "d-none d-lg-table-cell",
      style: { width: "10%" }
    }
  },
  {
    key: "gR_Rating",
    name: "Goodreads\nRating",
    selected: false,
    transform: val => val ? val.toFixed(1) : "",
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "12%" }
    }
  },
  {
    key: "gR_RatingCount",
    name: "Goodreads\nCount",
    selected: false,
    transform: val => (val != null) ? val.toLocaleString() : "", /* allows for 0 */
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "12%" }
    }
  },
  {
    key: "amz_Rating",
    name: "Amazon\nRating",
    selected: false,
    transform: val => val ? val.toFixed(1) : "",
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "10%" }
    }
  },
  {
    key: "amz_ReviewCount",
    name: "Amazon\nCount",
    selected: false,
    transform: val => (val != null) ? val.toLocaleString() : "", /* allows for 0 */
    attributes: { className: "text-right d-none d-xl-table-cell" },
    headerAttributes: { 
      className: "d-none d-xl-table-cell",
      style: { width: "10%" }
    }
  }
];

const statusFilters = [
  {
    name: "Completed",
    key: "flagRead",
    selected: false
  },
  {
    name: "Currently Reading",
    key: "flagCurrentlyReading",
    selected: false
  },
  {
    name: "Want to Read",
    key: "flagWantToRead",
    selected: false
  },
  {
    name: "Partially Read",
    key: "flagPartiallyRead",
    selected: false
  }
];

const ownershipFilters = [
  {
    name: "Print",
    key: "ownPrint",
    selected: false
  },
  {
    name: "Kindle",
    key: "ownKindle",
    selected: false
  },
  {
    name: "PDF",
    key: "ownPDF",
    selected: false
  },
  {
    name: "Audible",
    key: "ownAudible",
    selected: false
  },
  {
    name: "Other Audio",
    key: "ownOtherAudio",
    selected: false
  }
];

export default Home;
