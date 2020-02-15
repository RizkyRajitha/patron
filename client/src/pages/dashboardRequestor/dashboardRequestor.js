import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";
import axios from "axios";
import "./dashboardRequestor.css";
import Card from "../../components/Cards";

const Dashboard = props => {
  const [previoesRequests, setprevioesRequests] = useState([]);
  const [Username, setUsername] = useState("");

  useEffect(() => {
    var jwt = localStorage.getItem("jwtreq");
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
          setprevioesRequests(res.data.requests);
          setUsername(res.data.name);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log("not logged in");
      props.history.push("/loginrequestor");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtreq");
    props.history.push("/");
  };

  const { register, handleSubmit } = useForm();

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

    var token = localStorage.getItem("jwtreq");
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
              setprevioesRequests(res.data.requests);
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          PATRON
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-item nav-link active  " disabled={true}>
              {Username}
            </a>

            <a className="nav-item nav-link" onClick={() => logout()} href="#">
              logout
            </a>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="jumbotron">
          <h1 className="display-4">Login Requestor</h1>

          <hr className="my-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            {" "}
            <h2>add new request </h2>
            <div className="form-group">
              <input
                className="form-control "
                name="title"
                required
                type="text"
                placeholder="title"
                ref={register}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control "
                name="description"
                placeholder="description"
                ref={register}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <input
                className="form-control "
                type="number"
                placeholder="Estimated Budget"
                name="estimatedBudget"
                required
                ref={register}
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                name="donationTypeAccepted"
                required
                ref={register}
              >
                <option value="financial">financial</option>
                <option value="physical">physical</option>
                <option value="humanresource">human resource</option>
              </select>
            </div>
            <div className="form-group">
              <input
                className="form-control "
                type="file"
                ref={register}
                required
                name="supportingfiles"
                multiple
              />
            </div>
            <button className="btn btn-primary" type="submit">
              add new request
            </button>
          </form>
        </div>
      </div>

      <div className="container">
        <h2>previous requests</h2>
        <br />

        {previoesRequests &&
          previoesRequests.map(ele => {
            return (
              <Card
                user="req"
                title={ele.title}
                description={ele.description}
                donationTypeAccepted={ele.donationTypeAccepted}
                estimatedBudget={ele.estimatedBudget}
                images={ele.images}
                createdAt={ele.createdAt}
                availableBudget={ele.availableBudget}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
