import "../App.css";
import "../responsive.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PromotedCoins from "./PromotedCoins";
import BestCoins from "./BestCoins";
import config from "../config.json";
import Pagination from "./Pagination";

const apiUrl = config.API_URL;

function Home() {
  const [promotedCoin, setPromotedCoins] = useState([]);
  const [bestCoin, setBestCoins] = useState([]);
  const [bestTodayCoin, setBestTodayCoins] = useState([]);
  const [status, setStatus] = useState(false);
  const [bestStatus, setBestStatus] = useState(false);
  const [todaysBest, setTodaysBest] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  let pageSize = 10;

  let token = localStorage.getItem("token");
  axios.defaults.headers.common["x-auth-token"] = token;
  console.log(currentPage);
  useEffect(() => {
    getCoinPromotedData();
    getCoinBestData();
    getCoinTodayBestData();
  }, [currentPage]);

  const getCoinPromotedData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins/promoted").then(({ data }) => {
      setPromotedCoins(data.coin_results);
    });
  };
  const getCoinBestData = async () => {
    //fetch
    await axios.get(`${apiUrl}/${currentPage}/coins`).then(({ data }) => {
      setStatus(true);
      setBestStatus(true);
      setBestCoins(data.coin_results);
      setTotalCount(
        data.coin_results &&
          data.coin_results[data.coin_results.length - 2].total
      );
    });
  };
  const getCoinTodayBestData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins/today").then(({ data }) => {
      let uniqueToday = removeDuplicates(data.coin_results, (item) => item.id);
      setBestTodayCoins(uniqueToday);
    });
  };
  function removeDuplicates(data, key) {
    return [...new Map(data.map((item) => [key(item), item])).values()];
  }
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
          <div>
            {todaysBest ? (
              bestStatus ? (
                <BestCoins promotedCoin={bestCoin} />
              ) : (
                <div className="load-wrapp">
                  <div className="load-3">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                </div>
              )
            ) : (
              <BestCoins promotedCoin={bestTodayCoin} />
            )}
          </div>
          {todaysBest ? (
            <div className="pagination-new">
              <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={(page) => {
                  setBestStatus(false);
                  setCurrentPage(page);
                }}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="load-wrapp">
          <div className="load-3">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
