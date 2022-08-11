const jwt = require("jsonwebtoken");
const config = require("../config");

const verifyToken = (req, res, next) => {
  // Getting the authorization header
  const token = req.headers["authorization"];

  // Token coming in headers
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  // Synchronously verify given token using a secret or a public key to get a decoded token
  try {
    const decoded = jwt.verify(token, config.AUTH_SECRET);
    // Passing the decoded data of users and passing into claims key
    // Claims is a custom key in request
    req.claims = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return next();
};
module.exports = verifyToken;
