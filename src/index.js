import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { GlobalState } from "@boostbank/react-stateful";
import { createStore } from "@boostbank/stateful";

ReactDOM.render(
  <GlobalState store={createStore({selectedName: "The first name in the store"})}>
    <App />
  </GlobalState>,
  document.getElementById("root")
);
registerServiceWorker();
