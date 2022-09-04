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
import axios from "axios";
const AddUser = () => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
 
  const navigate=useNavigate()
 
  const [image, setImage] = useState("");

  function handlleImage(e) {
    setImage(e.target.files[0]);
  }
  function handleSubmit(e) {
    e.preventDefault();
  }
  async function addCategory() {
    if (!name || !image) {
      return toast.error("Fields required");
    }
    const data = new FormData();
    data.append("name", name);
    data.append("image", image, image.name);
    let result = await axios.post(
      "http://localhost:4001/category/addCategory",
      data
    );
    if (result.data.data.status === "success") {
      toast.success("Category added successfully");
    } else {
      console.log("result", result);
      toast.error("Something went wrong.");
    }
    setTimeout(() => {
      navigate("/systemConfig/categories");
    }, 1000);
  }
  // async function signup() {
  //   console.log(name);
  //   let item = { name}; 
  //   console.log(item);
  //   let result = await fetch(
  //     "http://localhost:4001/category/addCategory",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(item),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //       },
  //     }
  //   );
  //   result = await result.json();
  //    toast.success("Category Register successfull",{position: toast.POSITION.TOP_CENTER});
  //     setTimeout(() => {
  //                 navigate("/systemConfig/categories");
  //               }, 2000);
  //   console.log(result);
  // }

  return (
    <>
    <SideBar />
    <div className="titles">
      <Container style={{ width: "900px" }}>
        <div className="admin-main">
          <div>
          <Link to="systemConfig/categories">
            <AiOutlineLeft fa-lg /></Link> Add Category
          </div>
          <hr />
          <Form onSubmit={handleSubmit}>
          <Form.Group>
              <div>
                <label for="formFile" className="form-label">
                  Upload Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="image"
                  style={{ width: "100%" }}
                  onChange={handlleImage}
                />
              </div>
            </Form.Group> 
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
             
            <Button
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
              }}
              type="submit"
              onClick={addCategory}
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
