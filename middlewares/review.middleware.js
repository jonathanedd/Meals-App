const { Review } = require('../models/review.model');

// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const reviewExist = catchAsync(async (req, res, next) => {
  const { id, restaurantId } = req.params;

  const review = await Review.findOne({
    where: { id, restaurantId },
  });

  if (!review) {
    return next(new AppError('Review not found with id', 404));
  }

  req.review = review;
  next();
});

module.exports = { reviewExist };
