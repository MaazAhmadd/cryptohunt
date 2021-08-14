import { BsCaretUpFill, BsCaretDownFill, BsCapslockFill } from "react-icons/bs";
import React from "react";
import axios from "axios";
import qs from "querystring";
import config from "../../config.json";
import { toast } from "react-toastify";

const apiUrl = config.API_URL;

export default (coins) => {
  let allCoins = [];
  coins.forEach((coin) => {
    let presale = coin.presale == "1";
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
    let change = parseFloat(coin.volume_change_24h).toFixed(2);
    let isVolumePositive = Math.sign(change) == "1";
    let link = `/coins/${coin.id}`;
    if (coin.name) {
      allCoins.push({
        id: coin.id,
        logo: (
          <img src={coin.logo} style={{ width: "40px", height: "40px" }}></img>
        ),
        name: coin.name,
        volumeChange: presale ? (
          <span
            style={{
              backgroundColor: "#909",
              padding: "5px 15px",
              color: "white",
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
        ) : change == "NULL" ? (
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
        price: presale ? <></> : `$${coin.market_cap}`,
        launch: !isDateZero
          ? isDatePositive
            ? `Launching in ${Math.abs(dateDiff)} days`
            : `Launched ${Math.abs(dateDiff)} days ago`
          : `Launching Today`,
        vote: (
          <button
            title="Vote?"
            onClick={() => handleVoteClick(isvoted)}
            className={
              isvoted
                ? "promoted-table_votebtn_green"
                : "promoted-table_votebtn"
            }
          >
            <BsCapslockFill />
            <span> </span>
            {!coin.votes_count ? "0" : Math.abs(coin.votes_count)}
          </button>
        ),
      });
    }
  });
  return allCoins;
};
