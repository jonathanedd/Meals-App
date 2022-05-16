const { Meal } = require('../models/meal.model');

// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const mealExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: { id, status: 'available' },
  });

  if (!meal) {
    return next(new AppError('Meal not found withh id', 404));
  }

  req.meal = meal;
  next();
});

module.exports = { mealExist };
