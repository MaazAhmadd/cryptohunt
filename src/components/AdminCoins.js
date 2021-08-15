import React from "react";
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
const apiUrl = config.API_URL;
const currentUrl = config.CURRENT_URL;

export default function AdminCoins({ unapprovedCoins }) {
  const [user, setUser] = React.useState({});
  const [promo, setPromo] = React.useState({ promote: 0, presale: 0 });
  // const [unapprovedCoins, setUnapprovedCoins] = React.useState([]);

  let token = localStorage.getItem("token");
  const handleClickRow = (row, cell) => {
    if (cell.key.includes("vote")) {
      return null;
    } else {
      return (window.location.href = `${currentUrl}/coins/${row.id}`);
    }
  };
  React.useEffect(() => {
    let myF = async () => {
      token = await localStorage.getItem("token");
    };
    myF();
    try {
      let dectoken = jwtDecode(token);
      setUser(dectoken);
    } catch (ex) {}
    // getCoinUnapprovedData();
  }, []);
  axios.defaults.headers.common["x-auth-token"] = token;

  // const handleClickRow = (row, cell) => {
  //   if (cell.key.includes("vote")) {
  //     return null;
  //   } else {
  //     return (window.location.href = `${currentUrl}/coins/${row.id}`);
  //   }
  // };

  const approve = async (id) => {
    await axios
      .post(
        apiUrl + "/approve_coin",
        qs.stringify({
          coin_id: id,
          user: user.email,
        })
      )
      .then(() => {
        window.location = "/";
      });
  };
  const reject = async (id) => {
    await axios
      .post(
        apiUrl + "/reject_coin",
        qs.stringify({
          coin_id: id,
          user: user.email,
        })
      )
      .then(() => {
        window.location = "/";
      });
  };
  const manupilatingData = (coins) => {
    let allCoins = [];
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
    axios.get(`${apiUrl}/admin/promote/${promo.promote}`).then(({ data }) => {
      toast(data);
    });
  }
  async function doPresale(e) {
    axios.get(`${apiUrl}/admin/presale/${promo.presale}`).then(({ data }) => {
      toast(data);
    });
  }
  async function doRemPromote(e) {
    axios
      .get(`${apiUrl}/admin/rempromote/${promo.promote}`)
      .then(({ data }) => {
        toast(data);
      });
  }
  async function doRemPresale(e) {
    axios
      .get(`${apiUrl}/admin/rempresale/${promo.presale}`)
      .then(({ data }) => {
        toast(data);
      });
  }

  return (
    <>
      {unapprovedCoins.length >= 1 ? (
        <h1 className="promoted-table_heading">Pending coins</h1>
      ) : (
        <h1></h1>
      )}
      <div className="promoted-table_div">
        <table
          {...getTablePropsAdmin()}
          className="promoted-table promoted-table-admin"
        >
          <tbody {...getTableBodyPropsAdmin()} className="promoted-table_body">
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
        <p style={{ padding: "2% 5%" }}>
          You can Promote a coin or put it to Presale or remove from these. Just
          enter the id of the coin in the given fields below. Inorder to know
          what is the id of coin please click on the coin to open details page
          and on the right side you will see the coin id.
        </p>

        <div
          style={{ padding: "2% 5%", display: "flex", alignItems: "center" }}
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
          style={{ padding: "2% 5%", display: "flex", alignItems: "center" }}
        >
          <p>Presale A Coin...: </p>
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
      </div>
    </>
  );
}
