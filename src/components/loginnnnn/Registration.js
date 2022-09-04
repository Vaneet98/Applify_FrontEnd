import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import "../../../src/pages/Addadmin.css";
import Validate from "../Validate";
import useForm from "../useForm";
import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Registration = () => { 
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [selects, setSelects] = useState("");
  const navigate=useNavigate()
  const title=selects;
  function handleSelect(e){
    setSelects(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", checkbox, selects);
  }
  async function signup() {
    console.log(name, password, email,title);
    let item = { name, password, email ,title}; 
    console.log(item);
    let result = await fetch(
      "http://localhost:4001/admin/AdminRegistration",
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
     toast.success("Admin Register successfull, Please login",{position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {
                  navigate("/");
                }, 2000);
    console.log(result);
  }

  return (
    <div className="container-fluid" >
    <div style={{marginTop:"80px"}}><h2>Registration</h2></div>
    <div className="titless" style={{ width: "500px" ,marginLeft:"390px",marginTop:"20px"}}>
      <Container style={{ width: "500px" }}>
        <div className="admin-main">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="text"
                placeholder="Enter password"
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.password}
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
            <div>
            <Link to="/">
            <p id="back-login">Back to login</p>
          </Link>
            </div>
            <Button
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
              }}
              type="submit"
              onClick={signup}
            >
              Register
            </Button>
          </Form>
        </div>
      </Container>
    </div>
    </div>
  );
};

export default Registration;