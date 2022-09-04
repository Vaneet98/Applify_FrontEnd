import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Smallchart1 = () => {
  const [adminData, setAdminData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:4001/admin/graph");
      console.log("This is graph data::", response.data.data);
      setAdminData(response.data.data);
      console.log("This is admin data-----", adminData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const Donutdata = {
    datasets: [
      {
        label: "# of Votes",
        data: [adminData.Block, adminData.UnBlock ],
        backgroundColor: ["#3C3C3C", "#F47004"],
        borderColor: ["rgba(255, 99, 132)", "rgba(255, 162, 235)"],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Doughnut
        data={Donutdata}
        style={{ height: "300px !important", width: "250px !important" }}
      />
      <br />
      <span> Blocked {adminData.Block} </span>
      <span style={{ marginLeft: "1rem" }}>UnBlocked {adminData.UnBlock}</span>
      <Divider /> <hr />
      <span style={{ marginLeft: "3rem" }}>Total User {adminData.count} </span>
    </>
  );
};

export default Smallchart1;