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

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [resp, setResp] = useState("");

  async function doLogin(e) {
    if (user.email !== "" && user.password !== "") {
      await axios
        .post(
          apiUrl + "/login",
          qs.stringify({ email: user.email, password: user.password })
        )
        .then((resp) => {
          setResp(resp.data.msg);

          if (resp.data.code == "success") {
            localStorage.setItem("logged_in", 1);
            localStorage.setItem("user_email", user.email);
            if (resp.data.role == "admin") {
              // its admin
              localStorage.setItem("is_admin", 1);
              window.location.href = "./";
            } else {
              window.location.href = "./";
            }
          }
        });
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
          <p style={{ textAlign: "left", fontSize: "2rem" }}>Log In</p>
          <p style={{ marginTop: "0.5rem", color: "gray" }}>
            Login To Your Account
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
            Login
          </Button>

          {resp ? <div className="resp">{resp}</div> : ""}

          <p style={{ marginTop: "0.5rem" }}>
            Don't Have An Account? <Link to="/register">Register Now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
