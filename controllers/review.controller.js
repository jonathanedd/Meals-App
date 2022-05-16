const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

// create new review
const createNewReview = catchAsync(async (req, res, next) => {
  const { comment, rating, restaurantId, userId } = req.body;

  const newReview = await Review.create({
    comment,
    rating,
    restaurantId,
    userId,
  });
  res.status(201).json({
    newReview,
  });
});

// Get all Reviews
// const getAllReviews = catchAsync(async (req, res, next) => {
//   const reviews = await Review.findAll({
//     include: [
//       {
//         model: Restaurant,
//         attributes: { include: ['comment'] },
//       },
//     ],
//   });

//   res.status(201).json({
//     status: 'success',
//     reviews,
//   });
// });

// Update review
const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { comment, rating } = req.body;

  await review.update({
    comment,
    rating,
  });
  res.status(201).json({
    status: 'success',
    review,
  });
});

// Delete Revoew
const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;

  await review.update({ status: 'deleted' });

  res.status(201).json({
    status: 'success',
    review,
  });
});

module.exports = {
  createNewReview,
  //   getAllReviews,
  updateReview,
  deleteReview,
};
