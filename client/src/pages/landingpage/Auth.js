import React from "react";
import "../../App.css";

//components
import Header from "../../components/Header";
// import firebase from "firebase";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Untitled from "../../images/Untitled.png";
import Cards from "../../components/Cards";
import Footer from "../../components/Footer";

class Auth extends React.Component {
  state = {};

  componentDidMount = () => {};
  render() {
    return (
      <div className="mainContainer">
        {/* header */}
        <Header />

        {this.state.isSignedIn ? (
          <div>
            <span className="Profile">
              <ul style={{ padding: "5vh" }}>
                <li>
                  <img
                    alt="profile picture"
                    // src={firebase.auth().currentUser.photoURL}
                    className="ProPic"
                  />
                </li>

                <li>
                  <h1 style={{ color: "white" }}>
                    {/* Welcome <br></br> {firebase.auth().currentUser.displayName} */}
                  </h1>
                </li>

                <li>
                  <p style={{ color: "white" }}>Sign in</p>
                </li>

                <li>
                  <button>Sign out</button>
                </li>
              </ul>
            </span>
          </div>
        ) : (
          <div className="MainLabel">
            <span>
              <img src={Untitled} align="right" className="Img" />
              <p style={{ fontWeight: "initial", fontSize: 40 }}>
                What is Patron
              </p>
              <p style={{ fontWeight: "normal", fontSize: 20 }}>
                <br></br>"Patron is the platform which connects benificiaries
                and benifactors..<br></br>here you can chose the available
                projects and Donate !"
              </p>
              <p style={{ fontWeight: "initial", fontSize: 22 }}>
                <br></br>You can place your donations for the following
                categories
              </p>
            </span>
            <span>
              <Cards name="Health -Care & Medical Emergencies" />
              <Cards name="Service requirements" />
              <Cards name="Monetary requirements" />
              <Cards name="Physical Resources requirements" />
            </span>

            <div className="SocialButtons"></div>
          </div>
        )}
      </div>
    );
  }
}
export default Auth;
