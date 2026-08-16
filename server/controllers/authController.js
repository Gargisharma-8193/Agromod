const User = require("../models/User");

// Register User
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Create new user
    const user = await User.create({
      email,
      password,
    });

    res.status(201).json({
      message: "Registration Successful",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No user found",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};