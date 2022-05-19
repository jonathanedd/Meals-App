const { body, validationResult } = require('express-validator');

// utils
const { AppError } = require('../utils/appError');

// User validation
const createUserValidator = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Restaurant Validator
const createRestaurantValidator = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('address').notEmpty().withMessage('Provide a valid address'),
];

// Meal validator
const createMealValidator = [
  body('name').notEmpty().withMessage('Name cannot me empty'),
  body('price').notEmpty().withMessage('Please provide a price'),
];

const checkValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);

    const errorMsg = messages.join('. ');

    return next(new AppError(errorMsg, 400));
  }
  next();
};

module.exports = {
  createUserValidator,
  createRestaurantValidator,
  createMealValidator,
  checkValidator,
};
