import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { AiOutlineLeft } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Validate from "../components/Validate";
import useForm from "../components/useForm";
import SideBar from "../components/Sidebar/SideBar";
 
function AddAchivement() {
  const navigate = useNavigate();
  const { handleChange, values, handleSubmit, formErrors } = useForm(Validate);
  const [Type, setType] = useState("");
  const { name } = values;
  function handleSelect(e) {
    setType(e.target.value);
  }

  async function add() {
    let item = { name, Type };
    console.log("APPdetails", item);
    await fetch("http://localhost:4001/Achivement/AddAchivement", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((result) => {
      result.json().then((resq) => {
        if(resq.statusCode===400){
          toast.error(resq.message)
        }else if(resq.data.status===200){
          toast.success("App Version added successfully", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            navigate("/systemConfig/adminachievement");
          }, 1000);
        }
       else {
        toast.warning(resq.message)
       }
      }); 
    });
  }
  return (
    <>
      <SideBar />
      <div className="container" style={{ marginLeft: "235px" }}>
        <Container>
          <div className="admin-main">
            <div>
              <Link to="/systemConfig/adminachievement">
                <AiOutlineLeft fa-lg />
              </Link>{" "}
              Add Achievement
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="required-FIELD">Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="name"
                />
                <p style={{ color: "red", fontWeight: "bold" }}>
                  {formErrors.name}
                </p>
              </Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Select id="select" value={Type} onChange={handleSelect}>
                <option>Parallel</option>
                <option>Sequential</option>
              </Form.Select>
              <Button
                style={{
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
                type="submit"
                onClick={add}
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

export default AddAchivement;