import React, { useEffect, useState } from "react";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

const RegDonor = props => {
  useEffect(() => {
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
  });

  const validation = yup.object().shape({
    email: yup.string().required(),
    password: yup
      .string()
      .required()
      .min(3)
      .test("samepass", "password not same", function() {
        return this.parent.password === this.parent.confirmpassword;
      })
  });
  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    register
  } = useForm({ mode: "onChange", validationSchema: validation });

  const loginsubmitt = data => {
    console.log(data);

    axios
      .post("/reg/registerdonator", data)
      .then(result => {
        console.log(result);
        if (result.data.msg === "success") {
          props.history.push("/logindonor");
        }
      })
      .catch(err => {
        console.log(err);
        if (err.response.data.msg === "dupuser") {
          Swal.fire({
            title: "error",
            text: "duplicate email found",
            icon: "error"
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">Signup Donor</h1>

        <hr className="my-4" />

        <form className="lead" onSubmit={handleSubmit(loginsubmitt)}>
          <div className="form-group">
            <input
              placeholder="Enter Email "
              className="form-control logininputwidth"
              type="email"
              name="email"
              ref={register}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Enter First Name "
              className="form-control logininputwidth"
              type="text"
              name="firstName"
              required
              ref={register}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Enter Last Name "
              className="form-control logininputwidth"
              type="text"
              name="lastName"
              required
              ref={register}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Enter Password "
              className="form-control logininputwidth"
              type="password"
              name="password"
              minLength="3"
              required
              ref={register}
            />
          </div>

          <div className="form-group">
            <input
              placeholder="Re Enter Password "
              className="form-control logininputwidth"
              name="confirmpassword"
              type="password"
              required
              ref={register}
            />
          </div>

          <button
            className="btn btn-primary btn-lg"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegDonor;
