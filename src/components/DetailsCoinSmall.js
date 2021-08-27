import React, { useState } from "react";
import {
  BsCapslockFill,
  BsArrowLeft,
  BsHeartFill,
  BsClipboard,
} from "react-icons/bs";
import axios from "axios";
import { useHistory } from "react-router-dom";
import config from "../config.json";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import qs from "querystring";

const apiUrl = config.API_URL;

export default function DetailsCoin() {
  const [detailsCoins, setDetailsCoins] = useState([]);
  const [randomCoins, setRandomCoins] = useState([]);
  const [isCvoted, setCIsvoted] = useState(0);
  const [status, setStatus] = useState(false);
  const [moonS, setMoon] = useState(0);
  const [fireS, setFire] = useState(0);
  const [gemS, setGem] = useState(0);
  const [heartS, setHeart] = useState(0);
  const [joyS, setJoy] = useState(0);
  const [likedS, setLiked] = useState(0);

  const history = useHistory();

  let isvoted = false;
  if (isCvoted == 1) {
    isvoted = true;
  }

  let token = localStorage.getItem("token");
  React.useEffect(() => {
    let myF = async () => {
      token = await localStorage.getItem("token");
    };
    myF();
  }, []);
  let dectoken = { role: "notAdmin" };

  try {
    dectoken = jwtDecode(token);
  } catch (ex) {}

  axios.defaults.headers.common["x-auth-token"] = token;

  let splitted = window.location.href.split("/");
  let id = splitted[splitted.length - 1];
  let linkk = `${apiUrl}/coins/${id}`;
  const getCoinDetailsData = async () => {
    //fetch
    await axios.get(linkk).then(({ data }) => {
      setDetailsCoins(data[0]);
    });
  };
  const getRandomCoins = async () => {
    //fetch
    await axios.get(apiUrl + "/random").then(({ data }) => {
      setRandomCoins(data);
      setStatus(true);
    });
  };
  const getCoinVote = async () => {
    //fetch
    if (token) {
      await axios.get(`${apiUrl}/get/vote/${id}`).then(({ data }) => {
        setCIsvoted(data);
      });
    }
  };

  const moonHandler = async (moon, id) => {
    if (!token) {
      toast.warn("Please Login First");
      return;
    }
    setMoon(Number(moon) + 1);
    await axios.get(`${apiUrl}/reacts/${id}/moon`);
  };
  const fireHandler = async (fire, id) => {
    if (!token) {
      toast.warn("Please Login First");
      return;
    }
    setFire(Number(fire) + 1);
    await axios.get(`${apiUrl}/reacts/${id}/fire`);
  };
  const gemHandler = async (gem, id) => {
    if (!token) {
      toast.warn("Please Login First");
      return;
    }
    setGem(Number(gem) + 1);
    await axios.get(`${apiUrl}/reacts/${id}/gem`);
  };
  const heartHandler = async (heart, id) => {
    if (!token) {
      toast.warn("Please Login First");
      return;
    }
    setHeart(Number(heart) + 1);
    await axios.get(`${apiUrl}/reacts/${id}/heart`);
  };
  const joyHandler = async (joy, id) => {
    if (!token) {
      toast.warn("Please Login First");
      return;
    }
    setJoy(Number(joy) + 1);
    await axios.get(`${apiUrl}/reacts/${id}/joy`);
  };
  const likedHandler = async (liked, id) => {
    if (!token) {
      toast.warn("Please Login First");
      return;
    }
    setLiked(Number(liked) + 1);
    await axios.get(`${apiUrl}/reacts/${id}/liked`);
  };
  // let detailsCoins = [];
  React.useEffect(() => {
    //fetch
    getCoinVote();
    getCoinDetailsData();
    getRandomCoins();
  }, []);

  const handleVoteClick = (v, e) => {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      let upArrow = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none; margin: 0px 3px 3px 0px;"><path fill-rule="evenodd" d="M7.27 1.047a1 1 0 011.46 0l6.345 6.77c.6.638.146 1.683-.73 1.683H11.5v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1H1.654C.78 9.5.326 8.455.924 7.816L7.27 1.047zM4.5 13.5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1z" clip-rule="evenodd"></path></svg>`;
      if (!v) {
        e.target.className = "promoted-table_votebtn_green";
        e.target.innerHTML = upArrow + ++detailsCoins.votes_count;
        isvoted = true;
        axios
          .post(
            apiUrl + "/vote",
            qs.stringify({
              coin: detailsCoins.id,
            })
          )
          .catch(() => {
            e.target.className = "promoted-table_votebtn";
            e.target.innerHTML = upArrow + --detailsCoins.votes_count;
            isvoted = false;
          });
      } else {
        e.target.className = "promoted-table_votebtn";
        e.target.innerHTML = upArrow + --detailsCoins.votes_count;
        isvoted = false;
        axios
          .post(
            apiUrl + "/unvote",
            qs.stringify({
              coin: detailsCoins.id,
            })
          )
          .catch(() => {
            e.target.className = "promoted-table_votebtn_green";
            e.target.innerHTML = upArrow + ++detailsCoins.votes_count;
            isvoted = true;
          });
      }
    } else {
      toast.warn("Please Login First");
    }
  };

  let dateDiff = Math.ceil(
    (new Date(detailsCoins.launch) -
      new Date(new Date().toLocaleDateString("en-US"))) /
      (1000 * 60 * 60 * 24)
  );

  let isDatePositive = Math.sign(dateDiff) == "1";
  let presale = detailsCoins.presale == "1" && isDatePositive;

  return (
    <>
      {status ? (
        <div>
          <a
            onClick={() => {
              history.push("/");
              // window.location.href = "/";
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
                <div className="details-left-top1">
                  {detailsCoins.logo ? (
                    <img
                      src={detailsCoins.logo}
                      alt="logo"
                      style={{ marginRight: "2%" }}
                    />
                  ) : (
                    <img
                      src="../defaultLogo.jpg"
                      alt="logo"
                      style={{ marginRight: "2%" }}
                    />
                  )}
                  <p
                    style={{
                      fontSize: "100%",
                      fontWeight: "600",
                      marginLeft: "-10%",
                    }}
                  >
                    {detailsCoins.name}
                  </p>
                  <p
                    style={{
                      fontSize: "80%",
                      backgroundColor: "lightgray",
                      width: "12%",
                      height: "20px",
                      textAlign: "center",
                      paddingTop: "0.6%",
                      marginLeft: "-5%",
                      borderRadius: "6px",
                    }}
                  >
                    {detailsCoins.symbol}
                  </p>

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
                    {!detailsCoins.votes_count
                      ? "0"
                      : Math.abs(detailsCoins.votes_count)}
                  </button>
                </div>

                <div className="details-left-top2">
                  {presale || detailsCoins.binancesmartchain == 0 ? (
                    <p className="details-left-chain">
                      WARNING: The contract is kept hidden for pre launch, make
                      sure to DYOR
                    </p>
                  ) : (
                    <p
                      className="details-left-chain"
                      style={{
                        margin: "0 4%",
                        display: "inherit",
                        width: "92%",
                        fontSize: "0.7rem",
                      }}
                    >
                      Binance Smart Chain: {detailsCoins.binancesmartchain}
                      {"      "}
                      <BsClipboard
                        style={{ cursor: "pointer", fontSize: "1rem" }}
                        onClick={() => {
                          navigator.clipboard
                            .writeText(detailsCoins.binancesmartchain)
                            .then(() => {
                              toast.info("Copied to Clipboard");
                            });
                        }}
                      />
                    </p>
                  )}
                </div>
              </div>

              <div className="details-right-socials">
                <a href={detailsCoins.telegram}>
                  <button>Telegram</button>
                </a>
                <br />
                <a href={detailsCoins.twitter}>
                  <button>Twitter</button>
                </a>
                <br />
                <a href={detailsCoins.website}>
                  <button>Website</button>
                </a>
                <br />
              </div>
            </div>
            <div className="details-right">
              <div className="details-right-price">
                <p className="details-right-price-h">Price</p>

                <p className="details-right-price-b">
                  {detailsCoins.price ? (
                    `$${detailsCoins.price}`
                  ) : (
                    <span>-</span>
                  )}
                </p>
                <br />
                <p className="details-right-price-h">Market Cap</p>

                <p className="details-right-price-b">
                  {detailsCoins.market_cap ? (
                    `$${detailsCoins.market_cap}`
                  ) : (
                    <span>-</span>
                  )}
                </p>
                <br />
                <p className="details-right-price-h">Launch date</p>

                <p className="details-right-price-b">{detailsCoins.launch}</p>
                <br />
                {dectoken.role == "admin" ? (
                  <div>
                    <p className="details-right-price-h">Coin ID</p>
                    <p className="details-right-price-b">{detailsCoins.id}</p>
                    <br />
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="details-left-desc-reacts">
                <p style={{ paddingTop: "20px" }} className="details-left-desc">
                  {detailsCoins.description}
                </p>
                <div className="details-reacts">
                  <span
                    onClick={() =>
                      moonHandler(detailsCoins.moon, detailsCoins.id)
                    }
                    title="To the moon"
                    className="details-reacts_icons"
                  >
                    🚀
                  </span>
                  <span
                    onClick={() =>
                      fireHandler(detailsCoins.fire, detailsCoins.id)
                    }
                    title="On fire"
                    className="details-reacts_icons"
                  >
                    🔥
                  </span>
                  <span
                    onClick={() =>
                      gemHandler(detailsCoins.gem, detailsCoins.id)
                    }
                    title="Gem"
                    className="details-reacts_icons"
                  >
                    💎
                  </span>
                  <span
                    onClick={() =>
                      heartHandler(detailsCoins.heart, detailsCoins.id)
                    }
                    title="Love it"
                    className="details-reacts_icons details-reacts_icons_heart"
                  >
                    <BsHeartFill />
                  </span>
                  <span
                    onClick={() =>
                      joyHandler(detailsCoins.joy, detailsCoins.id)
                    }
                    title="Joy"
                    className="details-reacts_icons"
                  >
                    😀
                  </span>
                  <span
                    onClick={() =>
                      likedHandler(detailsCoins.like, detailsCoins.id)
                    }
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
                        {rcoin.logo ? (
                          <img
                            src={rcoin.logo}
                            alt="logo"
                            style={{ height: "35px", width: "35px" }}
                          ></img>
                        ) : (
                          <img
                            src="../defaultLogo.jpg"
                            alt="logo"
                            style={{ height: "35px", width: "35px" }}
                          ></img>
                        )}
                        <p className="details-right-more_coin_text">
                          {rcoin.name}
                        </p>
                        <br />
                      </div>
                    );
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="load-wrapp">
          <div className="load-3">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      )}
    </>
  );
}
