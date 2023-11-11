import React, { Component } from "react";
import Control from "./Control";
import Towers from "./Towers";

export class Content extends Component {
  state = {
    stateList: [],
    stackSize: 3,
  };

  setStateList = (stateList) => {
    this.setState({ stateList });
  };

  setStackSize = (stackSize) => {
    this.setState({ stackSize });
  };

  render() {
    return (
      <div className="w3-orange content">
        <div className="w3-row">
          <Towers
            stateList={this.state.stateList}
            stackSize={this.state.stackSize}
          ></Towers>
          <Control
            setStateList={this.setStateList}
            setStackSize={this.setStackSize}
          ></Control>
        </div>
      </div>
    );
  }
}

export default Content;
