const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');

dotenv.config();

const findUser = async (identifier) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        const user = await User.findOne({
            $or: [{ username: identifier }, { email: identifier }],
        });

        if (user) {
            console.log('User found:', user);
        } else {
            console.log('User not found');
        }

        await mongoose.disconnect();
        console.log('MongoDB Disconnected');
    } catch (error) {
        console.error('Error finding user:', error);
    }
};

// Replace 'stebingeo' with the username or email you want to search for
findUser('stebingeosaji@gmail.com');
