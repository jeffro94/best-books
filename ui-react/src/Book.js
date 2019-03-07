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
import './Home.css';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookId: props.match.params.bookId,
      book: getEmptyBook()
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0); // fix scrolling; scroll to top on mount

    fetch(`https://localhost:44344/api/books/${this.state.bookId}`)
      .then(response => response.json())
      .then(result => {
        // set any null fields to empty string..
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
    console.log("submitted");
    return;
  }

  render() {
    return (
      <div>
        <h1><a href="/">Best Books!</a></h1>
        <form className="mt-3" onSubmit={ this.handleSubmit }>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="title" 
                  value={ this.state.book.title } onChange={ (e) => this.handleUserInput(e) } />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Author</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" id="author" 
                  value={ this.state.book.author } onChange={ (e) => this.handleUserInput(e) } />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="yearPublished" className="col-sm-2 col-form-label">Year Published</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="yearPublished" 
                value={ this.state.book.yearPublished } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
            <label htmlFor="yearRevised" className="col-sm-2 col-form-label">Year Revised</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="yearRevised" 
                value={ this.state.book.yearRevised } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="goodReadsID" className="col-sm-2 col-form-label">GoodReads ID</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="goodReadsID" 
                value={ this.state.book.goodReadsID } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
            <label htmlFor="asin" className="col-sm-2 col-form-label">ASIN</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" id="asin" 
                value={ this.state.book.asin } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="wikipediaURL" className="col-sm-2 col-form-label">Wikipedia URL</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="wikipediaURL" 
                value={ this.state.book.wikipediaURL } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="whereHeardAbout" className="col-sm-2 col-form-label">Where I heard about it</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="whereHeardAbout" 
                value={ this.state.book.whereHeardAbout } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="whenHeardAbout" className="col-sm-2 col-form-label">When I heard about it</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="whenHeardAbout" 
                value={ this.state.book.whenHeardAbout } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="notes" className="col-sm-2 col-form-label">Notes</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="notes" rows="3"
                value={ this.state.book.notes } onChange={ (e) => this.handleUserInput(e) }></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="categories" className="col-sm-2 col-form-label">Categories</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="categories" 
                value={ this.state.book.categories } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="wantToReadScore" className="col-sm-2 col-form-label">Want-to-Read Score</label>
            <div className="col-sm-10">
              <input type="number" min="1" max="5" step="1" className="form-control" id="wantToReadScore" 
                value={ this.state.book.wantToReadScore } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2 col-form-label">Reading Flags</div>
            <div className="col-sm-4">
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="flagRead" 
                    checked={ this.state.book.flagRead } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagRead">Read</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="flagCurrentlyReading" 
                    checked={ this.state.book.flagCurrentlyReading } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagCurrentlyReading">Currently Reading</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="flagPartiallyRead" 
                    checked={ this.state.book.flagPartiallyRead } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagPartiallyRead">Partially Read</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="flagWantToRead" 
                    checked={ this.state.book.flagWantToRead } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagWantToRead">Want to Read</label>
                </div>
              </div>
            <div className="col-sm-2 col-form-label">Ownership Flags</div>
            <div className="col-sm-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ownPrint" 
                  checked={ this.state.book.wnPrint } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownPrint">Print</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ownKindle" 
                  checked={ this.state.book.ownKindle } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownKindle">Kindle</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ownKindleSample" 
                  checked={ this.state.book.wnKindleSample } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownKindleSample">Kindle Sample</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ownAudible" 
                  checked={ this.state.book.ownAudible } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownAudible">Audible</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ownPDF" 
                  checked={ this.state.book.ownPDF } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownPDF">PDF</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="ownOtherAudio" 
                  checked={ this.state.book.ownOtherAudio } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownOtherAudio">Other Audio</label>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-10 offset-sm-2">
              <button type="submit" className="btn btn-primary">Save</button>
              <span id="successMessage" className="alert alert-success ml-2" role="alert" style={ { opacity: 0 } }>Saved succesfully!</span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

function getEmptyBook() {
  return {
    title: "",
    author: "",
    yearPublished: "",
    yearRevised: "",
    whereHeardAbout: "",
    whenHeardAbout: "",
    asin: "",
    goodReadsID: "",
    wikipediaURL: "",
    notes: "",
    categories: "",
    wantToReadScore: "",
    flagRead: false,
    flagCurrentlyReading: false,
    flagPartiallyRead: false,
    flagWantToRead: false,
    ownPrint: false,
    ownKindle: false,
    ownKindleSample: false,
    ownPDF: false,
    ownAudible: false,
    ownOtherAudio: false
  };
}

export default Book;
