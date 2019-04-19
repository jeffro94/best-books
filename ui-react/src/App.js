import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from "react-router-dom";
import { Navbar, Nav, Container, Alert } from "react-bootstrap";
import "./App.css";

import { PrivateRoute } from "./_components/PrivateRoute";
import { authenticationService, userService } from "./_services";

import AddBook from "./Add/AddBook";
import EditBook from "./Edit/EditBook";
import Home from "./Home/Home";
import Index from "./Index/Index";
import Login from "./Login/Login";
//import Next from "./Next/Next";
import Register from "./Register/Register";
import Visuals from "./Visuals/Visuals";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
      currentUser: x
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
              { userService.isDemoUser(this.state.currentUser) && <DemoMessage /> }
              <Route exact path="/" render={ (props) => <Home {...props} currentUser={ this.state.currentUser } /> } />
              <PrivateRoute path="/add" component={ AddBook } currentUser={ this.state.currentUser } />
              <PrivateRoute path="/edit/:bookId" component={ EditBook } currentUser={ this.state.currentUser } />
              <PrivateRoute path="/index" component={ Index } currentUser={ this.state.currentUser } />
              {/* }<PrivateRoute path="/upnext" component={ UpNext } currentUser={ this.state.currentUser } /> */}
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
    props.history.push('/');
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
              <NavLink to="/index" className="nav-link">My Books</NavLink>
              <NavLink to="/add" className="nav-link">Add a Book</NavLink>
              {/* <NavLink to="/next" className="nav-link">Up Next</NavLink> */}
              <NavLink to="/visuals" className="nav-link">Visualizations</NavLink>
            </> }
          </Nav>
          <Nav>
            { props.currentUser ?
            <button type="button"onClick={ logout } className="nav-link btn btn-link text-left">Logout</button> :
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

const DemoMessage = withRouter((props) => {
  const logoutAndRegister = () => {
    authenticationService.logout();
    props.history.push('/register');
  }

  return (
    <Alert variant="warning">
      <em>Note: This application is in read-only demo mode. Updates are not allowed but have a look around or </em>
      <button type="button" className="btn btn-link btn-anchor" onClick={ logoutAndRegister }><em>register</em></button>
      <em>!</em>
    </Alert>
  );
});

export default App;
