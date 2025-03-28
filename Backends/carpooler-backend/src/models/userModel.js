const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        otp: {
            type: String, // Ensure OTP is stored as a string
        },
        driverLicense: {
            type: String, // Store the file path or URL of the driver's license
            default: null,
        },
        licenseNumber: {
            type: String, // New field for license number
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Method to validate OTP
userSchema.methods.matchOTP = function (enteredOTP) {
    return this.otp === enteredOTP; // Compare OTPs as strings
};

const User = mongoose.model('User', userSchema);

module.exports = User;