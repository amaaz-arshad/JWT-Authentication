const authService = require("./authService");
const userService = require("../users/userService");

function registerUser(userData, done) {
  userService.findUser(userData.email, (err, userFound) => {
    if (err) {
      done(err);
    } else {
      if (userFound) {
        done(userFound);
      } else {
        userService.registerUser(userData, done);
      }
    }
  });
}

function loginUser({ email, password }, done) {
  userService.findUser(email, (err, userFound) => {
    if (err) {
      done(err);
    } else {
      const userVerified = authService.verifyUser(
        { email, password },
        userFound
      );
      if (userVerified) {
        const jwtToken = authService.createToken(userFound);
        done(undefined, jwtToken);
      } else {
        done({ error: "Invalid Credentials" });
      }
    }
  });
}

module.exports = { registerUser, loginUser };
