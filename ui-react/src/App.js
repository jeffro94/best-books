import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import "./App.css";

import { PrivateRoute } from "./_components/PrivateRoute";
import { Role } from "./_helpers";
import { authenticationService } from "./_services";

import Index from "./Index/Index";
import AddBook from "./Add/AddBook";
import EditBook from "./Edit/EditBook";
import Login from "./Login/Login";
import Next from "./Next/Next";
import Register from "./Register/Register";
import Visuals from "./Visuals/Visuals";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      isAdmin: false,
      isDemo: false
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x,
      isAdmin: x && x.role === Role.Admin,
      isDemo: x && x.role === Role.Demo
    }));
  }

  render() {
    return (
      <Router>
        <div>
          <header>
            <BooksNavBar currentUser={ this.state.currentUser } />
          </header>
          <main className="pb-4">
            <Container>
              { process.env.REACT_APP_DEMO_MODE !== "false" &&
              <Alert variant="warning">
                <em>Note: This application is in read-only demo mode. Updates are not allowed but have a look around!</em> 
              </Alert> }
              <PrivateRoute exact path="/" component={ Index } currentUser={ this.state.currentUser } />
              <PrivateRoute path="/add" component={ AddBook } currentUser={ this.state.currentUser } />
              <PrivateRoute path="/edit/:bookId" component={ EditBook } currentUser={ this.state.currentUser } />
              <PrivateRoute path="/next" component={ Next } currentUser={ this.state.currentUser } />
              <PrivateRoute path="/visuals" component={ Visuals } currentUser={ this.state.currentUser } />
              <Route path="/register" component={ Register } />
              <Route path="/login" component={ Login } />
            </Container>
          </main>
          <footer className="border-top footer text-muted">
            <div className="container">
                © 2019 - J. Ross - <a href="https://github.com/jeffro94/best-books">GitHub</a>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
}

const BooksNavBar = withRouter(props => {
  function logout() {
    authenticationService.logout();
    props.history.push('/login');
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <div className="d-flex align-items-center">
              <img
                src="/images/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top mr-2"
                alt="Best Books logo"
              />
              Best Books!
            </div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
          { props.currentUser && 
            <>
              <NavLink exact to="/" className="nav-link" >Index</NavLink>
              <NavLink to="/add" className="nav-link" >Add a Book</NavLink>
              <NavLink to="/next" className="nav-link" >Up Next</NavLink>
              <NavLink to="/visuals" className="nav-link" >Visualizations</NavLink>
            </> }
          </Nav>
          <Nav>
            { props.currentUser ?
            <button type="button"onClick={ logout } className="nav-link btn btn-link">Logout</button> :
            <>
              <NavLink to="/register" className="nav-link">Register</NavLink>
              <NavLink to="/login" className="nav-link">Login</NavLink>
            </> }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
});

export default App;
