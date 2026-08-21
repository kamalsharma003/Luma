const asyncHandler = require("../utitlities/asyncHandler.utilitie");
const AppError = require("../utitlities/errorHandler.utilitie");
const jwt = require("jsonwebtoken");

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.token ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new AppError("Invalid token", 401));
  }

  let tokenData;

  try {
    tokenData = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return next(new AppError("Invalid or expired token", 401));
  }

  req.userId = tokenData.userId;

  next();
});

module.exports = isAuthenticated;
