import React,{useState,useEffect} from "react";
import axios from "axios";
import { Typography, Divider } from "antd";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);



function DoughnutChart1() { 
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
      data: [adminData.Web,adminData.Android,adminData.IOS],
      backgroundColor: ["#B53471", "#00FF00", "#0000FF" ],
      borderColor: ["rgba(255, 99, 132)", "rgba(255, 162, 235)","rgba(255, 205, 86)"],
      borderWidth: 1,
    },
  ], 
}
return (
  <>
    <Doughnut data={Donutdata} />
    <br />
    <span style={{ marginLeft: "1rem" }}> Android {adminData.Android} </span>
    <span style={{ marginLeft: "2rem" }}>IOS {adminData.IOS} </span>
    <span style={{ marginLeft: "2rem" }}> WEB {adminData.Web}</span>
    <Divider />
    <hr />
    <span style={{ marginLeft: "6rem" }}>
      Total User {adminData.AppTotal}
    </span>
  </>
);
}

export default DoughnutChart1;
