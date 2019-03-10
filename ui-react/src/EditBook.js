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
import ExternalLinks from './Components/ExternalLinks.js';
import BookFormFields, { getEmptyBook } from './Components/BookFormFields.js';
import './EditBook.css';

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

  handleUserInput(e) {
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

  handleSubmit(e) {
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
        <h1><a href="/">Best Books!</a></h1>
        <div className="row">
          <div className="col-sm-11">
            <form className="mt-3" onSubmit={ (e) => this.handleSubmit(e) }>
              <BookFormFields book={ this.state.book } onChange={ (e) => this.handleUserInput(e) } />
              <div className="form-group row">
                <div className="col-sm-10 offset-sm-2">
                  <button type="submit" className="btn btn-primary">Save</button>
                  <span id="successMessage" className="alert alert-success ml-2" role="alert" style={ { opacity: this.state.showSuccessMessage ? 100 : 0 } }>Saved succesfully!</span>
                </div>
              </div>
            </form>
          </div>
          <div id="externalNav" className="col-sm-1">
            <ExternalLinks book={ this.state.book } />
          </div>
        </div>
      </div>
    );
  }
}

export default EditBook;
