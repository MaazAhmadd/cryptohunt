import { BsCaretUpFill, BsCaretDownFill, BsCapslockFill } from "react-icons/bs";
import doVote from "./doVote";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default (coins) => {
  const [voted, setVoted] = useState(false);

  let allCoins = [];
  if (coins) {
    coins.forEach((coin) => {
      let voteC = coin.votes_count;
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
      let marketCap = coin.market_cap.toString().split(".")[0];
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

      allCoins.push({
        id: coin.id,
        logo: (
          <img src={coin.logo} style={{ width: "30px", height: "30px" }}></img>
        ),
        name: <span style={{ fontSize: "0.7rem" }}>{coin.name}</span>,
        volumeChange: Number.isNaN(change) ? (
          <span>-</span>
        ) : (
          <div
            style={{ fontSize: "0.7rem" }}
            className={
              isVolumePositive ? "volume_color_green" : "volume_color_red"
            }
          >
            {isVolumePositive ? <BsCaretUpFill /> : <BsCaretDownFill />}
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
            onClick={() => setVoted(true)}
            title="Vote?"
            className={
              voted ? "promoted-table_votebtn_green" : "promoted-table_votebtn"
            }
          >
            <BsCapslockFill />
            <span> </span>
            {!coin.votes_count ? 0 : Math.abs(voteC)}
          </button>
        ),
      });
    });
  }

  return allCoins;
};
