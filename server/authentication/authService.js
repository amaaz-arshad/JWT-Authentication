const jwt = require("jsonwebtoken");
const config = require("../config");

function verifyUser({ email, password }, userData) {
  if (userData === undefined) {
    return false;
  } else if (email === userData.email && password === userData.password) {
    return true;
  } else {
    return false;
  }
}

function createToken(userData) {
  const payload = {
    role: "USER",
    email: userData.email,
    name: userData.name,
  };

  const token = jwt.sign(payload, config.AUTH_SECRET, {
    expiresIn: 3600,
  });

  return { token, payload };
}

module.exports = { verifyUser, createToken };
