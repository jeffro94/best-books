import React, { Component } from "react";
import { bookService } from "../_services";
import { Typeahead } from "react-bootstrap-typeahead"
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-bootstrap-typeahead/css/Typeahead-bs4.css";

class TagManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTags: []
    };
  }

  componentDidMount() {
    if (this.props.currentUser) {
      this.getAvailableTags();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUser && this.props.currentUser !== prevProps.currentUser) {
      this.getAvailableTags();
    }
  }

  getAvailableTags() {
    bookService.getTagsByUserId(this.props.currentUser.userId)
      .then(result => this.setState({ availableTags: result }));
  }

  render() {
    return (
      <div className="form-group row">
        <label htmlFor="tags" className="col-sm-2 col-form-label">Tags</label>
        <div className="col-sm-10">
          <Typeahead
            id="tags"
            allowNew
            placeholder="Select a tag..."
            emptyLabel="Add a tag..."
            newSelectionPrefix="New tag: "
            onChange={ this.props.onChange }
            options={ this.state.availableTags }
            selected={ this.props.tags }
            multiple
          />
        </div>
      </div>
    );
  }
}

export default TagManager;