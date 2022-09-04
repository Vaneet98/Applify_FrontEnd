import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const AdminAchivement = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate=useNavigate();
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/Achivement/list?limit=100&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  async function deleteAdminAchivement(adminId){
  await fetch(`http://localhost:4001/Achivement/delete/${adminId}`,{
    method:"DELETE"
  }).then((result)=>{
    result.json().then((resq)=>{
      console.log("This is resq ",resq);
      toast.success("Admin Achivement delete successfull",{position: toast.POSITION.TOP_CENTER});
      getCountries();
    })
  })
 }
  const colunms = [ 
    {
      name: (
        <h6>
          <b>Id</b>
        </h6>
      ),
      selector: (row) => row.Id,
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
            <b>Type</b>
          </h6>
        ),
        selector: (row) => row.Type,
        sortable: true,
      },
    {
        name: (
          <h6>
            <b>createdAt</b>
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
          <button onClick={()=>navigate(`/editAdminAchivement/${row.Id} `)}  style={{ border: "none" }}>
            {" "}
            <i className="fa-solid fa-pen fa-lg"style={{color:"blue"}}></i>
          </button>
          <button onClick={()=>deleteAdminAchivement(row.Id)} style={{ border: "none" }}>
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
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  return (
    <> 
    <SideBar/> 
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="Admin Achivement"
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
       <Tooltip title="Add Admin Achivement" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addAdminAchivement">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
    </div>
    </>
  );
};

export default AdminAchivement;
