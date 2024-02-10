// requirements

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const env = process.env.NODE_ENV ?? "prod";
require("express-async-errors");

// connectDB
const connectDB = require("./db/connect");

// basic packages

app.use(bodyParser.json());
if (env !== "prod") app.use(morgan("dev"));

// middleware
const authenticated = require("./middleware/authentication");
const { checkUser, checkOwner } = require("./middleware/checkRole");

// extra security packages

// const cookieParser = require("cookie-parser");
// const csrf = require("host-csrf");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  }),
);
app.use(helmet());
app.use(xss());
app.use(cors(corsOptions));

// routes

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const authRouter = require("./routes/auth");
const petsRouter = require("./routes/pets");
const hotelRouter = require("./routes/hotels");

const owns = async (req, res, next) => {
  if (req.path === "/" && req.method === "GET") {
    next();
  } else {
    try {
      await authenticated(req);
      await checkOwner(req);
      next();
    } catch (e) {
      next(e);
    }
  }
};

app.use("/auth", authRouter);
app.use("/pets", authenticated, checkUser, petsRouter);
app.use("/hotels", owns, hotelRouter);

// server initialization

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`),
    );
  } catch (error) {
    console.log(error);
  }
};

start();
