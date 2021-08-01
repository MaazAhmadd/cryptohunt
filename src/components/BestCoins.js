import React from "react";
import manupilatingData from "./utils/manupilatingData";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { BsCaretUpFill, BsCaretDownFill, BsSearch } from "react-icons/bs";
import { GlobalFilter } from "./GlobalFilter";

export default function BestCoins({ promotedCoin: bestCoin }) {
  const [showSearch, setShowSearch] = React.useState(false);

  const handleClickRow = (row, cell) => {
    if (cell.key.includes("vote")) {
      return null;
    } else {
      return (window.location.href = `http://localhost:3000/coins/${row.id}`);
    }
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
                onClick={() => console.log(row.original)}
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
