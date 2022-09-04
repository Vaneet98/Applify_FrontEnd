import React from "react";
import ChartDonut from "../DoughnutChart/DoughnutChart";
import ChartDonut1 from "../DoughnutChart/DoughnutChart1";
import ChartDonut2 from "../DoughnutChart/DoughnutChart2";
import "./chartcontainer.css";
export default function ChartContainer() {  
  return (
    <div className="container">
      <div className="row">
        <div className="col d-md-flex " style={{width:"100%"}}>
          <div className="col-4">
            <ChartDonut  />
          </div>
          <div className="col-4 ml-3">
            <ChartDonut1 />
          </div>
          <div className="col-4 ml-3">
            <ChartDonut2 />
          </div>
        </div>
      </div>
    </div>
  ); 
}
  