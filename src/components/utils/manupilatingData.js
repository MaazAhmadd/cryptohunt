import { BsCaretUpFill, BsCaretDownFill, BsCapslockFill } from "react-icons/bs";
import doVote from "./doVote";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default (coins) => {
  // let [voted, setVoted] = useState(false);
  let [voteClass, setVoteClass] = useState("promoted-table_votebtn");

  // console.log(voted);
  // console.log(voteClass);
  let allCoins = [];
  coins.forEach((coin) => {
    let votesByUser = coins[coins.length - 1];
    let isvoted = false;
    votesByUser.forEach((c) => {
      if (c.coin_id === coin.id) {
        isvoted = true;
      }
    });

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
        name: <span style={{ fontSize: "larger" }}>{coin.name}</span>,
        volumeChange: Number.isNaN(change) ? (
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
        price: `$${coin.market_cap}`,
        launch: !isDateZero
          ? isDatePositive
            ? `Launching in ${Math.abs(dateDiff)} days`
            : `Launched ${Math.abs(dateDiff)} days ago`
          : `Launching Today`,
        vote: (
          <button
            title="Vote?"
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
