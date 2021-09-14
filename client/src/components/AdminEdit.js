import "../App.css";
import "../responsive.css";
import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { Link, useParams, useHistory } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi/";
import config from "../config.json";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";
const qs = require("querystring");
const apiUrl = config.API_URL;

function AddCoin() {
  const [user, setUser] = useState({});
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

  const history = useHistory();
  const id = useParams().id;

  let token = localStorage.getItem("token");
  axios.defaults.headers.common["x-auth-token"] = token;
  let dectoken = { role: "notAdmin" };

  try {
    dectoken = jwtDecode(token);
  } catch (ex) {}

  useEffect(() => {
    getAdminEditData();
  }, []);

  const getAdminEditData = async () => {
    await axios.get(`${apiUrl}/coins/${id}`).then(({ data }) => {
      let coinToBeEdited = data[0];
      addCoin({
        name: coinToBeEdited.name,
        symbol: coinToBeEdited.symbol,
        description: coinToBeEdited.description,
        logo: coinToBeEdited.logo,
        launch: coinToBeEdited.launch,
        additional: coinToBeEdited.additional,
        binancesmartchain: coinToBeEdited.binancesmartchain,
        ethereum: coinToBeEdited.ethereum,
        solana: coinToBeEdited.solana,
        polygon: coinToBeEdited.polygon,
        website: coinToBeEdited.website,
        telegram: coinToBeEdited.telegram,
        twitter: coinToBeEdited.twitter,
      });
    });
  };

  async function doEditCoin(e) {
    await axios
      .post(
        `${apiUrl}/admin/edit/${id}`,
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
        })
      )
      .then((resp) => {
        toast.info(resp.data);
      });
  }

  function handleInput(e) {
    addCoin({
      ...coin,
      [e.target.id]: e.target.value,
    });
  }

  return dectoken.role == "admin" ? (
    <>
      <div className="pbody add_coin_wrapper_outer">
        <div className="add_coin_wrapper">
          <div className="go_back">
            <Link to="/admin">
              <BiLeftArrowAlt /> Back To Admin
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
                  variant="filled"
                  onChange={(e) => handleInput(e)}
                  id="name"
                  value={coin.name}
                  type="text"
                  label="Name"
                  placeholder="Ex Bitcoin"
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="filled"
                  onChange={(e) => handleInput(e)}
                  id="symbol"
                  value={coin.symbol}
                  type="text"
                  label="Symbol"
                  placeholder="Ex BTC"
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="filled"
                  onChange={(e) => handleInput(e)}
                  id="description"
                  value={coin.description}
                  type="text"
                  label="Description"
                  placeholder="Ex Bitcoin is a Decentralized Cryptocurrency"
                  multiline
                  rows={5}
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="filled"
                  onChange={(e) => handleInput(e)}
                  id="logo"
                  value={coin.logo}
                  type="text"
                  label="Logo"
                  placeholder="Ex http://url.com/logo.png"
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="filled"
                  onChange={(e) => handleInput(e)}
                  id="launch"
                  value={coin.launch}
                  type="text"
                  label="Launch Date"
                  // onFocus={(e) => {
                  //   e.target.type = "date";
                  // }}
                  // onBlur={(e) => {
                  //   e.target.type = "text";
                  // }}
                  placeholder="Ex MM/DD/YYYY"
                />
              </div>

              <div className="input_wrapper">
                <TextField
                  variant="filled"
                  onChange={(e) => handleInput(e)}
                  id="additional"
                  value={coin.additional}
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
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="binancesmartchain"
                    value={coin.binancesmartchain}
                    type="text"
                    label="Binance Smart Chain"
                    placeholder="Ex 0x000000000000000"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="ethereum"
                    value={coin.ethereum}
                    type="text"
                    label="Ethereum"
                    placeholder="Ex 0x000000000000000"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="solana"
                    value={coin.solana}
                    type="text"
                    label="Solana"
                    placeholder="Ex xxxxxxxxxxxxxxxxx"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="polygon"
                    value={coin.polygon}
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
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="website"
                    value={coin.website}
                    type="text"
                    label="Website"
                    placeholder="Ex https://www.domain.tld"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="telegram"
                    value={coin.telegram}
                    type="text"
                    label="Telegram"
                    placeholder="Ex https://t.me/bitcoin"
                  />
                </div>

                <div className="input_wrapper">
                  <TextField
                    variant="filled"
                    onChange={(e) => handleInput(e)}
                    id="twitter"
                    value={coin.twitter}
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
                onClick={(e) => doEditCoin(e)}
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    "you are not an Admin"
  );
}

export default AddCoin;
