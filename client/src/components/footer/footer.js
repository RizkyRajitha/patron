import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./fotter.css";

class Footer extends Component {
  render() {
    return (
      <footer className="landingpagefooter">
        <div className="landingpagefooterdiv">Patron inc 2020</div>
      </footer>
    );
  }
}

export default withRouter(Footer);
