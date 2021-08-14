import "../App.css";
import "../responsive.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi/";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const qs = require("querystring");
const apiUrl = config.API_URL;

function AddCoin() {
  const [user, setUser] = useState({});
  const [resp, setResp] = useState("");
  const [coin, addCoin] = useState({
    name: "",
    symbol: "",
    description: "",
    logo: "",
    launch: "",
    additional: "",
    binancesmartchain: "",
    ethereum: "",
    solana: "",
    polygon: "",
    website: "",
    telegram: "",
    twitter: "",
  });
  let token = localStorage.getItem("token");
  React.useEffect(() => {
    let myF = async () => {
      token = await localStorage.getItem("token");
      if (!token) {
        window.location.href = "./login";
        return;
      } else {
        try {
          let dectoken = jwtDecode(token);
          setUser(dectoken);
        } catch (ex) {}
      }
    };
    myF();
  }, []);

  if (!token) {
    window.location.href = "./login";
    return;
  }
  axios.defaults.headers.common["x-auth-token"] = token;

  async function doLogin(e) {
    if (
      coin.name !== "" &&
      coin.symbol !== "" &&
      coin.launch !== "" &&
      coin.website !== ""
    ) {
      var curr_status = user.role === "admin" ? "approved" : "pending";
      var added_by = user.email;

      await axios
        .post(
          apiUrl + "/add_coin",
          qs.stringify({
            name: coin.name.split(" ").join(""),
            symbol: coin.symbol,
            description: coin.description,
            logo: coin.logo,
            launch: coin.launch,
            additional: coin.additional,
            binancesmartchain: coin.binancesmartchain,
            ethereum: coin.ethereum,
            solana: coin.solana,
            polygon: coin.polygon,
            website: coin.website,
            telegram: coin.telegram,
            twitter: coin.twitter,
            status: curr_status,
            added_by: added_by,
          })
        )
        .then((resp) => {
          setResp(resp.data.msg);
        });
    } else {
      setResp("Error: Please Fill All Required Fields");
    }
  }

  function handleInput(e) {
    addCoin({
      ...coin,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <>
      <div className="pbody add_coin_wrapper_outer">
        <div className="add_coin_wrapper">
          <div className="go_back">
            <Link to="/">
              <BiLeftArrowAlt /> Back To Home
            </Link>
          </div>
          <p
            style={{
              textAlign: "left",
              fontSize: "2.2rem",
              fontWeight: "600",
              marginTop: "2%",
              marginBottom: "-2%",
            }}
          >
            Coin listing request
          </p>
          {/* <p style={{ marginTop: "0.5rem", color: "gray" }}>
            Submit a Coin For Approval
          </p> */}

          <div className="add_coin_inner">
            <div className="add_coin_left">
              <p
                className="section_title_in"
                style={{ color: "grey", fontSize: "1.5rem" }}
              >
                Coin Information
              </p>
              <div className="input_wrapper">
                <TextField
                  variant="outlined"
                  onChange={(e) => handleInput(e)}
                  id="name"
                  type="text"
                  label="Name"
                  placeholder="Ex Bitcoin"
                  required
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="outlined"
                  onChange={(e) => handleInput(e)}
                  id="symbol"
                  type="text"
                  label="Symbol"
                  placeholder="Ex BTC"
                  required
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="outlined"
                  onChange={(e) => handleInput(e)}
                  id="description"
                  type="text"
                  label="Description"
                  placeholder="Ex Bitcoin is a Decentralized Cryptocurrency"
                  multiline
                  rows={5}
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="outlined"
                  onChange={(e) => handleInput(e)}
                  id="logo"
                  type="text"
                  label="Logo"
                  placeholder="Ex http://url.com/logo.png"
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="outlined"
                  onChange={(e) => handleInput(e)}
                  id="launch"
                  type="text"
                  label="Launch Date"
                  placeholder="Ex DD/MM/YYYY"
                  required
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="outlined"
                  onChange={(e) => handleInput(e)}
                  id="additional"
                  type="text"
                  label="Additional Information"
                  placeholder="Other Things You Like To Add In Your Coin Request"
                  multiline
                  rows={5}
                />
              </div>
            </div>
            <div className="add_coin_right">
              <div className="first_div">
                <p
                  className="section_title_in"
                  style={{ color: "grey", fontSize: "1.5rem" }}
                >
                  Coin Contracts
                </p>
                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="binancesmartchain"
                    type="text"
                    label="Binance Smart Chain"
                    placeholder="Ex 0x000000000000000"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="ethereum"
                    type="text"
                    label="Ethereum"
                    placeholder="Ex 0x000000000000000"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="solana"
                    type="text"
                    label="Solana"
                    placeholder="Ex xxxxxxxxxxxxxxxxx"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="polygon"
                    type="text"
                    label="Polygon"
                    placeholder="Ex 0x000000000000000"
                  />
                </div>
              </div>

              <div>
                <p
                  className="section_title_in"
                  style={{ color: "grey", fontSize: "1.5rem" }}
                >
                  Coin Links
                </p>
                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="website"
                    type="text"
                    label="Website *"
                    placeholder="Ex https://www.domain.tld"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="telegram"
                    type="text"
                    label="Telegram"
                    placeholder="Ex https://t.me/bitcoin"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="outlined"
                    onChange={(e) => handleInput(e)}
                    id="twitter"
                    type="text"
                    label="Twitter"
                    placeholder="Ex https://twitter.com/youracc"
                  />
                </div>
              </div>
            </div>
            <div className="input_wrapper">
              <Button
                type="button"
                variant="contained"
                color="primary"
                onClick={(e) => doLogin(e)}
              >
                Submit
              </Button>
            </div>
          </div>

          {resp ? <div className="resp">{resp}</div> : ""}
        </div>
      </div>
    </>
  );
}

export default AddCoin;
