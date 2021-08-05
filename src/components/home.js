import "../App.css";
import "../responsive.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Height } from "@material-ui/icons";
import PromotedCoins from "./PromotedCoins";
import BestCoins from "./BestCoins";
import AdminCoins from "./AdminCoins";
import config from "../config.json";

const qs = require("querystring");
const apiUrl = config.API_URL;
const moment = require("moment");
//34.85.128.15
function Home() {
  const [promotedCoin, setPromotedCoins] = useState([]);
  const [bestCoin, setBestCoins] = useState([]);
  const [bestTodayCoin, setBestTodayCoins] = useState([]);
  const [unapproveCoins, setUnapprovedCoins] = useState([]);
  const [status, setStatus] = useState(false);
  const [todaysBest, setTodaysBest] = useState(true);

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
  const getCoinUnapprovedData = async () => {
    //fetch
    await axios
      .post(
        apiUrl + "/coins/unapproved",
        qs.stringify({
          user: localStorage.getItem("user_email"),
        })
      )
      .then(({ data }) => {
        if (data.code && data.code == "error") {
          setUnapprovedCoins([]);
        } else {
          setUnapprovedCoins(data.coin_results);
        }
      });
  };
  useEffect(() => {
    //fetch
    getCoinPromotedData();
    getCoinBestData();
    getCoinTodayBestData();
    getCoinUnapprovedData();
  }, []);

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
  let admin = localStorage.getItem("is_admin");

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
          {admin == 1 ? <AdminCoins promotedCoin={unapproveCoins} /> : <></>}
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
