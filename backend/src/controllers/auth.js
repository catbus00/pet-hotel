const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exists = await User.find({ email });
    if (exists.length > 0) {
      res.status(StatusCodes.CONFLICT).json("Email is already registered.");
    } else {
      const user = await User.create({ ...req.body });
      const token = user.createJWT();
      res
        .status(StatusCodes.CREATED)
        .json({ user: { name: user.name }, token });
    }
  } catch (e) {
    if (e.constructor.name === "ValidationError") {
      res.status(StatusCodes.BAD_REQUEST).json("Incorrect payload.");
    } else if (e.name === "MongoServerError" && e.code === 11000) {
      res.status(StatusCodes.CONFLICT).json("User already exists.");
    } else {
      return next(e);
    }
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("Please provide email and password");
  }
  const query = await User.findOne({ email });
  if (!query) {
    res.status(StatusCodes.NOT_FOUND).json("Invalid credentials");
  }

  const isPasswordCorrect = await query.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(StatusCodes.NOT_FOUND).json("Invalid credentials");
  }
  const token = query.createJWT();
  const user = query.toObject();
  delete user.password;
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
  register,
  login,
};
