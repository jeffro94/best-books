import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import "./App.css";
import Home from "./Home/Home";
import AddBook from "./Add/AddBook";
import EditBook from "./Edit/EditBook";
import Next from "./Next/Next";
import Visuals from "./Visuals/Visuals";
import { DEMO_MODE } from "./Constants";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <BooksNavBar />
          <Container>
            { DEMO_MODE &&
            <Alert variant="warning">
              <em>Note: This application is in read-only demo mode. Updates are not allowed but have a look around!</em> 
            </Alert> }
            <Route exact path="/" component={ Home } />
            <Route path="/add" component={ AddBook } />
            <Route path="/edit/:bookId" component={ EditBook } />
            <Route path="/next" component={ Next } />
            <Route path="/visuals" component={ Visuals } />
          </Container>
        </div>
      </Router>
    );
  }
}

const BooksNavBar = withRouter(props => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
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
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Link to="/" className={`nav-link ${ props.location.pathname === "/" ? "active" : "" }`}>Home</Link>
        <Link to="/add" className={`nav-link ${ props.location.pathname === "/add" ? "active" : "" }`}>Add a Book</Link>
        <Link to="/next" className={`nav-link ${ props.location.pathname === "/next" ? "active" : "" }`}>Up Next</Link>
        <Link to="/visuals" className={`nav-link ${ props.location.pathname === "/visuals" ? "active" : "" }`}>Visualizations</Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
));

export default App;
