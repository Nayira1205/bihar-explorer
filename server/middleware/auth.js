const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// Reads the httpOnly "token" cookie, verifies it, and attaches the
// corresponding user to req.user. Use on any route that requires login.
const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Not logged in");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    throw new ApiError(401, "Session expired or invalid — please log in again");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "User for this session no longer exists");
  }

  req.user = user;
  next();
});

// Use after `protect` on routes only admins should reach.
const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    throw new ApiError(403, "Admin access required");
  }
  next();
};

module.exports = { protect, adminOnly };
