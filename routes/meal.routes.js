const express = require('express');

// middlewares
const { mealExist } = require('../middlewares/meal.middleware');

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

// Post, get meals /:id
router
  .route('/:id')
  .post(createNewMeal)
  .get(mealExist, getMealById)
  .patch(mealExist, updateMeal)
  .delete(mealExist, deleteMeal);

module.exports = { mealsRouter: router };
