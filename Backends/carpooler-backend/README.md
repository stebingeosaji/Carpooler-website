# Carpooler Backend

## Overview
The Carpooler backend is a Node.js application built with Express that provides authentication and user management for a carpooling service. It allows users to register, log in, and manage their profiles.

## Project Structure
```
carpooler-backend
├── src
│   ├── controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── rideController.js
│   │   └── protectedController.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── protectedRoutes.js
│   ├── models
│   │   ├── userModel.js
│   │   └── rideModel.js
│   ├── middleware
│   │   └── authMiddleware.js
│   ├── scripts
│   │   └── findUser.js
│   ├── app.js
│   ├── server.js
│   └── config
│       └── db.js
├── package.json
├── .env
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd carpooler-backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables. Example:
   ```
   PORT=5501
   MONGODB_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   EMAIL_USER=<your-email-user>
   EMAIL_PASS=<your-email-password>
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. The server will run on `http://localhost:5501`.

## API Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **POST /api/auth/verify-otp**: Verify OTP for user registration.
- **GET /api/users/profile**: Get the profile of the logged-in user.
- **GET /api/protected**: Access a protected route.
- **POST /api/rides**: Offer a new ride (requires authentication).
- **GET /api/rides**: Get all rides (requires authentication).
- **GET /api/rides/:rideId**: Get ride details by ID (requires authentication).
- **POST /api/rides/search**: Search for rides (requires authentication).
- **POST /api/rides/:id/book**: Book a ride (requires authentication).
- **DELETE /api/rides/:id**: Delete a ride (requires authentication).
- **GET /api/rides/user**: Get all rides for the logged-in user (requires authentication).

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.