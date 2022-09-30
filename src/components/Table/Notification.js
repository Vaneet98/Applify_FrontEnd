import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import {Link, useNavigate  } from "react-router-dom";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "./Applify.jpeg";
const Notification = () => {
  const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("notificationId");
  };
  const handleShow = (notificationId) => {
    setShow(true);
    localStorage.setItem("notificationId", notificationId);
  };
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
  async function deleteNotification(){
    let notificationId = localStorage.getItem("notificationId");
    await fetch(`http://localhost:4001/notification/delete/${notificationId}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is notifation request ",resq);
        toast.success("Notification delete successfull");
        getCountries();
         handleClose();
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
      selector: (row) =>  row.image?<img alt="" width={80} height={70} src={`http://localhost:4001/${row.image}`} />:<img alt="" width={80} height={70} src={logo} />,
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
          <button onClick={()=>navigate(`/editNotification/${row.notificationId} `)} style={{ border: "none" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button>
          <button onClick={() => handleShow(row.notificationId)} style={{ border: "none" }}>
            {" "}
            <i className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
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
      return country.userType.toLowerCase().match(search.toLowerCase())||country.notification.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
    const handleRowClicked = (row) => {
    navigate(`/notificationdetails/${row.notificationId}`);
  };
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Notification"
        columns={colunms}
        data={filtercountries}
        pagination
        fixedHeader
        // fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        subHeader
        onRowClicked={handleRowClicked}
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
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Important message</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete this record?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={deleteNotification}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Notification;
