import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "@boostbank/stateful";

createStore({ selectedName: "The first name in the store" }, 5)

ReactDOM.render(
    <App />,
  document.getElementById("root")
);
registerServiceWorker();
