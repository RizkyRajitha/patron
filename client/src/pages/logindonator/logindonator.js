import React, { Component } from "react";
import "./logindonator.css";
import Footer from "../../components/footer/footer";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";

const axios = require("axios");

class Login extends Component {
  state = {
    filestoupload: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    //M.toast({ html: "I am a toast!" });
    var jwt = localStorage.getItem("jwtdonator");
    console.log("comp mount");
    console.log(jwt);
    try {
      var tk = jsonwebtoken.verify(jwt, "demo");
      if (tk) {
        console.log("loged in");
        this.props.history.push("/dashboarddonor");
      }
    } catch (error) {
      console.log("not logged in");
    }
  }

  loginsubmit = e => {
    e.preventDefault();
    console.log("cliking");

    console.log("sending..............");
    console.log(this.state.email + this.state.password);

    axios
      .post("/auth/logindonator", {
        email: this.state.email,
        password: this.state.password
      })
      .then(data => {
        console.log("awe mewwa - - -popopopopo");
        console.log(data);
        var body = data.data;

        if (body.message === "success") {
          console.log("body - " + body);
          localStorage.setItem("jwtdonator", body.token);

          this.props.history.push("/dashboarddonor");
        } else if (body.message === "invalidcredentials") {
          Swal.fire("invalid credentials", "", "error");
        }
      })
      .catch(err => {
        console.log("l>> err" + err);
        if (err.response.data.message === "invalidcredentials") {
          Swal.fire("invalid credentials", "", "error");
        }
      });
  };

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Login Donor</h1>

          <hr className="my-4" />

          <form className="lead" onSubmit={e => this.loginsubmit(e)}>
            <div className="form-group">
              <input
                placeholder="Enter Email "
                className="form-control logininputwidth"
                type="email"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <input
                placeholder="Enter Password "
                className="form-control logininputwidth"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>

            <button className="btn btn-primary btn-lg" type="submit">
              login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
