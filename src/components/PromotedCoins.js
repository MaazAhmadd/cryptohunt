import React from "react";
import manupilatingData from "./utils/manupilatingData";
import manupilatingSmallData from "./utils/manupilatingSmallData";
import { useTable } from "react-table";
import { useHistory } from "react-router-dom";

export default function PromotedCoins({ promotedCoin }) {
  const history = useHistory();
  // const [voted, setVoted] = React.useState(false);
  let promotedCoins;
  if (window.innerWidth < 551) {
    promotedCoins = manupilatingSmallData(promotedCoin);
  } else {
    promotedCoins = manupilatingData(promotedCoin);
  }
  const dataPromoted = React.useMemo(() => promotedCoins, [promotedCoin]);

  // let token;
  // React.useEffect(() => {
  //   let myF = async () => {
  //     token = await localStorage.getItem("token");
  //   };
  //   myF();
  // }, []);

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
      return null;
    } else {
      return window.location = `/coins/${row.id}`;
      // return (window.location.href = `${currentUrl}/coins/${row.id}`);
    }
  };
  return (
    <>
      <h1 className="promoted-table_heading">Promoted coins</h1>
      <div className="promoted-table_div">
        <table {...getTablePropsPromoted()} className="promoted-table">
          <tbody
            {...getTableBodyPropsPromoted()}
            className="promoted-table_body"
          >
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
    </>
  );
}
