import "../App.css";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import config from "../config.json";
import { toast } from "react-toastify";
const qs = require("querystring");
const apiUrl = config.API_URL;

function Login() {
  let token;
  React.useEffect(() => {
    let myF = async () => {
      token = await localStorage.getItem("token");
    };
    myF();
  }, []);
  axios.defaults.headers.common["x-auth-token"] = token;
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleInput(e) {
    setUser({
      ...user,
      [e.target.id]: e.target.value,
    });
  }

  async function doLogin(e) {
    e.preventDefault();
    if (user.email !== "" && user.password !== "") {
      await axios
        .post(
          apiUrl + "/login",
          qs.stringify({ email: user.email, password: user.password })
        )
        .then((resp) => {
          toast(resp.data.msg);

          if (resp.data.code == "success") {
            localStorage.setItem("token", resp.data.token);
            window.location.href = "./";
          }
        });
    } else {
      toast("Error: Please Fill All Fields");
    }
  }

  return (
    <>
      <div className="pbody login_wrapper_outer">
        <div className="login_wrapper">
          <p style={{ textAlign: "left", fontSize: "2rem" }}>Log In</p>
          <p style={{ marginTop: "0.5rem", color: "gray" }}>
            Login To Your Account
          </p>
          <form action="">
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
              type="submit"
              style={{ width: "100%" }}
              variant="contained"
              color="primary"
              onClick={(e) => doLogin(e)}
            >
              Login
            </Button>
          </form>

          <p style={{ marginTop: "0.5rem" }}>
            Don't Have An Account? <Link to="/register">Register Now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
