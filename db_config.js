const mysql = require("mysql");

var db_config = {
  connectionLimit: 1000,
  connectTimeout: 60 * 60 * 1000,
  acquireTimeout: 60 * 60 * 1000,
  timeout: 60 * 60 * 1000,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true,
};
// var db_config = {
//   host: "db4free.net",
//   user: "cryptohunt",
//   password: "cryptohunt",
//   database: "cryptohunt",
//   multipleStatements: true,
// };
let connection;

module.exports = function handleDisconnect() {
  connection = mysql.createPool(db_config);
  connection.getConnection(function (err) {
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
  return connection;
};
