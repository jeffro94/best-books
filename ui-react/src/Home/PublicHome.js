import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./PublicHome.css";
import { authenticationService } from "../_services";

class PublicHome extends Component {
  async loginAsGuest() {
    try {
      const user = await authenticationService.login("demouser", "demouser");
      if (user) this.props.history.push("/");
    }
    catch(error) {
      console.error(error); // do some proper error handling
    }
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="mb-3">Welcome!</h1>
        <p className="mb-3"><strong>Best Books!</strong> is a web application designed to facilitate organization and exploration of your personal library.</p>
        <div className="row mb-3">
          <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
            <img className="example-img" src="/images/bb_example2.png" alt="Example" />
          </div>
        </div>
        <p><Link to="/login">Login</Link>, <Link to="/register">register</Link> or <button type="button" className="btn btn-link btn-anchor" onClick={ () => this.loginAsGuest() }>explore as a guest</button> to get started.</p>
      </div>
    );
  }
}

export default withRouter(PublicHome);
