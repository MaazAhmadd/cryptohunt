import React, { useEffect, useState } from "react";
import config from "../config.json";
import axios from "axios";
import { useHistory } from "react-router-dom";

const apiUrl = config.API_URL;

export default function CoinIndex() {
  const [bestCoin, setBestCoins] = useState([]);

  const history = useHistory();

  const getCoinBestData = async () => {
    //fetch
    await axios.get(apiUrl + "/coins").then(({ data }) => {
      setBestCoins(data.coin_results);
    });
  };
  useEffect(() => {
    getCoinBestData();
  }, []);
  console.log("Best coins ", bestCoin);
  return (
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
  );
}
