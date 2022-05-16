const express = require('express');

// middlewares
const { restaurantExist } = require('../middlewares/restaurant.middlewares');

// controllers
const {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
} = require('../controllers/restaurant.controller');

const router = express.Router();

// petitions
router.route('/').post(createNewRestaurant).get(getAllRestaurants);

router
  .route('/:id')
  .get(restaurantExist, getRestaurantById)
  .patch(restaurantExist, updateRestaurant);

router.post('/reviews/:id');

module.exports = { restaurantRouter: router };
