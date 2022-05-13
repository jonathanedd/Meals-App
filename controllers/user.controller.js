const { User } = require("../models/user.model");

// bcrypt
const bcrypt = require("bcryptjs");

// utils
const { catchAsync } = require("../utils/catchAsync");

// HTTP functions
const createNewUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(12);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashPassword,
  });

  res.status(201).json({
    newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });

  res.status(201).json({
    users,
  });
});

module.exports = { createNewUser, getAllUsers };
