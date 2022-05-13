const express = require("express");

// middlewares

// controllers
const {
  createNewUser,
  getAllUsers,
} = require("../controllers/user.controller");

const router = express.Router();

// petitions
router.post("/:signup", createNewUser);
router.get("/", getAllUsers);

module.exports = { userRouter: router };
