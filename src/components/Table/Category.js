import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar"
import { toast } from "react-toastify";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link ,useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "./Applify.jpeg";
const Category = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const [show, setShow] = useState(false);
const navigate=useNavigate()
  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("cId");
  };
  const handleShow = (cId) => {
    setShow(true);
    localStorage.setItem("cId", cId);
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/category/list?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
   async function deleteCatagory(){
    let cId = localStorage.getItem("cId");
    await fetch(`http://localhost:4001/category/deleteCategory/${cId}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        toast.success("Category delete successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries(); 
        handleClose();
      })
    }) 
   }
  const colunms = [
    {
      name: (
        <h6>
          <b>Serial No</b>
        </h6>
      ),
      selector: (row) => row.cId,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) => row.name,
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
            <b>CreatedAt</b>
          </h6>
        ),
        selector: (row) => row.createdAt,
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
          <button onClick={() => handleShow(row.cId)} style={{ border: "none" }}>
            {" "}
            <i className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
          </button>
          <button style={{ border: "none" }}>
            {" "}
            <i className="fa-sharp fa-solid fa-lock-open"></i>
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
      return country.name.toLowerCase().match(search.toLowerCase())||country.createdAt.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  const handleRowClicked = (row) => {
    navigate(`/categorydetails/${row.cId}`);
  };
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Category"
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
       <Tooltip title="Add Category" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addCategory">
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
            <Button variant="primary" onClick={deleteCatagory}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default Category;
