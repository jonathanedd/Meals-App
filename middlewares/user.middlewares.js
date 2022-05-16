const { User } = require('../models/user.model');

// utils
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

// user exist
const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: 'active' },
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return next(new AppError('User not found with id', 404));
  }
  req.user = user;
  next();
});

// const protrectAccountOwner = catchAsync(async (req, res, next) => {
//   const { sessionUser, user } = req;

//   if (sessionUser.id !== user.id) {
//     return next(new AppError('You dont own this account', 403));
//   }

//   next();
// });

module.exports = {
  userExist,
  //   protrectAccountOwner,
};
