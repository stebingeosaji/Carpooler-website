const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { getUserProfile, saveLicenseNumber, getLicenseNumber } = require('../controllers/userController');
const User = require('../models/userModel'); // Import the User model
const asyncHandler = require('express-async-handler'); // Import asyncHandler

const router = express.Router();

// Existing route to get user profile
router.get('/profile', protect, getUserProfile);

// Existing route to fetch user details
router.get('/details', protect, asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('username phone');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));

// New route to save license number
router.post('/save-license-number', protect, saveLicenseNumber);

// New route to retrieve license number
router.get('/license-number', protect, getLicenseNumber);

module.exports = router;