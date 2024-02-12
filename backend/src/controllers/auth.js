const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const csrf = require("host-csrf");

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(StatusCodes.NOT_FOUND).json("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    res.status(StatusCodes.NOT_FOUND).json("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: user.name, token, role: user.role });
};

const logoff = async (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    csrf.refresh(req, res);
    res.redirect("/");
  });
};

module.exports = {
  register,
  login,
  logoff,
};
