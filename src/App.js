import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import ListenerComponent from "./components/ListenerComponent";
import ModifierComponent from "./components/ModifierComponent";
import { connect } from "@boostbank/react-stateful";
import CombineSubStores from './combinations/CombineSubStores';
import SharedComponent from './components/SharedComponent';
import SharedTextInput from './components/SharedTextInput';
import AsyncComponent from "./components/AsyncComponent";

CombineSubStores();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: ""
    };
  }


  componentDidMount() {
    connect(this, store => {
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
            Welcome to react-stateful.
          </h1>
          <code>{this.state.selectedName}</code>
        </header>
        <ListenerComponent />
        <ModifierComponent />
        <br/>
        <br/>
          <SharedTextInput/>
        <br/>
        <br/>
        <SharedComponent/>
        <SharedComponent/>
        <br/>
        <br/>
        <AsyncComponent/>
      </div>
    );
  }
}

export default App;
