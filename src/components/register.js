import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config.json";
const qs = require("querystring");
const apiUrl = config.API_URL;

function Register() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [resp, setResp] = useState("");

  async function doLogin(e) {
    if (user.email !== "" && user.password !== "" && user.name !== "") {
      if (user.password.length < 6) {
        setResp("Error: Password Should Be At Least 6 Digits Long!");
      } else {
        // secure password :)
        await axios
          .post(
            apiUrl + "/register",
            qs.stringify({
              email: user.email,
              name: user.name,
              password: user.password,
            })
          )
          .then((resp) => {
            setResp(resp.data.msg);

            if (resp.data.code == "success") {
              localStorage.setItem("logged_in", 1);
              localStorage.setItem("registered", 1);
              localStorage.setItem("name", user.name);
              localStorage.setItem("user_email", user.email);
              window.location.href = "./";
            }
          });
      }
    } else {
      setResp("Error: Please Fill All Fields");
    }
  }

  function handleInput(e) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <>
      <div className="pbody login_wrapper_outer">
        <div className="login_wrapper">
          <p style={{ textAlign: "left", fontSize: "2rem" }}>Register</p>
          <p style={{ marginTop: "0.5rem", color: "gray" }}>
            Register a New Account
          </p>
          <div className="input_wrapper">
            <TextField
              variant="outlined"
              onChange={(e) => handleInput(e)}
              id="email"
              className="text_email"
              type="text"
              label="Email"
              required
            />
          </div>

          <div className="input_wrapper">
            <TextField
              variant="outlined"
              onChange={(e) => handleInput(e)}
              id="name"
              className="text_name"
              type="text"
              label="Name"
              required
            />
          </div>

          <div className="input_wrapper">
            <TextField
              variant="outlined"
              onChange={(e) => handleInput(e)}
              id="password"
              className="text_password"
              type="password"
              label="Password"
              required
            />
          </div>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={(e) => doLogin(e)}
          >
            Register
          </Button>

          {resp ? <div className="resp">{resp}</div> : ""}

          <p style={{ marginTop: "0.5rem" }}>
            Already Have An Account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
