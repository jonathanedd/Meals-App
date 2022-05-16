const express = require('express');

// routes
const { userRouter } = require('./routes/user.routes');
const { restaurantRouter } = require('./routes/restaurant.routes');

const app = express();

app.use(express.json());

// endpoints
app.use('/api/v4/users', userRouter);
app.use('/api/v4/restaurants', restaurantRouter);

module.exports = { app };
