import React, { Component } from "react";
import "./landingpage.css";
import Footer from "../../components/footer/footer";

const axios = require("axios");

class Landingpage extends Component {
  state = {
    filestoupload: ""
  };

  componentDidMount() {}

  btn1handler = e => {};

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
        <input onChange={this.fileupload} type="file" multiple></input>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default Landingpage;
