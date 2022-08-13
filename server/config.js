const config = {
  PORT: process.env.PORT || "5000",
  AUTH_SECRET: process.env.AUTH_SECRET || "secret",
  RECAPTCHA_SECRET_KEY:
    process.env.RECAPTCHA_SECRET_KEY ||
    "6LfzmXEhAAAAACbb6XDHl-F3tDm-5Ea_ofzhLSoE",
};

module.exports = config;
