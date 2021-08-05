const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
const mysql = require("mysql");
const axios = require("axios");
const api = require("./api_calls");

app.use(cors());
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

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, () => console.log("listening on port 8080"));

// app.use(function (req, res, next) {
//   res.setHeader("Content-Type", "application/json");
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
// app.use((req, res, next) => {
//   res.set("Content-Type", "application/json");
//   res.append("Access-Control-Allow-Origin", ["*"]);
//   res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.append(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

function createResponse(type, response, role) {
  if (role !== "" || role !== null) {
    return JSON.stringify({ code: type, msg: response, role: role });
  } else {
    return JSON.stringify({ code: type, msg: response });
  }
}

app.get("/", function (req, res) {
  return res.send({ Error: "Do Request To Specific Paths, CodingEagle" });
});

app.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  connection.query(
    `Select * FROM users WHERE email='${email}' AND password='${password}'`,
    function (error, results, fields) {
      if (results.length == 1) {
        res.send(createResponse("success", "User Logged In", results[0].role));
      } else {
        res.send(createResponse("error", "Invalid Username/Password"));
      }
    }
  );
});

/** User Registers **/
app.post("/register", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;

  connection.query(
    `Select * from users where email='${email}' AND password='${password}'`,
    function (error, results, fields) {
      if (results.length == 1) {
        res.send(createResponse("error", "User Already Exists"));
      } else {
        connection.query(
          `Insert into users(email,password,name,role) VALUES ('${email}','${password}','${name}','user')`,
          function (err, success) {
            if (err)
              res.send(createResponse("error", "An Unknown Error Occured!"));

            res.send(createResponse("success", "User Registered Succesfully!"));
          }
        );

        //end else
      }
    }
  );
});
/** User Registers **/

/** Add Coin **/
app.post("/add_coin", function (req, res) {
  var name = req.body.name;
  var symbol = req.body.symbol;
  var description = req.body.description;
  var logo = req.body.logo;
  var launch = req.body.launch;
  var additional = req.body.additional;
  var binancesmartchain = req.body.binancesmartchain;
  var ethereum = req.body.ethereum;
  var solana = req.body.solana;
  var polygon = req.body.polygon;
  var website = req.body.website;
  var telegram = req.body.telegram;
  var twitter = req.body.twitter;
  var status = req.body.status;
  var added_by = req.body.added_by;

  connection.query(
    `Select * from coin where name='${name}' AND symbol='${symbol}'`,
    function (error, results, fields) {
      if (results.length == 1) {
        res.send(createResponse("error", "Coin Already Exists!"));
      } else {
        connection.query(
          `Insert into coin(name,symbol,description,logo,launch,additional,binancesmartchain,ethereum,solana,polygon,website,telegram,twitter,status,added_by,featured) VALUES ('${name}','${symbol}','${description}','${logo}','${launch}','${additional}','${binancesmartchain}','${ethereum}','${solana}','${polygon}','${website}','${telegram}','${twitter}','${status}','${added_by}',0)`,
          function (err, success) {
            if (err)
              res.send(createResponse("error", "An Unknown Error Occured!"));

            if (status == "approved") {
              res.send(createResponse("success", "Coin Added.."));
            } else {
              res.send(createResponse("success", "Coin Awaiting Approval.."));
            }
          }
        );

        //end else
      }
    }
  );
});
/** Add Coin **/

/** Fetch Coins **/
app.get("/coins/promoted", function (req, res) {
  connection.query(
    `Select * from coin where status='approved' and featured=1`,
    function (error, results, fields) {
      if (results.length > 0) {
        var coin_results = [];
        // for each result
        results.forEach((result) => {
          // api.updateCoin(result.name);
          coin_results.push(result);
        });
        // for each result
        res.send(JSON.stringify({ coin_results }));
      }
    }
  );

  //end fetching
});
app.get("/coins", function (req, res) {
  connection.query(
    `Select * from coin where status='approved'`,
    function (error, results, fields) {
      if (results.length > 0) {
        var coin_results = [];
        // for each result
        results.forEach((result) => {
          api.updateCoin(result.name);
          coin_results.push(result);
        });
        // for each result
        res.send(JSON.stringify({ coin_results }));
      }
    }
  );

  //end fetching
});
app.get("/coins/today", function (req, res) {
  connection.query(
    `SELECT * FROM votes JOIN coin ON votes.coin_id = coin.id WHERE (time >= NOW() - INTERVAL 1 DAY) GROUP BY coin_id;`,
    function (error, results, fields) {
      if (results.length > 0) {
        let coin_results = [];
        coin_results.push(results);
        res.send(JSON.stringify({ coin_results }));
      }
      // })
    }
  );
  //   );
  // });
  // for each result
  // }
  //   }
  // );
  //end fetching
});
/** Fetch Coins **/

app.post("/vote", function (req, res) {
  var coin_id = req.body.coin;
  var user = req.body.user;
  var status = req.body.status;

  if (status == "add") {
    // do vote
    connection.query(
      `SELECT * FROM votes WHERE user='${user}' AND coin_id='${coin_id}'`,
      function (error, results, fields) {
        if (results.length >= 1) {
          res.send(createResponse("error", "Already Upvoted!"));
        } else {
          connection.query(
            `INSERT into votes(coin_id,user,time) VALUES (${coin_id},'${user}',NOW());UPDATE coin SET votes_count = votes_count+1 WHERE id = ${coin_id}`,
            // `INSERT into votes(coin_id,user,time) VALUES (${coin_id},'${user}',NOW())`,
            function (err, success) {
              if (err) throw err;
            }
          );
          res.send(createResponse("success", "Upvoted!"));
        }
      }
    );
    // do vote
  } else if (status == "remove") {
    //remove vote
    connection.query(
      `DELETE FROM votes WHERE user='${user}' AND coin_id='${coin_id}';UPDATE coin SET votes_count = votes_count-1 WHERE id = ${coin_id}`,
      // `DELETE FROM votes WHERE user='${user}' AND coin_id='${coin_id}'`,
      function (error, results, fields) {
        res.send(createResponse("success", "Vote Removed!"));
      }
    );
    //end remove vote
  }
});

// get votes
app.post("/get/votes", async function (req, res) {
  var coin_id = req.body.coin_id;
  var total_rows_in;
  connection.query(
    `Select * from votes where coin_id='${coin_id}'`,
    // `Select votes_count from coin where id='${coin_id}'`,
    function (error, results, fields) {
      console.log(results);
      total_rows_in = results.length;
      res.send(JSON.stringify({ votes: total_rows_in }));
      // res.send(JSON.stringify({ votes: results }));
    }
  );
});

//check votes

//unapproved coins
app.get("/coins/unapproved", async function (req, res) {
  connection.query(
    `Select * from coin where status!='approved'`,
    function (error, results, fields) {
      if (results.length > 0) {
        var coin_results = [];
        // for each result
        results.forEach((result) => {
          api.updateCoin(result.name);
          coin_results.push(result);
        });
        // for each result
        res.send(JSON.stringify({ coin_results }));
      }
    }
  );
});

//unapproved coins

//approve coin
app.post("/approve_coin", async function (req, res) {
  let coin_id = req.body.coin_id;
  let user = req.body.user;
  connection.query(
    `select role from users where email = '${user}'`,
    function (error, results, fields) {
      console.log(results);
      connection.query(
        `UPDATE coin set status = 'approved' where id = ${coin_id}`,
        function (error, results, fields) {
          res.send(createResponse("success", "coin approved"));
        }
      );
    }
  );
});

//approve coin

//delete rejected
app.post("/reject_coin", async function (req, res) {
  let coin_id = req.body.coin_id;
  connection.query(
    `DELETE from coin where id = ${coin_id}`,
    function (error, results, fields) {
      res.send(createResponse("success", "coin approved"));
    }
  );
});
//delete rejected

//sending details page of a coin
app.get("/coins/:id", async function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `SELECT * FROM coin where id = ${coin_id}`,
    function (error, results, fields) {
      console.log("rrrrrrrrrrrrrr", results, "rrrrrrrrrrrrrrrrrrrr");
      res.send(JSON.stringify(results));
    }
  );
});

app.get("/reacts/:id/:react", async function (req, res) {
  let id = req.params.id;
  let react = req.params.react;
  connection.query(`UPDATE coin set ${react} = ${react} + 1 WHERE id = ${id}`);
});

app.get("/random", function (req, res) {
  connection.query(
    `SELECT * FROM coin ORDER BY RAND() LIMIT 4`,
    function (error, results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});
//sending details page of a coin
module.exports = app;
