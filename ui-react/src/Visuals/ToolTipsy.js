import React from "react";

const ToolTipsy = (props) => (
    <div 
      className="tooltip"
      style={ {
        display: props.fields.length ? "block" : "none",
        top: `${props.top}px`,
        left: `${props.left}px`
      } }
    >
      { props.fields.map( (field, index) => <p key={ index }>{ field }</p> ) }
    </div>
  );

export default ToolTipsy;
