import React, { Component } from "react";

import Landingpage from "./pages/login/landingpage";
// import "./bootstrap.css";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Landingpage} />
      </BrowserRouter>
    );
  }
}

export default App;
