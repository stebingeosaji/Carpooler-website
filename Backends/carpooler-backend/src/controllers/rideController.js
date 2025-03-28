const asyncHandler = require('express-async-handler');
const Ride = require('../models/rideModel');
const User = require('../models/userModel');

// @desc    Offer a new ride
// @route   POST /api/rides
// @access  Private
const offerRide = asyncHandler(async (req, res) => {
    const { pickupLocation, dropoffLocation, date, time, seats, vehicleType, genderPreference } = req.body;

    console.log('Request body:', req.body); // Debugging line

    try {
        const ride = await Ride.create({
            driver: req.user._id, // Use the logged-in user's ID
            driverName: req.user.username, // Use the logged-in user's username
            pickupLocation,
            dropoffLocation,
            date,
            time,
            seats,
            vehicleType,
            genderPreference: req.user.gender === 'female' ? genderPreference : 'any',
        });

        console.log('Ride created:', ride); // Debugging line
        res.status(201).json({ ride });
    } catch (error) {
        console.error('Error offering ride:', error); // Debugging line
        res.status(500).json({ message: 'Server error' });
    }
});
// @desc    Get all rides
// @route   GET /api/rides
// @access  Private
const getRides = asyncHandler(async (req, res) => {
    try {
        const rides = await Ride.find({});
        res.status(200).json({ rides });
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get ride details by ID
// @route   GET /api/rides/:rideId
// @access  Private
const getRideDetails = asyncHandler(async (req, res) => {
    const { rideId } = req.params;

    try {
        const ride = await Ride.findById(rideId);

        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        res.status(200).json({
            vehicleType: ride.vehicleType,
            driverName: ride.driverName,
            pickupLocation: ride.pickupLocation,
            dropoffLocation: ride.dropoffLocation,
            date: ride.date,
            time: ride.time,
            seats: ride.seats,
            riders: ride.riders,
        });
    } catch (error) {
        console.error('Error fetching ride details:', error);
        res.status(500).json({ message: 'An error occurred while fetching ride details' });
    }
});

// @desc    Search for rides
// @route   POST /api/rides/search
// @access  Private
const searchRides = asyncHandler(async (req, res) => {
    const { pickup, destination, date, time, passengers } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const genderPreferenceQuery = user.gender === 'female' ? { genderPreference: { $in: ['any', 'female'] } } : { genderPreference: 'any' };

    const rides = await Ride.find({
        pickupLocation: pickup,
        dropoffLocation: destination,
        date: date,
        time: time,
        seats: { $gte: passengers },
        ...genderPreferenceQuery,
    });

    if (rides.length > 0) {
        res.json({ rides });
    } else {
        res.status(404).json({ message: 'No rides found' });
    }
});

// @desc    Book a ride
// @route   POST /api/rides/:id/book
// @access  Private
const bookRide = asyncHandler(async (req, res) => {
    const { riderName, riderPhone, riderLocation, riderDestination } = req.body;

    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        // Add the rider details to the ride
        ride.riders.push({
            name: riderName,
            phone: riderPhone,
            location: riderLocation,
            destination: riderDestination,
        });

        ride.seats -= 1; // Reduce the number of available seats

        await ride.save();

        res.status(200).json({ message: 'Ride booked successfully', ride });
    } catch (error) {
        console.error('Error booking ride:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// @desc    Delete a ride
// @route   DELETE /api/rides/:id
// @access  Private
const deleteRide = asyncHandler(async (req, res) => {
    try {
        const ride = await Ride.findById(req.params.id);

        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        // Check if the logged-in user is the driver of the ride
        if (ride.driver.toString() !== req.user._id.toString()) {
            res.status(401).json({ message: 'Not authorized to delete this ride' });
            return;
        }

        // Use deleteOne to delete the ride
        await Ride.deleteOne({ _id: ride._id });

        res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
        console.error('Error deleting ride:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// @desc    Get all rides for the logged-in user
// @route   GET /api/rides/user
// @access  Private
const getUserRides = asyncHandler(async (req, res) => {
    try {
        console.log('Fetching rides for user:', req.user._id); // Debugging line
        const rides = await Ride.find({ driver: req.user._id }); // Fetch rides where the driver is the logged-in user
        console.log('Rides found:', rides); // Debugging line
        res.status(200).json({ rides });
    } catch (error) {
        console.error('Error fetching user rides:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = { offerRide, getRides, getRideDetails, searchRides, bookRide, deleteRide, getUserRides };