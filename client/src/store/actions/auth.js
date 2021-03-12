//Files in the /actions folder are responsible for setting up action creators and dispatching actions (preceded by necessary api calls of course!)

import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear(); //clear the jwt token from localStorage when logging out
    setAuthorizationToken(false); // delete any authorization token from header
    dispatch(setCurrentUser({})); //set current user as an empty object
  };
}

export function authUser(type, userData) {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return apiCall("post", `/api/auth/${type}`, userData)
        .then(({ token, ...user }) => {
          localStorage.setItem("jwtToken", token);
  
          setAuthorizationToken(token); // set authorization token in the header

          dispatch(setCurrentUser(user));
          
          dispatch(removeError()); // update errors state to remove any error message on the page

          console.log(
            "Promise resolved successfully: The user is: " + user.username
          );
          resolve(); // indicate the API call succeeded.
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          dispatch(addError(err.message)); // update errors state to add error message on the page

          console.log(
            "Promise rejected, and the auth error is: " + JSON.stringify(err)
          );
          reject(); // indicate the API call failed
        });
    });
  };
}
