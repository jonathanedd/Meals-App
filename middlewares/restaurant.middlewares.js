const { Restaurant } = require('../models/restaurant.model');

// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

// Restaurant exist
const restaurantExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await Restaurant.findOne({
    where: { id, status: 'open' },
  });
  if (!restaurant) {
    return next(new AppError('Restaurant not found with id', 404));
  }

  req.restaurant = restaurant;
  next();
});

module.exports = { restaurantExist };
