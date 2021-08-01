import React from "react";
import { BsCapslockFill, BsArrowLeft, BsHeartFill } from "react-icons/bs";
import axios from "axios";
import { Link } from "react-router-dom";

export default function DetailsCoin() {
  const [detailsCoins, setDetailsCoins] = React.useState([]);
  const [randomCoins, setRandomCoins] = React.useState([]);
  const [moonS, setMoon] = React.useState(0);
  const [fireS, setFire] = React.useState(0);
  const [gemS, setGem] = React.useState(0);
  const [heartS, setHeart] = React.useState(0);
  const [joyS, setJoy] = React.useState(0);
  const [likedS, setLiked] = React.useState(0);

  let splitted = window.location.href.split("/");
  let url = splitted[splitted.length - 1];
  let linkk = `http://localhost:8080/coins/${url}`;
  const getCoinDetailsData = async () => {
    //fetch
    await axios.get(linkk).then(({ data }) => {
      setDetailsCoins(data);
    });
  };

  React.useEffect(() => {
    //fetch
    getCoinDetailsData();
  }, []);

  const moonHandler = async (moon, id) => {
    setMoon(Number(moon) + 1);
    await axios.get(`http://localhost:8080/reacts/${id}/moon`);
  };
  const fireHandler = async (fire, id) => {
    setFire(Number(fire) + 1);
    await axios.get(`http://localhost:8080/reacts/${id}/fire`);
  };
  const gemHandler = async (gem, id) => {
    setGem(Number(gem) + 1);
    await axios.get(`http://localhost:8080/reacts/${id}/gem`);
  };
  const heartHandler = async (heart, id) => {
    setHeart(Number(heart) + 1);
    await axios.get(`http://localhost:8080/reacts/${id}/heart`);
  };
  const joyHandler = async (joy, id) => {
    setJoy(Number(joy) + 1);
    await axios.get(`http://localhost:8080/reacts/${id}/joy`);
  };
  const likedHandler = async (liked, id) => {
    setLiked(Number(liked) + 1);
    await axios.get(`http://localhost:8080/reacts/${id}/liked`);
  };
  let coin = detailsCoins;
  const getRandomCoins = async () => {
    //fetch
    await axios.get("http://localhost:8080/random").then(({ data }) => {
      setRandomCoins(data);
    });
  };

  return (
    <>
      <a
        onClick={() => {
          window.location.href = "/";
        }}
        // to="/"
        style={{
          cursor: "pointer",
          textDecoration: "none",
          marginLeft: "5%",
          marginTop: "5%",
          fontSize: "x-large",
          color: "black",
        }}
      >
        <i>{<BsArrowLeft />}</i> Back to Home
      </a>
      <div className="details-page">
        <div className="details-left">
          <div className="details-left-top">
            <img
              src={coin.logo}
              alt="coin_logo"
              style={{ marginRight: "2%" }}
            />
            <h2>
              {coin.name} {"("}
              {coin.symbol}
              {")"}
            </h2>
            <button
              // onClick={() => handleVoteClick(coin.id)}
              title="Vote?"
              className="promoted-table_votebtn"
            >
              <BsCapslockFill />
              <span> </span>
              {!coin.votes_count ? "0" : coin.votes_count}
            </button>
            <br />
            <p className="details-left-chain">
              Binance Smart Chain: {coin.binancesmartchain}
            </p>
            <p className="details-left-desc">{coin.description}</p>
          </div>
          <div className="details-reacts">
            <span
              onClick={() => moonHandler(coin.moon, coin.id)}
              title="To the moon"
              className="details-reacts_icons"
            >
              🚀
            </span>
            <span
              onClick={() => fireHandler(coin.fire, coin.id)}
              title="On fire"
              className="details-reacts_icons"
            >
              🔥
            </span>
            <span
              onClick={() => gemHandler(coin.gem, coin.id)}
              title="Gem"
              className="details-reacts_icons"
            >
              💎
            </span>
            <span
              onClick={() => heartHandler(coin.heart, coin.id)}
              title="Love it"
              className="details-reacts_icons"
              style={{ color: "#f83a3a", fontSize: "28px" }}
            >
              <BsHeartFill />
            </span>
            <span
              onClick={() => joyHandler(coin.joy, coin.id)}
              title="Joy"
              className="details-reacts_icons"
            >
              😀
            </span>
            <span
              onClick={() => likedHandler(coin.like, coin.id)}
              title="Like it"
              className="details-reacts_icons"
            >
              👍
            </span>
            <span>{moonS || coin.moon}</span>
            <span>{fireS || coin.fire}</span>
            <span>{gemS || coin.gem}</span>
            <span>{heartS || coin.heart}</span>
            <span>{joyS || coin.joy}</span>
            <span>{likedS || coin.liked}</span>
          </div>
        </div>
        <div className="details-right">
          <div className="details-right-price">
            <p className="details-right-price-h">Price</p>

            <p className="details-right-price-b">{coin.price}</p>
            <br />
            <p className="details-right-price-h">Market Cap</p>

            <p className="details-right-price-b">{coin.market_cap}</p>
            <br />
            <p className="details-right-price-h">Launch date</p>

            <p className="details-right-price-b">{coin.launch}</p>
            <br />
          </div>
          <div className="details-right-socials">
            <button>Telegram</button>
            <br />
            <button>Twitter</button>
            <br />
            <button>Website</button>
            <br />
          </div>
          <div className="details-right-more">
            <p onClick={() => getRandomCoins()}>Discover</p>
            <span>
              {randomCoins.map((rcoin) => {
                return (
                  <div
                    onClick={() => {
                      let location = `/coins/${rcoin.id}`;
                      window.location.href = location;
                    }}
                    className="details-right-more_coin"
                  >
                    <img
                      src={rcoin.logo}
                      style={{ height: "40px", width: "40px" }}
                    ></img>
                    <p className="details-right-more_coin_text">{rcoin.name}</p>
                    <br />
                  </div>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
