## Example of how to use react-stateful.

## Code Samples

> 1.  Install @boostbank/stateful && @boostbank/react-stateful

```sh
npm i @boostbank/stateful --save
npm i @boostbank/react-stateful --save
```

## Using global state.

1.  Create a global store.

```jsx
// index.js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore } from "@boostbank/stateful";

createStore({ selectedName: "The first name in the store" }, 5) // Creates a store with depth of 5 (stores 5 versions in memory);

ReactDOM.render(
    <App />,
  document.getElementById("root")
);
registerServiceWorker();
```

2.  Connect components 

```jsx
// components/ListenerComponent.jsx
import React from "react";
import { connect, disconnect } from "@boostbank/react-stateful";

export default class ListenerComponent extends React.Component {

  constructor(props){
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

  componentWillUnmount() {
    disconnect(this);
  }
  render() {
    return <div>{this.state.selectedName}</div>;
  }
}
```

> 3.  Modify the state

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

## Using Sub Store

> 1.  Combine Substores (create all substores)

```jsx
import { createSubStore } from "@boostbank/stateful/lib/substore";

export default function combineSubStores() {
  createSubStore("input", {});
}
```

> 2.  Connect to substore

```jsx
import React from "react";
import { connectTo, disconnectFrom } from "@boostbank/react-stateful";
import { lookup } from "@boostbank/stateful/lib/substore";

export default class SharedComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sharedText: ""
    };
  }

  componentDidMount() {
    connectTo(this, lookup().input, store => {
      this.setState({
        sharedText: store.sharedText
      });
    });
  }

  componentWillUnmount() {
    disconnectFrom(this, lookup().input);
  }

  render() {
    return (
      <div>
        Shared: <p>{this.state.sharedText}</p>
      </div>
    );
  }
}
```

> 3.  Initiate Change

```jsx
import React from "react";
import {
  lookup,
  subModify,
  subRollback
} from "@boostbank/stateful/lib/substore";

export default class SharedTextInput extends React.Component {
  render() {
    return (
      <div>
        <input
          type={"text"}
          onChange={e => {
            subModify(lookup().input, store => {
              store.sharedText = e.target.value;
              return store;
            });
          }}
        />

        <button
          onClick={() => {
            subRollback(lookup().input);
          }}
        >
          Rollback
        </button>
      </div>
    );
  }
}
```

## Async store updates

> You can now listen for async changes if you are the component that modified the store.

```javascript
import React from "react";
import { connect, disconnect } from "@boostbank/react-stateful";
import { modifyAsync } from "@boostbank/stateful";

export default class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedName: ""
    };
  }

  componentDidMount() {
    // Extra param here.
    // Connecting to global store.
    connect(this, (store, modified) => {
        this.setState(
          {
            selectedName: store.selectedName
          },
          () => {
            // Wait for state to change in the component.
            modified(this);
          }
        );
      }
    );
  }

  onButtonClick = () => {
    modifyAsync(this, store=>{
      store.selectedName = "Async";
      return store;
    }, ()=>{
      // When it is done setting state in the connect.
      alert(`We did it! The state has been changed! Name: ${this.state.selectedName} \n After you click OK React will re-render.`);
    });
    alert(`State may or may not be updated yet... Name: ${this.state.selectedName}`);
  };

  componentWillUnmount() {
    disconnect(this);
  }
  render() {
    return (
      <div>
        Async Component: 
        <button onClick={this.onButtonClick}>Change And Wait</button>
      </div>
    );
  }
}

```

> You can also dot he same logic with `rollbackAsync` for global store. These functions `connectTo`, `subModifyAsync`, and `subRollback` for substores.

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
