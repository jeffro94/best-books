import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

export default (props) => {
  const [open, setOpen] = useState(false);

  const anyOptionSelected = props.options.filter(option => option.selected).length !== 0;

  return (
    <div className={ `card filter-card ${ props.enabled ? "active-filter" : ""}` }>
      <div
        className="card-header"
        onClick={() => setOpen( !open )}
        aria-controls="filter-options"
        aria-expanded={ open }
      >
        { props.categoryName }
      </div>
      <Collapse in={ open }>
        <div id="filter-options">
          <div className="card-body">
            <div>
              <div className="form-group">
                { 
                  props.options.map(option => (
                    <div className="form-check" key={ option.key }>
                      <input className="form-check-input" type="checkbox" id={ "filter-option-" + option.key } 
                        data-filter-type={ props.categoryName } data-filter-key={ option.key }
                          checked={ option.selected } onChange={ props.onFilterChange } />
                      <label className="form-check-label" htmlFor={ "filter-option-" + option.key }>{ option.name }</label>
                    </div>
                  ))
                }
              </div>
              <div className="filter-options">
                <button 
                  className="btn btn-light btn-sm"
                  onClick={ () => props.setFilterEnabledStatus(props.categoryName, false) }
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
