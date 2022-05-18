const { Restaurant } = require('../models/restaurant.model');
const { Review } = require('../models/review.model');
const { Meal } = require('../models/meal.model');

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
    include: [
      {
        model: Review,
        attributes: { include: ['comment', 'userId'] },
      },
      {
        model: Meal,
        attributes: { include: ['name', 'price'] },
      },
    ],
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

module.exports = {
  createNewRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
};
