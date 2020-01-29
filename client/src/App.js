import React, { Component } from "react";

import Auth from "./pages/landingpage/Auth";
import LoginRequestor from "./pages/loginRequestor/loginRequestor";
import DashboardRequestor from "./pages/dashboardRequestor/dashboardRequestor";

// import "./bootstrap.css";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Auth} />

        <Route exact path="/loginrequestor" component={LoginRequestor} />
        <Route exact path="/dashboardreqestor" component={DashboardRequestor} />
      </BrowserRouter>
    );
  }
}

export default App;
