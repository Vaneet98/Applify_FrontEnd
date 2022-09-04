import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import {Link, useNavigate  } from "react-router-dom";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
const Notification = () => {
  const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/notification/list?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteNotification(notificationId){
    await fetch(`http://localhost:4001/notification/delete/${notificationId}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is notifation request ",resq);
        toast.success("Notification delete successfull");
        getCountries();
      })
    })
   }
  const colunms = [
    {
      name: (
        <h6>
          <b>ID</b>
        </h6>
      ),
      selector: (row) => row.notificationId,
      sortable: true,
    },
    { 
      name: (
        <h6>
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.userType,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Message</b>
        </h6>
      ),
      selector: (row) => row.notification,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Image</b>
        </h6>
      ),
      selector: (row) => <img alt="" width={80} height={50} src={`http://localhost:4001/${row.image}`} />,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Action</b>
        </h6>
      ),
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "110px",
          }}
        >
          <button onClick={()=>deleteNotification(row.notificationId)} style={{ border: "none" }}>
            {" "}
            <i className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
          </button>
          <button onClick={()=>navigate(`/editNotification/${row.notificationId} `)} style={{ border: "none" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button>
        </div>
      ),
    },
  ];
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.userType.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Notification"
        columns={colunms}
        data={filtercountries}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search here"
            className="  form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />
       <Tooltip title="Add Notification" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addNotification">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
    </div>
    </>
  );
};

export default Notification;
