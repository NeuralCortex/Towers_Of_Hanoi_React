import React, { Component } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";

library.add(fas, fab, far);

export class MainView extends Component {

  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          fontFamily: "Arial",
          fontSize: "10pt",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header></Header>
        <Content></Content>
        <Footer></Footer>
      </div>
    );
  }
}

export default MainView;
