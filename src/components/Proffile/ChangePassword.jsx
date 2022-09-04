import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { authenticate } from "../../helper/ApiCall.js";
import { useNavigate} from "react-router-dom";
// import SideBar from "../Sidebar/SideBar";
import "./ChangePwd.css";
export default function ChangePassword() {
  let user = JSON.parse(localStorage.getItem("jwt"));
  const navigate=useNavigate()
  const [values, setValues] = useState({
    email: "",
    old_password: "",
    new_password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !old_password || !new_password || !confirmPassword) {
      return toast.error("Please Fill out all the Fields");
    }
  };

  async function changePawd() {
    console.log(email, old_password, new_password, confirmPassword);
    let item = { email, old_password, new_password, confirmPassword };
    console.log(item);
    let result = await fetch("http://localhost:4001/admin/changepassword", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    toast.success("Password Updation Successful.");

   navigate("/profile")
    console.log(result);
  }

  const { email, old_password, new_password, confirmPassword } = values;
  return (
    <div>
    <Container>
      <div className="admin-main">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required-FIELD">Email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              placeholder="Enter Email"
              name="email"
              value={values.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required-FIELD">
              Enter Old Password
            </Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Enter old password"
              name="old_password"
              value={values.old_password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Enter New Password"
              name="new_password"
              value={values.new_password}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={values.confirmPassword}
            />
          </Form.Group>
          <Button
            style={{ width: "100%", backgroundColor: "black", color: "white" }}
            type="submit"
            onClick={changePawd}
          >
            Save
          </Button>
        </Form>
      </div>
    </Container>
    </div>
  );
}
