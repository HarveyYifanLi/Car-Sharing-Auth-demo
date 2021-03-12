import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSignInAlt,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

class Navbar extends Component {
  logout = (e) => {
    e.preventDefault();
    this.props.logout();
  };

  render() {
    return (
      <nav className="navbar navbar-expand">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              Modo Cars Depo
            </Link>
          </div>
          {this.props.currentUser.isAuthenticated ? (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="my-cute-icons"
                />{" "}
                <a onClick={this.logout}>Log Out</a>
              </li>
            </ul>
          ) : (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <FontAwesomeIcon icon={faUserPlus} className="my-cute-icons" />{" "}
                <Link to="/signup">Sign up</Link>
              </li>
              <li>
                <FontAwesomeIcon icon={faSignInAlt} className="my-cute-icons" />{" "}
                <Link to="/signin">Log in</Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}
// create standard function to connect redux state to react props for Navbar component
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps, { logout })(Navbar);
