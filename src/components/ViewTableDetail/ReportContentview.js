import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";


function ReportContentview() {
  const params = useParams();
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/ReprotedContent/list/" + params.Id
      );
      console.log("Admiiinview",response)
      setAdmin(response.data.data.user);

    } catch (error) {
      console.log(error);
    }
  }; 
  useEffect(() => { 
    getAdmin();
  }, []);
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px"}}>
        <Card style={{backgroundColor:"#ecf0f1"}}>
          <Card.Body>
            <div className="heading" style={{marginBottom:"10px"}}>
              <Link to="/reports/reportContent" style={{marginRight:"10px"}}>
                <AiOutlineLeft fa-lg color="black" />
              </Link>
             <b><u>Reproted Content Details</u></b> 
            </div>
            <Table borderless>
              <tbody>
                <tr>
                  <td><b>ID</b></td>
                  <td><h6>{admin.Id}</h6></td>
                </tr>
                
                <tr>
                  <td><b>Reported By</b></td>
                  <td><h6>{admin.ReportedBy}</h6></td>
                </tr>
                <tr>
                  <td><b>Status</b></td>
                  <td><h6>{admin.Status}</h6></td>
                </tr>
                <tr>
                  <td><b>Reported Item</b></td>
                  <td><h6>{admin.ReportedItem}</h6></td>
                </tr>
                <tr>
                  <td><b>Date</b></td>
                  <td><h6>{admin.Date}</h6></td>
                </tr>
                <tr>
                  <td><b>Updated At</b></td>
                  <td><h6>{admin.updatedAt}</h6></td>
                </tr>
              </tbody>
              </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ReportContentview;