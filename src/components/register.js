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

function Register() {
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
  });

  let token;
  React.useEffect(() => {
    let myF = async () => {
      token = await localStorage.getItem("token");
    };
    myF();
  }, []);
  axios.defaults.headers.common["x-auth-token"] = token;

  async function doLogin(e) {
    if (user.email !== "" && user.password !== "" && user.name !== "") {
      if (user.password.length < 6) {
        toast("Error: Password Should Be At Least 6 Digits Long!");
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
            toast(resp.data.msg);

            if (resp.data.code == "success") {
              localStorage.setItem("token", resp.data.token);
              window.location.href = "./";
            }
          });
      }
    } else {
      toast("Error: Please Fill All Fields");
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
          <form action="">
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
              Register
            </Button>
          </form>

          <p style={{ marginTop: "0.5rem" }}>
            Already Have An Account? <Link to="/login">Login Here</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
