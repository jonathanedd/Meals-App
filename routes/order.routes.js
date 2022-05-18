const express = require('express');

// middlewares

// controllers
const {
  createNewOrder,
  getUserOrders,
} = require('../controllers/order.controller');

// Router
const router = express.Router();

// ENDPOINTS Petitions
// create Order
router.post('/', createNewOrder);
router.get('/me', getUserOrders);

module.exports = { ordersRouter: router };
