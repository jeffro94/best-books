import React from "react";
import { Link } from "react-router-dom";
import "./PublicHome.css";

export default (props) => {
  return (
    <div className="text-center">
      <h1 className="mb-3">Welcome!</h1>
      <p className="mb-3"><strong>Best Books!</strong> is a web application designed to facilitate organization and exploration of your personal library.</p>
      <div className="row mb-3">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
          <img src="/images/bb_example2.png" alt="Example" />
        </div>
      </div>
      <p><Link to="Login">Login</Link>, <Link to="register">register</Link> or <Link to="#tbd">explore as a guest</Link> to get started.</p>
    </div>
  );
}