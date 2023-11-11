import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export class Header extends Component {
  state = {
    time: "",
  };

  componentDidMount() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  }

  getTime = () => {
    let d = new Date();
    let time =
      this.pad(d.getHours(), 2) +
      ":" +
      this.pad(d.getMinutes(), 2) +
      ":" +
      this.pad(d.getSeconds(), 2);
    this.setState({ time });
  };

  pad = (num, size) => {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
  };

  render() {
    return (
      <header id="header">
        <div className="w3-container w3-padding w3-indigo">
          <div className="w3-right w3-tiny">
            <FontAwesomeIcon
              icon="wifi"
              style={{ marginRight: "10px" }}
            ></FontAwesomeIcon>
            <FontAwesomeIcon
              icon="battery-half"
              style={{ marginRight: "10px" }}
            ></FontAwesomeIcon>
            <label>{this.state.time} CET</label>
          </div>
        </div>
        <div className="w3-bar w3-blue w3-xlarge">
          <div className="w3-bar-item" style={{ fontFamily: "arial" }}>
            Towers Of Hanoi{" "}
            <FontAwesomeIcon icon={["fab", "react"]}></FontAwesomeIcon> React
            <div style={{ fontSize: "11px" }} className="w3-wide">
              Graphical solution to the Towers of Hanoi problem
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
