const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { offerRide, getRides, getRideDetails, searchRides, bookRide, deleteRide } = require('../controllers/rideController');

const router = express.Router();

// Ride-related routes
router.post('/', protect, offerRide); // Offer a ride
router.get('/', protect, getRides); // Get all rides
router.get('/:rideId', protect, getRideDetails); // Get ride details by ID
router.post('/search', protect, searchRides); // Search for rides
router.post('/:id/book', protect, bookRide); // Book a ride
router.delete('/:id', protect, deleteRide); // Delete a ride

module.exports = router;