import React, { useState } from "react";

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

export default function BestCoins({ promotedCoin: bestCoin }) {
  const [showSearch, setShowSearch] = React.useState(false);

  const handleClickRow = (row, cell) => {
    if (localStorage.getItem("logged_in") != 1) {
      window.location.href = "./login";
      return;
    }
    if (cell.key.includes("vote")) {
      return null;
    } else {
      return (window.location.href = `http://34.85.128.15/coins/${row.id}`);
    }
  };
  const manupilatingData = (coins) => {
    // let [voted, setVoted] = useState(false);
    // let [voteClass, setVoteClass] = useState("promoted-table_votebtn");

    // console.log(voted);
    // console.log(voteClass);
    let allCoins = [];
    coins.forEach((coin) => {
      let voted = false;
      const handleVoteClick = (id) => {
        doVote(id);
        voted = !voted;
      };

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
        volumeChange: !change ? (
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
            onClick={() => {
              handleVoteClick(coin.id);
            }}
            title="Vote?"
            className={
              voted ? "promoted-table_votebtn_green" : "promoted-table_votebtn"
            }
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
  const bestCoins = manupilatingData(bestCoin);
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
      Header: <h3 style={{ display: "inline" }}>Time Since Launch</h3>,
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
          <p style={{ display: "inline-block" }}>
            <button
              onClick={onSearchClick}
              style={{
                border: "none",
                backgroundColor: "#28a745",
                color: "white",
                height: "25px",
                width: "70px",
              }}
            >
              <BsSearch />
              <i> </i>Search
            </button>
            <br />
            {showSearch ? (
              <GlobalFilter
                filter={globalFilter}
                setFilter={setGlobalFilterBest}
              />
            ) : null}
          </p>
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
                        onClick={() =>
                          handleClickRow(row.original, cell.getCellProps())
                        }
                        {...cell.getCellProps()}
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
