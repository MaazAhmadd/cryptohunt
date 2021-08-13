import React from "react";
import config from "../config.json";
// import manupilatingData from "./utils/manupilatingData";
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
import doVote from "./utils/doVote";
const currentUrl = config.CURRENT_URL;

export default function BestCoins({ promotedCoin: bestCoin }) {
  const [showSearch, setShowSearch] = React.useState(false);
  const [voted, setVoted] = React.useState(false);

  const handleClickRow = (row, cell) => {
    console.log("row click");
    if (cell.key.includes("vote")) {
      console.log("vote row click");
      if (!localStorage.getItem("token")) {
        window.location.href = "./login";
        return;
      }
      setVoted(() => {
        console.log("vote clicked ", voted);
        return !voted;
      });
      doVote(row.id);
      // voted
      return null;
    } else {
      return (window.location.href = `${currentUrl}/coins/${row.id}`);
    }
  };
  // ko
  const handleVoteClick = () => {
    setVoted("true");
    // doVote(id);
    console.log("vote clicked ", voted);
  };
  const manupilatingData = (coins) => {
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

        allCoins.push({
          id: coin.id,
          logo: (
            <img
              src={coin.logo}
              style={{ width: "40px", height: "40px" }}
            ></img>
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
              onClick={() => setVoted(true)}
              title="Vote?"
              className={
                voted
                  ? "promoted-table_votebtn_green"
                  : "promoted-table_votebtn"
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
  const manupilatingSmallData = (coins) => {
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
        let marketCap = [];
        if (coin.market_cap !== null) {
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

        allCoins.push({
          id: coin.id,
          logo: (
            <img
              src={coin.logo}
              style={{ width: "30px", height: "30px" }}
            ></img>
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
                voted
                  ? "promoted-table_votebtn_green"
                  : "promoted-table_votebtn"
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
  let bestCoins;
  if (window.innerWidth < 551) {
    bestCoins = manupilatingSmallData(bestCoin);
  } else {
    bestCoins = manupilatingData(bestCoin);
  }
  const dataBest = React.useMemo(() => bestCoins, [bestCoin]);

  const columnsHBest = [
    {
      accessor: "logo",
    },
    {
      accessor: "name",
    },
    {
      Header: <h3 style={{ display: "inline" }}>24h</h3>,
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
  const columnsBest = React.useMemo(() => columnsHBest, [bestCoin]);
  const {
    getTableProps: getTablePropsBest,
    getTableBodyProps: getTableBodyPropsBest,
    page: pageBest,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow: prepareRowBest,
    headerGroups: headerGroupsBest,
    state: stateBest,
    setGlobalFilter: setGlobalFilterBest,
  } = useTable(
    {
      columns: columnsBest,
      data: dataBest,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const { globalFilter, pageIndex } = stateBest;
  const onSearchClick = () => setShowSearch(true);

  return (
    <>
      <div className="promoted-table_div">
        <table {...getTablePropsBest()} className="promoted-table">
          <thead>
            {headerGroupsBest.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyPropsBest()} className="promoted-table_body">
            <tr role="row" className="promoted-table_row">
              <td className="promoted-table_data" role="cell">
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
              </td>
              <td className="promoted-table_data table-search" role="cell">
                {showSearch ? (
                  <GlobalFilter
                    filter={globalFilter}
                    setFilter={setGlobalFilterBest}
                  />
                ) : null}
              </td>
              <td className="promoted-table_data" role="cell"></td>
              <td className="promoted-table_data" role="cell"></td>
              <td className="promoted-table_data" role="cell"></td>
              <td className="promoted-table_data" role="cell"></td>
            </tr>
            {pageBest.map((row) => {
              prepareRowBest(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="promoted-table_row promoted-table_data_underline"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
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
