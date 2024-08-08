import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux"; // It's deprecated and the prefable way is to use redux toolkit in my app
import { Provider } from "react-redux";
import App from "./App";
import rootReducer from "./redux-elements/reducers/rootReducer";

const theStore = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={theStore}>
    <App />
  </Provider>
);
