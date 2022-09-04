import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar"
import { Tooltip, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Link,useNavigate  } from "react-router-dom";
import { toast } from "react-toastify"; 
const AppVersion = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const navigate=useNavigate()
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
  async function deleteUser(id){
    await fetch(`http://localhost:4001/app/delete/${id}`,{
      method:"DELETE"
    }).then((result)=>{
      result.json().then((resq)=>{
        console.log("This is user request ",resq);
        toast.success("App detail delete successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries(); 
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
          <button onClick={()=>deleteUser(row.AppId)} style={{ border: "none" }}>
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
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFiltercountries(result);
  }, [search]);
  return (
    <><SideBar/>
    <div style={{marginLeft:"235px",width:"1000px"}}>
      <DataTable
        title="AppVersion"
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
          <Link to="/addAppVersion">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip>
    </div>
    </>
  );
};

export default AppVersion;
