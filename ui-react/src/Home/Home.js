import React from "react";
import PrivateHome from "./PrivateHome";
import PublicHome from "./PublicHome";

export default (props) => {
  return (
    <div>
      { (props.currentUser) ? <PrivateHome currentUser={ props.currentUser } /> : <PublicHome /> }
    </div>  
  );
}
