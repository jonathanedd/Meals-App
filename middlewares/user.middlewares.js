const { User } = require("../models/user.model");

// utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

// user exist
const userExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError("User not found with id", 404));
  }
  req.user = user;
  next();
});

module.exports = { userExist };
