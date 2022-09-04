import React from "react";
import Smallchart1 from "../DoughnutChart/Smallchart1";
import Smallchart2 from "../DoughnutChart/Smallchart2";
import "./chartcontainer.css";

export default function ChartContainer1() {
  return (
    <div className="container">
      <div className="row">
        <div
          className="col d-md-flex"
          style={{ justifyContent: "space-between" }}
        >
          <div className="col-4" style={{ marginLeft: "-6rem" }}>
            <Smallchart1 />
          </div>
          <div className="col-4">
            <Smallchart2 />
          </div>
        </div>
      </div>
    </div>
  );
}
  