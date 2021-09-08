const axios = require("axios");
const mysql = require("mysql");

/** MYSQL DATAABASE **/
var db_config = {
  host: "localhost",
  user: "cryptohunt",
  password: "cryptohunt",
  database: "cryptohunt",
  multipleStatements: true,
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);
  connection.connect(function (err) {
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  connection.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();
// /** MYSQL DATAABASE **/

module.exports = {
  async updateCoin(coin) {
    // fetch from axios
    var coin_normal = coin;
    coin = coin?.split(" ").join("").toLowerCase();

    await axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
      )
      .then((response) => {
        if (response.data[coin]) {
          var current_price = response.data[coin].usd;
          var market_cap = Math.round(response.data[coin].usd_market_cap);
          var onedaychange = response.data[coin].usd_24h_change;

          connection.query(
            `UPDATE coin set price='${current_price}',market_cap='${market_cap}',volume_change_24h='${onedaychange}' where name='${coin_normal}'`,
            function (error, results, fields) {
              if (error) throw new Error("coin not updated");
              console.log("Updated");
            }
          );
        }
      })
      .catch((ex) => {}); //price is fetched
  },
  async checkCoinChain(id, chain) {
    // await axios
    //   .post(
    //     "https://bsc.streamingfast.io/subgraphs/name/pancakeswap/exchange-v2",
    //     {
    //       operationName: "tokens",
    //       variables: {},
    //       query: `query tokens {  tokens(    where: {id_in: ["${chain}"]}    orderBy: tradeVolumeUSD    orderDirection: desc  ) {  id    symbol    name    derivedBNB    derivedUSD    tradeVolumeUSD    tradeVolume    totalTransactions    totalLiquidity    __typename   }}`,
    //     }
    //   )
    //   .then(({ data }) => {
    //     console.log("results ", data.data.tokens[0]);
    //   });

    await axios
      .get(`https://api.pancakeswap.info/api/v2/tokens/${chain}`)
      .then(({ data }) => {
        if (data?.data) {
          let price = Number(data?.data?.price).toFixed(10);
          connection.query(
            `UPDATE coin set price='${price}', chain=true where id=${id};`,
            function (error, results, fields) {
              if (error) throw new Error("coin not updated");
            }
          );
        }
      })
      .catch((ex) => {
        connection.query(
          `UPDATE coin set chain=false where id=${id};`,
          function (error, results, fields) {
            if (error) {
              throw new Error("coin not updated");
            }
          }
        );
      });
  },
};
