import axios from "axios";
import React, { useEffect, useState } from "react"
import { Tooltip, Fab } from "@mui/material";
import { Link,useNavigate  } from "react-router-dom";
import { Add } from "@mui/icons-material";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
const  UserTable = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate = useNavigate(); 
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
  async function deleteUser(id){
    await fetch(`http://localhost:4001/api/delete/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        toast.success("User delete successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries(); 
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
    },
    {
      name: (
        <h6>
          <b>Phone No</b>
        </h6>
      ),
      selector: (row) => row.phoneNumber,
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
          <button onClick={()=>deleteUser(row.id)} style={{ border: "none" }}>
          {" "}
            <i  className="fa-regular fa-trash-can fa-lg" style={{color:"red"}}></i>
          </button>
          <button onClick={ ()=>block(row.id)} style={{ border: "none" }}>
            {" "}
            <i class="fa-sharp fa-solid fa-lock-open"></i>
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
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title=" UserTable"
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
       <Tooltip title="Add Admin" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addUser">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
    </div>
    </>
  );
};

export default UserTable;
