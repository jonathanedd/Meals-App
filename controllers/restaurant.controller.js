const { Restaurant } = require('../models/restaurant.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

const createNewRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const newRestaurant = await Restaurant.create({
    name,
    address,
    rating,
  });

  res.status(201).json({ newRestaurant });
});

const getAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where: { status: 'open' },
  });

  res.status(201).json({ restaurant });
});

const getRestaurantById = catchAsync(async (req, res, next) => {
  const { restaurant } = req;

  res.status(201).json({ restaurant });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { name, address } = req.body;

  await restaurant.update({
    name,
    address,
  });

  res.status(201).json({ status: 'success' });
});

// create new review
const createNewReview = catchAsync(async (req, res, next) => {
  const { comment, rating } = req.body;
});

module.exports = {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
};