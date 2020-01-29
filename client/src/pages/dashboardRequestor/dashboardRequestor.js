import React, { Component } from "react";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";
import "./dashboardRequestor.css";

class Dashboard extends Component {
  state = {
    username: "",
    newreqtitle: ""
  };

  componentDidMount() {
    //M.toast({ html: "I am a toast!" });
    var jwt = localStorage.getItem("jwt");
    console.log("comp mount");
    console.log(jwt);
    try {
      var tk = jsonwebtoken.verify(jwt, "demo");
      if (tk) {
        console.log("loged in");
        // this.props.history.push("/dashboard");
      }
    } catch (error) {
      console.log("not logged in");
      this.props.history.push("/loginrequestor");
    }
  }

  addnewreq = e => {


    




  };

  logout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Dashboard requestor</h1>
        <button onClick={() => this.logout()}> logout </button>

        <form onSubmit={e => this.addnewreq(e)}>
          <h2>add new request </h2>

          <input
            type="text"
            onChange={e => this.setState({ newreqtitle: e.target.value })}
          />

          <button type="submit">add new request</button>
        </form>
      </div>
    );
  }
}

export default Dashboard;
