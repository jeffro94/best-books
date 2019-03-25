import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import { USER_ID } from "../Constants";

export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  render() {
    const { expanded } = this.state;

    const anyOptionSelected = this.props.options.filter(option => option.selected).length !== 0;

    return (
      <div className={ `card filter-card ${ this.props.enabled ? "active-filter" : ""}` }>
        <div
          onClick={() => this.setState({ expanded: !expanded })}
          aria-controls="filter-options"
          aria-expanded={ expanded }
        >
          <div className="card-header"
            onClick={ () => this.setState( { expanded: !this.state.expanded } )}>{ this.props.categoryName }</div>
        </div>
        <Collapse in={ expanded }>
          <div id="filter-options">
            <div className="card-body">
              <div>
                <div className="form-group">
                  { 
                    this.props.options.map(option => (
                      <div className="form-check" key={ option.key }>
                        <input className="form-check-input" type="checkbox" id={ "filter-option-" + option.key } 
                          data-filter-type={ this.props.categoryName } data-filter-key={ option.key }
                           checked={ option.selected } onChange={ this.props.onFilterChange } />
                        <label className="form-check-label" htmlFor={ "filter-option-" + option.key }>{ option.name }</label>
                      </div>
                    ))
                  }
                </div>
                <div className="filter-options">
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={ () => this.props.setFilterEnabledStatus(this.props.categoryName, false) }
                    disabled={ !anyOptionSelected ? "disabled" : false }
                    aria-disabled={ !anyOptionSelected ? true : false }
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export class TagFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      availableTags: []
    }
  }

  componentDidMount() {
    fetch(`https://localhost:44344/api/books/UserId/${ USER_ID }/tags`)
      .then(response => response.json())
      .then(result => this.setState({ availableTags: result }));
  }

  // create a friendly key name by replacing all special characters and spaces in the filter value with _
  // https://stackoverflow.com/questions/13020246/remove-special-symbols-and-extra-spaces-and-replace-with-underscore-using-the-re
  //
  render() {
    const { expanded } = this.state;

    return (
      <div className={ `card filter-card ${ this.props.enabled ? "active-filter" : ""}` }>
        <div
          onClick={() => this.setState({ expanded: !expanded })}
          aria-controls="filter-options"
          aria-expanded={ expanded }
        >
          <div className="card-header"
            onClick={ () => this.setState( { expanded: !this.state.expanded } )}>Tags</div>
        </div>
        <Collapse in={ expanded }>
          <div id="filter-options">
            <div className="card-body">
              <div>
                <div className="form-group">
                  { 
                    this.state.availableTags.map(tag => (
                      <div className="form-check" key={ tag.replace(/[^A-Z0-9]+/ig, "_") }>
                        <input className="form-check-input" type="checkbox" id={ "filter-option-" + tag.replace(/[^A-Z0-9]+/ig, "_") } 
                          data-filter-value={ tag }
                          checked={ this.props.selected.includes(tag) } onChange={ this.props.onChange } />
                        <label className="form-check-label" htmlFor={ "filter-option-" + tag.replace(/[^A-Z0-9]+/ig, "_") }>{ tag }</label>
                      </div>
                    ))
                  }
                </div>
                <div className="filter-options">
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={ this.props.clearTagFilters }
                    disabled={ this.props.selected.length === 0 ? "disabled" : false }
                    aria-disabled={ this.props.selected.length === 0 ? true : false }
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}
