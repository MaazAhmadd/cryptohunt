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
  let id = splitted[splitted.length - 1];
  let linkk = `http://34.85.128.15:8080/coins/${id}`;
  const getCoinDetailsData = async () => {
    //fetch
    await axios.get(linkk).then(({ data }) => {
      setDetailsCoins(data[0]);
    });
  };
  const getRandomCoins = async () => {
    //fetch
    await axios.get("http://34.85.128.15:8080/random").then(({ data }) => {
      setRandomCoins(data);
    });
  };

  const moonHandler = async (moon, id) => {
    setMoon(Number(moon) + 1);
    await axios.get(`http://34.85.128.15:8080/reacts/${id}/moon`);
  };
  const fireHandler = async (fire, id) => {
    setFire(Number(fire) + 1);
    await axios.get(`http://34.85.128.15:8080/reacts/${id}/fire`);
  };
  const gemHandler = async (gem, id) => {
    setGem(Number(gem) + 1);
    await axios.get(`http://34.85.128.15:8080/reacts/${id}/gem`);
  };
  const heartHandler = async (heart, id) => {
    setHeart(Number(heart) + 1);
    await axios.get(`http://34.85.128.15:8080/reacts/${id}/heart`);
  };
  const joyHandler = async (joy, id) => {
    setJoy(Number(joy) + 1);
    await axios.get(`http://34.85.128.15:8080/reacts/${id}/joy`);
  };
  const likedHandler = async (liked, id) => {
    setLiked(Number(liked) + 1);
    await axios.get(`http://34.85.128.15:8080/reacts/${id}/liked`);
  };
  // let detailsCoins = [];
  React.useEffect(() => {
    //fetch
    getCoinDetailsData();
    getRandomCoins();
  }, []);

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
              src={detailsCoins.logo}
              alt="coin_logo"
              style={{ marginRight: "2%" }}
            />
            <h2>
              {detailsCoins.name} {"("}
              {detailsCoins.symbol}
              {")"}
            </h2>
            <button
              // onClick={() => handleVoteClick(coin.id)}
              title="Vote?"
              className="promoted-table_votebtn"
            >
              <BsCapslockFill />
              <span> </span>
              {!detailsCoins.votes_count ? "0" : detailsCoins.votes_count}
            </button>
            <br />
            <p className="details-left-chain">
              Binance Smart Chain: {detailsCoins.binancesmartchain}
            </p>
            <p className="details-left-desc">{detailsCoins.description}</p>
          </div>
          <div className="details-reacts">
            <span
              onClick={() => moonHandler(detailsCoins.moon, detailsCoins.id)}
              title="To the moon"
              className="details-reacts_icons"
            >
              🚀
            </span>
            <span
              onClick={() => fireHandler(detailsCoins.fire, detailsCoins.id)}
              title="On fire"
              className="details-reacts_icons"
            >
              🔥
            </span>
            <span
              onClick={() => gemHandler(detailsCoins.gem, detailsCoins.id)}
              title="Gem"
              className="details-reacts_icons"
            >
              💎
            </span>
            <span
              onClick={() => heartHandler(detailsCoins.heart, detailsCoins.id)}
              title="Love it"
              className="details-reacts_icons"
              style={{ color: "#f83a3a", fontSize: "28px" }}
            >
              <BsHeartFill />
            </span>
            <span
              onClick={() => joyHandler(detailsCoins.joy, detailsCoins.id)}
              title="Joy"
              className="details-reacts_icons"
            >
              😀
            </span>
            <span
              onClick={() => likedHandler(detailsCoins.like, detailsCoins.id)}
              title="Like it"
              className="details-reacts_icons"
            >
              👍
            </span>
            <span>{moonS || detailsCoins.moon}</span>
            <span>{fireS || detailsCoins.fire}</span>
            <span>{gemS || detailsCoins.gem}</span>
            <span>{heartS || detailsCoins.heart}</span>
            <span>{joyS || detailsCoins.joy}</span>
            <span>{likedS || detailsCoins.liked}</span>
          </div>
        </div>
        <div className="details-right">
          <div className="details-right-price">
            <p className="details-right-price-h">Price</p>

            <p className="details-right-price-b">{detailsCoins.price}</p>
            <br />
            <p className="details-right-price-h">Market Cap</p>

            <p className="details-right-price-b">{detailsCoins.market_cap}</p>
            <br />
            <p className="details-right-price-h">Launch date</p>

            <p className="details-right-price-b">{detailsCoins.launch}</p>
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
