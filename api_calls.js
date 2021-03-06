const axios = require("axios");
const handleDisconnect = require("./db_config");

/** MYSQL DATAABASE **/
var connection = handleDisconnect();
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
