const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Not authorized, user not found' });
        return;
    }

    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Save driver's license number
// @route   POST /api/users/save-license-number
// @access  Private
const saveLicenseNumber = asyncHandler(async (req, res) => {
    const { licenseNumber } = req.body;

    if (!licenseNumber) {
        res.status(400).json({ message: 'License number is required' });
        return;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    // Save the license number to the user's profile
    user.licenseNumber = licenseNumber;
    await user.save();

    res.status(200).json({ message: 'License number saved successfully', licenseNumber });
});

// @desc    Get driver's license number
// @route   GET /api/users/license-number
// @access  Private
const getLicenseNumber = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    if (!user.licenseNumber) {
        res.status(404).json({ message: 'License number not found' });
        return;
    }

    res.status(200).json({ licenseNumber: user.licenseNumber });
});

module.exports = { getUserProfile, saveLicenseNumber, getLicenseNumber };