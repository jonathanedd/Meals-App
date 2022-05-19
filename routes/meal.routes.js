const express = require('express');

// middlewares
const { mealExist } = require('../middlewares/meal.middleware');

const {
  protectAdmin,
  protectToken,
} = require('../middlewares/user.middlewares');

const {
  createMealValidator,
} = require('../middlewares/validators.middlewares');

// controllers
const {
  createNewMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');

const router = express.Router();

// ENDPOINTS
// Get all meals
router.get('/', getAllMeals);
router.get('/:id', mealExist, getMealById);

router.use(protectToken);

// Post, get meals /:id
router
  .route('/:id')
  .post(createMealValidator, createNewMeal)
  .patch(mealExist, protectAdmin, updateMeal)
  .delete(mealExist, protectAdmin, deleteMeal);

module.exports = { mealsRouter: router };
