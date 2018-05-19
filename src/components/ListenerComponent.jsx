import React from "react";
import { connect, disconnect } from "@boostbank/react-stateful";

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

  componentWillUnmount() {
    disconnect(this);
  }
  render() {
    return <div>{this.state.selectedName}</div>;
  }
}
