// requirements

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const env = process.env.NODE_ENV ?? "prod";
require("express-async-errors");
const csrf = require("host-csrf");
const cookieParser = require("cookie-parser");

if (env !== "prod") app.use(morgan("dev"));

// extra security packages

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const petsRouter = require("../routes/pets");
app.use("/pets", petsRouter);

// server initialization

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await require("../db/connect")(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
