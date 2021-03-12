import {
  LOAD_CARS
} from "../actionTypes";

const car = (state = [], action) => {
  switch (action.type) {
    case LOAD_CARS:
      return [...action.cars];

    default:
      return state;
  }
};

export default car;
