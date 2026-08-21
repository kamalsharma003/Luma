const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const asyncHandler = require("../utitlities/asyncHandler.utilitie");
const AppError = require("../utitlities/errorHandler.utilitie");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res, next) => {
  const { fullName, username, password, gender } = req.body;

  if (!fullName || !username || !password || !gender) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await userModel.findOne({ username });

  if (user) {
    return next(new AppError("User already exists", 400));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(fullName || username)}&backgroundColor=0ea5e9`,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
});

const login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new AppError("Username and password are required", 400));
  }

  const user = await userModel.findOne({ username });

  if (!user) {
    return next(new AppError("Invalid username or password", 401));
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid username or password", 401));
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
  });
});

const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.userId;

  const profile = await userModel.findById(userId).select("-password");

  if (!profile) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    responseData: profile,
  });
});

const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

const getOtherUsers = asyncHandler(async (req, res, next) => {
  const otherUsers = await userModel.find({
    _id: { $ne: req.userId },
  }).select("-password");

  res.status(200).json({
    success: true,
    responseData: otherUsers, 
  });
});

module.exports = {
  register,
  login,
  getProfile,
  logout,
  getOtherUsers,
};
