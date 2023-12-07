const express = require('express');
const {
  signup,
  getUser,
  protect,
  login,
} = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/user', protect, getUser);

module.exports = router;
