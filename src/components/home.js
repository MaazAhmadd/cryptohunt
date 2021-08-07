import "../App.css";
import "../responsive.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Height } from "@material-ui/icons";
import PromotedCoins from "./PromotedCoins";
import BestCoins from "./BestCoins";
import AdminCoins from "./AdminCoins";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const qs = require("querystring");
const moment = require("moment");

const apiUrl = config.API_URL;

//34.85.128.15
function Home() {
  // const [user, setUser] = React.useState({});
  const [promotedCoin, setPromotedCoins] = useState([]);
  const [bestCoin, setBestCoins] = useState([]);
  const [bestTodayCoin, setBestTodayCoins] = useState([]);
  const [status, setStatus] = useState(false);
  const [todaysBest, setTodaysBest] = useState(true);
  const [unapprovedCoins, setUnapprovedCoins] = React.useState([]);

  let token = localStorage.getItem("token");
  useEffect(() => {
    //fetch
    let myF = async () => {
      token = await localStorage.getItem("token");
    };
    myF();
    getCoinPromotedData();
    getCoinBestData();
    getCoinTodayBestData();
    getCoinUnapprovedData();
  }, []);

  axios.defaults.headers.common["x-auth-token"] = token;
  // try {
  //   let dectoken = jwtDecode(token);
  //   setUser(dectoken);
  //   console.log(dectoken);
  // } catch (ex) {}

  const getCoinUnapprovedData = async () => {
    //fetch
    await axios.get(apiUrl + "/admin/unapproved").then(({ data }) => {
      console.log(data.coin_results);
      setUnapprovedCoins(data.coin_results);
      // if (data) {
      //   setUnapprovedCoins([]);
      // } else {
      // }
    });
  };

  const getCoinPromotedData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins/promoted").then(({ data }) => {
      setPromotedCoins(data.coin_results);
      setStatus(true);
    });
  };
  const getCoinBestData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins").then(({ data }) => {
      setBestCoins(data.coin_results);
    });
  };
  const getCoinTodayBestData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins/today").then(({ data }) => {
      setBestTodayCoins(data.coin_results);
    });
  };

  const handleTodaysBest = () => {
    setTodaysBest(true);
  };

  const handleAllTimeBest = async () => {
    setTodaysBest(false);
  };
  let todaysBestClass = "bests ";
  todaysBestClass += todaysBest ? "selected" : "";
  let allTimeBestClass = "bests ";
  allTimeBestClass += !todaysBest ? "selected" : "";

  return (
    <>
      {/* {status ? <div className="promoted_wrapper"></div> : <p>loading...</p>} */}
      {status ? (
        <div>
          <PromotedCoins promotedCoin={promotedCoin} />
          <div className="bests-header">
            <button
              onClick={() => {
                handleTodaysBest();
              }}
              className={todaysBestClass}
            >
              All time best
            </button>
            <button
              onClick={() => {
                handleAllTimeBest();
              }}
              className={allTimeBestClass}
            >
              Today's Best
            </button>
          </div>
          {todaysBest ? (
            <BestCoins promotedCoin={bestCoin} />
          ) : (
            <BestCoins promotedCoin={bestTodayCoin[0]} />
          )}
          <AdminCoins unapprovedCoins={unapprovedCoins} />
          {/* {user.role === "admin" ? (
            <AdminCoins unapprovedCoins={unapprovedCoins} />
          ) : (
            <></>
          )} */}
        </div>
      ) : (
        <div class="load-wrapp">
          <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
