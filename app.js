const express = require("express");

// routes
const { userRouter } = require("./routes/user.route");

const app = express();

app.use(express.json());

// endpoints
app.use("/api/v4/users", userRouter);

module.exports = { app };
