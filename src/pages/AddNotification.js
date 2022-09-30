import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./Addadmin.css";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import { Link ,useNavigate} from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
import axios from "axios";
const AddNotification = (props) => {
  const { values, formErrors } = useForm(Validate);

  const [userType, setUserType] = useState("");
  const [notification, setNotification] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate=useNavigate()

  const [image, setImage] = useState("");

  function handlleImage(e) {
    setImage(e.target.files[0]);
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", userType,notification);
  }
  function handleSelect(e){
    setUserType(e.target.value)
  }
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/notification/list?limit=100&skip=0"
      );
      console.log(response.data.data.rows);
      setCountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

  async function save() {
    const data = new FormData();
    // data.append("Title", Title);
    data.append("notification", notification);
    data.append("userType", userType);
    data.append("image", image, image.name);
    let result = await axios.post(
      "http://localhost:4001/notification/sendNotification",
      data
    );
    result = await result.json();
    if(result.data.status===200){ 
      toast.success("Notification added successfully");
      setTimeout(() => {
        navigate("/notification");
      }, 1000);
    }else if(result.statusCode===400){
      toast.error(result.message)
    }else if(result.data.status===201){
      toast.warning(result.data.message)
    }
    
  }
//    async function save(){ 

//     let item={userType,notification}
//   await fetch("http://localhost:4001/notification/sendNotification",{
//     method:"POST",
//     body: JSON.stringify(item),
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//   }).then((result)=>{
//     result.json().then((resq)=>{
//       console.log("This is resq ",resq);
//       toast.success("Notification Add successfull",{position: toast.POSITION.TOP_CENTER});
//       getCountries();
//         setTimeout(() => {
//                     navigate("/notification");
//                   }, 1000);
//     })
//   }) 
//  }

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
          <Link to="/notification">
            <AiOutlineLeft fa-lg /></Link> Edit notification
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
              value={notification}
                onChange={(e) => setNotification(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter message"
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.name}
              </p>
            </Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Select
              id="select"
              value={userType}
            
              onChange={handleSelect}
            >
              <option>All</option>
              <option>Android</option>
              <option>IOS</option>
              <option>Web</option>
            </Form.Select>
            <Button
              style={{
                width: "100%",
                backgroundColor: "black",
                color: "white",
                cursor:"pointer"
              }}
              type="submit"
              onClick={()=>save()}
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

export default AddNotification;