import React, { Component } from "react";
import { modify, rollback } from "@boostbank/stateful";

export default class ModifierComponent extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }

  componentDidMount() {}

  onChangeClick = e=> {
    if (this.state.name.length > 0) {
      modify(state => {
        state.selectedName = this.state.name;
        return state;
      });
    }
  }

  onNameChange = e=> {
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
            // You can rollback versions. If you depth is greather than 0 when you create a store.
            rollback();
          }}
        >
          Rollback
        </button>
      </div>
    );
  }
}