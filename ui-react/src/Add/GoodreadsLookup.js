import React, { Component } from "react";
import { Tooltip, OverlayTrigger } from "react-bootstrap";

export default class GoodreadsLookup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      grIDforLookup: "",
    }
  }

  handleGrIDChange = (e) => {
    this.setState({ grIDforLookup: e.target.value });
  }

  render() {
    return (
      <div id="populateFromGR" className="card ml-auto">
        <div className="card-body">
          <div className="heading">
            <h5>Populate from GoodReads</h5>
            <OverlayTrigger
              placement="top"
              overlay={
                <Tooltip>
                  <div className="text-left">Use a <strong>Goodreads ID</strong> to quickly pre-populate book info.</div>
                </Tooltip>
              }
            >
            <div><span role="img" aria-label="info">❔</span></div>
            </OverlayTrigger>
          </div>
          <div className="row mt-3">
            <div className="col-8">
              <input type="text" id="grIDforLookup" className="form-control d-inline-block" placeholder="GoodReads ID" 
                value={ this.state.grIDforLookup } onChange={ this.handleGrIDChange }/>
            </div>
            <div className="col-4">
              <button id="grSearch" className="btn btn-secondary btn-block" onClick={ () => this.props.grSearch(this.state.grIDforLookup) }>Search</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
