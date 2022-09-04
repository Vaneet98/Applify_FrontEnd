import React,{useState,useEffect} from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
   
function DoughnutChart() { 

   const [adminData, setAdminData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/admin/graph"
      );
      console.log("This is graph data::",response.data.data);
      setAdminData(response.data.data);
      console.log("This is admin data-----",adminData)
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
      borderColor: ["rgba(255, 99, 132)", "rgba(255, 162, 235)","rgba(255, 205, 86)"],
      borderWidth: 1,
    },
  ],  
}
return (
  <>
    <Doughnut
      data={Donutdata}
      style={{ height: "250px !important", width: "250px !important" }}
    />
    <br />
    <span style={{ marginLeft: "3rem" }}> Blocked {adminData.Block} </span>
    <span style={{ marginLeft: "3rem" }}>UnBlocked {adminData.UnBlock}</span>
    <Divider /> <hr style={{ color: "#0D0D0D" }} />
    <span style={{ marginLeft: "6rem" }}>Total User {adminData.count} </span>
  </>
);
}

export default DoughnutChart;
