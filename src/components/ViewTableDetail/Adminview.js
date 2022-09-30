import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";


function Adminview() {
  const params = useParams();
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/admin/lists/" + params.adminId
      );
      console.log("Admiiinview",response)
      setAdmin(response.data.data);

    } catch (error) {
      console.log(error);
    }
  }; 
  useEffect(() => {
    getAdmin();
  }, []);
  console.log("Admin view by me",admin.dashBoardPermission)
  return (
    <>
      <SideBar />
      <div style={{ padding: "40px", marginLeft: "235px"}}>
        <Card style={{backgroundColor:"#ecf0f1"}}>
          <Card.Body>
            <div className="heading" style={{marginBottom:"10px"}}>
              <Link to="/admin" style={{marginRight:"10px"}}>
                <AiOutlineLeft fa-lg color="black" />
              </Link>
             <b><u>Admin Details</u></b> 
            </div>
            <Table borderless>
              <tbody>
                 <tr>
                  <td><b>ID</b></td>
                  <td><h6>{admin.adminId}</h6></td>
                </tr>
                <tr>
                  <td><b>Name</b></td>
                  <td><h6>{admin.name}</h6></td>
                </tr>
                <tr>
                  <td><b>Email</b></td>
                  <td><h6>{admin.email}</h6></td>
                </tr>
                <tr>
                  <td><b>Admin Type</b></td>
                  <td><h6>{admin.title}</h6></td>
                </tr>
                <tr>
                  <td><b>Created At</b></td>
                  <td><h6>{admin.createdAt}</h6></td>
                </tr>

                <tr>       
                  <td><b>Admin Type</b></td>
                  <td><div>
                    {admin.dashBoardPermission ?<span className="badge bg-primary access1">Dashboard</span>:<span className="badge bg-primary access1">No Dashboard</span>}
                    {admin.userManagementPermission === true ? <span className="badge bg-primary access1">User Mang</span>: <span className="badge bg-primary access1">No UserMang</span>}    
            
          
          {admin.NotificationPermission === true ? <span className="badge bg-primary access1">Notification </span>: <span className="badge bg-primary access1">No Notifi</span>}
          {admin.adminPermission === true ?<span className="badge bg-primary access1">Admin</span>:<span className="badge bg-primary access1">No Admin</span>} 
          
          {admin.reportPermission === true ?<span className="badge bg-primary access1">Report</span>:<span className="badge bg-primary access1">No Report</span>}
          {admin.systemConfigPermission === true ?<span className="badge bg-primary access1">SystemConfi</span>:<span className="badge bg-primary access1">No SystemConfi</span>}
          </div></td>
                </tr>        
                <tr>
                  <td><b>Image</b></td>
                  <td>
                    <img
                      width={150}
                      height={100}
                      style={{ objectFit: "cover" }}
                      src={`http://localhost:4001/${admin.image}`}
                      alt=""
                    />
                    </td>
                    </tr>
              </tbody>
              </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Adminview;