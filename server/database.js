const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud",
});

db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("MySQL database is connected successfully");
  }
});

module.exports = db;
