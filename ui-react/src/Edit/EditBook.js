/*
 * This form uses the "Controlled Components" pattern, as described
 * in the React docs at https://reactjs.org/docs/forms.html.
 * 
 * This form has no client-side validation. In a more robust application,
 * I would like to use something like Formik: https://jaredpalmer.com/formik/,
 * promising the ability to "Build forms in React, without tears". 
 * 
 */

import React, { Component } from 'react';
import ExternalLinks from './ExternalLinks';
import BookFormFields, { getEmptyBook } from "../SharedComponents/BookFormFields";
import "./EditBook.css";
import { DEMO_MODE } from "../Constants";

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: props.match.params.bookId,
      book: getEmptyBook(),
      showSuccessMessage: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0); // fix scrolling; scroll to top on mount. ref: https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md

    fetch(`https://localhost:44344/api/books/${this.state.bookId}`)
      .then(response => response.json())
      .then(result => {
        // set any null fields to empty string..
        // ref: https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members
        //
        Object.keys(result).forEach(key => {
          if (result[key] === null) result[key] = "";
        });

        this.setState({ book: result });
      });
  } 

  handleUserInput = (e) => {
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

    const data = this.state.book; // do I need to modify this somehow b4 submitting? dealing w/ null, empty strings...

    fetch(`https://localhost:44344/api/books/${this.state.bookId}`, {
      method: "PUT",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' }
    })
    .then(res => {
      // show the success message, then hide it after 2 seconds
      this.setState({ showSuccessMessage: true });
      setTimeout(() => this.setState({ showSuccessMessage: false }), 2000);
    })
    .catch(error => console.error("Error:", error));

  }

  render() {
    return (
      <div>
        <div className="row mt-3">
          <div className="col-sm-10">
            <form onSubmit={ this.handleSubmit }>
              <BookFormFields book={ this.state.book } onChange={ this.handleUserInput } onTagChange={ this.handleTagChange } />
              <div className="form-group row">
                <div className="col-sm-10 offset-sm-2">
                  <button type="submit" className="btn btn-primary" disabled={ DEMO_MODE }>Save</button>
                  <span id="successMessage" className="alert alert-success ml-2" role="alert" style={ { opacity: this.state.showSuccessMessage ? 100 : 0 } }>Saved succesfully!</span>
                </div>
              </div>
            </form>
          </div>
          <div id="externalNav" className="col-sm-2">
            <div>
              <img src={ this.state.book.gR_ImageUrlLarge } alt="Cover" width="200px" />
            </div>
            <ExternalLinks book={ this.state.book } />
          </div>
        </div>
      </div>
    );
  }
}

export default EditBook;
