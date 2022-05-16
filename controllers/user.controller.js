const { User } = require('../models/user.model');

// bcrypt
const bcrypt = require('bcryptjs');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

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

  newUser.password = undefined;

  res.status(201).json({
    newUser,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  res.status(201).json({
    users,
  });
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: 'active' } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  // JWT

  user.password = undefined;

  res.status(201).json({
    status: 'success',
  });
});

const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });

  res.status(201).json({
    status: 'success',
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: 'deleted',
  });

  res.status(201).json({
    status: 'success',
  });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  
});

module.exports = {
  createNewUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
  getUserOrders,
};
