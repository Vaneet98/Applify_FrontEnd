import React, { useState, useEffect } from "react";
import SideBar from "../Sidebar/SideBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { AiOutlineLeft } from "react-icons/ai";
import logo from "./Applify.jpeg";

function Userview() {
  const params = useParams();
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/list/" + params.id
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
              <Link to="/usersManagement" style={{marginRight:"10px"}}>
                <AiOutlineLeft fa-lg color="black" />
              </Link>
             <b><u>User Details</u></b> 
            </div>
            <Table borderless>
              <tbody>
                <tr>
                  <td><b>ID</b></td>
                  <td><h6>{admin.id}</h6></td>
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
                  <td><b>Phone Number</b></td>
                  <td><h6>{admin.phoneNumber}</h6></td>
                </tr>
                <tr>
                  <td><b>Block(1)/Unblock(0)</b></td>
                  <td><h6>{admin.Isblocked}</h6></td>
                </tr>
                <tr>
                  <td><b>Image</b></td>
                  <td>
                    {/* <img 
                      width={150}
                      height={100}
                      style={{ objectFit: "cover" }}
                      src={`http://localhost:4001/${admin.image}`}
                      alt=""
                    /> */}
                   <img alt="" width={400} height={150} src={logo}  style={{ objectFit: "cover" }} />
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

export default Userview;