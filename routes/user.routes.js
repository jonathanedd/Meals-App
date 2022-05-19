const express = require('express');

// middlewares
const {
  userExist,
  protectToken,
  protrectAccountOwner,
} = require('../middlewares/user.middlewares');

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

const {
  getUserOrders,
  getOrderById,
} = require('../controllers/order.controller');
const { orderExist } = require('../middlewares/order.middlewares');

const router = express.Router();

// petitions
router.post('/signup', createUserValidator, checkValidator, createNewUser);
router.post('/login', login);

router.use(protectToken);

router.get('/', getAllUsers);

router
  .route('/:id')
  .patch(userExist, protrectAccountOwner, updateUser)
  .delete(userExist, protrectAccountOwner, deleteUser);

router.get('/orders', orderExist, getUserOrders);
router.get('/orders/:id', getOrderById);

module.exports = { userRouter: router };
