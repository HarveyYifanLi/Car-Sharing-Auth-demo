import React, { Component } from "react";
import { Link } from "react-router-dom";
import CarsShell from "./CarsShell";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCode, faCar } from "@fortawesome/free-solid-svg-icons";

class Homepage extends Component {
  render() {
    let currentUser = this.props.currentUser;

    if (!currentUser.isAuthenticated) {
      return (
        <div className="home-page-container">
          <div className="jumbotron home-new-hero">
            <h2>
              {" "}
              <FontAwesomeIcon icon={faFileCode} /> We are the leader of car-sharing in BC!
            </h2>
            <h4>New to Modo ?</h4>
            <hr />
            <Link
              to="/signup"
              className="btn btn-primary"
              style={{ color: "gold" }}
            >
              Sign Up Now!
            </Link>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h3>
          <FontAwesomeIcon icon={faCar} /> All Vehicles
        </h3>
        <hr/>
        <CarsShell
          profileImageUrl={currentUser.user.profileImageUrl}
          username={currentUser.user.username}
        />
      </div>
    );
  }
}

export default Homepage;
