import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import "./Home.css";
import { TableColumns } from "./HomeConfig";
import TableSettings from "./TableSettings";
import { StatusFilters, OwnershipFilters} from "./FiltersConfig"
import { bookService } from "../_services";

class Home extends Component {
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
      tagFilters: [],
      availableTags: []
    };
  }

  componentDidMount() {
    document.title = "Best Books! - Home";

    if (this.props.currentUser) {
      this.getBooks();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && this.props.currentUser !== prevProps.currentUser) {
      this.getBooks();
    }
  }

  getBooks() {
    bookService.getAllByUserId(this.props.currentUser.userId)
      .then(result => {
        this.setState({
          books: result,
          lastSort: "title",
          sortOrder: "asc",
          availableTags: Array.from(new Set(result.reduce((tags, book) => book.tags ? tags.concat(book.tags.split(",")) : tags, []))).sort()
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

    // cover image required specialized sort algorithm
    if (bookPropertyName === "coverImage") {
      books.sort((a,b) => {
        if (sortOrder === "asc") {
          if ((a.gR_ImageUrlLarge || a.gR_ImageUrlSmall) && !(b.gR_ImageUrlLarge || b.gR_ImageUrlSmall)) return 1;
          if (!(a.gR_ImageUrlLarge || a.gR_ImageUrlSmall) && (b.gR_ImageUrlLarge || b.gR_ImageUrlSmall)) return -1;
          else return 0;
        }
        else {
          if ((a.gR_ImageUrlLarge || a.gR_ImageUrlSmall) && !(b.gR_ImageUrlLarge || b.gR_ImageUrlSmall)) return -1;
          if (!(a.gR_ImageUrlLarge || a.gR_ImageUrlSmall) && (b.gR_ImageUrlLarge || b.gR_ImageUrlSmall)) return 1;
          else return 0;
        }
      });
    }
    else {
      books.sort((a,b) => {
        if (sortOrder === "asc") {
          return (a[bookPropertyName] > b[bookPropertyName]) ? 1 : -1;
        }
        else {
          return (a[bookPropertyName] > b[bookPropertyName]) ? -1 : 1;
        }
      });
    }

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
        <TableSettings 
          columns={ columns } onColumnChange={ this.handleColumnChange } 
          filters={ filters } onFilterChange={ this.handleFilterChange } 
          setFilterEnabledStatus={ this.setFilterEnabledStatus } 
          tagFilters={ tagFilters } onTagFilterChange={ this.handleTagFilterChange }
          clearTagFilters={ this.clearTagFilters } availableTags={ this.state.availableTags } />
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
        { (filteredBooks.length === 0) &&
          <p className="text-center"><em>No books match the current filters.</em> <Link to="/add">Add a new book</Link></p>
        }
      </div>
    );
  }
}

const BookTableRow = props => {
  const result = [];
  const cols = props.columns.filter(c => c.selected)
  
  cols.forEach(c => {
    let inner;

    switch (c.key) {
      case "title":
        inner = <Link to={ `/edit/${ props.book.bookId }` }>{ props.book[c.key] }</Link>;
        break;
      case "coverImage":
        const imgUrl = props.book.gR_ImageUrlSmall || props.book.gR_ImageUrlLarge || "https://s.gr-assets.com/assets/nophoto/book/50x75-a91bf249278a81aabab721ef782c4a74.png";
        inner = <img src={ imgUrl } alt="Cover" width="50px" />;
        break;
      default:
        inner = c.transform ? c.transform(props.book[c.key]) : props.book[c.key];
    }

    result.push( 
      <td 
        key ={ c.key } {...c.attributes}
        title={ c.showTitle ? props.book[c.key] : undefined }
      >
        { inner }
      </td>
    );
  });

  return <tr>{ result }</tr>;
};


export default Home;
