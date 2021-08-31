import { BsCaretUpFill, BsCaretDownFill, BsCapslockFill } from "react-icons/bs";
import React from "react";
import axios from "axios";
import qs from "querystring";
import config from "../../config.json";
import { toast } from "react-toastify";
import toUsd from "./toUsd";

const apiUrl = config.API_URL;

export default (coins) => {
  let allCoins = [];
  if (coins) {
    coins.forEach((coin) => {
      let votesByUser = coins[coins.length - 1];
      let isvoted = false;
      votesByUser.forEach((c) => {
        if (c.coin_id == coin.id) {
          isvoted = true;
        }
      });

      const handleVoteClick = (v, e) => {
        e.preventDefault();
        if (localStorage.getItem("token")) {
          let upArrow = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none; margin: 0px 3px 3px 0px;"><path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1z" clip-rule="evenodd"></path></svg>`;
          if (!v) {
            e.target.className = "promoted-table_votebtn_green";
            e.target.innerHTML = upArrow + ++coin.votes_count;
            isvoted = true;
            axios
              .post(
                apiUrl + "/vote",
                qs.stringify({
                  coin: coin.id,
                })
              )
              .catch(() => {
                e.target.className = "promoted-table_votebtn";
                e.target.innerHTML = upArrow + --coin.votes_count;
                isvoted = false;
              });
          } else {
            e.target.className = "promoted-table_votebtn";
            e.target.innerHTML = upArrow + --coin.votes_count;
            isvoted = false;
            axios
              .post(
                apiUrl + "/unvote",
                qs.stringify({
                  coin: coin.id,
                })
              )
              .catch(() => {
                e.target.className = "promoted-table_votebtn_green";
                e.target.innerHTML = upArrow + ++coin.votes_count;
                isvoted = true;
              });
          }
        } else {
          toast.warn("Please Login First");
        }
      };

      let dateDiff = Math.ceil(
        (new Date(coin.launch) -
          new Date(new Date().toLocaleDateString("en-US"))) /
          (1000 * 60 * 60 * 24)
      );
      let isDatePositive = Math.sign(dateDiff) == "1";
      let isDateZero = Math.sign(dateDiff) == "0";
      let presale = coin.presale == "1" && isDatePositive;
      let change = coin.volume_change_24h
        ? parseFloat(coin.volume_change_24h).toFixed(2)
        : false;
      let isVolumePositive = Math.sign(change) == "1";
      let link = `/coins/${coin.id}`;
      if (coin.name) {
        allCoins.push({
          id: coin.id,
          logo: coin.logo ? (
            <img
              src={coin.logo}
              alt="logo"
              style={{ width: "40px", height: "40px" }}
            ></img>
          ) : (
            <img
              src="defaultLogo.jpg"
              alt="logo"
              style={{ width: "40px", height: "40px" }}
            ></img>
          ),
          name: coin.name,
          volumeChange: presale ? (
            <></>
          ) : !change ? (
            <span>-</span>
          ) : (
            <div
              className={
                isVolumePositive ? "volume_color_green" : "volume_color_red"
              }
            >
              {isVolumePositive ? <BsCaretUpFill /> : <BsCaretDownFill />}
              <span>{Math.abs(change)}%</span>
            </div>
          ),
          price: presale ? (
            <span
              style={{
                backgroundColor: "#909",
                padding: "5px 15px",
                color: "white",
                marginRight: "40%",
                borderRadius: "10rem",
                display: "inline-block",
                fontSize: "75%",
                fontWeight: "700",
                lineHeight: "1",
                transition:
                  "color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-box-shadow .15s ease-in-out",
              }}
            >
              Presale
            </span>
          ) : !coin.market_cap ? (
            <span>-</span>
          ) : (
            toUsd(coin.market_cap)
          ),
          launch: !isDateZero
            ? isDatePositive
              ? `Launching in ${Math.abs(dateDiff)} days`
              : `Launched ${Math.abs(dateDiff)} days ago`
            : `Launching Today`,
          vote: (
            <button
              onClick={(e) => handleVoteClick(isvoted, e)}
              title="Vote?"
              className={
                isvoted
                  ? "promoted-table_votebtn_green"
                  : "promoted-table_votebtn"
              }
            >
              <BsCapslockFill
                style={{ pointerEvents: "none", margin: "0 3px 3px 0" }}
              />
              {!coin.votes_count ? "0" : Math.abs(coin.votes_count)}
            </button>
          ),
        });
      }
    });
  }
  return allCoins;
};
