import React from "react";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <div className="text-center">
      <h1 className="mb-3">Welcome!</h1>
      <p className="mb-3"><strong>Best Books!</strong> is a web application designed to facilitate organization and exploration of your personal library.</p>
      <p><Link to="Login">Login</Link>, <Link to="register">register</Link> or <Link to="#tbd">explore as a guest</Link> to get started.</p>
    </div>
  );
}