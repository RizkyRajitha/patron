import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";
import Card from "../../components/Cards";
import "./dashboardDonator.css";

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

const DashboardDonator = props => {
  const [availableRequests, setavailableRequests] = useState([]);
  const [username, setusername] = useState("");
  const [donatedamountalltime, setdonatedamountalltime] = useState("");

  useEffect(() => {
    var jwt = localStorage.getItem("jwtdonator");
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
      //

      axios
        .get("/api/donatordashboard", config)
        .then(res => {
          console.log(res.data);
          setusername(res.data.name);
          setdonatedamountalltime(res.data.donations);
          //   setavailableRequests(res.data.requests);
        })
        .catch(err => {
          console.log(err);
        });

      axios
        .get("/api/getallposts", config)
        .then(res => {
          console.log(res.data);
          setavailableRequests(res.data.requests);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log("not logged in");
      props.history.push("/logindonor");
    }
  }, []);

  const refresh = () => {
    var jwt = localStorage.getItem("jwtdonator");
    var config = {
      headers: {
        authorization: jwt
      }
    };

    axios
      .get("/api/donatordashboard", config)
      .then(res => {
        console.log(res.data);
        setusername(res.data.name);
        setdonatedamountalltime(res.data.donations);
        //   setavailableRequests(res.data.requests);
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get("/api/getallposts", config)
      .then(res => {
        console.log(res.data);
        setavailableRequests(res.data.requests);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("jwtdonator");
    props.history.push("/logindonor");
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
              {username}
            </a>

            <a className="nav-item nav-link active  " disabled={true}>
              donations so far : {donatedamountalltime}$
            </a>

            <a className="nav-item nav-link" onClick={() => logout()} href="#">
              logout
            </a>
          </div>
        </div>
      </nav>

      <div className="container donordashboard">
        {availableRequests &&
          availableRequests.map(ele => {
            return (
              <Card
                requestid={ele.requestid}
                title={ele.title}
                description={ele.description}
                donationTypeAccepted={ele.donationTypeAccepted}
                estimatedBudget={ele.estimatedBudget}
                images={ele.images}
                username={ele.username}
                requesterId={ele.requesterId}
                createdAt={ele.createdAt}
                availableBudget={ele.availableBudget}
                refresh={refresh}
              />
            );
          })}
      </div>
    </div>
  );
};
export default DashboardDonator;
