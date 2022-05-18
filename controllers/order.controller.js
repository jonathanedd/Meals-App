const { Order } = require('../models/order.model');
const { Meal } = require('../models/meal.model');

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
  const userOrders = Order.findAll({
    include: [
      {
        model: Meal,
        where: { status: 'available' },
        attributes: { include: ['name', 'price'] },
      },
    ],
  });

  res.status(201).json({
    userOrders,
  });
});

module.exports = {
  createNewOrder,
  getUserOrders,
};
