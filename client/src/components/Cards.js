import React from "react";
import "./card.css";
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";

const Cards = props => {
  const donate = () => {
    Swal.fire({
      title: "Enter your donation amount",
      input: "number",
      inputAttributes: {
        max: props.availableBudget
      },
      showCancelButton: true,
      confirmButtonText: "Donate",
      showLoaderOnConfirm: true,
      preConfirm: login => {
        var tk = localStorage.getItem("jwtdonator");
        console.log(tk);
        var config = {
          headers: {
            authorization: tk
          }
        };

        var payload = {
          requestid: props.requestid,
          amount: login,
          requesterId: props.requesterId
        };

        console.log(payload);
        return axios
          .post("/api/donate", payload, config)
          .then(result => {
            return result;
          })
          .catch(err => {
            console.log(err);
          });

        // return fetch(`//api.github.com/users/${login}`)
        //   .then(response => {
        //     if (!response.ok) {
        //       throw new Error(response.statusText);
        //     }
        //     return response.json();
        //   })
        //   .catch(error => {
        //     Swal.showValidationMessage(`Request failed: ${error}`);
        //   });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      console.log(result);
      props.refresh();
      if (result.value.data) {
        Swal.fire({
          icon: "success",
          title: `Successfully Donated`
          // imageUrl: result.value.avatar_url
        });
      }
    });
  };

  const deletepost = reqid => {
    console.log(reqid);
    var tk = localStorage.getItem("jwtreq");
    console.log(tk);
    var config = {
      headers: {
        authorization: tk
      }
    };
    axios
      .delete("/api/deletepost/" + reqid, config)
      .then(result => {
        console.log(result);
        if (result.data.msg === "success") {
          Swal.fire({ title: "Post deleted ", icon: "info" });
          props.refresh();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="cardrequest">
      <div className="card" style={{ width: "20rem" }}>
        <img
          src={props.images && props.images[0]}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <label>{moment(props.createdAt).fromNow()}</label>

          <label hidden={props.user === "req"}> {" "}by {props.username}</label>

          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>

          <h6> Original budget : {props.estimatedBudget}$</h6>
          <h6> Remaining Budget :{props.availableBudget}$ </h6>

          <h6>Type : {props.donationTypeAccepted}</h6>

          <button
            hidden={props.user === "req"}
            onClick={() => donate()}
            disabled={props.availableBudget === "0"}
            className={
              props.availableBudget === "0"
                ? "btn btn-success"
                : "btn btn-primary"
            }
          >
            {props.availableBudget === "0" ? "Completed" : "Donate"}
          </button>

          <button
            onClick={() => {
              deletepost(props.requestid);
            }}
            className="btn btn-danger"
            hidden={props.user !== "req"}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
