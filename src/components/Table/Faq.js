import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { toast } from "react-toastify";
// import { Tooltip, Fab } from "@mui/material";
// import { Add } from "@mui/icons-material";
// import { Link  } from "react-router-dom";
const Faq = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
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
  //  async function deleteCatagory(id){
  //   await fetch(`http://localhost:4001/category/deleteCategory/${id}`,{
  //     method:"DELETE"
  //   }).then((result)=>{
  //     result.json().then((resq)=>{
  //       console.log("This is user request ",resq);
  //       toast.success("User delete successfull",{position: toast.POSITION.TOP_CENTER});
  //       getCountries(); 
  //     })
  //   }) 
  //  }
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
      selector: (row) => <img alt="" width={80} height={50} src={"http://localhost:4001/"+row.image} />,
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
    // {
    //   name: (
    //     <h6>
    //       <b>Action</b>
    //     </h6>
    //   ),
    //   cell: (row) => (
    //     <div
    //       style={{
    //         display: "flex",
    //         justifyContent: "space-between",
    //         width: "110px",
    //       }}
    //     >
    //       <button onClick={()=>deleteCatagory(row.cId)} style={{ border: "none" }}>
    //         {" "}
    //         <i className="fa-regular fa-trash-can fa-lg"></i>
    //       </button>
    //     </div>
    //   ), 
    // },
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
    <div style={{marginLeft:"235px",width:"900px"}}>
      <DataTable
        title="Category"
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
       {/* <Tooltip title="Add Category" style={{ float: "right" }}>
        <Fab color="#f6e58d" aria-label="add">
          <Link to="/addCategory">
            <Add fontSize="large" />
          </Link>
        </Fab>
      </Tooltip> */}
    </div>
    </>
  );
};

export default Faq;
