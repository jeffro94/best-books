import React, { useState } from "react";
import { Collapse } from "react-bootstrap";

// create a friendly key name by replacing all special characters and spaces in the filter value with _
// https://stackoverflow.com/questions/13020246/remove-special-symbols-and-extra-spaces-and-replace-with-underscore-using-the-re
//

export default (props) => { 
  const [open, setOpen] = useState(false);

  return (
    <div className={ `card filter-card ${ props.enabled ? "active-filter" : ""}` }>
      <div
        className="card-header"
        onClick={() => setOpen( !open )}
        aria-controls="filter-options"
        aria-expanded={ open }
      >
        Tags
      </div>
      <Collapse in={ open }>
        <div id="filter-options">
          <div className="card-body">
            <div>
              <div className="form-group">
                { 
                  props.availableTags.map(tag => (
                    <div className="form-check" key={ tag.replace(/[^A-Z0-9]+/ig, "_") }>
                      <input className="form-check-input" type="checkbox" id={ "filter-option-" + tag.replace(/[^A-Z0-9]+/ig, "_") } 
                        data-filter-value={ tag }
                        checked={ props.selected.includes(tag) } onChange={ props.onChange } />
                      <label className="form-check-label" htmlFor={ "filter-option-" + tag.replace(/[^A-Z0-9]+/ig, "_") }>{ tag }</label>
                    </div>
                  ))
                }
                { (props.availableTags.length === 0) &&
                  <p><em>Tag filters will become available once added to a book.</em></p>
                }
              </div>
              <div className="filter-options">
                <button 
                  className="btn btn-light btn-sm"
                  onClick={ props.clearTagFilters }
                  disabled={ props.selected.length === 0 ? "disabled" : false }
                  aria-disabled={ props.selected.length === 0 ? true : false }
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
