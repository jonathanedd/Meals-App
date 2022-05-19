const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

//Create new meal
const createNewMeal = catchAsync(async (req, res, next) => {
  const { name, price, restaurantId } = req.body;

  const newMeal = await Meal.create({
    name,
    price,
    restaurantId,
  });

  res.status(201).json({
    status: 'success',
    newMeal,
  });
});

// Get all meals from Open restaurants
const getAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: { status: 'available' },
    include: [
      {
        model: Restaurant,
        attributes: { include: ['name'] },
      },
    ],
  });

  res.status(201).json({
    meals,
  });
});

// Get meals by id
const getMealById = catchAsync(async (req, res, next) => {
  const { meal } = req;

  res.status(201).json({
    meal,
  });
});

// Update meal
const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { name, price } = req.body;

  await meal.update({
    name,
    price,
  });

  res.status(201).json({
    status: 'success',
  });
});

// delete meal
const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({
    status: 'deleted',
  });

  res.status(201).json({
    status: 'success',
  });
});

module.exports = {
  createNewMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
};
