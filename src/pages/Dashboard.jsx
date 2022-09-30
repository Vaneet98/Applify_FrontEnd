import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./Addadmin.css";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import { Link,useNavigate } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
const Dashboard = () => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  // const [checkbox, setCheckbox] = useState(false);
  const [dashBoardPermission, setDashBoardPermission] = useState(false);
  const [userManagementPermission, setUserManagementPermission] =
    useState(false);
  const [NotificationPermission, setNotificationPermission] = useState(false);
  const [reportPermission, setReportPermission] = useState(false);
  const [adminPermission, setAdminPermission] = useState(false);
  const [systemConfigPermission, setSystemConfigPermission] = useState(false);
  const [selects, setSelects] = useState("");
  const navigate=useNavigate()
  const title=selects;
  function handleSelect(e){
    setSelects(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", selects);
  }
  async function signup() {
    console.log(name, email,title,dashBoardPermission,userManagementPermission,NotificationPermission,reportPermission,adminPermission,systemConfigPermission);
    let item = { name, email ,title,dashBoardPermission,userManagementPermission,NotificationPermission,reportPermission,adminPermission,systemConfigPermission}; 
    console.log(item);
    let result = await fetch(
      "http://localhost:4001/admin/RegistrationAdmin",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    result = await result.json();
    if(result.data.status=== "success"){
     toast.success("Admin Register successfull.Please check the mail for set the password",{position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {
                  navigate("/admin");
                }, 1000);
                }else if(result.statusCode===400){
                  toast.error(result.message)
                }else{
                  toast.error(result.message)
                }
                
    console.log(result);
  }

  return (
    <>
    <SideBar />
    <div className="titles">
      <Container style={{ width: "900px" }}>
        <div className="admin-main">
          <div>
          <Link to="/admin">
            <AiOutlineLeft fa-lg /></Link> Add admin
          </div>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="required-FIELD">Name</Form.Label>
              <Form.Control
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter Name"
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.name}
              </p>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={email}
                name="email"
                type="email"
                placeholder="name@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.email}
              </p>
            </Form.Group>
            <Form.Label>Admin Type</Form.Label>
            <Form.Select
              id="select"
              value={selects}
              onChange={handleSelect}
            >
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
              }}
              type="submit"
              onClick={signup}
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

export default Dashboard;