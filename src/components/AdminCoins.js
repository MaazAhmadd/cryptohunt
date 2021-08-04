import React from "react";
import { useTable } from "react-table";
import axios from "axios";
import qs from "querystring";
import {
  BsCaretUpFill,
  BsCaretDownFill,
  BsArrowRight,
  BsArrowLeft,
} from "react-icons/bs";

export default function AdminCoins({ promotedCoin: adminCoin }) {
  const handleClickRow = (row, cell) => {
    if (cell.key.includes("vote")) {
      return null;
    } else {
      return (window.location.href = `http://34.85.128.15/coins/${row.id}`);
    }
  };

  const approve = async (id) => {
    await axios.post(
      "http://34.85.128.15:8080/approve_coin",
      qs.stringify({
        coin_id: id,
      })
    );
  };
  const reject = async (id) => {
    await axios.post(
      "http://34.85.128.15:8080/reject_coin",
      qs.stringify({
        coin_id: id,
      })
    );
  };
  const manupilatingData = (coins) => {
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
      allCoins.push({
        logo: (
          <img src={coin.logo} style={{ width: "40px", height: "40px" }}></img>
        ),
        name: coin.name,
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
        price: `$${coin.price}`,
        launch: !isDateZero
          ? isDatePositive
            ? `Launching in ${Math.abs(dateDiff)} days`
            : `Launched ${Math.abs(dateDiff)} days ago`
          : `Launching Today`,
        vote: (
          <>
            <button
              onClick={() => reject(coin.id)}
              title="Vote?"
              className="admin-table_reject"
            >
              <BsArrowLeft />
              <span> </span>
              Reject
            </button>
            <span> </span>
            <button
              onClick={() => approve(coin.id)}
              title="Vote?"
              className="admin-table_approve"
            >
              Approve
              <span> </span>
              <BsArrowRight />
            </button>
          </>
        ),
      });
    });
    return allCoins;
  };

  const adminCoins = manupilatingData(adminCoin);
  const dataAdmin = React.useMemo(() => adminCoins, [adminCoin]);
  const columnsHAdmin = [
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
  const columnsAdmin = React.useMemo(() => columnsHAdmin, [adminCoin]);
  const {
    getTableProps: getTablePropsAdmin,
    getTableBodyProps: getTableBodyPropsAdmin,
    rows: rowsAdmin,
    prepareRow: prepareRowAdmin,
  } = useTable({
    columns: columnsAdmin,
    data: dataAdmin,
  });

  return (
    <>
      <h1 className="promoted-table_heading">Pending coins</h1>
      <div className="promoted-table_div">
        <table {...getTablePropsAdmin()} className="promoted-table">
          <tbody {...getTableBodyPropsAdmin()} className="promoted-table_body">
            {rowsAdmin.map((row) => {
              prepareRowAdmin(row);
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
      </div>
    </>
  );
}
