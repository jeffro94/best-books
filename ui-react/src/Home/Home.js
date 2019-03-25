import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Collapse } from "react-bootstrap";
import "./Home.css";
import { USER_ID } from "../Constants";
import { TableColumns } from "./HomeConfig"
import { StatusFilters, OwnershipFilters} from "./FiltersConfig"
import { Filter, TagFilter } from "./Filters";

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
      lastSort: "",
      columns: TableColumns,
      filters: [
        {
          category: "Status",
          options: StatusFilters,
          enabled: false
        },
        {
          category: "Ownership",
          options: OwnershipFilters,
          enabled: false
        }
      ],
      tagFilters: []
    };
  }

  componentDidMount() {
    fetch(`https://localhost:44344/api/books/userId/${ USER_ID }`)
      .then(response => response.json())
      .then(result => {
        this.setState({
          books: result
        });
      });
  }

  sortColumns(bookPropertyName) {
    const books = this.state.books.slice();

    let sortOrder;

    // if we are re-sorting on the same column, reverse the direction. otherwise use
    // the default sort order for the selected column
    //
    if (this.state.lastSort === bookPropertyName) {
      sortOrder = (this.state.sortOrder === "asc") ? "desc" : "asc";
    }
    else {
      sortOrder = this.state.columns.find(col => col.key === bookPropertyName).defaultSort;
    }

    books.sort((a,b) => {
      if (sortOrder === "asc") {
        return (a[bookPropertyName] > b[bookPropertyName]) ? 1 : -1;
      }
      else {
        return (a[bookPropertyName] > b[bookPropertyName]) ? -1 : 1;
      }
    });

    this.setState({
      books,
      sortOrder,
      lastSort: bookPropertyName
    });
  }

  // using public class fields syntax to bind 'this' to the class
  //   https://reactjs.org/docs/handling-events.html
  //
  handleColumnChange = (e) => {
    let updatedColumns = [];
    Object.assign(updatedColumns, this.state.columns);

    // toggle the selected value
    updatedColumns.find(c => c.key === e.target.id).selected = e.target.checked;
    
    this.setState({ columns: updatedColumns });
  }

  handleFilterChange = (e) => {
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

  setFilterEnabledStatus = (filterCategory, value) => {
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

  handleTagFilterChange = (e) => {
    let updatedTagFilters = this.state.tagFilters.slice();

    const filterKey = e.target.attributes["data-filter-value"].value;
    const filterValue = e.target.checked;

    if (filterValue) {
      updatedTagFilters.push(filterKey); // add the new value
    }
    else {
      updatedTagFilters = updatedTagFilters.filter(e => e !== filterKey ); // remove the value
    }

    this.setState({ tagFilters: updatedTagFilters });
  }

  clearTagFilters = () => {
    this.setState({ tagFilters: [] });
  }

  render() {
    const { books, columns, filters, tagFilters } = this.state;

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
    Object.assign(filteredBooks, books);

    const statusFilter = filters.find(f => f.category === "Status");
    const ownershipFilter = filters.find(f => f.category === "Ownership");

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

    if (tagFilters.length > 0) {
      // https://stackoverflow.com/questions/16312528/check-if-an-array-contains-any-element-of-another-array-in-javascript
      //
      filteredBooks = filteredBooks.filter(book => book.tags && book.tags.split(",").some( t => tagFilters.includes(t) ));
    }

    const tableRows = filteredBooks.map(book => 
      <BookTableRow key={ book.bookId } book={ book } columns={ columns } />
    );

    return (
      <div>
        <SettingsComponent 
          columns={ columns } onColumnChange={ this.handleColumnChange } 
          filters={ filters } onFilterChange={ this.handleFilterChange } 
          setFilterEnabledStatus={ this.setFilterEnabledStatus } 
          tagFilters={ tagFilters } onTagFilterChange={ this.handleTagFilterChange }
          clearTagFilters= { this.clearTagFilters } />
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

const BookTableRow = props => {
  const cols = props.columns.filter(c => c.selected).map(c => (
    <td 
      key ={ c.key } {...c.attributes}
      title={ c.showTitle ? props.book[c.key] : undefined }
    >
      { c.key === "title" ?
        <Link to={ `/edit/${ props.book.bookId }` }>{ props.book[c.key] }</Link> :
        c.transform ? c.transform(props.book[c.key]) : props.book[c.key] }
    </td>
  ));

  return <tr>{ cols }</tr>;
};

class SettingsComponent extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {
    const { open } = this.state;

    return (
      <div>
        <div className="settings-card card">
          <div className="card-header">
              <span role="img" title="Open Settings" 
                aria-label="Open Settings"
                aria-controls="example-collapse-text2"
                aria-expanded={ open }
                onClick={() => this.setState({ open: !open })}
              >⚙️</span>
          </div>
          <Collapse in={ open }>
            <div id="example-collapse-text2">
              <div className="card-body row">
                <div className="col-lg-6">
                  <ColumnSettingsComponent columns={ this.props.columns } onColumnChange={ this.props.onColumnChange }/>
                </div>
                <div className="col-lg-6">
                  <h4>Filter</h4>
                  <Filter
                    categoryName="Status" options={ this.props.filters.find(f => f.category === "Status").options } 
                    enabled={ this.props.filters.find(f => f.category === "Status").enabled } 
                    setFilterEnabledStatus={ this.props.setFilterEnabledStatus } onFilterChange={ this.props.onFilterChange } />
                  <Filter 
                    categoryName="Ownership" options={ this.props.filters.find(f => f.category === "Ownership").options } 
                    enabled={ this.props.filters.find(f => f.category === "Ownership").enabled } 
                    setFilterEnabledStatus={ this.props.setFilterEnabledStatus } onFilterChange={ this.props.onFilterChange } />
                  <TagFilter enabled={ this.props.tagFilters.length > 0 } selected={ this.props.tagFilters } 
                    onChange={ this.props.onTagFilterChange } clearTagFilters={ this.props.clearTagFilters } />
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


export default Home;