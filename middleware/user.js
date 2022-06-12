const BigPromise = require("./BigPromise");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = BigPromise(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return next(new Error("Login First to access the page"));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

exports.isAdmin = BigPromise(async (req, res, next) => {
  if (req.user.role < 3) {
    return next(new Error("You are not authorized to access this page"));
  }
  next();
});

exports.isManger = BigPromise(async (req, res, next) => {
  if (req.user.role < 2) {
    return next(new Error("You are not authorized to access this page"));
  }
  next();
});
exports.isStaff = BigPromise(async (req, res, next) => {
  if (req.user.role < 1) {
    return next(new Error("You are not authorized to access this page"));
  }
  next();
});
