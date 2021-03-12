import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import { authUser } from "../store/actions/auth";
import { removeError } from "../store/actions/errors";
import withAuth from "../hocs/withAuth";

const Main = (props) => {
  let currentUser = props.currentUser; //Object
  const errors = props.errors;
  const authUser = props.authUser;
  const removeError = props.removeError;

  return (
    <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Homepage currentUser={currentUser} {...props} />}
        />
        <Route
          exact
          path="/signin"
          render={(props) => {
            return (
              <AuthForm
                onAuth={authUser}
                errors={errors}
                removeError={removeError}
                buttonText="Log in"
                {...props}
              />
            );
          }}
        />
        <Route
          exact
          path="/signup"
          render={(props) => {
            return (
              <AuthForm
                onAuth={authUser}
                errors={errors}
                removeError={removeError}
                signUp
                buttonText="Sign up"
                {...props}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
};

// the state's properties come from keys defined in rootReducer function
function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors,
  };
}

export default withRouter(
  connect(mapStateToProps, { authUser, removeError })(Main)
);
