import React, { Component } from "react";

let offsetY = 50;

export class Towers extends Component {
  state = {
    stackSize: 3,
    colorList: [],
    stateList: [],
  };

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.stateList !== this.props.stateList) {
      this.init();
    }
  }

  init = () => {
    let draw = document.getElementById("draw");

    let rectDraw = draw.getBoundingClientRect();

    let width = rectDraw.width;
    let height = rectDraw.height;

    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    this.reset(ctx, width, height);
    this.drawTowers(ctx, width, height);
    this.drawDisks(ctx, width, height);
  };

  reset = (ctx, width, height) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);
  };

  drawTowers = (ctx, width, height) => {
    ctx.font = "15px arial";
    ctx.fillStyle = "black";

    let startX = 0;
    let startY = height - offsetY;
    let endX = width;
    let endY = startY;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();

    for (let i = 1; i < 4; i++) {
      startX = width * (i / 4.0);
      startY = height - offsetY;
      endX = startX;
      endY = 0;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.fillText("Tower:" + (i - 1), startX, height - offsetY + 10);
    }
  };

  initColorList = (size) => {
    let colorList = [];
    for (let i = 0; i < size + 1; i++) {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      colorList.push("rgb(" + r + "," + g + "," + b + ")");
    }
    this.setState({ colorList });
  };

  drawDisks = (ctx, width, height) => {
    let { stateList, stackSize } = this.props;

    for (let tower = 0; tower < stateList.length; tower++) {
      for (let disk = 0; disk < stateList[tower].length; disk++) {
        let diskPOJO = stateList[tower][disk];
        let desc = diskPOJO.desc;
        if (desc - 1 > this.state.colorList.length) {
          this.initColorList(stackSize);
        }
        let color = this.state.colorList[desc - 1];
        let w = width * (1.0 / 4.0) - (stackSize - desc) * 20;
        let h = (height - offsetY) / 10.0;
        this.stackRect(ctx, tower + 1, disk, desc, w, h, color, width, height);
      }
    }
  };

  stackRect = (ctx, tower, pos, desc, w, h, color, width, height) => {
    let middle = (width * tower) / 4.0;
    let x = middle - w / 2.0;
    let y = height - offsetY - pos * h - h;

    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.fill();

    ctx.strokeRect(x, y, w, h);

    let text = desc + "";

    ctx.font = "bold 20px arial";
    ctx.fillStyle = "white";

    x = middle;
    y = height - offsetY - (pos * h + h / 2.0 + 5);

    ctx.fillText(text, x, y);
  };

  render() {
    window.addEventListener("resize", this.init);
    return (
      <div
        className="w3-col w3-margin-left w3-margin-top"
        style={{ width: "calc(80% - 2*16px)" }}
      >
        <div
          id="draw"
          className="w3-indigo"
          style={{ height: "calc(100vh - 68.5px - 2*16px - 2*31px)" }}
        >
          <canvas id="canvas"></canvas>
        </div>
      </div>
    );
  }
}

export default Towers;
