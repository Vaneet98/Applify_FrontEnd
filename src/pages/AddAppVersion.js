import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { Link,useNavigate } from "react-router-dom";

import Validate from "../components/Validate";
import useForm from "../components/useForm";
import SideBar from "../components/Sidebar/SideBar";
import { toast } from "react-toastify";
function AddAppVersion() {
  const { values, formErrors } = useForm(Validate);
  const [latestVersion, setLatestVersion] = useState("");
  const [minimumVersion, setMinimumVersion] = useState("");
  const [AppName,setName]=useState("");
  const [selects, setSelects] = useState("");
  const navigate=useNavigate()
  const plateform=selects;
  function handleSelect(e){
    setSelects(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
  }
  async function save() {
    console.log(AppName,latestVersion,minimumVersion,plateform);
    let item = {AppName, latestVersion,minimumVersion ,plateform}; 
    console.log(item);
    let result = await fetch(
      "http://localhost:4001/app/addVersion",
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
    if(result.data.status===200){
      toast.success("App version Add successfull",{position: toast.POSITION.TOP_CENTER});
      setTimeout(() => {
                  navigate("/systemConfig/appversion");
                }, 1000);
    }else if(result.statusCode===401){
      toast.error(result.message)
    }else if(result.data.status===201){
      toast.warning(result.data.message)
    }
    
    console.log(result);
  } 
  return (
    <>
      <SideBar />
      <div className="tit" style={{ marginLeft: "235px" }}>
        <Container>
          <div className="admin-main">
            <div>
              <Link to="/systemConfig/reportbug">
                <AiOutlineLeft fa-lg />
              </Link>{" "}
              Add App Version
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="required-FIELD">Name</Form.Label>
              <Form.Control
                value={AppName}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter Name"
              />
              <p style={{ color: "red", fontWeight: "bold" }}>
                {formErrors.AppName}
              </p>
            </Form.Group>
              <Form.Label>Plateform</Form.Label>
              <Form.Select id="select"  
               value={selects}
               onChange={handleSelect}>
                <option value="IOS">IOS</option>
                <option value="Web">WEB</option>
                <option value="Android">ANDROID</option>
              </Form.Select>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Minimum Version</Form.Label>
                <Form.Control
                  value={values.minimumVersion}
                  onChange={(e) => setMinimumVersion(e.target.value)}
                  name="minimumVersion"
                  type="text"
                  placeholder="Enter Title"
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.minimumVersion}
                </p>
              </Form.Group>
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
                  placeholder="Enter Title"
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
}

export default AddAppVersion;