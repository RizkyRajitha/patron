import React, { Component } from "react";
import "./loginRequestor.css";
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
    var jwt = localStorage.getItem("jwt");
    console.log("comp mount");
    console.log(jwt);
    try {
      var tk = jsonwebtoken.verify(jwt, "demo");
      if (tk) {
        console.log("loged in");
        this.props.history.push("/dashboardreqestor");
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
      .post("/auth/loginrequestor", {
        email: this.state.email,
        password: this.state.password
      })
      .then(data => {
        console.log("awe mewwa - - -popopopopo");
        console.log(data);
        var body = data.data;

        if (body.message === "success") {
          console.log("body - " + body);
          localStorage.setItem("jwt", body.token);

          this.props.history.push("/dashboardreqestor");
        } else if (body.message === "invalidcredentials") {
          Swal.fire("invalid credentials", "", "error");
        }
      })
      .catch(err => {
        console.log("l>> err" + err);
      });
  };

  fileupload = e => {
    this.setState({ filestoupload: e.target.files });

    var jwt = localStorage.getItem("jwt");

    var config = {
      headers: {
        authorization: jwt
      }
    };

    const formdata = new FormData();

    for (let index = 0; index < e.target.files.length; index++) {
      const element = e.target.files[index];

      formdata.append("resobj", element);
    }

    axios
      .post("/upload/newpostfiles", formdata, config)
      .then(result => {
        console.log(result.body);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Login requestor</h1>

        {/* <input onChange={this.fileupload} type="file" multiple></input> */}

        <form onSubmit={e => this.loginsubmit(e)}>
          <input
            type="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <br></br>
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />

          <button type="submit">login</button>
        </form>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default Login;
