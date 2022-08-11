const fs = require("fs");
const db = require("../database");
const authService = require("../authentication/authService");

// const users = require("./users.json");

const findUser = function (email, done) {
  // const userFetched = users.filter((user) => user.email === email)[0];
  // done(undefined, userFetched);
  const sqlquery = "SELECT * FROM users where email=?";
  db.query(sqlquery, [email], (err, result) => {
    if (err) {
      console.log("Error:", err);
      done(err);
    } else {
      done(undefined, result[0]);
    }
  });
};

const registerUser = function (userData, done) {
  // users.push(userData);
  // fs.writeFileSync("./users/users.json", JSON.stringify(users));
  // done(undefined, userData);
  const { name, email, password } = userData;
  const sqlquery = "INSERT INTO users (name,email,password) VALUES (?,?,?)";
  db.query(sqlquery, [name, email, password], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const jwtToken = authService.createToken(userData);
      done(undefined, jwtToken);
    }
  });
};

module.exports = { findUser, registerUser };
