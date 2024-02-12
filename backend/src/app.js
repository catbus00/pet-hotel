// requirements

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const env = process.env.NODE_ENV ?? "prod";
const cookieParser = require("cookie-parser");
const csrf = require("host-csrf");

// connectDB
const connectDB = require("./db/connect");

// basic packages

app.use(bodyParser.json());
if (env !== "prod") app.use(morgan("dev"));

// middleware
const authenticated = require("./middleware/authentication");
const { checkUser, checkOwner } = require("./middleware/checkRole");

// sessions

const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const url = process.env.MONGO_URI;
const store = new MongoDBStore({
  // may throw an error, which won't be caught
  uri: url,
  collection: "mySessions",
});
store.on("error", function (error) {
  console.log(error);
});

const sessionParms = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: store,
  cookie: {
    secure: false,
    sameSite: "strict",
    maxAge: 14 * 24 * 60 * 60 * 1000,
  },
};

if (app.get("env") === "production") {
  app.set("trust proxy", 1); // trust first proxy
  sessionParms.cookie.secure = true; // serve secure cookies
}

app.use(session(sessionParms));

// passport middleware

const passport = require("passport");
const passportInit = require("./passport/passportInit");
passportInit();

app.use(passport.initialize());
app.use(passport.session());

// csrf middleware

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ extended: false }));
let csrf_development_mode = true;
if (app.get("env") === "production") {
  csrf_development_mode = false;
  app.set("trust proxy", 1);
}

const csrf_options = {
  development_mode: csrf_development_mode,
  protected_operations: ["POST"],
  protected_content_types: ["application/x-www-form-urlencoded"],
  developer_mode: false,
  header_name: "csrf-token",
};

app.use(csrf(csrf_options));

// extra security packages

const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const cors = require("cors");
const corsOptions = {
  origin: process.env.ORIGIN || "http://127.0.0.1:5173",
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
