import React from "react";
import axios from "axios";
import qs from "querystring";
import config from "../config.json";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import {
  BsCaretUpFill,
  BsCaretDownFill,
  BsSearch,
  BsCapslockFill,
} from "react-icons/bs";
import { GlobalFilter } from "./GlobalFilter";
import toUsd from "./utils/toUsd";
const apiUrl = config.API_URL;

export default function BestCoins({ promotedCoin: bestCoin }) {
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
  const [showSearch, setShowSearch] = React.useState(false);

  const history = useHistory();

  const handleClickRow = (row, cell) => {
    if (cell.key.includes("vote")) {
      return null;
    } else {
      return (window.location = `/coins/${row.id}`);
      // return (window.location.href = `${currentUrl}/coins/${row.id}`);
    }
  };

  const manupilatingData = (coins) => {
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
            // name: <span style={{ fontSize: "larger" }}>{coin.name}</span>,
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
  const manupilatingSmallData = (coins) => {
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
            logo: coin.logo ? (
              <img
                src={coin.logo}
                alt="logo"
                style={{ width: "30px", height: "30px", marginTop: "8px" }}
              ></img>
            ) : (
              <img
                src="defaultLogo.jpg"
                alt="logo"
                style={{ width: "30px", height: "30px" }}
              ></img>
            ),
            name: coin.name,
            // name: <span style={{ fontSize: "1rem" }}>{coin.name}</span>,
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
                  marginRight: "-60%",
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
            price: presale ? (
              <></>
            ) : !coin.market_cap ? (
              <span>-</span>
            ) : (
              <div style={{ fontSize: "0.8rem" }}>${marketCap}</div>
            ),
            launch: (
              <div style={{ fontSize: "0.8rem" }}>
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
  let bestCoins;
  if (window.innerWidth < 551) {
    bestCoins = manupilatingSmallData(bestCoin);
  } else {
    bestCoins = manupilatingData(bestCoin);
  }
  const data = React.useMemo(() => bestCoins, [bestCoin]);

  const columnsHBest = [
    {
      accessor: "logo",
    },
    {
      accessor: "name",
    },
    {
      Header: <h3 style={{ display: "inline" }}>1h</h3>,
      accessor: "volumeChange",
    },
    {
      Header: <h3 style={{ display: "inline" }}>Market Cap</h3>,
      accessor: "price",
    },
    {
      Header: <h3 style={{ display: "inline" }}>Since Launch</h3>,
      accessor: "launch",
    },
    {
      Header: <h3 style={{ display: "inline" }}>Votes</h3>,
      accessor: "vote",
    },
  ];
  const columns = React.useMemo(() => columnsHBest, [bestCoin]);
  const {
    getTableProps,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    headerGroups,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        sortBy: [
          {
            id: "vote",
            desc: false,
          },
        ],
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = state;
  const onSearchClick = () => {
    setGlobalFilter("");
    return setShowSearch(!showSearch);
  };

  return (
    <>
      <div className="promoted-table_div">
        <table {...getTableProps()} className="promoted-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...(column.id == "logo" || column.id == "name"
                      ? {}
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.id == "logo" ? (
                      <button
                        onClick={onSearchClick}
                        style={{
                          cursor: "pointer",
                          backgroundColor: "#28a745",
                          color: "white",
                          borderRadius: "6px",
                          border: "none",
                          padding: "10px",
                        }}
                      >
                        <BsSearch
                          style={{
                            fontSize: "1rem",
                          }}
                        />
                      </button>
                    ) : column.id == "name" ? (
                      showSearch ? (
                        <GlobalFilter
                          filter={globalFilter}
                          setFilter={setGlobalFilter}
                        />
                      ) : null
                    ) : (
                      column.render("Header")
                    )}
                    {column.id == "logo" || column.id == "name" ? (
                      ""
                    ) : (
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <BsCaretUpFill />
                          ) : (
                            <BsCaretDownFill />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="promoted-table_body">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="promoted-table_row promoted-table_data_underline"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        style={{ minWidth: "50px" }}
                        {...cell.getCellProps()}
                        onClick={() =>
                          handleClickRow(row.original, cell.getCellProps())
                        }
                        className="promoted-table_data"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="promoted-pagination">
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </>
  );
}
