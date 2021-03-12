// create and config the store using rootReducer
import rootReducer from "./reducers"; // same as './reducers/index.js'
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

export function configureStore() {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

  return store;
}
