const userDAO = require("./userDAO");

const findUser = function (email, done) {
  userDAO.findUser(email, done);
};

const registerUser = function (userData, done) {
  userDAO.registerUser(userData, done);
};

module.exports = { findUser, registerUser };
