import React from "react";
import "./card.css";
import Swal from "sweetalert2";
import axios from "axios";

const Cards = props => {
  const donate = () => {
    Swal.fire({
      title: "Enter your donation amount",
      input: "number",
      inputAttributes: {
        max: "10"
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
      if (result.value.data) {
        Swal.fire({
          title: `${result.value.data.msg}'s donation`
          // imageUrl: result.value.avatar_url
        });
      }
    });
  };

  return (
    <div>
      <div className="cardrequest">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={props.images && props.images[0]}
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <label>{props.createdAt}</label>

            <label>by {props.username}</label>

            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>

            <h6>{props.estimatedBudget}$</h6>
            <h6>{props.availableBudget}$ remaining </h6>

            <h5>{props.donationTypeAccepted}</h5>

            <button onClick={() => donate()} className="btn btn-primary">
              Donate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
