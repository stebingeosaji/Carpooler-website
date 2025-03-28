const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const rideRoutes = require('./routes/rideRoutes');
const Ride = require('./models/rideModel');
const cors = require('cors');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rides', rideRoutes);

// Default route
app.get('/', (req, res) => {
    res.send('Carpooler Backend is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Function to delete expired rides
const deleteExpiredRides = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().split(' ')[0];

    try {
        await Ride.deleteMany({
            $or: [
                { date: { $lt: currentDate } },
                { date: currentDate, time: { $lt: currentTime } },
            ],
        });

        console.log('Expired rides deleted successfully');
    } catch (error) {
        console.error('Error deleting expired rides:', error);
    }
};

// Run this function periodically (e.g., every hour)
setInterval(deleteExpiredRides, 60 * 60 * 1000);