const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');
const { reviewExist } = require('../middlewares/review.middleware');

const {
  createRestaurantValidator,
  checkValidator,
} = require('../middlewares/validators.middlewares');

const {
  protectAdmin,
  protrectAccountOwner,
  protectToken,
} = require('../middlewares/user.middlewares');

// restaurant controller
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');

// Review controller
const {
  createNewReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');

const router = express.Router();

// ENDPOINTS
// get all and restaurant by Id
router.get('/', getAllRestaurants);
router.get('/:id', restaurantExist, getRestaurantById);

router.use(protectToken);

// create new restaurant
router.post(
  '/',
  createRestaurantValidator,
  checkValidator,
  createNewRestaurant
);

// update & delete restaurant
router
  .route('/:id')
  .patch(restaurantExist, protectAdmin, updateRestaurant)
  .delete(restaurantExist, protectAdmin, deleteRestaurant);

// Create new Review
router
  .route('/reviews/:id')
  .post(createNewReview)
  .patch(reviewExist, protrectAccountOwner, updateReview)
  .delete(reviewExist, protrectAccountOwner, deleteReview);

module.exports = { restaurantRouter: router };
