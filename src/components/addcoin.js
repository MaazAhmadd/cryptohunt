import "../App.css";
import "../responsive.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi/";

const qs = require("querystring");

function AddCoin() {
  if (localStorage.getItem("logged_in") != 1) {
    window.location.href = "./login";
  }
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

  const [resp, setResp] = useState("");

  async function doLogin(e) {
    if (
      coin.name !== "" &&
      coin.symbol !== "" &&
      coin.launch !== "" &&
      coin.website !== ""
    ) {
      var curr_status =
        localStorage.getItem("is_admin") == 1 ? "approved" : "pending";
      var added_by = localStorage.getItem("user_email");

      await axios
        .post(
          "http://34.85.128.15:8080/add_coin",
          qs.stringify({
            name: coin.name,
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
          <p style={{ textAlign: "left", fontSize: "2rem" }}>Submit Coin</p>
          <p style={{ marginTop: "0.5rem", color: "gray" }}>
            Submit a Coin For Approval
          </p>

          <div className="add_coin_inner">
            <div className="add_coin_left">
              <h3 className="section_title_in">Coin Information</h3>
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
                  required
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
                  required
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
                  required
                  multiline
                  rows={5}
                />
              </div>
            </div>
            <div className="add_coin_right">
              <div className="first_div">
                <h3 className="section_title_in">Coin Contracts</h3>
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
                <h3 className="section_title_in">Coin Links</h3>
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
                    type="twitter"
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
