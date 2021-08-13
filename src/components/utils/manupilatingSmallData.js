import { BsCaretUpFill, BsCaretDownFill, BsCapslockFill } from "react-icons/bs";
import React from "react";
import axios from "axios";
import qs from "querystring";
import config from "../../config.json";

const apiUrl = config.API_URL;

export default (coins) => {
  let presale = true;
  let allCoins = [];
  if (coins) {
    coins.forEach((coin) => {
      let votesByUser = coins[coins.length - 1];
      let isvoted = false;
      votesByUser.forEach((c) => {
        if (c.coin_id === coin.id) {
          isvoted = true;
        }
      });
      const handleVoteClick = (v) => {
        if (localStorage.getItem("token")) {
          if (!v) {
            axios
              .post(
                apiUrl + "/vote",
                qs.stringify({
                  coin: coin.id,
                })
              )
              .then(() => {
                console.log("upvoted");
                window.location = "/";
              });
          } else {
            axios
              .post(
                apiUrl + "/unvote",
                qs.stringify({
                  coin: coin.id,
                })
              )
              .then(() => {
                console.log("downvoted");
                window.location = "/";
              });
          }
        } else {
          window.location = "/login";
        }
      };

      let dateDiff = Math.ceil(
        (new Date(coin.launch) -
          new Date(new Date().toLocaleDateString("en-US"))) /
          (1000 * 60 * 60 * 24)
      );
      let isDatePositive = Math.sign(dateDiff) == "1";
      let isDateZero = Math.sign(dateDiff) == "0";
      let change = parseFloat(coin.volume_change_24h).toFixed(2);
      let isVolumePositive = Math.sign(change) == "1";
      let link = `/coins/${coin.id}`;
      let marketCap = [];
      if (coin.market_cap) {
        marketCap = coin.market_cap.split(".")[0];
      }
      if (marketCap.length > 3 && marketCap.length < 7) {
        marketCap =
          marketCap.substring(0, 1) + "." + marketCap.substring(1, 3) + "k";
      } else if (marketCap.length > 6 && marketCap.length < 10) {
        marketCap =
          marketCap.substring(0, 1) + "." + marketCap.substring(1, 3) + "m";
      } else if (marketCap.length > 9 && marketCap.length < 13) {
        marketCap =
          marketCap.substring(0, 1) + "." + marketCap.substring(1, 3) + "b";
      }
      if (coin.name) {
        allCoins.push({
          id: coin.id,
          logo: (
            <img
              src={coin.logo}
              style={{ width: "30px", height: "30px", marginTop: "8px" }}
            ></img>
          ),
          name: <span style={{ fontSize: "0.7rem" }}>{coin.name}</span>,
          volumeChange: presale ? (
            <span
              style={{
                backgroundColor: "#909",
                padding: "5px 10px",
                color: "white",
                borderRadius: "10rem",
                display: "inline-block",
                fontSize: "50%",
                fontWeight: "600",
                lineHeight: "1",
                marginRight: "10px",
                transition:
                  "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out",
              }}
            >
              Presale
            </span>
          ) : !change ? (
            <span>-</span>
          ) : (
            <div
              style={{
                fontSize: "60%",
                display: "inline-flex",
                marginBottom: "5px",
                marginRight: "5px",
              }}
              className={
                isVolumePositive ? "volume_color_green" : "volume_color_red"
              }
            >
              {isVolumePositive ? (
                <BsCaretUpFill style={{ marginTop: "2px" }} />
              ) : (
                <BsCaretDownFill style={{ marginTop: "2px" }} />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          ),
          price: <div style={{ fontSize: "0.7rem" }}>${marketCap}</div>,
          launch: (
            <div style={{ fontSize: "0.7rem" }}>
              {!isDateZero
                ? isDatePositive
                  ? `in ${Math.abs(dateDiff)}d`
                  : `${Math.abs(dateDiff)}d ago`
                : `Today`}
            </div>
          ),
          vote: (
            <button
              style={{ fontSize: "0.6rem" }}
              onClick={() => handleVoteClick(isvoted)}
              title="Vote?"
              className={
                isvoted
                  ? "promoted-table_votebtn_green"
                  : "promoted-table_votebtn"
              }
            >
              <BsCapslockFill />
              <span> </span>
              {!coin.votes_count ? 0 : Math.abs(coin.votes_count)}
            </button>
          ),
        });
      }
    });
  }

  return allCoins;
};
