//index.js is responsible for bundling all the reducers into rootReducer
import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import cars from "./cars";

const rootReducer = combineReducers({
  currentUser: currentUser,
  errors: errors,
  cars: cars
});

export default rootReducer;
