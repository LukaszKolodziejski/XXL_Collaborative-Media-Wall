import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import thunk from "redux-thunk";
import { Provider } from "react-redux";
// import authReducer from "./store/reducers/auth";
// import accountReducer from "./store/reducers/accounts";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const rootReducer = {
//   account: accountReducer,
//   auth: authReducer,
// };

// const store = createStore(
//   combineReducers(rootReducer),
//   composeEnhancers(applyMiddleware(thunk))
// );

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <App />
    {/* </Provider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
