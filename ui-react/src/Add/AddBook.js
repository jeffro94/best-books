/*
 * This form uses the "Controlled Components" pattern, as described
 * in the React docs at https://reactjs.org/docs/forms.html.
 * 
 * This form has no client-side validation. In a more robust application,
 * I would like to use something like Formik: https://jaredpalmer.com/formik/,
 * promising the ability to "Build forms in React, without tears". 
 * 
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import BookFormFields, { getEmptyBook } from "../_components/BookFormFields";
import "./AddBook.css";
import { userService, bookService } from "../_services";
import GoodreadsLookup from "./GoodreadsLookup";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: getEmptyBook()
    };
  }

  componentDidMount() {
    document.title = "Best Books! - Add";

    // fix scrolling; scroll to top on mount.
    //   ref: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    //
    window.scrollTo(0, 0);  
  }

  handleUserInputForBook = (e) => {
    const id = e.target.id;
    let value;

    switch (e.target.type) {
      case("checkbox"):
        value = Boolean(e.target.checked);
        break;
      case("number"):
        value = e.target.value ? Number(e.target.value) : ""; // allow null values for number fields
        break;
      default:
        value = e.target.value;
    }

    // create a copy of the existing book state (don't mutate state)
    const updatedBook = {};
    Object.assign(updatedBook, this.state.book);

    // update the desired property
    updatedBook[id] = value;

    this.setState({ book: updatedBook });
  }

  handleTagChange = (e) => {
    const newBook = {};
    Object.assign(newBook, this.state.book);

    // the Typeahead component adds any custom new selections as objects, 
    // so we need to convert it back to a string
    //
    const newTags = e.map(selection => (typeof selection === "object") ? selection.label : selection);

    // sort tags in alphabetical order. why is sorting so complicated?
    // https://stackoverflow.com/questions/8996963/how-to-perform-case-insensitive-sorting-in-javascript
    //
    newTags.sort((a, b) => a.localeCompare(b, undefined, {sensitivity: 'base'})); 
    newBook.tags = newTags.join(",");

    this.setState({
      book: newBook
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const data = this.state.book;
    
    data.userId = this.props.currentUser.userId;

    bookService.addBook(this.state.book)
      .then(result => {
        // redirect to the edit page with the new ID right away
        this.props.history.push(`/edit/${result.bookId}`);
      })
      .catch(error => console.error("Error on create: ", error));

  }

  grSearch(grID) {
    fetch(`https://books.jeffro.xyz/api/gr-lookup/book/${ grID }`)
      .then(response => response.json())
      .then(result => {
        // create a copy of the existing book state (don't mutate state)
        const updatedBook = {};
        Object.assign(updatedBook, this.state.book);

        updatedBook.title = result.gR_Title ? result.gR_Title : updatedBook.title;
        updatedBook.author = result.gR_Author ? result.gR_Author : updatedBook.author;
        updatedBook.yearPublished = result.gR_OriginalPublicationYear ? result.gR_OriginalPublicationYear : updatedBook.yearPublished;
        updatedBook.goodReadsID = result.gR_Id ? result.gR_Id : updatedBook.goodReadsID;
        updatedBook.asin = result.asin ? result.asin : updatedBook.asin;

        this.setState({ book: updatedBook });
      });
  }

  render() {
    return (
      <div className="add-book">
        <GoodreadsLookup grSearch={ (grID) => this.grSearch(grID) } />
        <form className="mt-3" onSubmit={ this.handleSubmit }>
          <BookFormFields currentUser={ this.props.currentUser } book={ this.state.book } onChange={ this.handleUserInputForBook } onTagChange={ this.handleTagChange } />
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary" disabled={ userService.isDemoUser(this.props.currentUser) }>Save</button>
              <span id="successMessage" className="alert alert-success ml-2" role="alert" style={ { opacity: this.state.showSuccessMessage ? 100 : 0 } }>Saved succesfully!</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(AddBook);
