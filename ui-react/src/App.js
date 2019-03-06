import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';
import './App.css';
import Home from './Home.js';
import Book from './Book.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Container>
            <Home />
            <Link to="/book">Topics</Link>
          </Container>
          <Route exact path="/" component={ Home } />
          <Route path="/book" component={ Book } />
        </div>
      </Router>
    );
  }
}

export default App;
