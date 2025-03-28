const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser);
router.post('/login', authController.authUser); // Ensure this function is correctly named
router.post('/verify-otp', authController.verifyOTP);

module.exports = router;