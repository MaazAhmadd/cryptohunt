const axios = require("axios");
const mysql = require("mysql");

/** MYSQL DATAABASE **/
// var connection = mysql.createConnection({
//   host: "34.85.128.15",
//   user: "cryptohunt",
//   password: "cryptohunt",
//   database: "cryptohunt",
//   multipleStatements: true,
// });
var connection = mysql.createConnection({
  host: "localhost",
  user: "cryptohunt",
  password: "cryptohunt",
  database: "cryptohunt",
  multipleStatements: true,
});

connection.connect();
/** MYSQL DATAABASE **/

module.exports = {
  async updateCoin(coin) {
    // fetch from axios
    var coin_normal = coin;
    coin = coin.toLowerCase();

    await axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
      )
      .then((response) => {
        var current_price = response.data[coin].usd;
        var market_cap = response.data[coin].usd_market_cap;
        var onedaychange = Math.round(response.data[coin].usd_24h_change);

        connection.query(
          `UPDATE coin set price='${current_price}',market_cap='${market_cap}',volume_change_24h='${onedaychange}' where name='${coin_normal}'`,
          function (error, results, fields) {
            if (error) throw err;
            console.log("Updated");
          }
        );
      }); //price is fetched
  },
};
