import React, {  useState } from "react";
import "../components/loginnnnn/login.css";
import logo from "../components/loginnnnn/logo.png"
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { toast } from "react-toastify";

function SetPassword() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
  const { email, password, confirmPassword } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
  };

  async function setPwd() {
    let item = { email, password, confirmPassword };
    await fetch(`http://localhost:4001/admin/setpassword`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        toast.success("Password set  successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);
      });
    });
  }

  return (
    <Container id="container" className="d-grid">
      <Form id="login-form" className=" w-100 mt-0" onSubmit={handleSubmit}>
        <div id="header">
          <img className="logo" src={logo} alt="" />
          <h5 className="fs-3 fw-normal text-muted">
            We love creative Business Ideas
          </h5>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
            name="email"
            value={email}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Enter New Password"
            name="password"
            value={password}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
          />
        </Form.Group>
        <button id="btn" onClick={setPwd}>
          Save
        </button>
      </Form>
    </Container>
  );
}

export default SetPassword;