import React from "react";
import { connectTo, disconnectFrom } from "@boostbank/react-stateful";
import { lookup } from "@boostbank/stateful";

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
