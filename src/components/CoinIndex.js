import React, { useEffect, useState } from "react";
import config from "../config.json";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiUrl = config.API_URL;

export default function CoinIndex() {
  const [bestCoin, setBestCoins] = useState([]);
  const [status, setStatus] = useState(false);

  const history = useHistory();

  const getCoinBestData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins").then(({ data }) => {
      setBestCoins(data.coin_results);
      setStatus(true);
    });
  };
  useEffect(() => {
    getCoinBestData();
  }, []);
  return status ? (
    <div>
      <h1 style={{ margin: "1% 0 0 1%" }}>Coin Index</h1>
      <section>
        <ul style={{ margin: "3% 0 0 10%" }}>
          {bestCoin.map((coin) => {
            if (coin.name) {
              return (
                <li
                  className="coin-index-single"
                  onClick={() => {
                    history.push(`/coins/${coin.id}`);
                  }}
                >
                  {coin.name}
                </li>
              );
            }
          })}
        </ul>
      </section>
    </div>
  ) : (
    <div className="load-wrapp">
      <div className="load-3">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    </div>
  );
}
