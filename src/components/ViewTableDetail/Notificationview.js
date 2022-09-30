import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";


function Notificationview() {
  const params = useParams();
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/notification/list/" + params.notificationId
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
              <Link to="/notification" style={{marginRight:"10px"}}>
                <AiOutlineLeft fa-lg color="black" />
              </Link>
             <b><u>Notification Details</u></b> 
            </div>
            <Table borderless>
              <tbody>
                <tr>
                  <td><b>ID</b></td>
                  <td><h6>{admin.notificationId}</h6></td>
                </tr>
                <tr>
                  <td><b>Title</b></td>
                  <td><h6>{admin.notification}</h6></td>
                </tr>
                <tr>
                  <td><b>Created At</b></td>
                  <td><h6>{admin.createdAt}</h6></td>
                </tr>
                <tr>
                  <td><b>Updated At</b></td>
                  <td><h6>{admin.updatedAt}</h6></td>
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

export default Notificationview;