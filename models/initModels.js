const { User } = require('./user.model');
const { Restaurant } = require('./restaurant.model');
const { Review } = require('./review.model');
const { Meal } = require('./meal.model');
const { Order } = require('./order.model');

const initModels = () => {
  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  User.hasMany(Order);
  Order.belongsTo(User);

  User.hasMany(Review);
  Review.belongsTo(User);

  Meal.hasOne(Order);
  Order.belongsTo(Meal);
};

module.exports = { initModels };
