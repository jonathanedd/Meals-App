const { Order } = require('../models/order.model');

// utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

const orderExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: { id, status: 'active' },
  });

  if (!order) {
    return next(new AppError('Order not found with id', 404));
  }

  req.order = order;

  next();
});

module.exports = { orderExist };
