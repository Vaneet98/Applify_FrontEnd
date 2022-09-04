import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";

import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import "../../pages/Addadmin.css";
import Validate from "../Validate";
import useForm from "../useForm";
import axios from "axios";
import photo from "../../images/profilelogo.svg.png";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("jwt"));
  const userimage = user.data.userdetails.image;
  const email = user.data.userdetails.email;
  const { handleSubmit } = useForm(Validate);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  // const [countries, setCountries] = useState([]);
  function handlleImage(e) {
    setImage(e.target.files[0]);
  } 

  function handleChange(e) {
    setName(e.target.value);
  }
  // const getCountries = async () => {
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:4001/admin/list?limit=100&skip=0"
  //     );
  //     console.log(response.data.data.rows);
  //     setCountries(response.data.data.rows);
     
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async function update() {
    if (!name || !image) {
      return toast.error("Fields required");
    }
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("image", image, image.name);
    let result = await axios.put(
      "http://localhost:4001/admin/editAdminProfile",
      data
    );
    if (result.data.data.status === "success") {
       toast.success("Profile updation successful");
      //  getCountries();
       setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } else {
      console.log("result", result);
      return toast.error("Something went wrong.");
    }
  }



  return (

    <div>
    <Container>
      <div className="admin-main">
        <Form
          onSubmit={handleSubmit}
          method="POST"
          encType="multipart/form-data"
        >
          <Form.Group>
            <div>
              <img
                src={`http://localhost:4001/${userimage}`}
                alt="profile-pic"
                id="profilepicc"
              />
            </div>
            <br />
            <div>
              <label for="formFile" className="form-label">
                Upload Image
              </label>
              <br />
              <div className="profile">
                <img src={photo} id="photo" alt=""/>
                <input
                  className="form-control"
                  type="file"
                  id="file"
                  name="image"
                  style={{ width: "100%" }}
                  onChange={handlleImage}
                />
                <label htmlFor="file" id="uploadBtn">
                  Choose Photo
                </label>
              </div>
            </div>
          </Form.Group>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="required-FIELD">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder={user.data.userdetails.name}
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={email} readOnly />
          </Form.Group>
          <Button
            style={{ width: "100%", backgroundColor: "black", color: "white" }}
            type="submit"
            onClick={update}
          >
            Save
          </Button>
        </Form>
      </div>
    </Container>
    </div>

  );
};

export default Profile;
