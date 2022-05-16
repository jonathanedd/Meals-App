const express = require('express');

// express-rate-limit
const rateLimit = require('express-rate-limit');

// controllers
const { globalErrorHandler } = require('./controllers/errors.controller');

// routes
const { userRouter } = require('./routes/user.routes');
const { restaurantRouter } = require('./routes/restaurant.routes');
const { mealsRouter } = require('./routes/meal.routes');

const app = express();

app.use(express.json());

// limit IP request
const limiter = rateLimit({
  max: 10000,
  windowMs: 60 * 60 * 1000, //1hr
  message: 'Too many petitions',
});

app.use(limiter);

// endpoints
app.use('/api/v4/users', userRouter);
app.use('/api/v4/restaurants', restaurantRouter);
app.use('/api/v4/meals', mealsRouter);

// global error handler
app.use('*', globalErrorHandler);

module.exports = { app };
