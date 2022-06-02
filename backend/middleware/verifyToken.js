const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = expressAsyncHandler(async (req, res, next) => {
  res.status(401);
  const authHeaders = req?.headers?.authorization;
  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    throw new Error("Not authorized!");
  }
  try {
    const token = authHeaders.split(" ")[1];
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findOne({ nik: decoded?.user?.nik }).select("-password");
    if (!user) throw new Error("Not authorized!");
    req.user = user;
    res.status(200);
    next();
  } catch (error) {
    res.status(403);
    throw new Error("Not authorized!");
  }
});

module.exports = { protect };
