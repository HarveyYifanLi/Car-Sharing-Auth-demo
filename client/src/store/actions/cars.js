//files in /actions are for: action creators + actual mapDispatchToprops functions

import { apiCall } from "../../services/api";
import { addError } from "./errors";
import {
  LOAD_CARS,
} from "../actionTypes";

// action creator (i.e. a function that returns an action) for LOAD_CARS action
export const loadCars = cars => {
  return {
    type: LOAD_CARS,
    cars
  };
};

//higher-order functions to return a "mapDispatchToProps" function (i.e. to dispatch a redux thunk)
export const fetchCars = () => {
  return dispatch => {
    return (
      apiCall("get", "/api/cars") // API call to the server
        .then(res => dispatch(loadCars(res))) // syncing browser data store by dispatching action creators
        .catch(err => dispatch(addError(err.message)))
    );
  };
};
