import axios from "axios";
import React, { useEffect, useState } from "react"
import { Tooltip, Fab } from "@mui/material";
import { Link,useNavigate  } from "react-router-dom";
import { Add } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
const  UserTable = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate = useNavigate(); 
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    localStorage.removeItem("id");
  };
  const handleShow = (id) => {
    setShow(true);
    localStorage.setItem("id", id);
  };
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/countuserByEmail"
      );
      console.log("UserTable data:",response.data.data.rows);
      setCountries(response.data.data.user.rows);
      setFiltercountries(response.data.data.user.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteUser(){
    let id = localStorage.getItem("id");
    await fetch(`http://localhost:4001/api/delete/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        toast.success("User delete successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries(); 
        handleClose();
      })
    }) 
   }
   async function block(id){
    await fetch(`http://localhost:4001/api/block/${id}`,{
      method:"PUT"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        if(resq.data.status===200){
          toast.success("User Blocked successfull",{position: toast.POSITION.TOP_CENTER});
          getCountries(); 
        }
        else{
          toast.success("User UnBlocked successfull",{position: toast.POSITION.TOP_CENTER});
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
      selector: (row) => row.id,
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
        grow: 0.7
    },
    {
      name: (
        <h6>
          <b>Phone No</b>
        </h6>
      ),
      selector: (row) => row.phoneNumber,
      sortable: true,
      grow: 0.7
    },     
    {
      name: (
        <h6>
          <b>Email</b>
        </h6>
      ),
      selector: (row) => row.email,
      sortable: true,
    },

    // {
    //   name: (
    //     <h6>
    //       <b>Access</b>
    //     </h6>
    //   ),
    //   cell: (row) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "120px",
    //       }}
    //     >
    //       <div>
    //         <span className="badge bg-secondary">Dashboard</span>
    //         <span className="badge bg-primary">User Management</span>
    //         <br />
    //       </div>
    //       <div>
    //         <span className="badge bg-success">Admin</span>
    //         <span className="badge bg-info">Notification</span>
    //       </div>
    //     </div>
    //   ),
    // },
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
          <button onClick={()=>navigate(`/editUser/${row.id} `)} style={{ border: "none" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button>
          <button onClick={() => handleShow(row.id)} style={{ border: "none" }}>
          {" "}
            <i  className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
          </button>
          <button onClick={ ()=>block(row.id)} style={{ border: "none" }}>
            {" "}
            <i className="fa-sharp fa-solid fa-lock-open"style={{color:"green"}}></i>
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
      return country.name.toLowerCase().match(search.toLowerCase())||country.email.toLowerCase().match(search.toLowerCase())||country.phoneNumber.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
    const handleRowClicked = (row) => {
    navigate(`/userdetails/${row.id}`);
  };
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title=" UserTable"
        columns={colunms}
        data={filtercountries}
        pagination
        paginationComponentOptions={paginationComponentOptions}
        fixedHeader
        // fixedHeaderScrollHeight="500px"
        selectableRowsHighlight
        highlightOnHover
        striped
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
          <Link to="/addUser">
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

export default UserTable;
