import React from "react";

export default (props) => {
  const inputs =  props.columns.map(col => (
    <div className="form-check" key={ col.key }>
      <input className="form-check-input" type="checkbox" id={ col.key } disabled={ col.disabled }
        checked={ col.selected } onChange={ props.onColumnChange } />
      <label className="form-check-label" htmlFor={ col.key }>{ `${ col.headerAbbreviation ? col.headerAbbreviation + ' ' : '' }${col.name}` }</label>
    </div>
  ));

  return (
    <div>
      <h4>Columns</h4>
      <div className="form-group">
        { inputs }
      </div>
      <div className="alert alert-light d-xl-none">
        <em>Some columns will be automatically hidden on small window sizes and mobile devices.</em>
      </div>
    </div>
  );
}
