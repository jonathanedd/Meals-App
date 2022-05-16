const { User } = require('./user.model');
const { Restaurant } = require('./restaurant.model');
const { Review } = require('./review.model');

const initModels = () => {
  Restaurant.hasMany(Review);

  User.hasMany(Review);

  Review.belongsTo(User);
};

module.exports = { initModels };
