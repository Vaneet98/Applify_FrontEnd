import React, { useState,useEffect } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import "./Addadmin.css";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import { Link ,useNavigate,useParams} from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
import axios from "axios";
const AdminEdit = (props) => {
  const { values, formErrors } = useForm(Validate);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate=useNavigate()
 const params=useParams();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", name,title);
  }
  function handleSelect(e){
    setTitle(e.target.value)
  }
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/admin/list?limit=100&skip=0"
      );
      console.log(response.data.data.rows);
      setCountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };

   async function save(){ 
    const id=props.id
    let item={name,title}
  await fetch("http://localhost:4001/admin/editAdminDetails/"+params.id,{
    method:"PUT",
    body: JSON.stringify(item),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
  }).then((result)=>{
    result.json().then((resq)=>{
      console.log("This is resq ",resq);
      toast.success("Admin Edit successfull",{position: toast.POSITION.TOP_CENTER});
      getCountries();
        setTimeout(() => {
                    navigate("/admin");
                  }, 1000);
    })
  }) 
 }

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
            <AiOutlineLeft fa-lg /></Link> Edit admin
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
            <Form.Label>Admin Type</Form.Label>
            <Form.Select
              id="select"
              value={title}
              onChange={handleSelect}
            >
              <option>Super Admin</option>
              <option>Sub Admin</option>
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

export default AdminEdit;