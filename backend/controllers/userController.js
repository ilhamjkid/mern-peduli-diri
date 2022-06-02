const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * @desc    GET Single User
 * @route   GET /api/users/single
 * @access  Private
 */
const getUser = expressAsyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get single user successful",
    user: req.user,
  });
});

/**
 * @desc    Register new User
 * @route   POST /api/users/register
 * @access  Public
 */
const register = expressAsyncHandler(async (req, res) => {
  const { name, nik, password } = req.body;

  // Check validation
  res.status(400);
  if (!name || !nik || !password) {
    throw new Error("All fields are required!");
  }
  if (name === "" || nik === "" || password === "") {
    throw new Error("All fields are required!");
  }
  if (nik.length !== 16 || password.length < 8) {
    throw new Error("NIK or Password does not valid!");
  }

  // Check if NIK is registered
  if (await User.findOne({ nik })) {
    throw new Error("NIK not available!");
  }

  // Create hashed password
  const salt = await bcryptjs.genSalt(10);
  const pwdHash = await bcryptjs.hash(password, salt);

  try {
    // Generate token
    const accessToken = generateToken({ user: { name, nik } }, "access", "15s");
    const refreshToken = generateToken({ user: { name, nik } }, "refresh", "1d");

    // Upload new user to database
    const user = await User.create({
      name,
      nik,
      password: pwdHash,
      refreshToken,
    });

    // Set refresh token to cookie
    res.cookie("reftensec", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Response successful
    res.status(201).json({
      success: true,
      message: "Registration successful!",
      accessToken,
      user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * @desc    Login User
 * @route   POST /api/users/login
 * @access  Public
 */
const login = expressAsyncHandler(async (req, res) => {
  const { nik, password } = req.body;

  // Check validation
  res.status(400);
  if (!nik || !password) {
    throw new Error("All fields are required!");
  }
  if (nik === "" || password === "") {
    throw new Error("All fields are required!");
  }
  if (nik.length !== 16 || password.length < 8) {
    throw new Error("NIK or Password does not valid!");
  }

  // Check user exists
  const userExists = await User.findOne({ nik });
  if (!userExists) throw new Error("Login failed!");

  // Check password match
  const pwdMatch = await bcryptjs.compare(password, userExists.password);
  if (!pwdMatch) throw new Error("Login failed!");

  try {
    // Generate token
    const accessToken = generateToken({ user: { name: userExists.name, nik } }, "access", "15s");
    const refreshToken = generateToken({ user: { name: userExists.name, nik } }, "refresh", "1d");

    // Update refresh token user
    const userUpdated = await User.findByIdAndUpdate(userExists._id, { refreshToken });

    // Set refresh token to cookie
    res.cookie("reftensec", refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Response successful
    const user = await User.findById(userUpdated._id);
    res.status(201).json({
      success: true,
      message: "Login successful!",
      accessToken,
      user,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

/**
 * @desc    Refresh Token
 * @route   GET /api/users/refresh
 * @access  Public
 */
const refresh = expressAsyncHandler(async (req, res) => {
  const refreshToken = req?.cookies?.reftensec;

  // Check Refresh Token
  if (!refreshToken) {
    res.status(401);
    res.clearCookie("aflog");
    throw new Error("Not authorized!");
  }

  // Check user exists
  const userExists = await User.findOne({ refreshToken });
  if (!userExists) {
    res.status(401);
    res.clearCookie("aflog");
    res.clearCookie("reftensec");
    throw new Error("Not authorized!");
  }

  try {
    // Generate token
    const accessToken = generateToken(
      {
        user: {
          name: userExists.name,
          nik: userExists.nik,
        },
      },
      "access",
      "15s"
    );

    // Response successful
    res.status(200).json({
      success: true,
      message: "Refresh token successful!",
      accessToken,
      user: userExists,
    });
  } catch (error) {
    res.status(400);
    res.clearCookie("aflog");
    throw new Error(error.message);
  }
});

/**
 * @desc    Logout User
 * @route   DELETE /api/users/logout
 * @access  Private
 */
const logout = expressAsyncHandler(async (req, res) => {
  // Check token in cookie
  const refreshToken = req?.cookies?.reftensec;
  if (refreshToken) {
    res.clearCookie("reftensec", {
      httpOnly: true,
      secure: false,
    });
  }

  try {
    // Clear token in database
    const userUpdated = await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

    // Response successful
    res.status(200).json({
      success: true,
      message: "Logout successful!",
    });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// Function for generate cookie
const generateToken = (payload, token, exp) => {
  const ACCESS = process.env.ACCESS_TOKEN_SECRET;
  const REFRESH = process.env.REFRESH_TOKEN_SECRET;
  return jwt.sign(payload, token === "access" ? ACCESS : REFRESH, { expiresIn: exp });
};

module.exports = { getUser, register, login, refresh, logout };
