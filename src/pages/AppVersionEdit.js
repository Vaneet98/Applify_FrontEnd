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
const AppVersionEdit = (props) => {
  const { values, formErrors } = useForm(Validate);


  const [latestVersion, setLatestVersion] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate=useNavigate()
  const params=useParams();
  function handleSubmit(e) {
    e.preventDefault();
    console.log("data", latestVersion);
  }
  
  const getCountries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4001/app/addVersion"
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
        "http://localhost:4001/app/list/" + params.id
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
    const id=props.id
    let item = { latestVersion}; 
  await fetch("http://localhost:4001/app/edit/"+params.id,{
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
        toast.success("Admin Edit successfull",{position: toast.POSITION.TOP_CENTER});
        getCountries();
          setTimeout(() => {
                      navigate("/systemConfig/appversion");
                    }, 1000);
      }else{
        toast.error(resq.data.message)
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
    <div className="tit" style={{ marginLeft: "235px" }}>
        <Container>
          <div className="admin-main">
            <div>
              <Link to="/systemConfig/appversion">
                <AiOutlineLeft fa-lg />
              </Link>{" "}
              Edit App Version
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">
                  latest Version
                </Form.Label>
                <Form.Control
                  value={values.latestVersion}
                  onChange={(e) => setLatestVersion(e.target.value)}
                  name="latestVersion"
                  type="text"
                  placeholder={admin.latestVersion} 
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.latestVersion}
                </p>
              </Form.Group>
              <Button
              onClick={save}
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
                type="submit"
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

export default AppVersionEdit;