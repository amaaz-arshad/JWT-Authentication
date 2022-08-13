const express = require("express");
const router = express.Router();
const authController = require("./authController");
const config = require("../config");
const axios = require("axios");

router.post("/register", (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).send("Required inputs are missing !!");
    }

    const userDetails = {
      name,
      email,
      password,
    };

    authController.registerUser(userDetails, (err, result) => {
      if (err) {
        res.status(400).send({ error: "User already exists" });
      } else {
        res.status(201).send(result);
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error while registering the user.", err });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // if (!token) {
    //   return res.status(400).send("Recaptcha token is missing !!");
    // }
    // const googleVerifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${config.RECAPTCHA_SECRET_KEY}&response=${token}`;
    // const response = await axios.post(googleVerifyURL);
    // const { success } = response.data;
    // if (success) {

    // } else {
    //   return res.status(400).send({ error: "Invalid recaptcha. Try again." });
    // }

    if (!(email && password)) {
      return res.status(400).send("Required inputs are missing !!");
    }

    authController.loginUser({ email, password }, (err, result) => {
      if (err) {
        res.status(401).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ error: "Unexpected error while registering the user.", err });
  }
});

module.exports = router;
