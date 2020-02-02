import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";
import axios from "axios";
import "./dashboardRequestor.css";

const Imgtag = props => {
  return (
    <div>
      {props.imggg.map(ele => {
        console.log(ele);
        return <img src={ele} alt="" />;
      })}
    </div>
  );
};

const Dashboard = () => {
  const [previoesRequests, setprevioesRequests] = useState([]);

  useEffect(() => {
    var jwt = localStorage.getItem("jwt");
    console.log("comp mount");
    console.log(jwt);
    try {
      var tk = jsonwebtoken.verify(jwt, "demo");
      if (tk) {
        console.log("loged in");
      }
      var config = {
        headers: {
          authorization: jwt
        }
      };
      axios
        .get("/api/getposts", config)
        .then(res => {
          console.log(res.data);
          setprevioesRequests(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log("not logged in");
      this.props.history.push("/loginrequestor");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/");
  };

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    console.log(data);

    const formdata = new FormData();

    for (let index = 0; index < data.supportingfiles.length; index++) {
      const element = data.supportingfiles[index];
      formdata.append("resobj", element);
    }

    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append("estimatedBudget", data.estimatedBudget);
    formdata.append("donationTypeAccepted", data.donationTypeAccepted);

    var token = localStorage.getItem("jwt");
    var config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: token
      }
    };

    axios
      .post("/api/newpost", formdata, config)
      .then(res => {
        console.log(res.data);
        if (res.data.msg === "success") {
          Swal.fire("success", "added new request", "success");

          var config = {
            headers: {
              authorization: token
            }
          };
          axios
            .get("/api/getposts", config)
            .then(res => {
              console.log(res.data);
              setprevioesRequests(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Dashboard requestor</h1>
      <button onClick={() => logout()}> logout </button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {" "}
        <h2>add new request </h2>
        <input
          name="title"
          required
          type="text"
          placeholder="title"
          ref={register}
        />
        <textarea
          name="description"
          placeholder="title"
          ref={register}
          required
        ></textarea>
        <input type="number" name="estimatedBudget" required ref={register} />
        <select name="donationTypeAccepted" required ref={register}>
          <option value="physical">physical</option>
          <option value="financial">financial</option>
          <option value="humanresource">human resource</option>
        </select>
        <input
          type="file"
          ref={register}
          required
          name="supportingfiles"
          multiple
        />
        <button type="submit">add new request</button>
      </form>

      <br />
      <br />
      <br />
      <h2>previous requests</h2>
      <br />

      {previoesRequests.map(ele => {
        return (
          <div>
            <p>{ele.title}</p>
            <p>{ele.description}</p>
            <p>{ele.donationTypeAccepted}</p>
            <p>{ele.estimatedBudget}</p>
            <Imgtag imggg={ele.images} />
            <br></br>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
