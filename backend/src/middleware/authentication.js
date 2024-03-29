const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../errors/unauthenticated");

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // attach user to the routes including role to determine logic
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    if (next) {
      next();
    }
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
