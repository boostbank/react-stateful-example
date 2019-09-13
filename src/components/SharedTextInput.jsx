import React from "react";
import {
  lookup,
  subModify
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
      </div>
    );
  }
}
