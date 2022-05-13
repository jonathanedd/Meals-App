const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next);
  };
};

module.exports = { catchAsync };
