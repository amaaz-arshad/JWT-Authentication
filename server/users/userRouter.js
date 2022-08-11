const express = require("express");
const router = express.Router();
const userController = require("./userController");
const db = require("../database");

router.get("/", (req, res) => {
  try {
    const userdata = req.claims;
    console.log(userdata);

    if (!userdata.email) {
      return res.status(400).send("User email not available");
    }

    userController.findUser(userdata.email, (err, result) => {
      if (err) {
        res.status(400).send("Error getting the user.", err);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    return res.status(500).send("Unexpected error, try after sometime.", error);
  }
});

router.put("/uploadImage", (req, res) => {
  const { email, image } = req.body;
  const sqlquery = "UPDATE users SET image=? WHERE email=?";
  db.query(sqlquery, [image, email], (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

router.get("/getDetails/:email", (req, res) => {
  const email = req.params.email;
  const sqlquery = "SELECT * FROM users where email=?";
  db.query(sqlquery, email, (err, result) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = router;
