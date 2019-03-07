import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './Home.css';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = getEmptyState();
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;

    fetch(`https://localhost:44344/api/books/${bookId}`)
      .then(response => response.json())
      .then(result => this.setState(getStateFromBookResponse(result)));
  } 

  handleUserInput(e) {
    const name = e.target.name;
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

    this.setState({
      [name]: value
    });
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
                <input type="text" className="form-control" name="title" 
                  value={ this.state.title } onChange={ (e) => this.handleUserInput(e) } />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="title" className="col-sm-2 col-form-label">Author</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" name="author" 
                  value={ this.state.author } onChange={ (e) => this.handleUserInput(e) } />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="yearPublished" className="col-sm-2 col-form-label">Year Published</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" name="yearPublished" 
                value={ this.state.yearPublished } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
            <label htmlFor="yearRevised" className="col-sm-2 col-form-label">Year Revised</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" name="yearRevised" 
                value={ this.state.yearRevised } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="goodReadsID" className="col-sm-2 col-form-label">GoodReads ID</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" name="goodReadsID" 
                value={ this.state.goodReadsID } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
            <label htmlFor="asin" className="col-sm-2 col-form-label">ASIN</label>
            <div className="col-sm-4">
              <input type="text" className="form-control" name="asin" 
                value={ this.state.asin } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="wikipediaURL" className="col-sm-2 col-form-label">Wikipedia URL</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="wikipediaURL" 
                value={ this.state.wikipediaURL } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="whereHeardAbout" className="col-sm-2 col-form-label">Where I heard about it</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="whereHeardAbout" 
                value={ this.state.whereHeardAbout } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="whenHeardAbout" className="col-sm-2 col-form-label">When I heard about it</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="whenHeardAbout" 
                value={ this.state.whenHeardAbout } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="notes" className="col-sm-2 col-form-label">Notes</label>
            <div className="col-sm-10">
              <textarea className="form-control" name="notes" rows="3"
                value={ this.state.notes } onChange={ (e) => this.handleUserInput(e) }></textarea>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="categories" className="col-sm-2 col-form-label">Categories</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" name="categories" 
                value={ this.state.categories } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="wantToReadScore" className="col-sm-2 col-form-label">Want-to-Read Score</label>
            <div className="col-sm-10">
              <input type="number" min="1" max="5" step="1" className="form-control" name="wantToReadScore" 
                value={ this.state.wantToReadScore } onChange={ (e) => this.handleUserInput(e) }/>
            </div>
          </div>
          <div className="form-group row">
            <div className="col-sm-2 col-form-label">Reading Flags</div>
            <div className="col-sm-4">
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="flagRead" 
                    checked={ this.state.flagRead } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagRead">Read</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="flagCurrentlyReading" 
                    checked={ this.state.flagCurrentlyReading } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagCurrentlyReading">Currently Reading</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="flagPartiallyRead" 
                    checked={ this.state.flagPartiallyRead } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagPartiallyRead">Partially Read</label>
              </div>
              <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="flagWantToRead" 
                    checked={ this.state.flagWantToRead } onChange={ (e) => this.handleUserInput(e) }/>
                  <label className="form-check-label" htmlFor="flagWantToRead">Want to Read</label>
                </div>
              </div>
            <div className="col-sm-2 col-form-label">Ownership Flags</div>
            <div className="col-sm-4">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="ownPrint" 
                  checked={ this.state.ownPrint } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownPrint">Print</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="ownKindle" 
                  checked={ this.state.ownKindle } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownKindle">Kindle</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="ownKindleSample" 
                  checked={ this.state.ownKindleSample } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownKindleSample">Kindle Sample</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="ownAudible" 
                  checked={ this.state.ownAudible } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownAudible">Audible</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="ownPDF" 
                  checked={ this.state.ownPDF } onChange={ (e) => this.handleUserInput(e) }/>
                <label className="form-check-label" htmlFor="ownPDF">PDF</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" name="ownOtherAudio" 
                  checked={ this.state.ownOtherAudio } onChange={ (e) => this.handleUserInput(e) }/>
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

function getEmptyState() {
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
    ownOtherAudio: false,
    book: {}
  };
}

function getStateFromBookResponse(response) {
  return {
    book: response,
    title: response.title || "",
    author: response.author || "",
    yearPublished: response.yearPublished || "",
    yearRevised: response.yearRevised || "",
    whereHeardAbout: response.whereHeardAbout || "",
    whenHeardAbout: response.whenHeardAbout || "",
    asin: response.asin || "",
    goodReadsID: response.goodReadsID || "",
    wikipediaURL: response.wikipediaURL || "",
    notes: response.notes || "",
    categories: response.categories || "",
    wantToReadScore: response.wantToReadScore || "",
    flagRead: Boolean(response.flagRead),
    flagCurrentlyReading: Boolean(response.flagCurrentlyReading),
    flagPartiallyRead: Boolean(response.flagPartiallyRead),
    flagWantToRead: Boolean(response.flagWantToRead),
    ownPrint: Boolean(response.ownPrint),
    ownKindle: Boolean(response.ownKindle),
    ownKindleSample: Boolean(response.ownKindleSample),
    ownPDF: Boolean(response.ownPDF),
    ownAudible: Boolean(response.ownAudible),
    ownOtherAudio: Boolean(response.ownOtherAudio)
  };
}

function getBookRequestFromState(state) {
  const book = {};

  Object.assign(book, state.book); // copy the previous version of the book in state to a new object

  book.title = state.title;
  book.author = state.author;
  book.yearPublished = state.yearPublished;
  book.yearRevised = state.yearRevised;
  book.whereHeardAbout = state.whereHeardAbout;
  book.whenHeardAbout = state.whenHeardAbout;
  book.asin = state.asin;
  book.goodReadsID = state.goodReadsID;
  book.wikipediaURL = state.wikipediaURL;
  book.notes = state.notes;
  book.categories = state.categories;
  book.wantToReadScore = state.wantToReadScore;
  book.flagRead = state.flagRead;
  book.flagCurrentlyReading = state.flagCurrentlyReading;
  book.flagPartiallyRead = state.flagPartiallyRead;
  book.flagWantToRead = state.flagWantToRead;
  book.ownPrint = state.ownPrint;
  book.ownKindle = state.ownKindle;
  book.ownKindleSample = state.ownKindleSample;
  book.ownPDF = state.ownPDF;
  book.ownAudible = state.ownAudible;
  book.ownOtherAudio = state.ownOtherAudio;
  
  return book;
}

export default Book;
