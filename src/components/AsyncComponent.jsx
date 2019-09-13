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
