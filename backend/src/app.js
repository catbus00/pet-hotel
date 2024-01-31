// requirements

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const env = process.env.NODE_ENV ?? "prod";
require("express-async-errors");

// basic packages

app.use(bodyParser.json());
if (env !== "prod") app.use(morgan("dev"));

// extra security packages

// const cookieParser = require("cookie-parser");
// const csrf = require("host-csrf");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

// routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const petsRouter = require("./routes/pets");
app.use("/pets", petsRouter);

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

// server initialization

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await require("./db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
