import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListenerComponent from "./components/ListenerComponent";
import ModifierComponent from "./components/ModifierComponent";
import { connect } from "@boostbank/react-stateful";

class App extends Component {
  constructor() {
    super();
    this.state = connect(this, store => {
      this.setState({
        selectedName: store.selectedName
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to react-stateful. Global State Name ->{" "}
            {this.state.selectedName}
          </h1>
        </header>
        <ListenerComponent />
        <ModifierComponent />
      </div>
    );
  }
}

export default App;
