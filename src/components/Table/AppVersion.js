import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar"
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link,useNavigate  } from "react-router-dom";
import { toast } from "react-toastify"; 
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const AppVersion = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate=useNavigate()
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("AppId");
  };
  const handleShow = (AppId) => {
    setShow(true);
    localStorage.setItem("AppId", AppId);
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/app/filterVersion?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteUser(){
    let AppId = localStorage.getItem("AppId");
    await fetch(`http://localhost:4001/app/delete/${AppId}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        toast.success("App detail delete successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries(); 
        handleClose();
      })
    }) 
  } 
  const colunms = [
    {
      name: (
        <h6>
          <b>AppId</b>
        </h6>
      ),
      selector: (row) => row.AppId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.AppName,
      sortable: true,
    },
    
    {
        name: (
          <h6>
            <b>Plateform</b>
          </h6>
        ),
        selector: (row) => row.plateform,
        sortable: true,
      },
    {
        name: (
          <h6>
            <b>Minimum Version</b>
          </h6>
        ),
        selector: (row) => row.minimumVersion,
        sortable: true,
      },
      {
        name: (
          <h6>
            <b>Latest Version</b>
          </h6>
        ),
        selector: (row) => row.latestVersion,
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
          <button  onClick={()=>navigate(`/editAppVersion/${row.AppId} `)} style={{ border: "none" }}> 
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button>
          <button onClick={() => handleShow(row.AppId)} style={{ border: "none" }}>
            {" "}
            <i  className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
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
      return country.AppName.toLowerCase().match(search.toLowerCase())||country.plateform.toLowerCase().match(search.toLowerCase())||country.minimumVersion.toLowerCase().match(search.toLowerCase())||country.latestVersion.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  const handleRowClicked = (row) => {
    navigate(`/appdetails/${row.AppId}`);
  };
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="AppVersion"
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
      <Tooltip title="Add Admin" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addAppVersion">
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
            <Button variant="primary" onClick={deleteUser}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AppVersion;
