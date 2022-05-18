const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { reviewExist } = require('../middlewares/review.middleware');

// restaurant controller
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
} = require('../controllers/restaurant.controller');

// Review controller
const {
  createNewReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');

const router = express.Router();

// ENDPOINTS
// Create new restaurant and get all restaurants
router.route('/').post(createNewRestaurant).get(getAllRestaurants);

// Get restaurant by id and update restaurant
router
  .route('/:id')
  .get(restaurantExist, getRestaurantById)
  .patch(restaurantExist, updateRestaurant);

// Create new Review
router
  .route('/reviews/:id')
  .post(createNewReview)
  .patch(reviewExist, updateReview)
  .delete(reviewExist, deleteReview);

module.exports = { restaurantRouter: router };
