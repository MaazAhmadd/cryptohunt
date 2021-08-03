import "../App.css";
import "../responsive.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Height } from "@material-ui/icons";
import PromotedCoins from "./PromotedCoins";
import BestCoins from "./BestCoins";
import AdminCoins from "./AdminCoins";
const moment = require("moment");

function Home() {
  const [promotedCoin, setPromotedCoins] = useState([]);
  const [bestCoin, setBestCoins] = useState([]);
  const [bestTodayCoin, setBestTodayCoins] = useState([[], []]);
  const [unapproveCoins, setUnapprovedCoins] = useState([]);
  const [status, setStatus] = useState(false);
  const [todaysBest, setTodaysBest] = useState(true);

  const getCoinPromotedData = async () => {
    //fetch
    await axios
      .get("http://34.85.128.15:8080/coins/promoted")
      .then(({ data }) => {
        setPromotedCoins(data.coin_results);
        setStatus(true);
      });
  };
  const getCoinBestData = async () => {
    //fetch
    await axios.get("http://34.85.128.15:8080/coins").then(({ data }) => {
      setBestCoins(data.coin_results);
    });
  };
  const getCoinTodayBestData = async () => {
    //fetch
    await axios.get("http://34.85.128.15:8080/coins/today").then(({ data }) => {
      setBestTodayCoins(data.coin_results);
    });
  };
  const getCoinUnapprovedData = async () => {
    //fetch
    await axios
      .get("http://34.85.128.15:8080/coins/unapproved")
      .then(({ data }) => {
        setUnapprovedCoins(data.coin_results);
      });
  };
  useEffect(() => {
    //fetch
    getCoinPromotedData();
    getCoinBestData();
    getCoinTodayBestData();
    getCoinUnapprovedData();
  }, []);

  // if (status == true) {
  //   // console.log(promotedCoin);
  // }
  const handleTodaysBest = () => {
    setTodaysBest(true);
  };

  const handleAllTimeBest = async () => {
    console.log(bestTodayCoin);
    setTodaysBest(false);
  };
  let todaysBestClass = "bests ";
  todaysBestClass += todaysBest ? "selected" : "";
  let allTimeBestClass = "bests ";
  allTimeBestClass += !todaysBest ? "selected" : "";
  let admin = localStorage.getItem("is_admin");

  return (
    <>
      {status ? <div className="promoted_wrapper"></div> : "loading"}
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
    </>
  );
}

export default Home;
