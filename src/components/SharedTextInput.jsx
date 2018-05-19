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
