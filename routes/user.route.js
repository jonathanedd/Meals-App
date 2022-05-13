const express = require("express");

// middlewares
const { userExist } = require("../middlewares/user.middlewares");

// controllers
const {
  createNewUser,
  getAllUsers,
  login,
  updateUser,
} = require("../controllers/user.controller");

const router = express.Router();

// petitions
router.post("/signup", createNewUser);
router.get("/", getAllUsers);
router.post("/login", login);
router.patch("/:id", userExist, updateUser);

module.exports = { userRouter: router };
