const mongoose = require('mongoose');

const rideSchema = mongoose.Schema(
    {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        driverName: {
            type: String,
            required: true, // Ensure driverName is required
        },
        driverImage: {
            type: String,
        },
        pickupLocation: {
            type: String,
            required: true,
        },
        dropoffLocation: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        seats: {
            type: Number,
            required: true,
        },
        vehicleType: {
            type: String,
            required: true,
        },
        genderPreference: {
            type: String,
            enum: ['any', 'female'],
            default: 'any',
        },
        riders: [
            {
                name: String,
                phone: String,
                location: String,
                destination: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Ride = mongoose.model('Ride', rideSchema);

module.exports = Ride;