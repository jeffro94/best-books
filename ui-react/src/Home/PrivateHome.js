import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bookService } from "../_services";

export default class PrivateHome extends Component {
  state = { bookCount: ".." };

  componentDidMount() {
    bookService.getBookCountByUserId(this.props.currentUser.userId).then(result => {
      this.setState({ bookCount: result });
    });
  }

  render() {
    return (
      <div className="text-center">
        <h1 className="mb-3">Welcome, { this.props.currentUser.username }!</h1>
        <p>You currently have <Link to="/index">{ this.state.bookCount } books in your library</Link>.</p>
      </div>
    );
  }
}