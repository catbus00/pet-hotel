const User = require("../models/User");
const { CustomAPIError } = require("../errors/");

const checkOwner = async (req, res, next) => {
  try {
    // check the role
    const userRole = req.user.role;
    if (userRole !== true) {
      throw new CustomAPIError(
        "Access denied for this role. Hotel owners only.",
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkUser = async (req, res, next) => {
  try {
    // check the role
    const userRole = req.user.role;
    if (userRole === true) {
      throw new CustomAPIError("Access denied for this role. Pet owners only.");
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUser, checkOwner };
