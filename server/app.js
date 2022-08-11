const express = require("express");
const app = express();
const config = require("./config");
const authRouter = require("./authentication");
const userRouter = require("./users");
const verifyAuth = require("./authentication/authMiddleware");
const dateFormat = require("date-format");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const now = new Date();

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json());

morgan.token(
  "time",
  () => dateFormat.asString(dateFormat.ISO8601_FORMAT, new Date())
  // now.toISOString()
);

app.use(
  morgan(
    "[:time] :remote-addr :method :url :status :res[content-length] :response-time ms"
  )
);

app.use("/auth", authRouter);
app.use("/users", verifyAuth, userRouter);
app.use("/user", userRouter);

app.listen(config.PORT, () => {
  console.log("Listening on port", config.PORT);
});
