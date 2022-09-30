import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./Addadmin.css";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import { Link, useNavigate, useParams } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
import axios from "axios";
const AdminEdit = (props) => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [countries, setCountries] = useState([]);
  const [dashBoardPermission, setDashBoardPermission] = useState(false);
  const [userManagementPermission, setUserManagementPermission] =
    useState(false);
  const [NotificationPermission, setNotificationPermission] = useState(false);
  const [reportPermission, setReportPermission] = useState(false);
  const [adminPermission, setAdminPermission] = useState(false);
  const [systemConfigPermission, setSystemConfigPermission] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  function handleSubmit(e) {
    e.preventDefault()
    console.log("data", name, title);
  }
  function handleSelect(e) {
    setTitle(e.target.value);
  }
  //Use for after delete page refresh
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/admin/list?limit=100&skip=0"
      );
      console.log(response.data.data.rows);
      setCountries(response.data.data.rows);
      console.log("Admin Edit detqails", response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };
  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/admin/lists/" + params.id
      );
      console.log("Admiiinviewsssssssss",response)
      setAdmin(response.data.data);

    } catch (error) {
      console.log(error);
    }
  };   
  useEffect(() => {
    getAdmin();
  }, []);

  async function save() {
    let item = { name, title,dashBoardPermission,userManagementPermission,NotificationPermission,reportPermission,adminPermission,systemConfigPermission };
    await fetch("http://localhost:4001/admin/editAdminDetails/" + params.id, {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        console.log("This is resq ", resq);
        if(resq.statusCode===400){
          toast.error(resq.message)
        }
        else if(resq.data.status===200){
          toast.success("Admin Edit successfull", {
            position: toast.POSITION.TOP_CENTER,
          });
          getCountries();
          localStorage.removeItem("response")
          setTimeout(() => {
            navigate("/admin");
          }, 1000);
        }
        else if(resq.data.status===402){
          toast.error(resq.data.message)
        }
        
      });
    });
  }
let user=JSON.parse(localStorage.getItem("response"));
console.log("User json",user)
  useEffect(() => {
    getCountries();
  }, []);
  return (
    <>
      <SideBar />
      <div className="titles">
        <Container style={{ width: "900px" }}>
          <div className="admin-main">
            <div>
              <Link to="/admin">
                <AiOutlineLeft fa-lg />
              </Link>{" "}
              Edit admin
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  type="text"
                  // placeholder={user.data.data.name} 
                  placeholder={admin.name} 
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.name}
                </p>
              </Form.Group>
              <Form.Label>Admin Type</Form.Label>
              <Form.Select id="select" value={title} onChange={handleSelect} >
                <option> </option>
                <option>Super Admin</option>
                <option>Sub Admin</option>
              </Form.Select>
              <Form.Group>
              <Form.Check
                inline
                label="dashBoardPermission"
                name="dashBoardPermission"
                value={dashBoardPermission}
                onChange={(e) => setDashBoardPermission(e.target.checked)}
              />
              <Form.Check
                inline
                label="userManagementPermission"
                name="userManagementPermission"
                value={userManagementPermission}
                onChange={(e) => setUserManagementPermission(e.target.checked)}
              />
              <Form.Check
                inline
                label="NotificationPermission"
                name="NotificationPermission"
                value={NotificationPermission}
                onChange={(e) => setNotificationPermission(e.target.checked)}
              />
              <Form.Check
                inline
                label="reportPermission"
                name="reportPermission"
                value={reportPermission}
                onChange={(e) => setReportPermission(e.target.checked)}
              />
              <Form.Check
                inline
                label="adminPermission"
                name="adminPermission"
                value={adminPermission}
                onChange={(e) => setAdminPermission(e.target.checked)}
              />
              <Form.Check
                inline
                label="systemConfigPermission"
                name="systemConfigPermission"
                value={systemConfigPermission}
                onChange={(e) => setSystemConfigPermission(e.target.checked)}
              />
            </Form.Group>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                  cursor: "pointer",
                }}
                type="submit"
                onClick={() => save()}
              >
                Save
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminEdit;
