import React, { Component } from "react";

import Auth from "./pages/landingpage/Auth";
import LoginRequestor from "./pages/loginRequestor/loginRequestor";
import DashboardRequestor from "./pages/dashboardRequestor/dashboardRequestor";
import Logindonator from "./pages/logindonator/logindonator";
import Dashboarddonator from "./pages/dashboardDonator/dashboardDonator";
// import "./bootstrap.css";

import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Auth} />

        <Route exact path="/loginrequestor" component={LoginRequestor} />
        <Route exact path="/dashboardreqestor" component={DashboardRequestor} />
        <Route exact path="/logindonor" component={Logindonator} />
        <Route exact path="/dashboarddonor" component={Dashboarddonator} />
      </BrowserRouter>
    );
  }
}

export default App;
