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
  const [phoneNumber, setPhoneNumber] = useState("");

  const [countries, setCountries] = useState([]);
  const navigate=useNavigate()
const params=useParams()
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", name,phoneNumber); 
  }

  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/countuserByEmail"
      );
      console.log(response.data.data.rows);
      setCountries(response.data.data.rows);
    } catch (error) {
      console.log(error);
    }
  };


  const [admin, setAdmin] = useState([]);
  const getAdmin = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/api/list/" + params.id
      );
      console.log("Admiiinview",response)
      setAdmin(response.data.data.user);

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAdmin();
  }, []);


   async function save(){
    // const id=props.id
    let item={name,phoneNumber}
  await fetch("http://localhost:4001/api/edit/"+params.id,{
    method:"PUT",
    body: JSON.stringify(item),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
  }).then((result)=>{
    result.json().then((resq)=>{
      console.log("This is resq ",resq);
      if(resq.data.status===200){
        toast.success("User Edit successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries();
        setTimeout(() => {
                    navigate("/usersManagement");
                  }, 1000);
      }else  if(resq.statusCode===400){
        toast.error(resq.message)
      
      }else if(resq.data.status===201){
        toast.warning(resq.data.message)
      } 
        
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
          <Link to="/usersManagement">
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
                placeholder={admin.name}
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
                placeholder={admin.phoneNumber}
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