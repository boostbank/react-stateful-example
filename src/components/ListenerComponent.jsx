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
