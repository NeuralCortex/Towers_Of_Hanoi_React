import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Toast } from "primereact/toast";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { StepPOJO, DiskPOJO } from "./Classes";

export class Control extends Component {
  state = {
    count: 3,
    selectedRow: 0,
    stepList: [],
    stateList: [],
    tableheight: 0,
  };

  componentDidMount() {
    this.setTableHeight();
    this.initAllData(3);
  }

  setTableHeight = () => {
    let control = document.getElementById("control");
    let rectControl = control.getBoundingClientRect();
    this.setState({ tableheight: rectControl.height - 77.97 - 2 * 16 - 52.34 });
  };

  onChangeCount = (e) => {
    this.setState({ count: e.value });
    this.initAllData(e.value);
  };

  onSelectionChange = (e) => {
    this.setState({ selectedRow: e.value });

    this.creatStateList(this.state.count);

    let { stepList, stateList } = this.state;

    for (let i = 0; i <= e.value.step; i++) {
      let stepPOJO = stepList[i];

      stateList[stepPOJO.from].pop();
      stateList[stepPOJO.to].push(new DiskPOJO(i, stepPOJO.disk));
    }

    this.props.setStateList(stateList);
  };

  hanoi = (disks, from, inter, to, list) => {
    if (disks === 1) {
      list.push(new StepPOJO(1, from, to));
    } else {
      this.hanoi(disks - 1, from, to, inter, list);
      list.push(new StepPOJO(disks, from, to));
      this.hanoi(disks - 1, inter, from, to, list);
    }
  };

  initAllData = (size) => {
    let stepList = [];
    stepList.push(new StepPOJO(1, 0, 0));
    this.hanoi(size, 0, 1, 2, stepList);
    this.creatStateList(size);

    let step = 0;
    for (let i = 0; i < stepList.length; i++) {
      stepList[i].setStep(step++);
    }

    this.setState({ stepList });
    this.props.setStackSize(size);
  };

  creatStateList = (size) => {
    let stateList = [[], [], []];
    //stateList.push(new Array([]));
    for (let i = 0; i < size; i++) {
      stateList[0].push(new DiskPOJO(0, size - i));
    }
    //stateList.push(new Array([]));
    //stateList.push(new Array([]));
    //console.log(stateList);
    this.setState({ stateList });
    this.props.setStateList(stateList);
  };

  exportCSV = (selectionOnly) => {
    this.dt.exportCSV({ selectionOnly });
  };

  render() {
    const count = [3, 4, 5, 6, 7, 8, 9, 10];
    window.addEventListener("resize", this.setTableHeight);

    const header = (
      <div className="flex align-items-center justify-content-end gap-2">
        <Button
          type="button"
          icon="pi pi-file"
          rounded
          onClick={() => this.exportCSV(false)}
          data-pr-tooltip="CSV"
        />
      </div>
    );

    return (
      <div
        className="w3-col w3-margin-left"
        style={{ width: "calc(20% - 1*16px)" }}
      >
        <Toast ref={(el) => (this.toast = el)} />
        <div className="w3-container w3-blue w3-margin-top w3-margin-bottom w3-padding">
          <FontAwesomeIcon
            icon="fa-solid fa-table"
            className="w3-margin-right"
          />
          Control
        </div>
        <div
          id="control"
          className="w3-white w3-container w3-padding-16"
          style={{ height: "calc(100vh - 68.5px - 35.89px - 2*31px - 3*16px)" }}
        >
          <div className="w3-row">
            <div className="w3-col">
              <label className="w3-text-blue  below">Number Of Slices</label>
              <Dropdown
                options={count}
                onChange={this.onChangeCount}
                value={this.state.count}
                style={{ width: "100%" }}
                className="below"
              ></Dropdown>

              <label className="w3-text-blue below">Steps</label>
            </div>
            <DataTable
              ref={(el) => {
                this.dt = el;
              }}
              size="small"
              className="w3-tiny w3-col"
              value={this.state.stepList}
              //editable={true}
              selectionMode="single"
              selection={this.state.selectedRow}
              onSelectionChange={(e) => this.onSelectionChange(e)}
              scrollable
              scrollHeight={this.state.tableheight}
              header={header}
            >
              <Column field="step" header="Step" />
              <Column field="disk" header="Disc" />
              <Column field="from" header="From" />
              <Column field="to" header="To" />
            </DataTable>
          </div>
        </div>
      </div>
    );
  }
}

export default Control;
