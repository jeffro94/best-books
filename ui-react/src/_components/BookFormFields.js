import React from "react";
import TagManager from "./TagManager"

const BookFormFields = (props) => (
  <div>
    <div className="form-group row">
      <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
      <div className="col-sm-10">
          <input type="text" className="form-control" id="title" 
            value={ props.book.title } onChange={ (e) => props.onChange(e) } />
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="title" className="col-sm-2 col-form-label">Author</label>
      <div className="col-sm-10">
          <input type="text" className="form-control" id="author" 
            value={ props.book.author } onChange={ (e) => props.onChange(e) } />
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="yearPublished" className="col-sm-2 col-form-label">Year Published</label>
      <div className="col-sm-4">
        <input type="text" className="form-control" id="yearPublished" 
          value={ props.book.yearPublished } onChange={ (e) => props.onChange(e) }/>
      </div>
      <label htmlFor="yearRevised" className="col-sm-2 col-form-label">Year Revised</label>
      <div className="col-sm-4">
        <input type="text" className="form-control" id="yearRevised" 
          value={ props.book.yearRevised } onChange={ (e) => props.onChange(e) }/>
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="goodReadsID" className="col-sm-2 col-form-label">GoodReads ID</label>
      <div className="col-sm-4">
        <input type="text" className="form-control" id="goodReadsID" 
          value={ props.book.goodReadsID } onChange={ (e) => props.onChange(e) }/>
      </div>
      <label htmlFor="asin" className="col-sm-2 col-form-label">ASIN</label>
      <div className="col-sm-4">
        <input type="text" className="form-control" id="asin" 
          value={ props.book.asin } onChange={ (e) => props.onChange(e) }/>
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="wikipediaURL" className="col-sm-2 col-form-label">Wikipedia URL</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="wikipediaURL" 
          value={ props.book.wikipediaURL } onChange={ (e) => props.onChange(e) }/>
      </div>
    </div>
    <TagManager currentUser={ props.currentUser } tags={ props.book.tags ? props.book.tags.split(",") : [] } onChange={ props.onTagChange } />
    <div className="form-group row">
      <label htmlFor="whereHeardAbout" className="col-sm-2 col-form-label">Where I heard about it</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="whereHeardAbout" 
          value={ props.book.whereHeardAbout } onChange={ (e) => props.onChange(e) }/>
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="whenHeardAbout" className="col-sm-2 col-form-label">When I heard about it</label>
      <div className="col-sm-10">
        <input type="text" className="form-control" id="whenHeardAbout" 
          value={ props.book.whenHeardAbout } onChange={ (e) => props.onChange(e) }/>
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="notes" className="col-sm-2 col-form-label">Notes</label>
      <div className="col-sm-10">
        <textarea className="form-control" id="notes" rows="3"
          value={ props.book.notes } onChange={ (e) => props.onChange(e) }></textarea>
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="wantToReadScore" className="col-sm-2 col-form-label">Want-to-Read Score</label>
      <div className="col-sm-10">
        <input type="number" min="1" max="5" step="1" className="form-control" id="wantToReadScore" 
          value={ props.book.wantToReadScore } onChange={ (e) => props.onChange(e) }/>
      </div>
    </div>
    <div className="form-group row">
      <div className="col-sm-2 col-form-label">Reading Flags</div>
      <div className="col-sm-4">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="flagRead" 
            checked={ props.book.flagRead } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="flagRead">Read</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="flagCurrentlyReading" 
            checked={ props.book.flagCurrentlyReading } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="flagCurrentlyReading">Currently Reading</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="flagPartiallyRead" 
            checked={ props.book.flagPartiallyRead } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="flagPartiallyRead">Partially Read</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="flagWantToRead" 
            checked={ props.book.flagWantToRead } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="flagWantToRead">Want to Read</label>
        </div>
      </div>
      <div className="col-sm-2 col-form-label">Ownership Flags</div>
      <div className="col-sm-4">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ownPrint" 
            checked={ props.book.ownPrint } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="ownPrint">Print</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ownKindle" 
            checked={ props.book.ownKindle } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="ownKindle">Kindle</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ownKindleSample" 
            checked={ props.book.ownKindleSample } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="ownKindleSample">Kindle Sample</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ownAudible" 
            checked={ props.book.ownAudible } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="ownAudible">Audible</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ownPDF" 
            checked={ props.book.ownPDF } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="ownPDF">PDF</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="ownOtherAudio" 
            checked={ props.book.ownOtherAudio } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="ownOtherAudio">Other Audio</label>
        </div>
        <div className={ `form-check ${ process.env.REACT_APP_PRIVATE_MODE !== "false" ? "d-none" : "" }` }>
          <input className="form-check-input" type="checkbox" id="private" 
            checked={ props.book.private } onChange={ (e) => props.onChange(e) }/>
          <label className="form-check-label" htmlFor="private">Private</label>
        </div>
      </div>
    </div>
  </div>
);

const getEmptyBook = () => ({
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
  private: false
});

export default BookFormFields;

export { getEmptyBook };
