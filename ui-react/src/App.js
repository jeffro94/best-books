import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Container } from 'react-bootstrap';
import './App.css';
import Home from './Home.js';
import AddBook from './AddBook';
import EditBook from './EditBook';
import Visuals from './Visuals';
import { Navbar, Nav } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <BooksNavBar />
          <Container>
            <Route exact path="/" component={ Home } />
            <Route path="/add" component={ AddBook } />
            <Route path="/edit/:bookId" component={ EditBook } />
            <Route path="/visuals" component={ Visuals } />
          </Container>
        </div>
      </Router>
    );
  }
}

const BooksNavBar = withRouter(props => (
  <Navbar bg="dark" variant="dark" className="mb-4">
    <Link to="/">
      <Navbar.Brand>
        <img
          src="/images/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top mr-2"
          alt="Best Books logo"
        />
        Best Books!
      </Navbar.Brand>
    </Link>
    <Nav className="mr-auto">
      <Link to="/" className={`nav-link ${ props.location.pathname === "/" ? "active" : "" }`}>Home</Link>
      <Link to="/add" className={`nav-link ${ props.location.pathname === "/add" ? "active" : "" }`}>Add a Book</Link>
      <Link to="/visuals" className={`nav-link ${ props.location.pathname === "/visuals" ? "active" : "" }`}>Visualizations</Link>
    </Nav>
  </Navbar>
));

export default App;
