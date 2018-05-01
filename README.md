## Example of how to use react-stateful.

## Code Samples

> 1. Install @boostbank/stateful && @boostbank/react-stateful

```sh
npm i @boostbank/stateful --save
npm i @boostbank/react-stateful --save
```

> 2. Wrap GlobalState around your React Project

```jsx
// index.js
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

```

> 3. Connect components

```jsx
// components/ListenerComponent.jsx
import React from "react";
import { connect } from "@boostbank/react-stateful";

export default class ListenerComponent extends React.Component {
  constructor() {
    super();
    this.state = connect(this, store => {
      this.setState({
        selectedName: store.selectedName
      });
    });
  }

  componentDidMount() {}

  componentWillUnmount() {}
  render() {
    return <div>{this.state.selectedName}</div>;
  }
}
```

> 4. Modify the state

```jsx
// components/ModifierComponent.jsx
import React, { Component } from "react";
import { modify, rollback } from "@boostbank/stateful";

export default class ModifierComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
    this.onNameChange = this.onNameChange.bind(this);
    this.onChangeClick = this.onChangeClick.bind(this);
  }

  componentDidMount() {}

  onChangeClick(e) {
    if (this.state.name.length > 0) {
      modify(state => {
        state.selectedName = this.state.name;
        return state;
      });
      this.setState({
        name: ""
      });
    }
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.onNameChange}
          value={this.state.name}
        />
        <button onClick={this.onChangeClick}>Change Name</button>
        <button
          onClick={() => {
            rollback();
          }}
        >
          Rollback
        </button>
      </div>
    );
  }
}
```

## Try it out!

> Clone the repo

> Install the dependencies
```sh
npm install
```
> Run the React app
```sh
npm start
```
> Enjoy