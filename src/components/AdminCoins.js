import React, { useEffect, useState } from "react";
import { useTable } from "react-table";
import axios from "axios";
import qs from "querystring";
import jwtDecode from "jwt-decode";
import {
  BsCaretUpFill,
  BsCaretDownFill,
  BsArrowRight,
  BsArrowLeft,
} from "react-icons/bs";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import config from "../config.json";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const apiUrl = config.API_URL;

export default function AdminCoins() {
  const [unapprovedCoins, setUnapprovedCoins] = useState([]);
  const [promo, setPromo] = useState({ promote: 0, presale: 0, edit: 0 });
  const [status, setStatus] = useState(false);

  const history = useHistory();

  let token = localStorage.getItem("token");
  axios.defaults.headers.common["x-auth-token"] = token;
  let dectoken = { role: "notAdmin" };

  try {
    dectoken = jwtDecode(token);
  } catch (ex) {}

  useEffect(() => {
    if (dectoken.role == "admin") {
      getCoinUnapprovedData();
    }
  }, []);
  const getCoinUnapprovedData = async () => {
    await axios.get(apiUrl + "/admin/unapproved").then(({ data }) => {
      setUnapprovedCoins(data.coin_results);
      setStatus(true);
    });
  };
  const handleClickRow = (row, cell) => {
    if (cell.key.includes("vote")) {
      return null;
    } else {
      return history.push(`/coins/${row.id}`);
      // return (window.location.href = `${currentUrl}/coins/${row.id}`);
    }
  };

  const approve = async (id) => {
    await axios
      .post(
        apiUrl + "/approve_coin",
        qs.stringify({
          coin_id: id,
        })
      )
      .then(() => {
        toast("Coin Approved");
        setUnapprovedCoins(unapprovedCoins.filter((c) => c.id !== id));
      });
  };
  const reject = async (id) => {
    await axios
      .post(
        apiUrl + "/reject_coin",
        qs.stringify({
          coin_id: id,
        })
      )
      .then(() => {
        toast("Coin Rejected");
        setUnapprovedCoins(unapprovedCoins.filter((c) => c.id !== id));
      });
  };
  const manupilatingData = (coins) => {
    let allCoins = [];
    if (coins) {
      coins.forEach((coin) => {
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
    }
    return allCoins;
  };

  const adminCoins = manupilatingData(unapprovedCoins);
  const dataAdmin = React.useMemo(() => adminCoins, [unapprovedCoins]);
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
  const columnsAdmin = React.useMemo(() => columnsHAdmin, [unapprovedCoins]);
  const {
    getTableProps: getTablePropsAdmin,
    getTableBodyProps: getTableBodyPropsAdmin,
    rows: rowsAdmin,
    prepareRow: prepareRowAdmin,
  } = useTable({
    columns: columnsAdmin,
    data: dataAdmin,
  });

  function handleInput(e) {
    setPromo({
      ...promo,
      [e.target.id]: e.target.value,
    });
  }
  async function doPromote(e) {
    if (promo.promote !== 0) {
      axios.get(`${apiUrl}/admin/promote/${promo.promote}`).then(({ data }) => {
        toast(data);
      });
    } else {
      toast("Please Enter ID");
    }
  }
  async function doPresale(e) {
    if (promo.presale !== 0) {
      axios.get(`${apiUrl}/admin/presale/${promo.presale}`).then(({ data }) => {
        toast(data);
      });
    } else {
      toast("Please Enter ID");
    }
  }
  async function doRemPromote(e) {
    if (promo.promote !== 0) {
      axios
        .get(`${apiUrl}/admin/rempromote/${promo.promote}`)
        .then(({ data }) => {
          toast(data);
        });
    } else {
      toast("Please Enter ID");
    }
  }
  async function doRemPresale(e) {
    if (promo.presale !== 0) {
      axios
        .get(`${apiUrl}/admin/rempresale/${promo.presale}`)
        .then(({ data }) => {
          toast(data);
        });
    } else {
      toast("Please Enter ID");
    }
  }
  async function doEditCoin(e) {
    if (promo.edit !== 0) {
      await axios.get(`${apiUrl}/coins/${promo.edit}`).then(({ data }) => {
        if (data[0].name) {
          history.push(`/admin/edit/${promo.edit}`);
        } else {
          toast(data);
        }
      });
    } else {
      toast("Please Enter ID");
    }
  }
  async function doRemoveCoin(e) {
    if (promo.edit !== 0) {
      axios.get(`${apiUrl}/admin/remove/${promo.edit}`).then(({ data }) => {
        toast(data);
      });
    } else {
      toast("Please Enter ID");
    }
  }

  return dectoken.role == "admin" ? (
    <>
      {unapprovedCoins ? (
        unapprovedCoins.length >= 1 ? (
          <h1 className="promoted-table_heading">Pending coins</h1>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <div className="promoted-table_div promoted-table-admin">
        {status ? (
          <table {...getTablePropsAdmin()} className="promoted-table">
            <tbody
              {...getTableBodyPropsAdmin()}
              className="promoted-table_body"
            >
              {rowsAdmin.map((row) => {
                prepareRowAdmin(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="promoted-table_row promoted-table_data_underline"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          style={{ paddingRight: "15px" }}
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
        ) : (
          <div className="load-wrapp">
            <div className="load-3">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        )}
      </div>
      <p style={{ padding: "2% 5%" }}>
        You can Promote a coin or put it to Presale or remove from these. Just
        enter the id of the coin in the given fields below. Inorder to know what
        is the id of coin please click on the coin to open details page and on
        the right side you will see the coin id.
      </p>
      <h2 style={{ marginLeft: "5%" }}>Enter Coin ID</h2>

      <div className="admin-form-wrap">
        <div
          className="admin-form-wrap-inner"
          // style={{
          //   padding: "0% 3%",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <p>Promote A Coin: </p>
          <TextField
            style={{ margin: "0 3%", backgroundColor: "white" }}
            id="promote"
            onChange={(e) => handleInput(e)}
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => doPromote(e)}
          >
            Promote
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => doRemPromote(e)}
          >
            Remove
          </Button>
        </div>
        <div
          className="admin-form-wrap-inner"
          // style={{
          //   padding: "0% 3%",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <p>Presale A Coin: </p>
          <TextField
            style={{ margin: "0 3%", backgroundColor: "white" }}
            id="presale"
            onChange={(e) => handleInput(e)}
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => doPresale(e)}
          >
            Presale
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => doRemPresale(e)}
          >
            Remove
          </Button>
        </div>
        <div
          className="admin-form-wrap-inner"
          // style={{
          //   padding: "0% 3%",
          //   display: "flex",
          //   justifyContent: "center",
          //   alignItems: "center",
          // }}
        >
          <p>Edit or Remove A Coin: </p>
          <TextField
            style={{ margin: "0 3%", backgroundColor: "white" }}
            id="edit"
            onChange={(e) => handleInput(e)}
            type="number"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => doEditCoin(e)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={(e) => doRemoveCoin(e)}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  ) : (
    "you are not an Admin"
  );
}
