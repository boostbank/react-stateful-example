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
    return <div><br/> <h2>Current name: {this.state.selectedName}</h2></div>;
  }
}