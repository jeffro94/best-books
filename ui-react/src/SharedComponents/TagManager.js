import React, { Component } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { USER_ID } from '../Constants';

class TagManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTags: []
    };
  }

  componentDidMount() {
    fetch(`https://localhost:44344/api/books/UserId/${ USER_ID }/tags`)
      .then(response => response.json())
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