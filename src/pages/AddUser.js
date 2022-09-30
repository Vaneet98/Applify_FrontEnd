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
const AddUser = () => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
  const navigate=useNavigate()
 

  function handleSubmit(e) {
    e.preventDefault();
  }
  async function signup() {
    console.log(name, password, email,phoneNumber);
    let item = { name, password, email ,phoneNumber}; 
    console.log(item);
    let result = await fetch(
      "http://localhost:4001/api/registration",
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
    if(result.statusCode===400){
      toast.error(result.message)
    }
    else if(result.data.stauts===200){
      toast.success("User Register successfull",{position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {
                  navigate("/usersManagement");
                }, 2000);
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
          <Link to="/usersManagement">
            <AiOutlineLeft fa-lg /></Link> Add User
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
                placeholder="Enter your Name"
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.name}
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="required-FIELD">Phone Number</Form.Label>
              <Form.Control
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                name="phoneNumber"
                type="text"
                placeholder="Enter your phone number"
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

export default AddUser;