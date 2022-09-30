import React, { useEffect, useState,createContext } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import logo from "./logo.png";
import { toast } from "react-toastify";
import { authenticate } from "../../helper/ApiCall.js";
import { useCookies } from "react-cookie";

function Login() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("Light");
  const [colors, setColors] = useState({
    HeadingColor: "#000",
    backgroundColor: "white",
    textColor: "#000",
    button: "black",
    buttonTextColor: "white",
  });
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    success: "",
  });

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      toast.warning("You are logged In", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/dashboard");
    }
  }, []);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`${name}-${value}`);
    setCookie("email", email, { path: "/" });
    setCookie("password", password, { path: "/" });
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(Validate(values));
    if (!email || !password) {
      console.log("Please Fill out all the Fields");
      return toast.error("Please Fill out all the Fields");
    }
  };

  const { email, password } = values;
  async function signup() {
    console.log(password, email);
    let item = { email, password };
    console.log(item);
    let result = await fetch("http://localhost:4001/admin/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    if (result) {
      // console.log("Result",result.data.token)
      // console.log("Result1",result.data.status)
      if (result.data.status === "failed") {
        toast.error("Email or password is not valid", {
          position: toast.POSITION.TOP_CENTER,
        });
        setValues({ ...values, error: result.data.message, success: false });
      } else if (result.data.status === "Success") {
        authenticate(result, () => {
          setValues({
            ...values,
            success: true,
            isMember: false,
          });
          console.log("THIS IS DATA", result);
          toast.success("logged In Successfully", {
            position: toast.POSITION.TOP_CENTER,
          });

          setTimeout(() => {
            navigate("/welcome");
          }, 2000);
        });
      } else if (result.data.status === 404) {
        toast.error(result.data.message);
      }
    }

    console.log(result);
  }

  // TODO: FUNCTIONS:
  const ChangeColor = () => {
    if (theme === "Light") {
      setColors({
        HeadingColor: light.HeadingColor,
        backgroundColor: light.backgroundColor,
        textColor: light.textColor,
        button: light.button,
        buttonTextColor: light.buttonTextColor,
      });
    } else if (theme === "Dark") {
      setColors({
        HeadingColor: Dark.HeadingColor,
        backgroundColor: Dark.backgroundColor,
        textColor: Dark.textColor,
        button: Dark.button,
        buttonTextColor: Dark.buttonTextColor,
      });
    } else if (theme === "Cosmic") {
      setColors({
        HeadingColor: Cosmic.HeadingColor,
        backgroundColor: Cosmic.backgroundColor,
        textColor: Cosmic.textColor,
        button: Cosmic.button,
        buttonTextColor: Cosmic.buttonTextColor,
      });
    } else if (theme === "Corporate") {
      setColors({
        HeadingColor: Corporate.HeadingColor,
        backgroundColor: Corporate.backgroundColor,
        textColor: Corporate.textColor,
        button: Corporate.button,
        buttonTextColor: Corporate.buttonTextColor,
      });
    }
  };

  const light = {
    HeadingColor: "#000",
    backgroundColor: "white",
    textColor: "#959595",
    button: "black",
    buttonTextColor: "white",
  };
  const Dark = {
    HeadingColor: "white",
    backgroundColor: "#222B45",
    textColor: "#8F99B0",
    button: "#3366FF",
    buttonTextColor: "white",
  };
  const Cosmic = {
    HeadingColor: "white",
    backgroundColor: "#323259",
    textColor: "#959595",
    button: "#A16EFF",
    buttonTextColor: "white",
  };
  const Corporate = {
    HeadingColor: "#000",
    backgroundColor: "white",
    textColor: "#959595",
    button: "black",
    buttonTextColor: "white",
  };

  const Styles = {
    HeadingColor: colors.HeadingColor,
    backgroundColor: colors.backgroundColor,
    textColor: colors.textColor,
    button: colors.button,
    buttonTextColor: colors.buttonTextColor,
  };

  useEffect(() => {
    ChangeColor();
  }, [theme]);

  const [cookies, setCookie] = useCookies(["user"]);

  const handle = () => {
    setCookie("email", email, { path: "/" });
    setCookie("password", password, { path: "/" });
  };

  const emailed= cookies.email;
  console.log("This is sidevbar cookies check on login page",emailed)
  return (
    <Container
      id="container"
      className="d-grid"
      style={{ backgroundColor: Styles.backgroundColor }}
    >
      <Form id="login-form" className=" w-100 mt-0" onSubmit={handleSubmit}>
        <div id="header">
          <img className="logo" src={logo} alt="" />
          <h5
            className="fs-3 fw-normal text-muted"
            style={{ color: Styles.HeadingColor }}
          >
            We love creative Business Ideas
          </h5>
        </div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label style={{ color: Styles.textColor }}>
            Email address
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            onChange={handleChange}
            // onChange={handle}
            name="email"
            // value={
            //   cookies.email ? (values.email = cookies.email) : values.email
            // }
            value={values.email}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>{formErrors.email}</p>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label style={{ color: Styles.textColor }}>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            // onChange={handle}
            type="password"
            placeholder="Password"
            name="password"
            // value={
            //   cookies.password
            //     ? (values.password = cookies.password)
            //     : values.password
            // }
            value={values.password}
          />
          <p style={{ color: "red", fontWeight: "bold" }}>
            {formErrors.password}
          </p>
        </Form.Group>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox"> */}
        <div className="form-group row">
          <div className="col">
            <input
              type="checkbox"
              onChange={handleChange}  
              name="checkbox"
              // checked={cookies.email?"true" : "false"}     
             value={cookies.email?values.checked:values.checkbox}
            // value={checkbox}
              // onClick={handle}
            />
            <label htmlFor="" style={{ color: Styles.textColor }}>
              Remember Me
            </label>
          </div>
          {/* <div className="col">
            <Link to="/registration">
              <p id="para1" style={{ color: Styles.textColor }}>
               Registration
              </p>
            </Link>
          </div> */}
          <div className="col">
            <Link to="/forgetPwd">
              <p id="para" style={{ color: Styles.textColor }}>
                Forgot password?
              </p>
            </Link>
          </div>
        </div>
        {/* </Form.Group> */}

        <button
          id="btn"
          style={{ backgroundColor: Styles.button }}
          onClick={signup}
        >
          Login
        </button>
        <br />
        <br />
        {/* <Form.Label style={{ color: Styles.textColor }}>
          Select Theme
        </Form.Label>
        <Form.Select
          size="sm"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option>Light</option>
          <option>Dark</option>
          <option>Cosmic</option>
          <option>Corporate</option>
        </Form.Select> */}
      </Form>
    </Container>
  );
}

export default Login;
