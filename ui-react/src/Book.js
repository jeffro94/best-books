import React, { Component } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import './Home.css';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      yearPublished: "",
      yearRevised: "",
      book: { }
    };
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;

    fetch(`https://localhost:44344/api/books/${bookId}`)
      .then(response => response.json())
      .then((result) => {
        this.setState({
          book: result,
          title: result.title,
          author: result.author,
          yearPublished: result.yearPublished || "",
          yearRevised: result.yearRevised || ""
        });
      });
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        <h1><a href="/">Best Books!</a></h1>
        <form className="mt-3">
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
        </form>
      </div>
    );
  }
}


export default Book;
