import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from 'react-bootstrap';
import './App.css';
import Home from './Home.js';
import AddBook from './AddBook.js';
import EditBook from './EditBook.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Container>
            <Route exact path="/" component={ Home } />
            <Route path="/add" component={ AddBook } />
            <Route path="/edit/:bookId" component={ EditBook } />
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;
