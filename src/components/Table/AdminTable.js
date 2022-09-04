import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link,useNavigate  } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
import "./Table.css";
const AdminTable = (props) => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
const [state,setState]=useState("")
  const navigate = useNavigate(); 
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
 async function deleteAdmin(adminId){
  await fetch(`http://localhost:4001/admin/delete/${adminId}`,{
    method:"DELETE"
  }).then((result)=>{
    result.json().then((resq)=>{
      console.log("This is resq ",resq);
      toast.success("Admin delete successfull",{position: toast.POSITION.TOP_CENTER});
      getCountries();
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
    },
    {
      name: (
        <h6>
          <b>Name</b>
        </h6>
      ),
      selector: (row) =>row.name,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Title</b>
        </h6>
      ),
      selector: (row) => row.title,
      sortable: true,
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
          <b>Access</b>
        </h6>
      ),
      cell: (row) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "120px",
          }}
        >
          <div>
            <span className="badge bg-secondary access">Dashboard</span>

            <span className="badge bg-primary access ">User Mang</span>
            <br />
          </div>
          <div>
            <span className="badge bg-success access access1">Admin </span>

            <span className="badge bg-info access access1">Notification</span>
          </div>
        </div>
      ),
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
          <button onClick={()=>deleteAdmin(row.adminId)} style={{ border: "none" }}>
            {" "}
            <i className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
          </button>
         <button onClick={()=>blockAdmin(row.adminId)} style={{ border: "none" }}>
            {" "}
            <i class="fa-sharp fa-solid fa-lock-open" ></i>
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
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  return (
    <>
    <SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Admin"
        columns={colunms}
        data={filtercountries}
        pagination
        fixedHeader
        // fixedHeaderScrollHeight="500px"
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
      <Tooltip title="Add Admin" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addAdmin">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
    </div>
    </>
  );
};

export default AdminTable;
