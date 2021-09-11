const mysql = require("mysql");

var db_config = {
  host: "us-cdbr-east-04.cleardb.com",
  user: "bff61217815fe1",
  password: "e084474c",
  database: "heroku_6a380d34692cf74",
  multipleStatements: true,
};
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
