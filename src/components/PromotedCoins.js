import React from "react";
import manupilatingData from "./utils/manupilatingData";
import { useTable } from "react-table";
import doVote from "./utils/doVote";

export default function PromotedCoins({ promotedCoin }) {
  // const [voted, setVoted] = React.useState(false);
  const promotedCoins = manupilatingData(promotedCoin);
  const dataPromoted = React.useMemo(() => promotedCoins, [promotedCoin]);

  const columnsHPromoted = [
    {
      accessor: "logo",
    },
    {
      accessor: "name",
    },
    {
      accessor: "volumeChange",
    },
    {
      accessor: "price",
    },
    {
      accessor: "launch",
    },
    {
      accessor: "vote",
    },
  ];
  const columnsPromoted = React.useMemo(() => columnsHPromoted, [promotedCoin]);
  const {
    getTableProps: getTablePropsPromoted,
    getTableBodyProps: getTableBodyPropsPromoted,
    rows: rowsPromoted,
    prepareRow: prepareRowPromoted,
  } = useTable({
    columns: columnsPromoted,
    data: dataPromoted,
  });
  // <Link to="/register">Register Now</Link>
  const handleClickRow = (row, cell) => {
    if (cell.key.includes("vote")) {
      doVote(row.id);
      // voted
      //   ? (row.vote.props.className = "promoted-table_votebtn_green")
      //   : (row.vote.props.className = "promoted-table_votebtn");
      // console.log("vote clicked ", row, row.vote.props.className, cell);
      return null;
    } else {
      return (window.location.href = `http://34.85.128.15/coins/${row.id}`);
    }
  };
  return (
    <div>
      <h1 className="promoted-table_heading">Promoted coins</h1>
      <table {...getTablePropsPromoted()} className="promoted-table">
        <tbody {...getTableBodyPropsPromoted()} className="promoted-table_body">
          {rowsPromoted.map((row) => {
            prepareRowPromoted(row);
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
  );
}
