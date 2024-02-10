const User = require("../models/User");
const { CustomAPIError } = require("../errors/");

const checkOwner = async (req, res, next) => {
  // check the role
  const userRole = req.user.role;
  if (userRole !== true) {
    throw new CustomAPIError("Access denied for this role. Hotel owners only.");
  }
  if (next) {
    next();
  }
};

const checkUser = async (req, res, next) => {
  // check the role
  const userRole = req.user.role;
  if (userRole === true) {
    throw new CustomAPIError("Access denied for this role. Pet owners only.");
  }
  if (next) {
    next();
  }
};

module.exports = { checkUser, checkOwner };
