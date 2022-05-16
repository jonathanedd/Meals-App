const express = require('express');

// middlewares
const { userExist } = require('../middlewares/user.middlewares');

const {
  createUserValidator,
  checkValidator,
} = require('../middlewares/validators.middlewares');

// controllers
const {
  createNewUser,
  getAllUsers,
  login,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');

const router = express.Router();

// petitions
router.post('/signup', createUserValidator, checkValidator, createNewUser);
router.get('/', getAllUsers);
router.post('/login', login);
router.get('/orders');

router.route('/:id').patch(userExist, updateUser).delete(userExist, deleteUser);

module.exports = { userRouter: router };
