const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');
const { Restaurant } = require('../models/restaurant.model');
const { User } = require('../models/user.model');

// utils
const { catchAsync } = require('../utils/catchAsync');

const createNewOrder = catchAsync(async (req, res, next) => {
  const { quantity, mealId, userId } = req.body;

  const meal = await Meal.findOne({ where: { id: mealId } });

  const totalPrice = meal.price * quantity;

  const newOrder = await Order.create({
    quantity,
    mealId,
    userId,
    totalPrice,
  });

  res.status(201).json({
    status: 'success',
    newOrder,
  });
});

const getUserOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const userOrders = Order.findAll({
    where: { sessionUser, status: 'active' },
    include: [
      {
        model: Meal,
        attributes: { include: ['name'] },
      },
    ],
  });

  res.status(201).json({
    userOrders,
  });
});

const getOrderById = catchAsync(async (req, res, next) => {
  const { order } = req;

  res.status(201).json({
    status: 'success',
    order,
  });
});

module.exports = {
  createNewOrder,
  getUserOrders,
  getOrderById,
};
