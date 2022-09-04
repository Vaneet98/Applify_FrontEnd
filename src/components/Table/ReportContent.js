import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import SideBar from "../Sidebar/SideBar";
import { toast } from "react-toastify";
const ReportContent = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtercountries, setFiltercountries] = useState([]);
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/ReprotedContent/list?limit=10&skip=0"
      );
      console.log(response);
      setCountries(response.data.data.rows);
      setFiltercountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
 
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
          <b>Reported By</b>
        </h6>
      ),
      selector: (row) => row.ReportedBy,
      sortable: true,
    },

    {
      name: (
        <h6>
          <b>Status</b>
        </h6>
      ),
      selector: (row) => row.Status,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Date</b>
        </h6>
      ),
      selector: (row) => row.Date,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported Item</b>
        </h6>
      ),
      selector: (row) => row.ReportedItem,
      sortable: true,
    },
    {
      name: (
        <h6>
          <b>Reported Description</b>
        </h6>
      ),
      selector: (row) => row.Description,
      sortable: true,
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
        title="Reported Content"
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
    </div>
    </>
  );
};

export default ReportContent;
