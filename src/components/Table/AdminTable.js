import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link,useNavigate  } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import logo from "./Applify.jpeg";
import "./Table.css";
const AdminTable = (props) => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
const [state,setState]=useState("")
  const navigate = useNavigate(); 
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("adminId");
  };
  const handleShow = (adminId) => {
    setShow(true);
    localStorage.setItem("adminId", adminId);
  };
  // let user=JSON.parse(localStorage.getItem("jwt"))
  // axios.interceptors.request.use(
  //   config=>{
  //     config.headers.authorization=`${user}`
  //     return config;
  //   },
  //   error=>{
  //     return Promise.reject(error);
  //   }
  // )
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/admin/list?limit=100&skip=0"
      );
      console.log(response.data.data.rows);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
 async function deleteAdmin(){
  let adminId = localStorage.getItem("adminId");
  await fetch(`http://localhost:4001/admin/delete/${adminId}`,{
    method:"DELETE"
  }).then((result)=>{
    result.json().then((resq)=>{
      console.log("This is resq ",resq);
      toast.success("Admin delete successfull",{position: toast.POSITION.TOP_CENTER});
      getCountries();
      handleClose();
    })
  })
 }
 async function blockAdmin(adminId){
  await fetch(`http://localhost:4001/admin/block/${adminId}`,{
    method:"PUT"
  }).then((result)=>{
    result.json().then((resq)=>{
      console.log("This is resqest for block ",resq);
      setState(resq)
      if(resq.data.status===200)
      {
      toast.success("Admin block successfull",{position: toast.POSITION.TOP_CENTER});
      getCountries();
      }
      else{
        toast.success("Admin Unblock successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries();
      }
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
      selector: (row) => row.adminId,
      sortable: true,
      grow: 0.5
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) =>row.name,
      sortable: true,
      grow: 0.45
    },
    {
      name: (
        <h6>
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.title,
      sortable: true,
      grow: -1
    },
    { 
      name: (
        <h6>
          <b>Email</b>
        </h6>
      ),
      selector: (row) => row.email,
      sortable: true,
      grow: 0.7
    },
    {
      name: (
        <h6>
          <b>Image</b>
        </h6>
      ),
      selector: (row) => row.image?<img alt="" width={80} height={70} src={`http://localhost:4001/${row.image}`} />:<img alt="" width={80} height={70} src={logo} />,
      sortable: true,
      grow: 0.5
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
          <button onClick={()=>navigate(`/editAdmin/${row.adminId} `)}  style={{ border: "none" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg" style={{color:"blue"}}></i>
          </button>
          <button onClick={() => handleShow(row.adminId)} style={{ border: "none" }}>
            {" "}
            <i className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
          </button>
         <button onClick={()=>blockAdmin(row.adminId)} style={{ border: "none" }}>
            {" "}
            <i className="fa-sharp fa-solid fa-lock-open" style={{color:"green"}} ></i>
          </button>
        </div>
      ), 
     
    },
  ];
  const paginationComponentOptions = {
    // rowsPerPageText: 'Filas por página',
    rangeSeparatorText: 'Total',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos',
};
  useEffect(() => {
    getCountries();
  }, []);
  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase())||country.email.toLowerCase().match(search.toLowerCase())||country.title.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  const handleRowClicked = (row) => {
    navigate(`/admindetails/${row.adminId}`);
  };
  return (
    <>
    <SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Admin"
        columns={colunms}
        data={filtercountries}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        // theme="solarized"
        fixedHeader
        // fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        // striped   //Color change of rows
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
          <Link to="/addAdmin">
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
            <Button variant="primary" onClick={deleteAdmin}>
              Yes
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
    </>
  );
};

export default AdminTable;
