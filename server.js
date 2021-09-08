const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
var cors = require("cors");
const app = express();
const mysql = require("mysql");
const api = require("./api_calls");
const bcrypt = require("bcryptjs");
const path = require("path");

const jwt_private = "cryptohuntprivateKeycc3";

process.on("uncaughtException", function (err) {
  console.log("Caught exception: ", err);
});

const auth = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, jwt_private);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};
const admin = function (req, res, next) {
  "admin ", req.user;
  if (req.user.role !== "admin") {
    return res.status(403).send("access denied");
  }
  next();
};

app.use(cors());
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

// var connection = mysql.createConnection({
//   host: "localhost",
//   user: "cryptohunt",
//   password: "cryptohunt",
//   database: "cryptohunt",
//   multipleStatements: true,
// });

// connection.connect();
/** MYSQL DATAABASE **/

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "client", "build")));

// app.use(express.static("../build"));

app.listen(80, () => console.log("listening on port 80"));

function createResponse(type, response, token, role) {
  if (role !== "" || role !== null) {
    return JSON.stringify({ code: type, msg: response, role: role, token });
  } else {
    return JSON.stringify({ code: type, msg: response, token: token });
  }
}

app.get("/api/", function (req, res) {
  return res.send({ Error: "Do Request To Specific Paths, CodingEagle" });
});

app.post("/api/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    connection.query(
      `Select * FROM users WHERE email='${email}'`,
      async function (error, results, fields) {
        if (results.length >= 1) {
          const validPassword = await bcrypt.compare(
            password,
            results[0].password
          );
          if (validPassword) {
            const token = jwt.sign(
              {
                name: results[0].name,
                email: results[0].email,
                role: results[0].role,
              },
              jwt_private
            );

            res.send(
              createResponse(
                "success",
                "User Logged In",
                token,
                results[0].role
              )
            );
          } else {
            res.send(createResponse("error", "Invalid Username/Password"));
          }
        } else {
          res.send(createResponse("error", "Invalid Username/Password"));
        }
      }
    );
  } else {
    res.send(createResponse("error", "Enter a valid email"));
  }
});

/** User Registers **/
app.post("/api/register", async function (req, res) {
  const salt = await bcrypt.genSalt(10);
  var email = req.body.email;
  let password = await bcrypt.hash(req.body.password, salt);
  var name = req.body.name;

  const token = jwt.sign(
    {
      name: name,
      email: email,
      role: "user",
    },
    jwt_private
  );
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    connection.query(
      `Select * from users where email='${email}';`,
      function (error, results, fields) {
        if (results.length >= 1) {
          res.send(createResponse("error", "User Already Exists"));
        } else {
          connection.query(
            `Insert into users(email,password,name,role) VALUES ('${email}','${password}','${name}','user')`,
            function (err, success) {
              if (err) {
                res.send(createResponse("error", "An Unknown Error Occured!"));
              }
              res.send(
                createResponse("success", "User Registered Succesfully!", token)
              );
            }
          );

          //end else
        }
      }
    );
  } else {
    res.send(createResponse("error", "Enter a valid email"));
  }
});
/** User Registers **/

/** Add Coin **/
app.post("/api/add_coin", auth, function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}

  let name = req.body.name;
  let symbol = req.body.symbol;
  let description = req.body.description;
  let logo = req.body.logo;
  let launch = req.body.launch;
  let additional = req.body.additional;
  let binancesmartchain = req.body.binancesmartchain;
  let ethereum = req.body.ethereum;
  let solana = req.body.solana;
  let polygon = req.body.polygon;
  let website = req.body.website;
  let telegram = req.body.telegram;
  let twitter = req.body.twitter;
  let presale = req.body.presale;
  let status = req.body.status;
  let added_by = req.body.added_by;

  connection.query(
    `Select * from coin where name='${name}'`,
    function (error, results, fields) {
      if (results.length >= 1) {
        res.send(createResponse("error", "Coin Already Exists!"));
      } else {
        connection.query(
          `Insert into coin(name,symbol,description,logo,launch,additional,binancesmartchain,ethereum,solana,polygon,website,telegram,twitter,status,added_by,featured,presale) VALUES ('${name}','${symbol}','${description}','${logo}','${launch}','${additional}','${binancesmartchain}','${ethereum}','${solana}','${polygon}','${website}','${telegram}','${twitter}','${status}','${added_by}',0,${presale})`,
          function (err, success) {
            if (err)
              res.send(createResponse("error", "An Unknown Error Occured!"));

            if (status == "approved" && dectoken?.role == "admin") {
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
app.get("/api/coins/promoted", function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}

  connection.query(
    `Select * from coin where status='approved' and featured=1;SELECT coin_id FROM votes WHERE user = '${
      // dectoken && dectoken.email
      dectoken?.email
    }';`,
    function (error, results, fields) {
      // if (results && results[0].length > 0) {
      if (results[0]?.length > 0) {
        var coin_results = [];
        // for each result
        results[0].forEach((result) => {
          api.updateCoin(result.name);
          coin_results.push(result);
        });
        coin_results.push(results[1]);
        // for each result
        res.send(JSON.stringify({ coin_results }));
      } else {
        res.send([]);
      }
    }
  );

  //end fetching
});
app.get("/api/coins", function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}
  connection.query(
    `Select * from coin where status='approved';SELECT coin_id FROM votes WHERE user = '${
      // dectoken && dectoken.email
      dectoken?.email
    }';`,
    function (error, results, fields) {
      // if (results && results[0].length > 0) {
      if (results[0]?.length > 0) {
        var coin_results = [];
        // for each result
        results[0].forEach((result) => {
          api.updateCoin(result.name);
          api.checkCoinChain(result.id, result.binancesmartchain);
          coin_results.push(result);
        });
        coin_results.push(results[1]);
        // for each result
        res.send(JSON.stringify({ coin_results }));
      }
    }
  );

  //end fetching
});
// app.get("/api/:page/coins", function (req, res) {
//   let page = (req.params.page - 1) * 10;
//   let dectoken = false;
//   try {
//     dectoken = jwtDecode(req.header("x-auth-token"));
//   } catch (ex) {}
//   connection.query(
//     `Select * from coin where status='approved' LIMIT ${
//       page && page - 1
//     },10;Select COUNT(*) as tc from coin where status='approved';SELECT coin_id FROM votes WHERE user = '${
//       dectoken && dectoken.email
//     }';`,
//     function (error, results, fields) {
//       if (results !== undefined && results[0].length > 0) {
//         var coin_results = [];
//         // for each result
//         results[0].forEach((result) => {
//           api.updateCoin(result.name);
//           coin_results.push(result);
//         });
//         coin_results.push({ total: results[1][0].tc });
//         coin_results.push(results[2]);
//         // for each result
//         res.send(JSON.stringify({ coin_results }));
//       }
//     }
//   );

//   //end fetching
// });
app.get("/api/coins_index", function (req, res) {
  connection.query(
    `Select name,id from coin where status='approved';`,
    function (error, results, fields) {
      // if (results && results.length > 0) {
      if (results?.length > 0) {
        res.send(JSON.stringify({ coin_results: results }));
      } else {
        res.send("nothing");
      }
    }
  );

  //end fetching
});
app.get("/api/coins/today", function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}
  // `SELECT * FROM votes JOIN coin ON votes.coin_id = coin.id WHERE (time >= NOW() - INTERVAL 1 DAY) GROUP BY coin_id;SELECT coin_id FROM votes WHERE user = '${
  //   dectoken && dectoken.email
  // }';`
  connection.query(
    `SELECT * FROM votes JOIN coin ON votes.coin_id = coin.id WHERE (time >= NOW() - INTERVAL 1 DAY);SELECT coin_id FROM votes WHERE user = '${
      // dectoken && dectoken.email
      dectoken?.email
    }';`,
    function (error, results, fields) {
      let coin_results = results;
      // if (results && results.length > 0) {
      if (results?.length > 0) {
        let coin_results = [];
        results[0].forEach((result) => {
          coin_results.push(result);
        });
        coin_results.push(results[1]);
        res.send(JSON.stringify({ coin_results }));
      }
    }
  );
  // res.send(JSON.stringify({ coin_results }));
});
/** Fetch Coins **/

app.post("/api/vote", auth, function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}
  var coin_id = req.body.coin;
  var user = dectoken.email;

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
});

app.post("/api/unvote", auth, function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}
  var coin_id = req.body.coin;
  var user = dectoken.email;

  connection.query(
    `DELETE FROM votes WHERE user='${user}' AND coin_id='${coin_id}';UPDATE coin SET votes_count = votes_count-1 WHERE id = ${coin_id}`,
    // `DELETE FROM votes WHERE user='${user}' AND coin_id='${coin_id}'`,
    function (error, results, fields) {
      res.send(createResponse("success", "Vote Removed!"));
    }
  );
});

// get vote
app.get("/api/get/vote/:coinid", auth, function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}
  var coin_id = req.params.coinid;
  connection.query(
    `SELECT coin_id FROM votes WHERE user = '${
      dectoken?.email
      // dectoken && dectoken.email
    }' and coin_id=${coin_id};`,
    function (error, results, fields) {
      if (results.length >= 1) {
        res.send("1");
      } else {
        res.send("");
      }
    }
  );
});

//check votes

//unapproved coins
app.get("/api/admin/unapproved", [auth, admin], function (req, res) {
  connection.query(
    `Select * from coin where status!='approved'`,
    function (error, results, fields) {
      if (results?.length > 0) {
        // if (results && results.length > 0) {
        var coin_results = [];
        // for each result
        results.forEach((result) => {
          api.updateCoin(result.name);
          coin_results.push(result);
        });
        // for each result
        res.send(JSON.stringify({ coin_results }));
      } else {
        res.send("nothing");
      }
    }
  );
});
app.get("/api/admin/promote/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set featured='1' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows == 0) {
        res.send("something not right with id no coin promoted");
      } else {
        res.send("coin promoted please reload page");
      }
    }
  );
});
app.get("/api/admin/rempromote/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set featured='0' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows == 0) {
        res.send("something not right with id no coin unpromoted");
      } else {
        res.send("coin unpromoted please reload page");
      }
    }
  );
});
app.get("/api/admin/presale/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set presale='1' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows == 0) {
        res.send("something not right with id no coin presaled");
      } else {
        res.send("coin presaled please reload page");
      }
    }
  );
});
app.get("/api/admin/rempresale/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set presale='0' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows == 0) {
        res.send("something not right with id no coin unpresaled");
      } else {
        res.send("coin unpresaled please reload page");
      }
    }
  );
});
app.post("/api/admin/edit/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  let name = req.body.name;
  let symbol = req.body.symbol;
  let description = req.body.description;
  let logo = req.body.logo;
  let launch = req.body.launch;
  let additional = req.body.additional;
  let binancesmartchain = req.body.binancesmartchain;
  let ethereum = req.body.ethereum;
  let solana = req.body.solana;
  let polygon = req.body.polygon;
  let website = req.body.website;
  let telegram = req.body.telegram;
  let twitter = req.body.twitter;

  connection.query(
    `UPDATE coin SET name='${name}', symbol='${symbol}', description='${description}', logo='${logo}', launch='${launch}', additional='${additional}', binancesmartchain='${binancesmartchain}', ethereum='${ethereum}', solana='${solana}', polygon='${polygon}', website='${website}', telegram='${telegram}', twitter='${twitter}' WHERE id=${coin_id}`,
    function (error, results, fields) {
      if (error || results.affectedRows == 0) {
        res.send("something not right with id no coin edited");
      } else {
        res.send("coin edited please reload page");
      }
    }
  );
});
app.get("/api/admin/remove/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Delete from coin where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows == 0) {
        res.send("something not right with id no coin removed");
      } else {
        res.send("coin removed please reload page");
      }
    }
  );
});

//unapproved coins

//approve coin
app.post("/api/approve_coin", [auth, admin], function (req, res) {
  let coin_id = req.body.coin_id;
  connection.query(
    `UPDATE coin set status = 'approved' where id = ${coin_id}`,
    function (error, results, fields) {
      res.send(createResponse("success", "coin approved"));
    }
  );
});

//approve coin

//delete rejected
app.post("/api/reject_coin", [auth, admin], function (req, res) {
  let coin_id = req.body.coin_id;

  connection.query(
    `DELETE from coin where id = ${coin_id}`,
    function (error, results, fields) {
      res.send(
        createResponse("success", "coin rejected and deleted from database")
      );
    }
  );
});
//delete rejected

//sending details page of a coin
app.get("/api/coins/:id", function (req, res) {
  let coin_id = req.params.id;

  connection.query(
    `SELECT * FROM coin where id = ${coin_id}`,
    function (error, results, fields) {
      if (results.length > 0) {
        api.updateCoin(results[0].name);
        api.checkCoinChain(results[0].id, results[0].binancesmartchain);
        res.send(JSON.stringify(results));
      } else {
        res.send("something not right with id");
      }
    }
  );
});

app.get("/api/reacts/:id/:react", auth, function (req, res) {
  let id = req.params.id;
  let react = req.params.react;
  connection.query(`UPDATE coin set ${react} = ${react} + 1 WHERE id = ${id}`);
});

app.get("/api/random", function (req, res) {
  connection.query(
    `SELECT * FROM coin ORDER BY RAND() LIMIT 4`,
    function (error, results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});
//sending details page of a coin

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

module.exports = app;
