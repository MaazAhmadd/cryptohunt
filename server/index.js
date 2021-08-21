const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
var cors = require("cors");
const app = express();
const mysql = require("mysql");
const api = require("./api_calls");
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

function createResponse(type, response, token, role) {
  if (role !== "" || role !== null) {
    return JSON.stringify({ code: type, msg: response, role: role, token });
  } else {
    return JSON.stringify({ code: type, msg: response, token: token });
  }
}

app.get("/", function (req, res) {
  return res.send({ Error: "Do Request To Specific Paths, CodingEagle" });
});

app.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    connection.query(
      `Select * FROM users WHERE email='${email}' AND password='${password}'`,
      function (error, results, fields) {
        if (results.length >= 1) {
          const token = jwt.sign(
            {
              name: results[0].name,
              email: results[0].email,
              role: results[0].role,
            },
            jwt_private
          );
          res.send(
            createResponse("success", "User Logged In", token, results[0].role)
          );
        }
        // if (results.length == 1) {
        //   res.send(createResponse("success", "User Logged In", results[0].role));
        else {
          res.send(createResponse("error", "Invalid Username/Password"));
          // }else {
          //   res.send(createResponse("error", "Invalid Username/Password"));
        }
      }
    );
  } else {
    res.send(createResponse("error", "Enter a valid email"));
  }
});

/** User Registers **/
app.post("/register", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
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
app.post("/add_coin", auth, function (req, res) {
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
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}

  connection.query(
    `Select * from coin where status='approved' and featured=1;SELECT coin_id FROM votes WHERE user = '${
      dectoken && dectoken.email
    }';`,
    function (error, results, fields) {
      if (results && results[0].length > 0) {
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
app.get("/coins", function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}

  connection.query(
    `Select * from coin where status='approved';SELECT coin_id FROM votes WHERE user = '${
      dectoken && dectoken.email
    }';`,
    function (error, results, fields) {
      if (results !== undefined && results[0].length > 0) {
        var coin_results = [];
        // for each result
        results[0].forEach((result) => {
          api.updateCoin(result.name);
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
app.get("/coins/today", function (req, res) {
  let dectoken = false;
  try {
    dectoken = jwtDecode(req.header("x-auth-token"));
  } catch (ex) {}
  // `SELECT * FROM votes JOIN coin ON votes.coin_id = coin.id WHERE (time >= NOW() - INTERVAL 1 DAY) GROUP BY coin_id;SELECT coin_id FROM votes WHERE user = '${
  //   dectoken && dectoken.email
  // }';`
  connection.query(
    `SELECT DISTINCT * FROM coin JOIN votes ON votes.coin_id = coin.id WHERE (time >= NOW() - INTERVAL 1 DAY);SELECT coin_id FROM votes WHERE user = '${
      dectoken && dectoken.email
    }';`,
    function (error, results, fields) {
      let coin_results = results;
      if (results !== undefined && results.length > 0) {
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

app.post("/vote", auth, function (req, res) {
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

app.post("/unvote", auth, function (req, res) {
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

// get votes
app.post("/get/votes", function (req, res) {
  var coin_id = req.body.coin_id;
  var total_rows_in;
  connection.query(
    `SELECT count(user) AS totalVotes FROM votes WHERE coin_id=${coin_id};`,
    // `Select votes_count from coin where id='${coin_id}'`,
    function (error, results, fields) {
      res.send(JSON.stringify(results[0]));
      // res.send(results[0]);
      // res.send(JSON.stringify({ votes: results }));
    }
  );
});

//check votes

//unapproved coins
app.get("/admin/unapproved", [auth, admin], function (req, res) {
  connection.query(
    `Select * from coin where status!='approved'`,
    function (error, results, fields) {
      if (results && results.length > 0) {
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
app.get("/admin/promote/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set featured='1' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows === 0) {
        res.send("something not right with id no coin promoted");
      } else {
        res.send("coin promoted please reload page");
      }
    }
  );
});
app.get("/admin/rempromote/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set featured='0' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows === 0) {
        res.send("something not right with id no coin unpromoted");
      } else {
        res.send("coin unpromoted please reload page");
      }
    }
  );
});
app.get("/admin/presale/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set presale='1' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows === 0) {
        res.send("something not right with id no coin presaled");
      } else {
        res.send("coin presaled please reload page");
      }
    }
  );
});
app.get("/admin/rempresale/:id", [auth, admin], function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `Update coin Set presale='0' where id = '${coin_id}'`,
    function (error, results, fields) {
      if (error || results.affectedRows === 0) {
        res.send("something not right with id no coin unpresaled");
      } else {
        res.send("coin unpresaled please reload page");
      }
    }
  );
});

//unapproved coins

//approve coin
app.post("/approve_coin", [auth, admin], function (req, res) {
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
app.post("/reject_coin", [auth, admin], function (req, res) {
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
app.get("/coins/:id", function (req, res) {
  let coin_id = req.params.id;
  connection.query(
    `SELECT * FROM coin where id = ${coin_id}`,
    function (error, results, fields) {
      res.send(JSON.stringify(results));
    }
  );
});

app.get("/reacts/:id/:react", auth, function (req, res) {
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
