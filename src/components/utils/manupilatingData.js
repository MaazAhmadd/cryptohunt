import { BsCaretUpFill, BsCaretDownFill, BsCapslockFill } from "react-icons/bs";
import doVote from "./doVote";
import { Link } from "react-router-dom";
import { useState } from "react";

export default (coins) => {
  let [voted, setVoted] = useState(false);
  let [voteClass, setVoteClass] = useState("promoted-table_votebtn");
  const handleVoteClick = (id) => {
    doVote(id);
    // if (voted == true) {
    //   setVoted(false);
    //   setVoteClass("promoted-table_votebtn");
    // } else {
    //   setVoted(true);
    //   setVoteClass("promoted-table_votebtn_green");
    // }
    // window.location.reload(false);
  };
  // console.log(voted);
  // console.log(voteClass);
  let allCoins = [];
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

    allCoins.push({
      id: coin.id,
      logo: (
        <img src={coin.logo} style={{ width: "40px", height: "40px" }}></img>
      ),
      name: <span style={{ fontSize: "larger" }}>{coin.name}</span>,
      volumeChange: (
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
          onClick={() => handleVoteClick(coin.id)}
          title="Vote?"
          className={voteClass}
        >
          <BsCapslockFill />
          <span> </span>
          {!coin.votes_count ? "0" : voteC}
        </button>
      ),
    });
  });
  return allCoins;
};
