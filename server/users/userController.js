const userService = require("./userService");

const findUser = function (email, done) {
  userService.findUser(email, done);
};

module.exports = { findUser };
