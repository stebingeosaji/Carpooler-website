const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { offerRide, getRides, getRideDetails, searchRides, bookRide, deleteRide, getUserRides } = require('../controllers/rideController');

const router = express.Router();

// Define the route for fetching user rides BEFORE the route for fetching a single ride by ID
router.get('/user', protect, getUserRides); // Add this route

// Other routes
router.post('/', protect, offerRide);
router.get('/', protect, getRides);
router.get('/:rideId', protect, getRideDetails); // This route should come AFTER /user
router.post('/search', protect, searchRides);
router.post('/:id/book', protect, bookRide);
router.delete('/:id', protect, deleteRide);

module.exports = router;