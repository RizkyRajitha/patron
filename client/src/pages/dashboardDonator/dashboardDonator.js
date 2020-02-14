import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import jsonwebtoken from "jsonwebtoken";
import Swal from "sweetalert2";
import Card from "../../components/Cards";

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
      this.props.history.push("/logindonor");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtdonator");
    props.history.push("/logindonor");
  };

  return (
    <div>
      <h1>Doandor dashboard</h1>

      <br />
      <h2>hello {username}</h2>
      <br />
      <br />
      <h3>donations so far : {donatedamountalltime}$</h3>

      <br />
      <button onClick={() => logout()}>logout</button>
      <br />

      {availableRequests.map(ele => {
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
          />
        );
      })}
    </div>
  );
};
export default DashboardDonator;
